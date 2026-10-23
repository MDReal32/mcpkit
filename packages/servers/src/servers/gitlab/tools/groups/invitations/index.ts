import { groupsInvitationsCreateGroupsInvitations } from "./create-groups-invitations";
import { groupsInvitationsCreateProjectsInvitations } from "./create-projects-invitations";
import { groupsInvitationsDeleteGroupsInvitations } from "./delete-groups-invitations";
import { groupsInvitationsDeleteProjectsInvitations } from "./delete-projects-invitations";
import { groupsInvitationsListGroupsInvitations } from "./list-groups-invitations";
import { groupsInvitationsListProjectsInvitations } from "./list-projects-invitations";
import { groupsInvitationsUpdateGroupsInvitations } from "./update-groups-invitations";
import { groupsInvitationsUpdateProjectsInvitations } from "./update-projects-invitations";

export const groupsInvitationsTools = [
  groupsInvitationsCreateGroupsInvitations,
  groupsInvitationsCreateProjectsInvitations,
  groupsInvitationsDeleteGroupsInvitations,
  groupsInvitationsDeleteProjectsInvitations,
  groupsInvitationsListGroupsInvitations,
  groupsInvitationsListProjectsInvitations,
  groupsInvitationsUpdateGroupsInvitations,
  groupsInvitationsUpdateProjectsInvitations,
];
