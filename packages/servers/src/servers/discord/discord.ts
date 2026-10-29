import { defineDiscordServer } from "../../providers/discord";
import { discordTools } from "./tools";

export const discord = defineDiscordServer({
  name: "discord",
  description:
    "Discord HTTP API v10, called as a bot: channels, messages, reactions, threads and pins, guilds (members, roles, bans, emojis, stickers, scheduled events, auto moderation, audit logs), users and DMs, application commands, webhooks, invites and lobbies. Tools are named '<group>:<resource>:<action>'. Ids are snowflakes passed as strings; list the bot's guilds with users:guilds:list_my_guilds.",
  tools: discordTools,
});
