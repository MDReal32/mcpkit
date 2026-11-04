use crate::cli::clients::{ClientSelectionMode, apply_to_clients, create_client_context, select_clients};
use crate::cli::command::ClientSelection;
use crate::cli::consts::{EXIT_FAILURE, EXIT_SUCCESS};
use crate::cli::run_command::run_command;
use crate::cli::update::create_binary_context;
use mcpkit_binary::resolve_installed_binary_path;
use mcpkit_binary::schedule::remove_upgrade_schedule;
use mcpkit_clients::{CLIENT_DEFINITIONS, detect_clients, remove_client_entry};

/// Removes the `mcpkit` entry from the chosen clients. The binaries stay so other clients keep working.
pub fn uninstall_command(selection: ClientSelection) -> i32 {
    run_command(async move {
        let context = create_client_context()?;
        let detected = detect_clients(&context, CLIENT_DEFINITIONS).map_err(|error| error.0)?;
        let candidates: Vec<_> = detected
            .into_iter()
            .filter(|client| client.has_entry || client.problem.is_some())
            .collect();
        if candidates.is_empty() {
            println!("No client has an mcpkit entry.");
            return Ok(EXIT_SUCCESS);
        }
        let selected = select_clients(
            candidates,
            &selection,
            ClientSelectionMode::Uninstall,
            &context.home_dir,
        )?;
        let Some(selected) = selected.filter(|selected| !selected.is_empty()) else {
            println!("Nothing selected, nothing changed.");
            return Ok(EXIT_SUCCESS);
        };
        let failed = apply_to_clients(&selected, &context.home_dir, |client| {
            remove_client_entry(&client.definition, &client.config_path).map(|_| ())
        });
        let binary_context = create_binary_context()?;
        let remaining = detect_clients(&context, CLIENT_DEFINITIONS).map_err(|error| error.0)?;
        if !remaining.iter().any(|client| client.has_entry)
            && remove_upgrade_schedule(&binary_context)
                .await
                .map_err(|error| error.0)?
        {
            println!("No client uses mcpkit now; removed the scheduled \"mcpkit upgrade\".");
        }
        let installed = resolve_installed_binary_path(&binary_context.home_dir, binary_context.target);
        println!("The binary stays at {}; delete it if unused.", installed.display());
        Ok(if failed == 0 { EXIT_SUCCESS } else { EXIT_FAILURE })
    })
}
