import { filesGroupTools } from "./files";
import { libraryGroupTools } from "./library";
import { projectsGroupTools } from "./projects";
import { usersGroupTools } from "./users";
import { webhooksGroupTools } from "./webhooks";

export const figmaTools = [
  ...filesGroupTools,
  ...libraryGroupTools,
  ...projectsGroupTools,
  ...usersGroupTools,
  ...webhooksGroupTools,
];
