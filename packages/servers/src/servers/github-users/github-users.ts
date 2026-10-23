import { defineGithubServer } from '../../providers/github';

import { activityCheckRepoIsStarredByAuthenticatedUser } from './tools/activity/check-repo-is-starred-by-authenticated-user';
import { activityDeleteRepoSubscription } from './tools/activity/delete-repo-subscription';
import { activityDeleteThreadSubscription } from './tools/activity/delete-thread-subscription';
import { activityGetFeeds } from './tools/activity/get-feeds';
import { activityGetRepoSubscription } from './tools/activity/get-repo-subscription';
import { activityGetStargazerCountForRepo } from './tools/activity/get-stargazer-count-for-repo';
import { activityGetStargazerHistoryForRepo } from './tools/activity/get-stargazer-history-for-repo';
import { activityGetThread } from './tools/activity/get-thread';
import { activityGetThreadSubscriptionForAuthenticatedUser } from './tools/activity/get-thread-subscription-for-authenticated-user';
import { activityListEventsForAuthenticatedUser } from './tools/activity/list-events-for-authenticated-user';
import { activityListNotificationsForAuthenticatedUser } from './tools/activity/list-notifications-for-authenticated-user';
import { activityListOrgEventsForAuthenticatedUser } from './tools/activity/list-org-events-for-authenticated-user';
import { activityListPublicEvents } from './tools/activity/list-public-events';
import { activityListPublicEventsForRepoNetwork } from './tools/activity/list-public-events-for-repo-network';
import { activityListPublicEventsForUser } from './tools/activity/list-public-events-for-user';
import { activityListPublicOrgEvents } from './tools/activity/list-public-org-events';
import { activityListReceivedEventsForUser } from './tools/activity/list-received-events-for-user';
import { activityListReceivedPublicEventsForUser } from './tools/activity/list-received-public-events-for-user';
import { activityListRepoEvents } from './tools/activity/list-repo-events';
import { activityListRepoNotificationsForAuthenticatedUser } from './tools/activity/list-repo-notifications-for-authenticated-user';
import { activityListReposStarredByAuthenticatedUser } from './tools/activity/list-repos-starred-by-authenticated-user';
import { activityListReposStarredByUser } from './tools/activity/list-repos-starred-by-user';
import { activityListReposWatchedByUser } from './tools/activity/list-repos-watched-by-user';
import { activityListStargazersForRepo } from './tools/activity/list-stargazers-for-repo';
import { activityListWatchedReposForAuthenticatedUser } from './tools/activity/list-watched-repos-for-authenticated-user';
import { activityListWatchersForRepo } from './tools/activity/list-watchers-for-repo';
import { activityMarkNotificationsAsRead } from './tools/activity/mark-notifications-as-read';
import { activityMarkRepoNotificationsAsRead } from './tools/activity/mark-repo-notifications-as-read';
import { activityMarkThreadAsDone } from './tools/activity/mark-thread-as-done';
import { activityMarkThreadAsRead } from './tools/activity/mark-thread-as-read';
import { activitySetRepoSubscription } from './tools/activity/set-repo-subscription';
import { activitySetThreadSubscription } from './tools/activity/set-thread-subscription';
import { activityStarRepoForAuthenticatedUser } from './tools/activity/star-repo-for-authenticated-user';
import { activityUnstarRepoForAuthenticatedUser } from './tools/activity/unstar-repo-for-authenticated-user';
import { gistsCheckIsStarred } from './tools/gists/check-is-starred';
import { gistsCreate } from './tools/gists/create';
import { gistsCreateComment } from './tools/gists/create-comment';
import { gistsDelete } from './tools/gists/delete';
import { gistsDeleteComment } from './tools/gists/delete-comment';
import { gistsFork } from './tools/gists/fork';
import { gistsGet } from './tools/gists/get';
import { gistsGetComment } from './tools/gists/get-comment';
import { gistsGetRevision } from './tools/gists/get-revision';
import { gistsList } from './tools/gists/list';
import { gistsListComments } from './tools/gists/list-comments';
import { gistsListCommits } from './tools/gists/list-commits';
import { gistsListForUser } from './tools/gists/list-for-user';
import { gistsListForks } from './tools/gists/list-forks';
import { gistsListPublic } from './tools/gists/list-public';
import { gistsListStarred } from './tools/gists/list-starred';
import { gistsStar } from './tools/gists/star';
import { gistsUnstar } from './tools/gists/unstar';
import { gistsUpdate } from './tools/gists/update';
import { gistsUpdateComment } from './tools/gists/update-comment';
import { searchCode } from './tools/search/code';
import { searchCommits } from './tools/search/commits';
import { searchIssuesAndPullRequests } from './tools/search/issues-and-pull-requests';
import { searchLabels } from './tools/search/labels';
import { searchRepos } from './tools/search/repos';
import { searchTopics } from './tools/search/topics';
import { searchUsers } from './tools/search/users';
import { usersAddEmailForAuthenticatedUser } from './tools/users/add-email-for-authenticated-user';
import { usersAddSocialAccountForAuthenticatedUser } from './tools/users/add-social-account-for-authenticated-user';
import { usersBlock } from './tools/users/block';
import { usersCheckBlocked } from './tools/users/check-blocked';
import { usersCheckFollowingForUser } from './tools/users/check-following-for-user';
import { usersCheckPersonIsFollowedByAuthenticated } from './tools/users/check-person-is-followed-by-authenticated';
import { usersCreateGpgKeyForAuthenticatedUser } from './tools/users/create-gpg-key-for-authenticated-user';
import { usersCreatePublicSshKeyForAuthenticatedUser } from './tools/users/create-public-ssh-key-for-authenticated-user';
import { usersCreateSshSigningKeyForAuthenticatedUser } from './tools/users/create-ssh-signing-key-for-authenticated-user';
import { usersDeleteAttestationsBulk } from './tools/users/delete-attestations-bulk';
import { usersDeleteAttestationsById } from './tools/users/delete-attestations-by-id';
import { usersDeleteAttestationsBySubjectDigest } from './tools/users/delete-attestations-by-subject-digest';
import { usersDeleteEmailForAuthenticatedUser } from './tools/users/delete-email-for-authenticated-user';
import { usersDeleteGpgKeyForAuthenticatedUser } from './tools/users/delete-gpg-key-for-authenticated-user';
import { usersDeletePublicSshKeyForAuthenticatedUser } from './tools/users/delete-public-ssh-key-for-authenticated-user';
import { usersDeleteSocialAccountForAuthenticatedUser } from './tools/users/delete-social-account-for-authenticated-user';
import { usersDeleteSshSigningKeyForAuthenticatedUser } from './tools/users/delete-ssh-signing-key-for-authenticated-user';
import { usersFollow } from './tools/users/follow';
import { usersGetAuthenticated } from './tools/users/get-authenticated';
import { usersGetById } from './tools/users/get-by-id';
import { usersGetByUsername } from './tools/users/get-by-username';
import { usersGetContextForUser } from './tools/users/get-context-for-user';
import { usersGetGpgKeyForAuthenticatedUser } from './tools/users/get-gpg-key-for-authenticated-user';
import { usersGetPublicSshKeyForAuthenticatedUser } from './tools/users/get-public-ssh-key-for-authenticated-user';
import { usersGetSshSigningKeyForAuthenticatedUser } from './tools/users/get-ssh-signing-key-for-authenticated-user';
import { usersList } from './tools/users/list';
import { usersListAttestations } from './tools/users/list-attestations';
import { usersListAttestationsBulk } from './tools/users/list-attestations-bulk';
import { usersListBlockedByAuthenticatedUser } from './tools/users/list-blocked-by-authenticated-user';
import { usersListEmailsForAuthenticatedUser } from './tools/users/list-emails-for-authenticated-user';
import { usersListFollowedByAuthenticatedUser } from './tools/users/list-followed-by-authenticated-user';
import { usersListFollowersForAuthenticatedUser } from './tools/users/list-followers-for-authenticated-user';
import { usersListFollowersForUser } from './tools/users/list-followers-for-user';
import { usersListFollowingForUser } from './tools/users/list-following-for-user';
import { usersListGpgKeysForAuthenticatedUser } from './tools/users/list-gpg-keys-for-authenticated-user';
import { usersListGpgKeysForUser } from './tools/users/list-gpg-keys-for-user';
import { usersListPublicEmailsForAuthenticatedUser } from './tools/users/list-public-emails-for-authenticated-user';
import { usersListPublicKeysForUser } from './tools/users/list-public-keys-for-user';
import { usersListPublicSshKeysForAuthenticatedUser } from './tools/users/list-public-ssh-keys-for-authenticated-user';
import { usersListSocialAccountsForAuthenticatedUser } from './tools/users/list-social-accounts-for-authenticated-user';
import { usersListSocialAccountsForUser } from './tools/users/list-social-accounts-for-user';
import { usersListSshSigningKeysForAuthenticatedUser } from './tools/users/list-ssh-signing-keys-for-authenticated-user';
import { usersListSshSigningKeysForUser } from './tools/users/list-ssh-signing-keys-for-user';
import { usersSetPrimaryEmailVisibilityForAuthenticatedUser } from './tools/users/set-primary-email-visibility-for-authenticated-user';
import { usersUnblock } from './tools/users/unblock';
import { usersUnfollow } from './tools/users/unfollow';
import { usersUpdateAuthenticated } from './tools/users/update-authenticated';

export const githubUsers = defineGithubServer({
  name: 'github_users',
  description: 'GitHub REST API: users, notifications and stars, gists, search.',
  tools: [
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
    gistsCheckIsStarred,
    gistsCreate,
    gistsCreateComment,
    gistsDelete,
    gistsDeleteComment,
    gistsFork,
    gistsGet,
    gistsGetComment,
    gistsGetRevision,
    gistsList,
    gistsListComments,
    gistsListCommits,
    gistsListForUser,
    gistsListForks,
    gistsListPublic,
    gistsListStarred,
    gistsStar,
    gistsUnstar,
    gistsUpdate,
    gistsUpdateComment,
    searchCode,
    searchCommits,
    searchIssuesAndPullRequests,
    searchLabels,
    searchRepos,
    searchTopics,
    searchUsers,
    usersAddEmailForAuthenticatedUser,
    usersAddSocialAccountForAuthenticatedUser,
    usersBlock,
    usersCheckBlocked,
    usersCheckFollowingForUser,
    usersCheckPersonIsFollowedByAuthenticated,
    usersCreateGpgKeyForAuthenticatedUser,
    usersCreatePublicSshKeyForAuthenticatedUser,
    usersCreateSshSigningKeyForAuthenticatedUser,
    usersDeleteAttestationsBulk,
    usersDeleteAttestationsById,
    usersDeleteAttestationsBySubjectDigest,
    usersDeleteEmailForAuthenticatedUser,
    usersDeleteGpgKeyForAuthenticatedUser,
    usersDeletePublicSshKeyForAuthenticatedUser,
    usersDeleteSocialAccountForAuthenticatedUser,
    usersDeleteSshSigningKeyForAuthenticatedUser,
    usersFollow,
    usersGetAuthenticated,
    usersGetById,
    usersGetByUsername,
    usersGetContextForUser,
    usersGetGpgKeyForAuthenticatedUser,
    usersGetPublicSshKeyForAuthenticatedUser,
    usersGetSshSigningKeyForAuthenticatedUser,
    usersList,
    usersListAttestations,
    usersListAttestationsBulk,
    usersListBlockedByAuthenticatedUser,
    usersListEmailsForAuthenticatedUser,
    usersListFollowedByAuthenticatedUser,
    usersListFollowersForAuthenticatedUser,
    usersListFollowersForUser,
    usersListFollowingForUser,
    usersListGpgKeysForAuthenticatedUser,
    usersListGpgKeysForUser,
    usersListPublicEmailsForAuthenticatedUser,
    usersListPublicKeysForUser,
    usersListPublicSshKeysForAuthenticatedUser,
    usersListSocialAccountsForAuthenticatedUser,
    usersListSocialAccountsForUser,
    usersListSshSigningKeysForAuthenticatedUser,
    usersListSshSigningKeysForUser,
    usersSetPrimaryEmailVisibilityForAuthenticatedUser,
    usersUnblock,
    usersUnfollow,
    usersUpdateAuthenticated,
  ],
});
