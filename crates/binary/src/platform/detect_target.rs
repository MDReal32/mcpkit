use crate::platform::target::Target;

/// The target this binary was compiled for, or `None` when no release is built for it. Read at compile time, where
/// the TypeScript CLI looked at `process.platform`, `process.arch` and the musl loader in `/lib`.
pub fn detect_target() -> Option<Target> {
    let os = std::env::consts::OS;
    let arch = std::env::consts::ARCH;
    let musl = cfg!(target_env = "musl");
    match (os, arch, musl) {
        ("linux", "x86_64", false) => Some(Target::LinuxX64),
        ("linux", "aarch64", false) => Some(Target::LinuxArm64),
        ("linux", "x86_64", true) => Some(Target::LinuxX64Musl),
        ("linux", "aarch64", true) => Some(Target::LinuxArm64Musl),
        ("macos", "x86_64", _) => Some(Target::DarwinX64),
        ("macos", "aarch64", _) => Some(Target::DarwinArm64),
        ("windows", "x86_64", _) => Some(Target::WindowsX64),
        _ => None,
    }
}
