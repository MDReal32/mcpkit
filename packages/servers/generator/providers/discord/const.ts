import { DEFAULT_SCHEMA_OPTIONS } from "../../utils/schema/const";
import type { SchemaOptions } from "../../utils/types/schema-options";

export const SPEC_URL = "https://raw.githubusercontent.com/discord/discord-api-spec/main/specs/openapi.json";

/** Discord's message search reads each filter array as repeated keys (`author_id=1&author_id=2`). */
export const SCHEMA_OPTIONS: SchemaOptions = { ...DEFAULT_SCHEMA_OPTIONS, keepsExplodedArrays: true };

/** The security scheme of a bot token; an operation that lists only `OAuth2` needs a user's access token instead. */
export const BOT_TOKEN_SCHEME = "BotToken";

/** Categories are the first path segment; the spec has no tags. */
export const SERVER_GROUPS = [
  {
    name: "channels",
    categories: ["channels", "stage-instances"],
  },
  {
    name: "guilds",
    categories: ["guilds"],
  },
  {
    name: "users",
    categories: ["users"],
  },
  {
    name: "applications",
    categories: ["applications", "interactions", "skus", "oauth2"],
  },
  {
    name: "webhooks",
    categories: ["webhooks"],
  },
  {
    name: "invites",
    categories: ["invites"],
  },
  {
    name: "lobbies",
    categories: ["lobbies", "partner-sdk"],
  },
  {
    name: "global",
    categories: ["gateway", "voice", "sticker-packs", "stickers", "soundboard-default-sounds"],
  },
];

/** Path segments that name a top-level resource; inside a longer path they only scope it (`/users/@me/guilds/{guild_id}/member`). */
export const SCOPE_SEGMENTS = SERVER_GROUPS.flatMap((group) => group.categories);

export const SERVER_NAME = "discord";

export const SERVER_DESCRIPTION =
  "Discord HTTP API v10, called as a bot: channels, messages, reactions, threads and pins, guilds (members, roles, bans, emojis, stickers, scheduled events, auto moderation, audit logs), users and DMs, application commands, webhooks, invites and lobbies. Tools are named '<group>:<resource>:<action>'. Ids are snowflakes passed as strings; list the bot's guilds with users:guilds:list_my_guilds.";
