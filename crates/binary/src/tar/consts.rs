use crate::tar::tar_field::TarField;

pub const TAR_BLOCK_SIZE: usize = 512;

pub const TAR_NAME_FIELD: TarField = TarField { offset: 0, length: 100 };

pub const TAR_SIZE_FIELD: TarField = TarField {
    offset: 124,
    length: 12,
};

pub const TAR_TYPE_OFFSET: usize = 156;

pub const TAR_PREFIX_FIELD: TarField = TarField {
    offset: 345,
    length: 155,
};

/// Regular-file type flags: `0` and the pre-POSIX NUL.
pub const TAR_FILE_TYPES: &[u8] = &[0x30, 0x00];
