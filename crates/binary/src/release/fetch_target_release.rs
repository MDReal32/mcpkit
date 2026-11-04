use crate::binary_context::BinaryContext;
use crate::binary_error::BinaryError;
use crate::platform::to_platform_package_name;
use crate::release::fetch_package_release::fetch_package_release;
use crate::release::package_release::PackageRelease;
use crate::release::resolve_npm_registry::resolve_npm_registry;

pub async fn fetch_target_release(
    context: &BinaryContext,
    version_or_tag: &str,
) -> Result<PackageRelease, BinaryError> {
    fetch_package_release(
        &resolve_npm_registry(&context.env),
        &to_platform_package_name(context.target),
        version_or_tag,
        context.http.as_ref(),
    )
    .await
}
