import { packagesContainerRegistryCreateContainerRegistryEventEvents } from './create-container-registry-event-events';
import { packagesContainerRegistryDeleteProjectsRegistryRepositories } from './delete-projects-registry-repositories';
import { packagesContainerRegistryDeleteProjectsRegistryRepositoriesTags } from './delete-projects-registry-repositories-tags';
import { packagesContainerRegistryDeleteProjectsRegistryRepositoriesTagsDelete } from './delete-projects-registry-repositories-tags-delete';
import { packagesContainerRegistryGetProjectsRegistryRepositoriesTags } from './get-projects-registry-repositories-tags';
import { packagesContainerRegistryGetRegistryRepositories } from './get-registry-repositories';
import { packagesContainerRegistryListGroupsRegistryRepositories } from './list-groups-registry-repositories';
import { packagesContainerRegistryListProjectsRegistryRepositories } from './list-projects-registry-repositories';
import { packagesContainerRegistryListProjectsRegistryRepositoriesTags } from './list-projects-registry-repositories-tags';

export const packagesContainerRegistryTools = [
  packagesContainerRegistryCreateContainerRegistryEventEvents,
  packagesContainerRegistryDeleteProjectsRegistryRepositories,
  packagesContainerRegistryDeleteProjectsRegistryRepositoriesTags,
  packagesContainerRegistryDeleteProjectsRegistryRepositoriesTagsDelete,
  packagesContainerRegistryGetProjectsRegistryRepositoriesTags,
  packagesContainerRegistryGetRegistryRepositories,
  packagesContainerRegistryListGroupsRegistryRepositories,
  packagesContainerRegistryListProjectsRegistryRepositories,
  packagesContainerRegistryListProjectsRegistryRepositoriesTags,
];
