import { guildsChannelsBulkUpdateGuildChannels } from "./bulk-update-guild-channels";
import { guildsChannelsCreateGuildChannel } from "./create-guild-channel";
import { guildsChannelsListGuildChannels } from "./list-guild-channels";

export const guildsChannelsTools = [
  guildsChannelsBulkUpdateGuildChannels,
  guildsChannelsCreateGuildChannel,
  guildsChannelsListGuildChannels,
];
