use serde_json::{Value, json};
use std::fs;
use std::path::{Path, PathBuf};
use tempfile::TempDir;
use usemcpkit_clients::{
    CLIENT_DEFINITIONS, ClientContext, ClientDefinition, LaunchCommand, apply_client_settings, detect_clients,
    remove_client_entry, set_client_entry,
};
use usemcpkit_core::env::Env;
use usemcpkit_core::platform::Platform;

const LAUNCH_COMMAND: &str = "/opt/usemcpkit/bin/usemcpkit";

fn launch() -> LaunchCommand {
    LaunchCommand {
        command: LAUNCH_COMMAND.to_owned(),
        args: vec!["serve".to_owned()],
    }
}

fn find_definition(id: &str) -> ClientDefinition {
    *CLIENT_DEFINITIONS
        .iter()
        .find(|candidate| candidate.id == id)
        .unwrap_or_else(|| panic!("no client {id}"))
}

fn create_context(home: &Path) -> ClientContext {
    ClientContext::new(Env::default(), Platform::Linux, home.to_path_buf())
}

fn write_config(home: &Path, definition: &ClientDefinition, text: &str) -> PathBuf {
    let path = (definition.config_path)(&create_context(home));
    fs::create_dir_all(path.parent().unwrap()).unwrap();
    fs::write(&path, text).unwrap();
    path
}

fn read(path: &Path) -> String {
    fs::read_to_string(path).unwrap()
}

#[test]
fn finds_clients_by_their_directories_and_reports_existing_entries() {
    let home = TempDir::new().unwrap();
    fs::create_dir(home.path().join(".cursor")).unwrap();
    write_config(
        home.path(),
        &find_definition("gemini-cli"),
        r#"{ "mcpServers": { "mcpkit": {} } }"#,
    );

    let detected = detect_clients(&create_context(home.path()), CLIENT_DEFINITIONS).unwrap();

    let found: Vec<(&str, bool)> = detected
        .iter()
        .map(|client| (client.definition.id, client.has_entry))
        .collect();
    assert_eq!(found, [("cursor", false), ("gemini-cli", true)]);
}

#[test]
fn tells_the_windows_store_build_of_claude_desktop_from_the_classic_one_by_where_each_keeps_its_data() {
    let home = TempDir::new().unwrap();
    let app_data_dir = home.path().join("AppData").join("Roaming");
    let local_app_data_dir = home.path().join("AppData").join("Local");
    let env = Env::from_pairs([
        ("APPDATA", app_data_dir.to_str().unwrap()),
        ("LOCALAPPDATA", local_app_data_dir.to_str().unwrap()),
    ]);
    let context = ClientContext::new(env, Platform::Windows, home.path().to_path_buf());
    let store_dir = local_app_data_dir
        .join("Claude-Data")
        .join("anthropicpbc.claude_fnn82j28hfe8t");
    fs::create_dir_all(&store_dir).unwrap();
    fs::create_dir_all(app_data_dir.join("Claude")).unwrap();
    fs::write(
        app_data_dir
            .join("Claude")
            .join(".user-data-left.anthropicpbc.claude_fnn82j28hfe8t"),
        "{}",
    )
    .unwrap();
    let claude_definitions = [
        find_definition("claude-desktop"),
        find_definition("claude-desktop-store"),
    ];
    let summarize = |clients: Vec<usemcpkit_clients::DetectedClient>| {
        clients
            .into_iter()
            .map(|client| (client.definition.id, client.config_path))
            .collect::<Vec<_>>()
    };

    let store_only = summarize(detect_clients(&context, &claude_definitions).unwrap());
    fs::write(app_data_dir.join("Claude").join("config.json"), "{}").unwrap();
    let both = summarize(detect_clients(&context, &claude_definitions).unwrap());

    let store_config = store_dir.join("claude_desktop_config.json");
    assert_eq!(store_only, [("claude-desktop-store", store_config.clone())]);
    assert_eq!(
        both,
        [
            (
                "claude-desktop",
                app_data_dir.join("Claude").join("claude_desktop_config.json")
            ),
            ("claude-desktop-store", store_config),
        ]
    );
}

#[test]
fn reports_unreadable_configs_as_a_problem_instead_of_failing() {
    let home = TempDir::new().unwrap();
    write_config(home.path(), &find_definition("cursor"), "{ broken");

    let detected = detect_clients(&create_context(home.path()), CLIENT_DEFINITIONS).unwrap();

    let problem = detected[0].problem.as_deref().unwrap();
    assert!(problem.contains("invalid JSON"), "{problem}");
}

#[test]
fn creates_the_config_file_with_the_client_specific_entry_shape() {
    let home = TempDir::new().unwrap();
    let definition = find_definition("vscode");
    let path = (definition.config_path)(&create_context(home.path()));

    set_client_entry(&definition, &path, &launch()).unwrap();

    let written: Value = serde_json::from_str(&read(&path)).unwrap();
    assert_eq!(
        written,
        json!({ "servers": { "mcpkit": { "type": "stdio", "command": LAUNCH_COMMAND, "args": ["serve"] } } })
    );
}

#[test]
fn keeps_comments_and_other_keys_backs_up_and_removes_only_its_entry() {
    let home = TempDir::new().unwrap();
    let definition = find_definition("zed");
    let original =
        "{\n  // theme\n  \"theme\": \"One Dark\",\n  \"context_servers\": { \"other\": { \"command\": \"x\" } }\n}\n";
    let path = write_config(home.path(), &definition, original);

    set_client_entry(&definition, &path, &launch()).unwrap();
    let written = read(&path);

    assert!(written.contains("// theme"));
    assert!(written.contains("\"other\""));
    assert!(written.contains("\"enabled\": true"));
    let mut backup = path.clone().into_os_string();
    backup.push(".usemcpkit-backup");
    assert_eq!(read(Path::new(&backup)), original);

    assert!(remove_client_entry(&definition, &path).unwrap());
    let removed = read(&path);
    assert!(!removed.contains("mcpkit"));
    assert!(removed.contains("// theme"));
    assert!(!remove_client_entry(&definition, &path).unwrap());
}

#[test]
fn writes_opencode_commands_as_one_array() {
    let home = TempDir::new().unwrap();
    let definition = find_definition("opencode");
    let path = (definition.config_path)(&create_context(home.path()));

    set_client_entry(&definition, &path, &launch()).unwrap();

    let written: Value = serde_json::from_str(&read(&path)).unwrap();
    assert_eq!(
        written["mcp"]["mcpkit"],
        json!({ "type": "local", "command": [LAUNCH_COMMAND, "serve"], "enabled": true })
    );
}

#[test]
fn appends_the_codex_table_and_replaces_it_in_place_later() {
    let home = TempDir::new().unwrap();
    let codex = find_definition("codex");
    let path = write_config(
        home.path(),
        &codex,
        "model = \"o3\" # pick\n\n[mcp_servers.other]\ncommand = \"x\"\n",
    );

    set_client_entry(&codex, &path, &launch()).unwrap();
    let windows_launch = LaunchCommand {
        command: "C:\\usemcpkit.exe".to_owned(),
        args: vec!["serve".to_owned()],
    };
    set_client_entry(&codex, &path, &windows_launch).unwrap();

    assert_eq!(
        read(&path),
        "model = \"o3\" # pick\n\n[mcp_servers.other]\ncommand = \"x\"\n\n[mcp_servers.mcpkit]\ncommand = \"C:\\\\usemcpkit.exe\"\nargs = [\"serve\"]\n"
    );
}

#[test]
fn keeps_codex_subtables_on_update_and_removes_them_with_the_entry() {
    let home = TempDir::new().unwrap();
    let codex = find_definition("codex");
    let path = write_config(
        home.path(),
        &codex,
        "[mcp_servers.mcpkit]\ncommand = \"old\"\n\n[mcp_servers.mcpkit.env]\nA = \"1\"\n\n[profiles.x]\nmodel = \"y\"\n",
    );

    set_client_entry(&codex, &path, &launch()).unwrap();
    let expected = format!("command = \"{LAUNCH_COMMAND}\"\nargs = [\"serve\"]\n\n[mcp_servers.mcpkit.env]");
    assert!(read(&path).contains(&expected));

    remove_client_entry(&codex, &path).unwrap();
    assert_eq!(read(&path), "[profiles.x]\nmodel = \"y\"\n");
}

#[test]
fn refuses_to_edit_an_inline_codex_table_entry() {
    let home = TempDir::new().unwrap();
    let codex = find_definition("codex");
    let path = write_config(home.path(), &codex, "[mcp_servers]\nmcpkit = { command = \"x\" }\n");

    let error = set_client_entry(&codex, &path, &launch()).unwrap_err();

    assert!(error.0.contains("inline table"), "{error}");
}

#[test]
fn replaces_an_entry_written_under_the_old_usemcpkit_name() {
    let home = TempDir::new().unwrap();
    let definition = find_definition("gemini-cli");
    let path = write_config(
        home.path(),
        &definition,
        r#"{ "mcpServers": { "usemcpkit": { "command": "old" }, "other": {} } }"#,
    );

    let detected = detect_clients(&create_context(home.path()), &[definition]).unwrap();
    assert!(detected[0].has_entry);

    set_client_entry(&definition, &path, &launch()).unwrap();
    let written: Value = serde_json::from_str(&read(&path)).unwrap();
    assert_eq!(written["mcpServers"]["mcpkit"]["command"], LAUNCH_COMMAND);
    assert!(written["mcpServers"].get("usemcpkit").is_none());
    assert!(written["mcpServers"].get("other").is_some());
}

#[test]
fn uninstalls_the_old_usemcpkit_codex_table_with_the_new_one() {
    let home = TempDir::new().unwrap();
    let codex = find_definition("codex");
    let path = write_config(
        home.path(),
        &codex,
        "[mcp_servers.usemcpkit]\ncommand = \"old\"\n\n[mcp_servers.usemcpkit.env]\nA = \"1\"\n\n[mcp_servers.mcpkit]\ncommand = \"new\"\n\n[profiles.x]\nmodel = \"y\"\n",
    );

    assert!(remove_client_entry(&codex, &path).unwrap());
    assert_eq!(read(&path), "[profiles.x]\nmodel = \"y\"\n");
}

#[test]
fn turns_on_claude_code_push_notifications_and_keeps_other_settings() {
    let home = TempDir::new().unwrap();
    let settings = home.path().join(".claude").join("settings.json");
    fs::create_dir_all(settings.parent().unwrap()).unwrap();
    fs::write(
        &settings,
        "{\n  // mine\n  \"model\": \"opus\",\n  \"agentPushNotifEnabled\": false\n}\n",
    )
    .unwrap();

    apply_client_settings(&find_definition("claude-code"), &create_context(home.path())).unwrap();

    let written = read(&settings);
    assert!(written.contains("// mine"));
    assert!(written.contains("\"model\": \"opus\""));
    assert!(written.contains("\"agentPushNotifEnabled\": true"));
}

#[test]
fn creates_claude_code_settings_and_leaves_a_file_that_already_has_them() {
    let home = TempDir::new().unwrap();
    let context = create_context(home.path());
    let settings = home.path().join(".claude").join("settings.json");

    apply_client_settings(&find_definition("claude-code"), &context).unwrap();
    let written: Value = serde_json::from_str(&read(&settings)).unwrap();
    assert_eq!(written, json!({ "agentPushNotifEnabled": true }));

    apply_client_settings(&find_definition("claude-code"), &context).unwrap();
    let mut backup = settings.clone().into_os_string();
    backup.push(".usemcpkit-backup");
    assert!(!Path::new(&backup).exists());
}

#[test]
fn sets_no_settings_for_a_client_without_any() {
    let home = TempDir::new().unwrap();

    apply_client_settings(&find_definition("cursor"), &create_context(home.path())).unwrap();

    assert!(fs::read_dir(home.path()).unwrap().next().is_none());
}
