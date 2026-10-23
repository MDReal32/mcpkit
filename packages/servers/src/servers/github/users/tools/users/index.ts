import { usersAddEmailForAuthenticatedUser } from './add-email-for-authenticated-user';
import { usersAddSocialAccountForAuthenticatedUser } from './add-social-account-for-authenticated-user';
import { usersBlock } from './block';
import { usersCheckBlocked } from './check-blocked';
import { usersCheckFollowingForUser } from './check-following-for-user';
import { usersCheckPersonIsFollowedByAuthenticated } from './check-person-is-followed-by-authenticated';
import { usersCreateGpgKeyForAuthenticatedUser } from './create-gpg-key-for-authenticated-user';
import { usersCreatePublicSshKeyForAuthenticatedUser } from './create-public-ssh-key-for-authenticated-user';
import { usersCreateSshSigningKeyForAuthenticatedUser } from './create-ssh-signing-key-for-authenticated-user';
import { usersDeleteAttestationsBulk } from './delete-attestations-bulk';
import { usersDeleteAttestationsById } from './delete-attestations-by-id';
import { usersDeleteAttestationsBySubjectDigest } from './delete-attestations-by-subject-digest';
import { usersDeleteEmailForAuthenticatedUser } from './delete-email-for-authenticated-user';
import { usersDeleteGpgKeyForAuthenticatedUser } from './delete-gpg-key-for-authenticated-user';
import { usersDeletePublicSshKeyForAuthenticatedUser } from './delete-public-ssh-key-for-authenticated-user';
import { usersDeleteSocialAccountForAuthenticatedUser } from './delete-social-account-for-authenticated-user';
import { usersDeleteSshSigningKeyForAuthenticatedUser } from './delete-ssh-signing-key-for-authenticated-user';
import { usersFollow } from './follow';
import { usersGetAuthenticated } from './get-authenticated';
import { usersGetById } from './get-by-id';
import { usersGetByUsername } from './get-by-username';
import { usersGetContextForUser } from './get-context-for-user';
import { usersGetGpgKeyForAuthenticatedUser } from './get-gpg-key-for-authenticated-user';
import { usersGetPublicSshKeyForAuthenticatedUser } from './get-public-ssh-key-for-authenticated-user';
import { usersGetSshSigningKeyForAuthenticatedUser } from './get-ssh-signing-key-for-authenticated-user';
import { usersList } from './list';
import { usersListAttestations } from './list-attestations';
import { usersListAttestationsBulk } from './list-attestations-bulk';
import { usersListBlockedByAuthenticatedUser } from './list-blocked-by-authenticated-user';
import { usersListEmailsForAuthenticatedUser } from './list-emails-for-authenticated-user';
import { usersListFollowedByAuthenticatedUser } from './list-followed-by-authenticated-user';
import { usersListFollowersForAuthenticatedUser } from './list-followers-for-authenticated-user';
import { usersListFollowersForUser } from './list-followers-for-user';
import { usersListFollowingForUser } from './list-following-for-user';
import { usersListGpgKeysForAuthenticatedUser } from './list-gpg-keys-for-authenticated-user';
import { usersListGpgKeysForUser } from './list-gpg-keys-for-user';
import { usersListPublicEmailsForAuthenticatedUser } from './list-public-emails-for-authenticated-user';
import { usersListPublicKeysForUser } from './list-public-keys-for-user';
import { usersListPublicSshKeysForAuthenticatedUser } from './list-public-ssh-keys-for-authenticated-user';
import { usersListSocialAccountsForAuthenticatedUser } from './list-social-accounts-for-authenticated-user';
import { usersListSocialAccountsForUser } from './list-social-accounts-for-user';
import { usersListSshSigningKeysForAuthenticatedUser } from './list-ssh-signing-keys-for-authenticated-user';
import { usersListSshSigningKeysForUser } from './list-ssh-signing-keys-for-user';
import { usersSetPrimaryEmailVisibilityForAuthenticatedUser } from './set-primary-email-visibility-for-authenticated-user';
import { usersUnblock } from './unblock';
import { usersUnfollow } from './unfollow';
import { usersUpdateAuthenticated } from './update-authenticated';

export const usersTools = [
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
];
