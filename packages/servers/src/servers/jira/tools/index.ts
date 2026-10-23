import { administrationGroupTools } from "./administration";
import { appsGroupTools } from "./apps";
import { collaborationGroupTools } from "./collaboration";
import { fieldsGroupTools } from "./fields";
import { issuesGroupTools } from "./issues";
import { projectsGroupTools } from "./projects";
import { softwareGroupTools } from "./software";
import { usersGroupTools } from "./users";
import { workflowsGroupTools } from "./workflows";

export const jiraTools = [
  ...issuesGroupTools,
  ...projectsGroupTools,
  ...usersGroupTools,
  ...workflowsGroupTools,
  ...fieldsGroupTools,
  ...collaborationGroupTools,
  ...administrationGroupTools,
  ...appsGroupTools,
  ...softwareGroupTools,
];
