use crate::schedule::consts::{LAUNCH_AGENT_LABEL, SECONDS_PER_HOUR, UPGRADE_ARGS, UPGRADE_INTERVAL_HOURS};
use crate::schedule::launchd::escape_xml::escape_xml;
use crate::schedule::upgrade_schedule::UpgradeSchedule;

pub fn build_launch_agent_plist(schedule: &UpgradeSchedule) -> String {
    let binary_path = schedule.binary_path.to_string_lossy();
    let args = std::iter::once(binary_path.as_ref())
        .chain(UPGRADE_ARGS.iter().copied())
        .map(|arg| format!("    <string>{}</string>", escape_xml(arg)))
        .collect::<Vec<_>>()
        .join("\n");
    let log_path = escape_xml(&schedule.log_path.to_string_lossy());
    let interval = UPGRADE_INTERVAL_HOURS * SECONDS_PER_HOUR;
    format!(
        r#"<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key>
  <string>{LAUNCH_AGENT_LABEL}</string>
  <key>ProgramArguments</key>
  <array>
{args}
  </array>
  <key>StartInterval</key>
  <integer>{interval}</integer>
  <key>RunAtLoad</key>
  <false/>
  <key>StandardOutPath</key>
  <string>{log_path}</string>
  <key>StandardErrorPath</key>
  <string>{log_path}</string>
</dict>
</plist>
"#
    )
}
