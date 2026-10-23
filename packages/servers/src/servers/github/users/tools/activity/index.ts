import { activityCheckRepoIsStarredByAuthenticatedUser } from './check-repo-is-starred-by-authenticated-user';
import { activityDeleteRepoSubscription } from './delete-repo-subscription';
import { activityDeleteThreadSubscription } from './delete-thread-subscription';
import { activityGetFeeds } from './get-feeds';
import { activityGetRepoSubscription } from './get-repo-subscription';
import { activityGetStargazerCountForRepo } from './get-stargazer-count-for-repo';
import { activityGetStargazerHistoryForRepo } from './get-stargazer-history-for-repo';
import { activityGetThread } from './get-thread';
import { activityGetThreadSubscriptionForAuthenticatedUser } from './get-thread-subscription-for-authenticated-user';
import { activityListEventsForAuthenticatedUser } from './list-events-for-authenticated-user';
import { activityListNotificationsForAuthenticatedUser } from './list-notifications-for-authenticated-user';
import { activityListOrgEventsForAuthenticatedUser } from './list-org-events-for-authenticated-user';
import { activityListPublicEvents } from './list-public-events';
import { activityListPublicEventsForRepoNetwork } from './list-public-events-for-repo-network';
import { activityListPublicEventsForUser } from './list-public-events-for-user';
import { activityListPublicOrgEvents } from './list-public-org-events';
import { activityListReceivedEventsForUser } from './list-received-events-for-user';
import { activityListReceivedPublicEventsForUser } from './list-received-public-events-for-user';
import { activityListRepoEvents } from './list-repo-events';
import { activityListRepoNotificationsForAuthenticatedUser } from './list-repo-notifications-for-authenticated-user';
import { activityListReposStarredByAuthenticatedUser } from './list-repos-starred-by-authenticated-user';
import { activityListReposStarredByUser } from './list-repos-starred-by-user';
import { activityListReposWatchedByUser } from './list-repos-watched-by-user';
import { activityListStargazersForRepo } from './list-stargazers-for-repo';
import { activityListWatchedReposForAuthenticatedUser } from './list-watched-repos-for-authenticated-user';
import { activityListWatchersForRepo } from './list-watchers-for-repo';
import { activityMarkNotificationsAsRead } from './mark-notifications-as-read';
import { activityMarkRepoNotificationsAsRead } from './mark-repo-notifications-as-read';
import { activityMarkThreadAsDone } from './mark-thread-as-done';
import { activityMarkThreadAsRead } from './mark-thread-as-read';
import { activitySetRepoSubscription } from './set-repo-subscription';
import { activitySetThreadSubscription } from './set-thread-subscription';
import { activityStarRepoForAuthenticatedUser } from './star-repo-for-authenticated-user';
import { activityUnstarRepoForAuthenticatedUser } from './unstar-repo-for-authenticated-user';

export const activityTools = [
  activityCheckRepoIsStarredByAuthenticatedUser,
  activityDeleteRepoSubscription,
  activityDeleteThreadSubscription,
  activityGetFeeds,
  activityGetRepoSubscription,
  activityGetStargazerCountForRepo,
  activityGetStargazerHistoryForRepo,
  activityGetThread,
  activityGetThreadSubscriptionForAuthenticatedUser,
  activityListEventsForAuthenticatedUser,
  activityListNotificationsForAuthenticatedUser,
  activityListOrgEventsForAuthenticatedUser,
  activityListPublicEvents,
  activityListPublicEventsForRepoNetwork,
  activityListPublicEventsForUser,
  activityListPublicOrgEvents,
  activityListReceivedEventsForUser,
  activityListReceivedPublicEventsForUser,
  activityListRepoEvents,
  activityListRepoNotificationsForAuthenticatedUser,
  activityListReposStarredByAuthenticatedUser,
  activityListReposStarredByUser,
  activityListReposWatchedByUser,
  activityListStargazersForRepo,
  activityListWatchedReposForAuthenticatedUser,
  activityListWatchersForRepo,
  activityMarkNotificationsAsRead,
  activityMarkRepoNotificationsAsRead,
  activityMarkThreadAsDone,
  activityMarkThreadAsRead,
  activitySetRepoSubscription,
  activitySetThreadSubscription,
  activityStarRepoForAuthenticatedUser,
  activityUnstarRepoForAuthenticatedUser,
];
