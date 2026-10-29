import { assertSchedulerSuccess } from "../assert-scheduler-success";
import { runSchedulerCommand } from "../run-scheduler-command";
import { isLaunchAgentLoaded } from "./is-launch-agent-loaded";
import { toLaunchdDomain } from "./to-launchd-domain";

export const unloadLaunchAgent = async (path: string) => {
  if (!(await isLaunchAgentLoaded())) {
    return;
  }
  assertSchedulerSuccess(
    await runSchedulerCommand("launchctl", ["bootout", toLaunchdDomain(), path]),
    "launchctl bootout",
  );
};
