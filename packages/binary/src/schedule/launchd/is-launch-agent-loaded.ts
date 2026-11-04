import { runSchedulerCommand } from "../run-scheduler-command";
import { toLaunchdDomain } from "./to-launchd-domain";

export const isLaunchAgentLoaded = async (label: string) =>
  (await runSchedulerCommand("launchctl", ["print", `${toLaunchdDomain()}/${label}`])).exitCode === 0;
