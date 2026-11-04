use std::path::PathBuf;
use usemcpkit_binary::platform::Target;
use usemcpkit_binary::schedule::{
    CRON_MARKER, CRON_SCHEDULE, SchedulerPlatform, UpgradeSchedule, build_cron_line, build_launch_agent_plist,
    quote_shell_arg, replace_cron_entry, to_scheduler_platform,
};

fn schedule() -> UpgradeSchedule {
    UpgradeSchedule {
        binary_path: PathBuf::from("/home/me/.usemcpkit/bin/usemcpkit"),
        log_path: PathBuf::from("/home/me/.usemcpkit/upgrade.log"),
    }
}

fn with_binary(binary_path: &str) -> UpgradeSchedule {
    UpgradeSchedule {
        binary_path: PathBuf::from(binary_path),
        ..schedule()
    }
}

#[test]
fn picks_the_scheduler_of_each_platform() {
    assert_eq!(to_scheduler_platform(Target::DarwinArm64), SchedulerPlatform::Launchd);
    assert_eq!(
        to_scheduler_platform(Target::WindowsX64),
        SchedulerPlatform::TaskScheduler
    );
    assert_eq!(to_scheduler_platform(Target::LinuxX64Musl), SchedulerPlatform::Cron);
}

#[test]
fn quotes_paths_for_the_shell_cron_runs() {
    assert_eq!(quote_shell_arg("/a b/it's"), r"'/a b/it'\''s'");
}

#[test]
fn runs_upgrade_on_the_installed_binary_and_appends_its_output_to_the_log() {
    assert_eq!(
        build_cron_line(&schedule()),
        format!(
            "{CRON_SCHEDULE} '/home/me/.usemcpkit/bin/usemcpkit' 'upgrade' >> '/home/me/.usemcpkit/upgrade.log' 2>&1 {CRON_MARKER}"
        )
    );
}

#[test]
fn adds_its_crontab_line_once_and_keeps_the_users_own_lines() {
    let line = build_cron_line(&schedule());
    let moved = build_cron_line(&with_binary("/new/usemcpkit"));

    let added = replace_cron_entry("0 9 * * 1 backup.sh\n", Some(&line));

    assert_eq!(added, format!("0 9 * * 1 backup.sh\n{line}\n"));
    assert_eq!(replace_cron_entry(&added, Some(&line)), added);
    assert_eq!(
        replace_cron_entry(&format!("{line}\n"), Some(&moved)),
        format!("{moved}\n")
    );
}

#[test]
fn removes_only_its_own_crontab_line() {
    let own = "0 9 * * 1 backup.sh";
    let line = build_cron_line(&schedule());

    assert_eq!(
        replace_cron_entry(&format!("{own}\n{line}\n"), None),
        format!("{own}\n")
    );
    assert_eq!(replace_cron_entry(&format!("{line}\n"), None), "");
}

#[test]
fn writes_a_launch_agent_that_runs_upgrade_every_six_hours_with_escaped_paths() {
    let plist = build_launch_agent_plist(&with_binary("/Users/a&b/.usemcpkit/bin/usemcpkit"));

    assert!(plist.contains("<string>/Users/a&amp;b/.usemcpkit/bin/usemcpkit</string>\n    <string>upgrade</string>"));
    assert!(plist.contains("<key>StartInterval</key>\n  <integer>21600</integer>"));
    assert!(plist.contains("<key>StandardOutPath</key>\n  <string>/home/me/.usemcpkit/upgrade.log</string>"));
}
