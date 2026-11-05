import { instanceSourceControlGetSourceControlStatus } from "./get-source-control-status";
import { instanceSourceControlPullSourceControl } from "./pull-source-control";
import { instanceSourceControlPushSourceControl } from "./push-source-control";

export const instanceSourceControlTools = [
  instanceSourceControlGetSourceControlStatus,
  instanceSourceControlPullSourceControl,
  instanceSourceControlPushSourceControl,
];
