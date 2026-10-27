import { lobbiesChannelLinkingTools } from "./channel-linking";
import { lobbiesLobbiesTools } from "./lobbies";
import { lobbiesMembersTools } from "./members";
import { lobbiesMessagesTools } from "./messages";
import { lobbiesPartnerSdkTools } from "./partner-sdk";

export const lobbiesGroupTools = [
  ...lobbiesChannelLinkingTools,
  ...lobbiesLobbiesTools,
  ...lobbiesMembersTools,
  ...lobbiesMessagesTools,
  ...lobbiesPartnerSdkTools,
];
