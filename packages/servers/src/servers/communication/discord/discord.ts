import { defineServer } from "@usemcpkit/core";
import { DISCORD_BASE, DISCORD_SOURCES } from "./const";

export const discord = defineServer({
  ...DISCORD_BASE,
  name: "discord",
  description:
    "Discord HTTP API v10, called as a bot: channels, messages, reactions, threads and pins, guilds (members, roles, bans, emojis, stickers, scheduled events, auto moderation, audit logs), users and DMs, application commands, webhooks, invites and lobbies. Tools are named after their endpoint, '<path>:<method>' (channels/{channel_id}/messages:post). Ids are snowflakes passed as strings; list the bot's guilds with users/@me/guilds:get.",
  openapi: { sources: DISCORD_SOURCES },
  tools: [],
});
