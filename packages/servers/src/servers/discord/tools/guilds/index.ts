import { guildsAuditLogsTools } from "./audit-logs";
import { guildsAutoModerationTools } from "./auto-moderation";
import { guildsBansTools } from "./bans";
import { guildsBulkBanTools } from "./bulk-ban";
import { guildsChannelsTools } from "./channels";
import { guildsEmojisTools } from "./emojis";
import { guildsGuildsTools } from "./guilds";
import { guildsIncidentActionsTools } from "./incident-actions";
import { guildsIntegrationsTools } from "./integrations";
import { guildsInvitesTools } from "./invites";
import { guildsMembersTools } from "./members";
import { guildsMessagesTools } from "./messages";
import { guildsNewMemberWelcomeTools } from "./new-member-welcome";
import { guildsOnboardingTools } from "./onboarding";
import { guildsPreviewTools } from "./preview";
import { guildsPruneTools } from "./prune";
import { guildsRegionsTools } from "./regions";
import { guildsRequestsTools } from "./requests";
import { guildsRolesTools } from "./roles";
import { guildsScheduledEventsTools } from "./scheduled-events";
import { guildsSoundboardSoundsTools } from "./soundboard-sounds";
import { guildsStickersTools } from "./stickers";
import { guildsTemplatesTools } from "./templates";
import { guildsThreadsTools } from "./threads";
import { guildsVanityUrlTools } from "./vanity-url";
import { guildsVoiceStatesTools } from "./voice-states";
import { guildsWebhooksTools } from "./webhooks";
import { guildsWelcomeScreenTools } from "./welcome-screen";
import { guildsWidgetTools } from "./widget";

export const guildsGroupTools = [
  ...guildsAuditLogsTools,
  ...guildsAutoModerationTools,
  ...guildsBansTools,
  ...guildsBulkBanTools,
  ...guildsChannelsTools,
  ...guildsEmojisTools,
  ...guildsGuildsTools,
  ...guildsIncidentActionsTools,
  ...guildsIntegrationsTools,
  ...guildsInvitesTools,
  ...guildsMembersTools,
  ...guildsMessagesTools,
  ...guildsNewMemberWelcomeTools,
  ...guildsOnboardingTools,
  ...guildsPreviewTools,
  ...guildsPruneTools,
  ...guildsRegionsTools,
  ...guildsRequestsTools,
  ...guildsRolesTools,
  ...guildsScheduledEventsTools,
  ...guildsSoundboardSoundsTools,
  ...guildsStickersTools,
  ...guildsTemplatesTools,
  ...guildsThreadsTools,
  ...guildsVanityUrlTools,
  ...guildsVoiceStatesTools,
  ...guildsWebhooksTools,
  ...guildsWelcomeScreenTools,
  ...guildsWidgetTools,
];
