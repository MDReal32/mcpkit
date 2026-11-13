/// The note shown for an OpenAPI server whose tools were not built for its host yet.
pub fn describe_unbuilt_server(server_id: &str) -> String {
    format!(
        "{server_id}: its tools are built from the OpenAPI document of the version its host runs, which has not \
happened yet; codemode.tools(\"{server_id}\") signs in and builds them"
    )
}
