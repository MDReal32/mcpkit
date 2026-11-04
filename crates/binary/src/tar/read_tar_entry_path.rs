use crate::tar::consts::{TAR_NAME_FIELD, TAR_PREFIX_FIELD};
use crate::tar::read_tar_string::read_tar_string;

pub fn read_tar_entry_path(header: &[u8]) -> String {
    let name = read_tar_string(header, TAR_NAME_FIELD);
    let prefix = read_tar_string(header, TAR_PREFIX_FIELD);
    if prefix.is_empty() {
        return name;
    }
    format!("{prefix}/{name}")
}
