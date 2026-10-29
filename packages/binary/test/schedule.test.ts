import { describe, expect, it } from "vitest";
import { CRON_MARKER, CRON_SCHEDULE } from "../src/schedule/const";
import { buildCronLine } from "../src/schedule/cron/build-cron-line";
import { quoteShellArg } from "../src/schedule/cron/quote-shell-arg";
import { replaceCronEntry } from "../src/schedule/cron/replace-cron-entry";
import { buildLaunchAgentPlist } from "../src/schedule/launchd/build-launch-agent-plist";
import { toSchedulerPlatform } from "../src/schedule/to-scheduler-platform";
import type { UpgradeSchedule } from "../src/schedule/types/upgrade-schedule";

const schedule: UpgradeSchedule = {
  binaryPath: "/home/me/.mcpkit/bin/mcpkit",
  logPath: "/home/me/.mcpkit/upgrade.log",
};

describe("scheduled upgrade", () => {
  it("picks the scheduler of each platform", () => {
    expect(toSchedulerPlatform("darwin-arm64")).toBe("launchd");
    expect(toSchedulerPlatform("windows-x64")).toBe("task-scheduler");
    expect(toSchedulerPlatform("linux-x64-musl")).toBe("cron");
  });

  it("quotes paths for the shell cron runs", () => {
    expect(quoteShellArg("/a b/it's")).toBe(`'/a b/it'\\''s'`);
  });

  it("runs upgrade on the installed binary and appends its output to the log", () => {
    expect(buildCronLine(schedule)).toBe(
      `${CRON_SCHEDULE} '/home/me/.mcpkit/bin/mcpkit' 'upgrade' >> '/home/me/.mcpkit/upgrade.log' 2>&1 ${CRON_MARKER}`,
    );
  });

  it("adds its crontab line once and keeps the user's own lines", () => {
    const line = buildCronLine(schedule);
    const own = "0 9 * * 1 backup.sh\n";

    const added = replaceCronEntry(own, line);
    expect(added).toBe(`0 9 * * 1 backup.sh\n${line}\n`);
    expect(replaceCronEntry(added, line)).toBe(added);
    expect(replaceCronEntry(`${line}\n`, buildCronLine({ ...schedule, binaryPath: "/new/mcpkit" }))).toBe(
      `${buildCronLine({ ...schedule, binaryPath: "/new/mcpkit" })}\n`,
    );
  });

  it("removes only its own crontab line", () => {
    const own = "0 9 * * 1 backup.sh";

    expect(replaceCronEntry(`${own}\n${buildCronLine(schedule)}\n`, undefined)).toBe(`${own}\n`);
    expect(replaceCronEntry(`${buildCronLine(schedule)}\n`, undefined)).toBe("");
  });

  it("writes a LaunchAgent that runs upgrade every six hours with escaped paths", () => {
    const plist = buildLaunchAgentPlist({ ...schedule, binaryPath: "/Users/a&b/.mcpkit/bin/mcpkit" });

    expect(plist).toContain("<string>/Users/a&amp;b/.mcpkit/bin/mcpkit</string>\n    <string>upgrade</string>");
    expect(plist).toContain("<key>StartInterval</key>\n  <integer>21600</integer>");
    expect(plist).toContain("<key>StandardOutPath</key>\n  <string>/home/me/.mcpkit/upgrade.log</string>");
  });
});
