import { softwareBacklogTools } from "./backlog";
import { softwareBoardTools } from "./board";
import { softwareEpicTools } from "./epic";
import { softwareIssueTools } from "./issue";
import { softwareSprintTools } from "./sprint";

export const softwareGroupTools = [
  ...softwareBacklogTools,
  ...softwareBoardTools,
  ...softwareEpicTools,
  ...softwareIssueTools,
  ...softwareSprintTools,
];
