import { channelsChannelsTools } from "./channels";
import { channelsFollowersTools } from "./followers";
import { channelsInvitesTools } from "./invites";
import { channelsMessagesTools } from "./messages";
import { channelsPermissionsTools } from "./permissions";
import { channelsPinsTools } from "./pins";
import { channelsPollsTools } from "./polls";
import { channelsRecipientsTools } from "./recipients";
import { channelsSendSoundboardSoundTools } from "./send-soundboard-sound";
import { channelsStageInstancesTools } from "./stage-instances";
import { channelsThreadMembersTools } from "./thread-members";
import { channelsThreadsTools } from "./threads";
import { channelsTypingTools } from "./typing";
import { channelsVoiceStatusTools } from "./voice-status";
import { channelsWebhooksTools } from "./webhooks";

export const channelsGroupTools = [
  ...channelsChannelsTools,
  ...channelsFollowersTools,
  ...channelsInvitesTools,
  ...channelsMessagesTools,
  ...channelsPermissionsTools,
  ...channelsPinsTools,
  ...channelsPollsTools,
  ...channelsRecipientsTools,
  ...channelsSendSoundboardSoundTools,
  ...channelsStageInstancesTools,
  ...channelsThreadMembersTools,
  ...channelsThreadsTools,
  ...channelsTypingTools,
  ...channelsVoiceStatusTools,
  ...channelsWebhooksTools,
];
