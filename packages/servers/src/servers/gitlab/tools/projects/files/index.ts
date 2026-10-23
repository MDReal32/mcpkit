import { projectsFilesDeleteProjectsRepositoryFiles } from "./delete-projects-repository-files";
import { projectsFilesGetProjectsRepositoryFiles } from "./get-projects-repository-files";
import { projectsFilesGetProjectsRepositoryFilesBlame } from "./get-projects-repository-files-blame";
import { projectsFilesGetProjectsRepositoryFilesRaw } from "./get-projects-repository-files-raw";

export const projectsFilesTools = [
  projectsFilesDeleteProjectsRepositoryFiles,
  projectsFilesGetProjectsRepositoryFiles,
  projectsFilesGetProjectsRepositoryFilesBlame,
  projectsFilesGetProjectsRepositoryFilesRaw,
];
