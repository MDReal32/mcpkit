import { LAUNCH_AGENT_LABEL } from "../const";
import { runSchedulerCommand } from "../run-scheduler-command";
import { toLaunchdDomain } from "./to-launchd-domain";

export const isLaunchAgentLoaded = async () =>
  (await runSchedulerCommand("launchctl", ["print", `${toLaunchdDomain()}/${LAUNCH_AGENT_LABEL}`])).exitCode === 0;
