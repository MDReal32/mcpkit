import { groupsAccessRequestsCreateGroupsAccessRequests } from './create-groups-access-requests';
import { groupsAccessRequestsCreateProjectsAccessRequests } from './create-projects-access-requests';
import { groupsAccessRequestsDeleteGroupsAccessRequests } from './delete-groups-access-requests';
import { groupsAccessRequestsDeleteProjectsAccessRequests } from './delete-projects-access-requests';
import { groupsAccessRequestsListGroupsAccessRequests } from './list-groups-access-requests';
import { groupsAccessRequestsListProjectsAccessRequests } from './list-projects-access-requests';
import { groupsAccessRequestsUpdateGroupsAccessRequestsApprove } from './update-groups-access-requests-approve';
import { groupsAccessRequestsUpdateProjectsAccessRequestsApprove } from './update-projects-access-requests-approve';

export const groupsAccessRequestsTools = [
  groupsAccessRequestsCreateGroupsAccessRequests,
  groupsAccessRequestsCreateProjectsAccessRequests,
  groupsAccessRequestsDeleteGroupsAccessRequests,
  groupsAccessRequestsDeleteProjectsAccessRequests,
  groupsAccessRequestsListGroupsAccessRequests,
  groupsAccessRequestsListProjectsAccessRequests,
  groupsAccessRequestsUpdateGroupsAccessRequestsApprove,
  groupsAccessRequestsUpdateProjectsAccessRequestsApprove,
];
