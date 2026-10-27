import { adminGroupTools } from "./admin";
import { chatGroupTools } from "./chat";
import { docsGroupTools } from "./docs";
import { goalsGroupTools } from "./goals";
import { hierarchyGroupTools } from "./hierarchy";
import { tasksGroupTools } from "./tasks";
import { timeGroupTools } from "./time";
import { usersGroupTools } from "./users";

export const clickupTools = [
  ...tasksGroupTools,
  ...hierarchyGroupTools,
  ...timeGroupTools,
  ...goalsGroupTools,
  ...usersGroupTools,
  ...chatGroupTools,
  ...docsGroupTools,
  ...adminGroupTools,
];
