use mcpkit_registry::SyncReport;

pub fn describe_sync_report(report: &SyncReport) -> Vec<String> {
    std::iter::once(format!("{} server(s) in the registry", report.servers))
        .chain(report.refreshed.iter().map(|id| format!("updated {id}")))
        .chain(
            report
                .failed
                .iter()
                .map(|failure| format!("failed {}: {}", failure.id, failure.error)),
        )
        .collect()
}

#[cfg(test)]
mod tests {
    use super::describe_sync_report;
    use mcpkit_registry::{SyncFailure, SyncReport};

    #[test]
    fn counts_the_servers_then_lists_what_changed_and_failed() {
        let report = SyncReport {
            servers: 3,
            refreshed: vec!["git:github/repos".to_owned()],
            failed: vec![SyncFailure {
                id: "atlassian:jira".to_owned(),
                error: "offline".to_owned(),
            }],
        };

        assert_eq!(
            describe_sync_report(&report),
            [
                "3 server(s) in the registry",
                "updated git:github/repos",
                "failed atlassian:jira: offline"
            ]
        );
    }
}
