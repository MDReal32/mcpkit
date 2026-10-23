import { groupsMembersCreateGroupsMembers } from "./create-groups-members";
import { groupsMembersCreateGroupsMembersApproveAll } from "./create-groups-members-approve-all";
import { groupsMembersCreateGroupsMembersOverride } from "./create-groups-members-override";
import { groupsMembersCreateProjectsMembers } from "./create-projects-members";
import { groupsMembersDeleteGroupsBillableMembers } from "./delete-groups-billable-members";
import { groupsMembersDeleteGroupsMembers } from "./delete-groups-members";
import { groupsMembersDeleteGroupsMembersOverride } from "./delete-groups-members-override";
import { groupsMembersDeleteProjectsMembers } from "./delete-projects-members";
import { groupsMembersGetGroupsMembers } from "./get-groups-members";
import { groupsMembersGetGroupsMembersAll } from "./get-groups-members-all";
import { groupsMembersGetProjectsMembers } from "./get-projects-members";
import { groupsMembersGetProjectsMembersAll } from "./get-projects-members-all";
import { groupsMembersListGroupsBillableMembersIndirect } from "./list-groups-billable-members-indirect";
import { groupsMembersListGroupsBillableMembersMemberships } from "./list-groups-billable-members-memberships";
import { groupsMembersListGroupsMembers } from "./list-groups-members";
import { groupsMembersListGroupsMembersAll } from "./list-groups-members-all";
import { groupsMembersListGroupsPendingMembers } from "./list-groups-pending-members";
import { groupsMembersListProjectsMembers } from "./list-projects-members";
import { groupsMembersListProjectsMembersAll } from "./list-projects-members-all";
import { groupsMembersUpdateGroupsMembers } from "./update-groups-members";
import { groupsMembersUpdateGroupsMembersApprove } from "./update-groups-members-approve";
import { groupsMembersUpdateGroupsMembersState } from "./update-groups-members-state";
import { groupsMembersUpdateProjectsMembers } from "./update-projects-members";

export const groupsMembersTools = [
  groupsMembersCreateGroupsMembers,
  groupsMembersCreateGroupsMembersApproveAll,
  groupsMembersCreateGroupsMembersOverride,
  groupsMembersCreateProjectsMembers,
  groupsMembersDeleteGroupsBillableMembers,
  groupsMembersDeleteGroupsMembers,
  groupsMembersDeleteGroupsMembersOverride,
  groupsMembersDeleteProjectsMembers,
  groupsMembersGetGroupsMembers,
  groupsMembersGetGroupsMembersAll,
  groupsMembersGetProjectsMembers,
  groupsMembersGetProjectsMembersAll,
  groupsMembersListGroupsBillableMembersIndirect,
  groupsMembersListGroupsBillableMembersMemberships,
  groupsMembersListGroupsMembers,
  groupsMembersListGroupsMembersAll,
  groupsMembersListGroupsPendingMembers,
  groupsMembersListProjectsMembers,
  groupsMembersListProjectsMembersAll,
  groupsMembersUpdateGroupsMembers,
  groupsMembersUpdateGroupsMembersApprove,
  groupsMembersUpdateGroupsMembersState,
  groupsMembersUpdateProjectsMembers,
];
