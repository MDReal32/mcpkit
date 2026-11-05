use crate::platform::consts::PLATFORM_PACKAGE_PREFIX;
use crate::platform::target::Target;

pub fn to_platform_package_name(target: Target) -> String {
    format!("{PLATFORM_PACKAGE_PREFIX}{}", target.name())
}
