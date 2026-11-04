import { assertSchedulerSuccess } from "../assert-scheduler-success";
import { runSchedulerCommand } from "../run-scheduler-command";
import { isLaunchAgentLoaded } from "./is-launch-agent-loaded";
import { toLaunchdDomain } from "./to-launchd-domain";

export const unloadLaunchAgent = async (path: string, label: string) => {
  if (!(await isLaunchAgentLoaded(label))) {
    return;
  }
  assertSchedulerSuccess(
    await runSchedulerCommand("launchctl", ["bootout", toLaunchdDomain(), path]),
    "launchctl bootout",
  );
};
