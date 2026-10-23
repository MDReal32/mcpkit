import { usersUsersAddEmailForAuthenticatedUser } from "./add-email-for-authenticated-user";
import { usersUsersAddSocialAccountForAuthenticatedUser } from "./add-social-account-for-authenticated-user";
import { usersUsersBlock } from "./block";
import { usersUsersCheckBlocked } from "./check-blocked";
import { usersUsersCheckFollowingForUser } from "./check-following-for-user";
import { usersUsersCheckPersonIsFollowedByAuthenticated } from "./check-person-is-followed-by-authenticated";
import { usersUsersCreateGpgKeyForAuthenticatedUser } from "./create-gpg-key-for-authenticated-user";
import { usersUsersCreatePublicSshKeyForAuthenticatedUser } from "./create-public-ssh-key-for-authenticated-user";
import { usersUsersCreateSshSigningKeyForAuthenticatedUser } from "./create-ssh-signing-key-for-authenticated-user";
import { usersUsersDeleteAttestationsBulk } from "./delete-attestations-bulk";
import { usersUsersDeleteAttestationsById } from "./delete-attestations-by-id";
import { usersUsersDeleteAttestationsBySubjectDigest } from "./delete-attestations-by-subject-digest";
import { usersUsersDeleteEmailForAuthenticatedUser } from "./delete-email-for-authenticated-user";
import { usersUsersDeleteGpgKeyForAuthenticatedUser } from "./delete-gpg-key-for-authenticated-user";
import { usersUsersDeletePublicSshKeyForAuthenticatedUser } from "./delete-public-ssh-key-for-authenticated-user";
import { usersUsersDeleteSocialAccountForAuthenticatedUser } from "./delete-social-account-for-authenticated-user";
import { usersUsersDeleteSshSigningKeyForAuthenticatedUser } from "./delete-ssh-signing-key-for-authenticated-user";
import { usersUsersFollow } from "./follow";
import { usersUsersGetAuthenticated } from "./get-authenticated";
import { usersUsersGetById } from "./get-by-id";
import { usersUsersGetByUsername } from "./get-by-username";
import { usersUsersGetContextForUser } from "./get-context-for-user";
import { usersUsersGetGpgKeyForAuthenticatedUser } from "./get-gpg-key-for-authenticated-user";
import { usersUsersGetPublicSshKeyForAuthenticatedUser } from "./get-public-ssh-key-for-authenticated-user";
import { usersUsersGetSshSigningKeyForAuthenticatedUser } from "./get-ssh-signing-key-for-authenticated-user";
import { usersUsersList } from "./list";
import { usersUsersListAttestations } from "./list-attestations";
import { usersUsersListAttestationsBulk } from "./list-attestations-bulk";
import { usersUsersListBlockedByAuthenticatedUser } from "./list-blocked-by-authenticated-user";
import { usersUsersListEmailsForAuthenticatedUser } from "./list-emails-for-authenticated-user";
import { usersUsersListFollowedByAuthenticatedUser } from "./list-followed-by-authenticated-user";
import { usersUsersListFollowersForAuthenticatedUser } from "./list-followers-for-authenticated-user";
import { usersUsersListFollowersForUser } from "./list-followers-for-user";
import { usersUsersListFollowingForUser } from "./list-following-for-user";
import { usersUsersListGpgKeysForAuthenticatedUser } from "./list-gpg-keys-for-authenticated-user";
import { usersUsersListGpgKeysForUser } from "./list-gpg-keys-for-user";
import { usersUsersListPublicEmailsForAuthenticatedUser } from "./list-public-emails-for-authenticated-user";
import { usersUsersListPublicKeysForUser } from "./list-public-keys-for-user";
import { usersUsersListPublicSshKeysForAuthenticatedUser } from "./list-public-ssh-keys-for-authenticated-user";
import { usersUsersListSocialAccountsForAuthenticatedUser } from "./list-social-accounts-for-authenticated-user";
import { usersUsersListSocialAccountsForUser } from "./list-social-accounts-for-user";
import { usersUsersListSshSigningKeysForAuthenticatedUser } from "./list-ssh-signing-keys-for-authenticated-user";
import { usersUsersListSshSigningKeysForUser } from "./list-ssh-signing-keys-for-user";
import { usersUsersSetPrimaryEmailVisibilityForAuthenticatedUser } from "./set-primary-email-visibility-for-authenticated-user";
import { usersUsersUnblock } from "./unblock";
import { usersUsersUnfollow } from "./unfollow";
import { usersUsersUpdateAuthenticated } from "./update-authenticated";

export const usersUsersTools = [
  usersUsersAddEmailForAuthenticatedUser,
  usersUsersAddSocialAccountForAuthenticatedUser,
  usersUsersBlock,
  usersUsersCheckBlocked,
  usersUsersCheckFollowingForUser,
  usersUsersCheckPersonIsFollowedByAuthenticated,
  usersUsersCreateGpgKeyForAuthenticatedUser,
  usersUsersCreatePublicSshKeyForAuthenticatedUser,
  usersUsersCreateSshSigningKeyForAuthenticatedUser,
  usersUsersDeleteAttestationsBulk,
  usersUsersDeleteAttestationsById,
  usersUsersDeleteAttestationsBySubjectDigest,
  usersUsersDeleteEmailForAuthenticatedUser,
  usersUsersDeleteGpgKeyForAuthenticatedUser,
  usersUsersDeletePublicSshKeyForAuthenticatedUser,
  usersUsersDeleteSocialAccountForAuthenticatedUser,
  usersUsersDeleteSshSigningKeyForAuthenticatedUser,
  usersUsersFollow,
  usersUsersGetAuthenticated,
  usersUsersGetById,
  usersUsersGetByUsername,
  usersUsersGetContextForUser,
  usersUsersGetGpgKeyForAuthenticatedUser,
  usersUsersGetPublicSshKeyForAuthenticatedUser,
  usersUsersGetSshSigningKeyForAuthenticatedUser,
  usersUsersList,
  usersUsersListAttestations,
  usersUsersListAttestationsBulk,
  usersUsersListBlockedByAuthenticatedUser,
  usersUsersListEmailsForAuthenticatedUser,
  usersUsersListFollowedByAuthenticatedUser,
  usersUsersListFollowersForAuthenticatedUser,
  usersUsersListFollowersForUser,
  usersUsersListFollowingForUser,
  usersUsersListGpgKeysForAuthenticatedUser,
  usersUsersListGpgKeysForUser,
  usersUsersListPublicEmailsForAuthenticatedUser,
  usersUsersListPublicKeysForUser,
  usersUsersListPublicSshKeysForAuthenticatedUser,
  usersUsersListSocialAccountsForAuthenticatedUser,
  usersUsersListSocialAccountsForUser,
  usersUsersListSshSigningKeysForAuthenticatedUser,
  usersUsersListSshSigningKeysForUser,
  usersUsersSetPrimaryEmailVisibilityForAuthenticatedUser,
  usersUsersUnblock,
  usersUsersUnfollow,
  usersUsersUpdateAuthenticated,
];
