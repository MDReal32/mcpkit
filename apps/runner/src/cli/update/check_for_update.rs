use crate::cli::consts::VERSION;
use crate::cli::update::now_ms::now_ms;
use usemcpkit_binary::{BinaryContext, BinaryUpdateResult, auto_update_binary};

/// A failed update check is logged to stderr and never affects serving. The new server is picked up by the supervisor
/// right away; the new runner takes over the next time a client starts usemcpkit.
pub async fn check_for_update(context: &BinaryContext) {
    match auto_update_binary(context, VERSION, now_ms()).await {
        Ok(Some(BinaryUpdateResult::Updated { from, to, .. })) => {
            eprintln!("usemcpkit: updated {from} -> {to}; reloading the server now");
        }
        Ok(_) => {}
        Err(error) => eprintln!("usemcpkit: update check failed: {error}"),
    }
}
