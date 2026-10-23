import { interactionsGetPullRequestBypassListForRepo } from './get-pull-request-bypass-list-for-repo';
import { interactionsGetPullRequestCreationCapForOrg } from './get-pull-request-creation-cap-for-org';
import { interactionsGetPullRequestCreationCapForRepo } from './get-pull-request-creation-cap-for-repo';
import { interactionsGetRestrictionsForAuthenticatedUser } from './get-restrictions-for-authenticated-user';
import { interactionsGetRestrictionsForOrg } from './get-restrictions-for-org';
import { interactionsGetRestrictionsForRepo } from './get-restrictions-for-repo';
import { interactionsRemovePullRequestBypassListForRepo } from './remove-pull-request-bypass-list-for-repo';
import { interactionsRemoveRestrictionsForAuthenticatedUser } from './remove-restrictions-for-authenticated-user';
import { interactionsRemoveRestrictionsForOrg } from './remove-restrictions-for-org';
import { interactionsRemoveRestrictionsForRepo } from './remove-restrictions-for-repo';
import { interactionsSetPullRequestBypassListForRepo } from './set-pull-request-bypass-list-for-repo';
import { interactionsSetRestrictionsForAuthenticatedUser } from './set-restrictions-for-authenticated-user';
import { interactionsSetRestrictionsForOrg } from './set-restrictions-for-org';
import { interactionsSetRestrictionsForRepo } from './set-restrictions-for-repo';
import { interactionsUpdatePullRequestCreationCapForOrg } from './update-pull-request-creation-cap-for-org';
import { interactionsUpdatePullRequestCreationCapForRepo } from './update-pull-request-creation-cap-for-repo';

export const interactionsTools = [
  interactionsGetPullRequestBypassListForRepo,
  interactionsGetPullRequestCreationCapForOrg,
  interactionsGetPullRequestCreationCapForRepo,
  interactionsGetRestrictionsForAuthenticatedUser,
  interactionsGetRestrictionsForOrg,
  interactionsGetRestrictionsForRepo,
  interactionsRemovePullRequestBypassListForRepo,
  interactionsRemoveRestrictionsForAuthenticatedUser,
  interactionsRemoveRestrictionsForOrg,
  interactionsRemoveRestrictionsForRepo,
  interactionsSetPullRequestBypassListForRepo,
  interactionsSetRestrictionsForAuthenticatedUser,
  interactionsSetRestrictionsForOrg,
  interactionsSetRestrictionsForRepo,
  interactionsUpdatePullRequestCreationCapForOrg,
  interactionsUpdatePullRequestCreationCapForRepo,
];
