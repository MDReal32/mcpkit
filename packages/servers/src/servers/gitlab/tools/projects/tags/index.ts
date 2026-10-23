import { projectsTagsCreateProjectsRepositoryTags } from './create-projects-repository-tags';
import { projectsTagsDeleteProjectsRepositoryTags } from './delete-projects-repository-tags';
import { projectsTagsGetProjectsRepositoryTags } from './get-projects-repository-tags';
import { projectsTagsGetProjectsRepositoryTagsSignature } from './get-projects-repository-tags-signature';
import { projectsTagsListProjectsRepositoryTags } from './list-projects-repository-tags';

export const projectsTagsTools = [
  projectsTagsCreateProjectsRepositoryTags,
  projectsTagsDeleteProjectsRepositoryTags,
  projectsTagsGetProjectsRepositoryTags,
  projectsTagsGetProjectsRepositoryTagsSignature,
  projectsTagsListProjectsRepositoryTags,
];
