import { applicationsGroupTools } from "./applications";
import { channelsGroupTools } from "./channels";
import { globalGroupTools } from "./global";
import { guildsGroupTools } from "./guilds";
import { invitesGroupTools } from "./invites";
import { lobbiesGroupTools } from "./lobbies";
import { usersGroupTools } from "./users";
import { webhooksGroupTools } from "./webhooks";

export const discordTools = [
  ...channelsGroupTools,
  ...guildsGroupTools,
  ...usersGroupTools,
  ...applicationsGroupTools,
  ...webhooksGroupTools,
  ...invitesGroupTools,
  ...lobbiesGroupTools,
  ...globalGroupTools,
];
