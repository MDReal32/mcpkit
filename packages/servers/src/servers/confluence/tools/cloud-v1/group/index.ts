import { cloudV1GroupAddUserToGroupByGroupId } from "./add-user-to-group-by-group-id";
import { cloudV1GroupCreateGroup } from "./create-group";
import { cloudV1GroupGetGroupByGroupId } from "./get-group-by-group-id";
import { cloudV1GroupGetGroupMembersByGroupId } from "./get-group-members-by-group-id";
import { cloudV1GroupGetGroups } from "./get-groups";
import { cloudV1GroupRemoveGroupById } from "./remove-group-by-id";
import { cloudV1GroupRemoveMemberFromGroupByGroupId } from "./remove-member-from-group-by-group-id";
import { cloudV1GroupSearchGroups } from "./search-groups";

export const cloudV1GroupTools = [
  cloudV1GroupAddUserToGroupByGroupId,
  cloudV1GroupCreateGroup,
  cloudV1GroupGetGroupByGroupId,
  cloudV1GroupGetGroupMembersByGroupId,
  cloudV1GroupGetGroups,
  cloudV1GroupRemoveGroupById,
  cloudV1GroupRemoveMemberFromGroupByGroupId,
  cloudV1GroupSearchGroups,
];
