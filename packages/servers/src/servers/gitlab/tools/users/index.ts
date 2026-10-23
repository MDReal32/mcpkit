import { usersApplicationsTools } from './applications';
import { usersAuthnTools } from './authn';
import { usersAvatarsTools } from './avatars';
import { usersCodeSearchTools } from './code-search';
import { usersCustomAttributesTools } from './custom-attributes';
import { usersEventsTools } from './events';
import { usersMobilePushSubscriptionsTools } from './mobile-push-subscriptions';
import { usersNotificationSettingsTools } from './notification-settings';
import { usersOauthApplicationsTools } from './oauth-applications';
import { usersSearchTools } from './search';
import { usersUsersTools } from './users';

export const usersGroupTools = [
  ...usersApplicationsTools,
  ...usersAuthnTools,
  ...usersAvatarsTools,
  ...usersCodeSearchTools,
  ...usersCustomAttributesTools,
  ...usersEventsTools,
  ...usersMobilePushSubscriptionsTools,
  ...usersNotificationSettingsTools,
  ...usersOauthApplicationsTools,
  ...usersSearchTools,
  ...usersUsersTools,
];
