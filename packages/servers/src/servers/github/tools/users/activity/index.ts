import { usersActivityCheckRepoIsStarredByAuthenticatedUser } from './check-repo-is-starred-by-authenticated-user';
import { usersActivityDeleteRepoSubscription } from './delete-repo-subscription';
import { usersActivityDeleteThreadSubscription } from './delete-thread-subscription';
import { usersActivityGetFeeds } from './get-feeds';
import { usersActivityGetRepoSubscription } from './get-repo-subscription';
import { usersActivityGetStargazerCountForRepo } from './get-stargazer-count-for-repo';
import { usersActivityGetStargazerHistoryForRepo } from './get-stargazer-history-for-repo';
import { usersActivityGetThread } from './get-thread';
import { usersActivityGetThreadSubscriptionForAuthenticatedUser } from './get-thread-subscription-for-authenticated-user';
import { usersActivityListEventsForAuthenticatedUser } from './list-events-for-authenticated-user';
import { usersActivityListNotificationsForAuthenticatedUser } from './list-notifications-for-authenticated-user';
import { usersActivityListOrgEventsForAuthenticatedUser } from './list-org-events-for-authenticated-user';
import { usersActivityListPublicEvents } from './list-public-events';
import { usersActivityListPublicEventsForRepoNetwork } from './list-public-events-for-repo-network';
import { usersActivityListPublicEventsForUser } from './list-public-events-for-user';
import { usersActivityListPublicOrgEvents } from './list-public-org-events';
import { usersActivityListReceivedEventsForUser } from './list-received-events-for-user';
import { usersActivityListReceivedPublicEventsForUser } from './list-received-public-events-for-user';
import { usersActivityListRepoEvents } from './list-repo-events';
import { usersActivityListRepoNotificationsForAuthenticatedUser } from './list-repo-notifications-for-authenticated-user';
import { usersActivityListReposStarredByAuthenticatedUser } from './list-repos-starred-by-authenticated-user';
import { usersActivityListReposStarredByUser } from './list-repos-starred-by-user';
import { usersActivityListReposWatchedByUser } from './list-repos-watched-by-user';
import { usersActivityListStargazersForRepo } from './list-stargazers-for-repo';
import { usersActivityListWatchedReposForAuthenticatedUser } from './list-watched-repos-for-authenticated-user';
import { usersActivityListWatchersForRepo } from './list-watchers-for-repo';
import { usersActivityMarkNotificationsAsRead } from './mark-notifications-as-read';
import { usersActivityMarkRepoNotificationsAsRead } from './mark-repo-notifications-as-read';
import { usersActivityMarkThreadAsDone } from './mark-thread-as-done';
import { usersActivityMarkThreadAsRead } from './mark-thread-as-read';
import { usersActivitySetRepoSubscription } from './set-repo-subscription';
import { usersActivitySetThreadSubscription } from './set-thread-subscription';
import { usersActivityStarRepoForAuthenticatedUser } from './star-repo-for-authenticated-user';
import { usersActivityUnstarRepoForAuthenticatedUser } from './unstar-repo-for-authenticated-user';

export const usersActivityTools = [
  usersActivityCheckRepoIsStarredByAuthenticatedUser,
  usersActivityDeleteRepoSubscription,
  usersActivityDeleteThreadSubscription,
  usersActivityGetFeeds,
  usersActivityGetRepoSubscription,
  usersActivityGetStargazerCountForRepo,
  usersActivityGetStargazerHistoryForRepo,
  usersActivityGetThread,
  usersActivityGetThreadSubscriptionForAuthenticatedUser,
  usersActivityListEventsForAuthenticatedUser,
  usersActivityListNotificationsForAuthenticatedUser,
  usersActivityListOrgEventsForAuthenticatedUser,
  usersActivityListPublicEvents,
  usersActivityListPublicEventsForRepoNetwork,
  usersActivityListPublicEventsForUser,
  usersActivityListPublicOrgEvents,
  usersActivityListReceivedEventsForUser,
  usersActivityListReceivedPublicEventsForUser,
  usersActivityListRepoEvents,
  usersActivityListRepoNotificationsForAuthenticatedUser,
  usersActivityListReposStarredByAuthenticatedUser,
  usersActivityListReposStarredByUser,
  usersActivityListReposWatchedByUser,
  usersActivityListStargazersForRepo,
  usersActivityListWatchedReposForAuthenticatedUser,
  usersActivityListWatchersForRepo,
  usersActivityMarkNotificationsAsRead,
  usersActivityMarkRepoNotificationsAsRead,
  usersActivityMarkThreadAsDone,
  usersActivityMarkThreadAsRead,
  usersActivitySetRepoSubscription,
  usersActivitySetThreadSubscription,
  usersActivityStarRepoForAuthenticatedUser,
  usersActivityUnstarRepoForAuthenticatedUser,
];
