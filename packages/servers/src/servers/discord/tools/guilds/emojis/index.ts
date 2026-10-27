import { guildsEmojisCreateGuildEmoji } from "./create-guild-emoji";
import { guildsEmojisDeleteGuildEmoji } from "./delete-guild-emoji";
import { guildsEmojisGetGuildEmoji } from "./get-guild-emoji";
import { guildsEmojisListGuildEmojis } from "./list-guild-emojis";
import { guildsEmojisUpdateGuildEmoji } from "./update-guild-emoji";

export const guildsEmojisTools = [
  guildsEmojisCreateGuildEmoji,
  guildsEmojisDeleteGuildEmoji,
  guildsEmojisGetGuildEmoji,
  guildsEmojisListGuildEmojis,
  guildsEmojisUpdateGuildEmoji,
];
