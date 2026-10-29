import { LAUNCH_AGENT_LABEL, UPGRADE_ARGS, UPGRADE_INTERVAL_HOURS } from "../const";
import type { UpgradeSchedule } from "../types/upgrade-schedule";
import { escapeXml } from "./escape-xml";

const SECONDS_PER_HOUR = 3600;

export const buildLaunchAgentPlist = (schedule: UpgradeSchedule) => {
  const args = [schedule.binaryPath, ...UPGRADE_ARGS].map((arg) => `    <string>${escapeXml(arg)}</string>`);
  return `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key>
  <string>${LAUNCH_AGENT_LABEL}</string>
  <key>ProgramArguments</key>
  <array>
${args.join("\n")}
  </array>
  <key>StartInterval</key>
  <integer>${UPGRADE_INTERVAL_HOURS * SECONDS_PER_HOUR}</integer>
  <key>RunAtLoad</key>
  <false/>
  <key>StandardOutPath</key>
  <string>${escapeXml(schedule.logPath)}</string>
  <key>StandardErrorPath</key>
  <string>${escapeXml(schedule.logPath)}</string>
</dict>
</plist>
`;
};
