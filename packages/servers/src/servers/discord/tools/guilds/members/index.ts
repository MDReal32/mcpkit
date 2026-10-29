import { guildsMembersAddGuildMember } from "./add-guild-member";
import { guildsMembersAddGuildMemberRole } from "./add-guild-member-role";
import { guildsMembersDeleteGuildMember } from "./delete-guild-member";
import { guildsMembersDeleteGuildMemberRole } from "./delete-guild-member-role";
import { guildsMembersGetGuildMember } from "./get-guild-member";
import { guildsMembersListGuildMembers } from "./list-guild-members";
import { guildsMembersSearchGuildMembers } from "./search-guild-members";
import { guildsMembersUpdateGuildMember } from "./update-guild-member";
import { guildsMembersUpdateMyGuildMember } from "./update-my-guild-member";

export const guildsMembersTools = [
  guildsMembersAddGuildMember,
  guildsMembersAddGuildMemberRole,
  guildsMembersDeleteGuildMember,
  guildsMembersDeleteGuildMemberRole,
  guildsMembersGetGuildMember,
  guildsMembersListGuildMembers,
  guildsMembersSearchGuildMembers,
  guildsMembersUpdateGuildMember,
  guildsMembersUpdateMyGuildMember,
];
