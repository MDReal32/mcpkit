use crate::platform::npm_platform::NpmPlatform;
use crate::platform::target::Target;

pub fn to_npm_platform(target: Target) -> NpmPlatform {
    let mut parts = target.name().split('-');
    let system = parts.next().unwrap_or_default();
    let cpu = parts.next().unwrap_or_default();
    let libc = parts.next();
    let os = if system == "windows" { "win32" } else { system };
    let linux_libc = if libc == Some("musl") { "musl" } else { "glibc" };
    NpmPlatform {
        os,
        cpu,
        libc: (system == "linux").then_some(linux_libc),
    }
}
