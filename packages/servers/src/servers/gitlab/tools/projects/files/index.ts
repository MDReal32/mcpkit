import { projectsFilesCreateProjectsRepositoryFiles } from "./create-projects-repository-files";
import { projectsFilesDeleteProjectsRepositoryFiles } from "./delete-projects-repository-files";
import { projectsFilesGetProjectsRepositoryFiles } from "./get-projects-repository-files";
import { projectsFilesGetProjectsRepositoryFilesBlame } from "./get-projects-repository-files-blame";
import { projectsFilesGetProjectsRepositoryFilesRaw } from "./get-projects-repository-files-raw";
import { projectsFilesUpdateProjectsRepositoryFiles } from "./update-projects-repository-files";

export const projectsFilesTools = [
  projectsFilesCreateProjectsRepositoryFiles,
  projectsFilesDeleteProjectsRepositoryFiles,
  projectsFilesGetProjectsRepositoryFiles,
  projectsFilesGetProjectsRepositoryFilesBlame,
  projectsFilesGetProjectsRepositoryFilesRaw,
  projectsFilesUpdateProjectsRepositoryFiles,
];
