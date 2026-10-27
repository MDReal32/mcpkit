import { lobbiesMembersAddLobbyMember } from "./add-lobby-member";
import { lobbiesMembersBulkUpdateLobbyMembers } from "./bulk-update-lobby-members";
import { lobbiesMembersCreateLinkedLobbyGuildInviteForSelf } from "./create-linked-lobby-guild-invite-for-self";
import { lobbiesMembersCreateLinkedLobbyGuildInviteForUser } from "./create-linked-lobby-guild-invite-for-user";
import { lobbiesMembersDeleteLobbyMember } from "./delete-lobby-member";
import { lobbiesMembersLeaveLobby } from "./leave-lobby";

export const lobbiesMembersTools = [
  lobbiesMembersAddLobbyMember,
  lobbiesMembersBulkUpdateLobbyMembers,
  lobbiesMembersCreateLinkedLobbyGuildInviteForSelf,
  lobbiesMembersCreateLinkedLobbyGuildInviteForUser,
  lobbiesMembersDeleteLobbyMember,
  lobbiesMembersLeaveLobby,
];
