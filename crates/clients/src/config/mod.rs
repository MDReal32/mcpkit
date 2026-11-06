/// A port of the parts of jsonc-parser 3.3.1 (`parseTree`, `modify` with formatting, `applyEdits`) the client configs
/// are edited with, so a file comes out byte for byte as the TypeScript CLI writes it.
mod jsonc;
mod toml;

mod find_json_value;
mod has_json_bool;
mod has_json_entry;
mod parse_json_config;
mod read_config_text;
mod remove_json_entry;
mod set_json_value;
mod upsert_json_entry;
mod with_file_suffix;
mod write_config_text;
mod write_new_file;

pub use find_json_value::find_json_value;
pub use has_json_bool::has_json_bool;
pub use has_json_entry::has_json_entry;
pub use jsonc::JsonTree;
pub use parse_json_config::parse_json_config;
pub use read_config_text::read_config_text;
pub use remove_json_entry::remove_json_entry;
pub use set_json_value::set_json_value;
pub use toml::{format_toml_value, has_toml_table, remove_toml_table, upsert_toml_table};
pub use upsert_json_entry::upsert_json_entry;
pub use write_config_text::write_config_text;
