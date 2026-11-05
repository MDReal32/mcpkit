import { projectsFoldersTools } from "./folders";
import { projectsProjectsTools } from "./projects";
import { projectsVariablesTools } from "./variables";

export const projectsGroupTools = [...projectsFoldersTools, ...projectsProjectsTools, ...projectsVariablesTools];
