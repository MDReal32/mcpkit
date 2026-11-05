import { credentialsGroupTools } from "./credentials";
import { data_tablesGroupTools } from "./data_tables";
import { instanceGroupTools } from "./instance";
import { projectsGroupTools } from "./projects";
import { settingsGroupTools } from "./settings";
import { usersGroupTools } from "./users";
import { workflowsGroupTools } from "./workflows";

export const n8nTools = [
  ...workflowsGroupTools,
  ...credentialsGroupTools,
  ...data_tablesGroupTools,
  ...projectsGroupTools,
  ...usersGroupTools,
  ...settingsGroupTools,
  ...instanceGroupTools,
];
