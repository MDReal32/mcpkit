/// What Windows tries when `PATHEXT` is not set.
pub const WINDOWS_DEFAULT_PATH_EXTENSIONS: &str = ".COM;.EXE;.BAT;.CMD";

/// `CREATE_NO_WINDOW`: a console program started by a server that has no console would otherwise open a window.
#[cfg(windows)]
pub const CREATE_NO_WINDOW: u32 = 0x0800_0000;
