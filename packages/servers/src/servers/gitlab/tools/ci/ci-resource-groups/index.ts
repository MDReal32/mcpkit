import { ciCiResourceGroupsGetProjectsResourceGroups } from "./get-projects-resource-groups";
import { ciCiResourceGroupsGetProjectsResourceGroupsCurrentJob } from "./get-projects-resource-groups-current-job";
import { ciCiResourceGroupsListProjectsResourceGroups } from "./list-projects-resource-groups";
import { ciCiResourceGroupsListProjectsResourceGroupsUpcomingJobs } from "./list-projects-resource-groups-upcoming-jobs";
import { ciCiResourceGroupsUpdateProjectsResourceGroups } from "./update-projects-resource-groups";

export const ciCiResourceGroupsTools = [
  ciCiResourceGroupsGetProjectsResourceGroups,
  ciCiResourceGroupsGetProjectsResourceGroupsCurrentJob,
  ciCiResourceGroupsListProjectsResourceGroups,
  ciCiResourceGroupsListProjectsResourceGroupsUpcomingJobs,
  ciCiResourceGroupsUpdateProjectsResourceGroups,
];
