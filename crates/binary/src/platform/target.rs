/// A machine a binary is built for, named as its npm package is (`@usemcpkit/cli-<name>`).
#[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
pub enum Target {
    LinuxX64,
    LinuxArm64,
    LinuxX64Musl,
    LinuxArm64Musl,
    DarwinX64,
    DarwinArm64,
    WindowsX64,
}

impl Target {
    pub const ALL: [Target; 7] = [
        Target::LinuxX64,
        Target::LinuxArm64,
        Target::LinuxX64Musl,
        Target::LinuxArm64Musl,
        Target::DarwinX64,
        Target::DarwinArm64,
        Target::WindowsX64,
    ];

    pub fn name(self) -> &'static str {
        match self {
            Target::LinuxX64 => "linux-x64",
            Target::LinuxArm64 => "linux-arm64",
            Target::LinuxX64Musl => "linux-x64-musl",
            Target::LinuxArm64Musl => "linux-arm64-musl",
            Target::DarwinX64 => "darwin-x64",
            Target::DarwinArm64 => "darwin-arm64",
            Target::WindowsX64 => "windows-x64",
        }
    }

    pub fn from_name(name: &str) -> Option<Target> {
        Target::ALL.into_iter().find(|target| target.name() == name)
    }
}
