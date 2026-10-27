import { guildsBansBanUserFromGuild } from "./ban-user-from-guild";
import { guildsBansGetGuildBan } from "./get-guild-ban";
import { guildsBansListGuildBans } from "./list-guild-bans";
import { guildsBansUnbanUserFromGuild } from "./unban-user-from-guild";

export const guildsBansTools = [
  guildsBansBanUserFromGuild,
  guildsBansGetGuildBan,
  guildsBansListGuildBans,
  guildsBansUnbanUserFromGuild,
];
