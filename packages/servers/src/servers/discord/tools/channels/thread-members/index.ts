import { channelsThreadMembersAddThreadMember } from "./add-thread-member";
import { channelsThreadMembersDeleteThreadMember } from "./delete-thread-member";
import { channelsThreadMembersGetThreadMember } from "./get-thread-member";
import { channelsThreadMembersJoinThread } from "./join-thread";
import { channelsThreadMembersLeaveThread } from "./leave-thread";
import { channelsThreadMembersListThreadMembers } from "./list-thread-members";

export const channelsThreadMembersTools = [
  channelsThreadMembersAddThreadMember,
  channelsThreadMembersDeleteThreadMember,
  channelsThreadMembersGetThreadMember,
  channelsThreadMembersJoinThread,
  channelsThreadMembersLeaveThread,
  channelsThreadMembersListThreadMembers,
];
