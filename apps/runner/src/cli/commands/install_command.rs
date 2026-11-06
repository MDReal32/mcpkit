use crate::cli::clients::{ClientSelectionMode, apply_to_clients, create_client_context, select_clients};
use crate::cli::command::InstallArgs;
use crate::cli::consts::{BINARY_FLAG, EXIT_FAILURE, EXIT_SUCCESS};
use crate::cli::output::print_detected_clients_missing;
use crate::cli::registry::sync_quietly;
use crate::cli::run_command::run_command;
use crate::cli::tool_loading::{choose_partial_loading, create_launch_env};
use crate::cli::update::{announce_upgrade_schedule, create_binary_context, prepare_launch_binary};
use usemcpkit_clients::{
    CLIENT_DEFINITIONS, LaunchCommand, SERVE_ARGS, apply_client_settings, detect_clients, set_client_entry,
};

/// Copies the binaries to ~/.usemcpkit/bin (or uses the Homebrew/winget one in place), points each chosen client's
/// single `mcpkit` entry at the runner, with partial loading on or off as chosen, and sets the client settings usemcpkit
/// needs.
pub fn install_command(args: InstallArgs) -> i32 {
    run_command(async move {
        if let Some(binary) = &args.binary {
            let exists = binary
                .try_exists()
                .map_err(|error| format!("cannot read {}: {error}", binary.display()))?;
            if !exists {
                eprintln!("{BINARY_FLAG} {}: no such file", binary.display());
                return Ok(EXIT_FAILURE);
            }
        }
        let context = create_client_context()?;
        let detected = detect_clients(&context, CLIENT_DEFINITIONS).map_err(|error| error.0)?;
        if detected.is_empty() {
            print_detected_clients_missing();
            return Ok(EXIT_FAILURE);
        }
        let selected = select_clients(
            detected,
            &args.selection,
            ClientSelectionMode::Install,
            &context.home_dir,
        )?;
        let Some(selected) = selected.filter(|selected| !selected.is_empty()) else {
            println!("Nothing selected, nothing changed.");
            return Ok(EXIT_SUCCESS);
        };
        let Some(partial_loading) = choose_partial_loading(&args)? else {
            println!("Nothing changed.");
            return Ok(EXIT_SUCCESS);
        };
        let binary_context = create_binary_context()?;
        let binary = prepare_launch_binary(&binary_context, args.binary)?;
        let launch = LaunchCommand {
            command: binary.path.display().to_string(),
            args: SERVE_ARGS.iter().map(|arg| (*arg).to_owned()).collect(),
            env: create_launch_env(partial_loading),
        };
        let failed = apply_to_clients(&selected, &context.home_dir, |client| {
            set_client_entry(&client.definition, &client.config_path, &launch)?;
            apply_client_settings(&client.definition, &context)
        });
        if !binary.managed {
            announce_upgrade_schedule(&binary_context).await;
        }
        sync_quietly().await;
        println!("Restart the clients to load usemcpkit. {}", binary.update_hint);
        Ok(if failed == 0 { EXIT_SUCCESS } else { EXIT_FAILURE })
    })
}
