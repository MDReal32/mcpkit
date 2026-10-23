import { orgsInteractionsGetPullRequestBypassListForRepo } from './get-pull-request-bypass-list-for-repo';
import { orgsInteractionsGetPullRequestCreationCapForOrg } from './get-pull-request-creation-cap-for-org';
import { orgsInteractionsGetPullRequestCreationCapForRepo } from './get-pull-request-creation-cap-for-repo';
import { orgsInteractionsGetRestrictionsForAuthenticatedUser } from './get-restrictions-for-authenticated-user';
import { orgsInteractionsGetRestrictionsForOrg } from './get-restrictions-for-org';
import { orgsInteractionsGetRestrictionsForRepo } from './get-restrictions-for-repo';
import { orgsInteractionsRemovePullRequestBypassListForRepo } from './remove-pull-request-bypass-list-for-repo';
import { orgsInteractionsRemoveRestrictionsForAuthenticatedUser } from './remove-restrictions-for-authenticated-user';
import { orgsInteractionsRemoveRestrictionsForOrg } from './remove-restrictions-for-org';
import { orgsInteractionsRemoveRestrictionsForRepo } from './remove-restrictions-for-repo';
import { orgsInteractionsSetPullRequestBypassListForRepo } from './set-pull-request-bypass-list-for-repo';
import { orgsInteractionsSetRestrictionsForAuthenticatedUser } from './set-restrictions-for-authenticated-user';
import { orgsInteractionsSetRestrictionsForOrg } from './set-restrictions-for-org';
import { orgsInteractionsSetRestrictionsForRepo } from './set-restrictions-for-repo';
import { orgsInteractionsUpdatePullRequestCreationCapForOrg } from './update-pull-request-creation-cap-for-org';
import { orgsInteractionsUpdatePullRequestCreationCapForRepo } from './update-pull-request-creation-cap-for-repo';

export const orgsInteractionsTools = [
  orgsInteractionsGetPullRequestBypassListForRepo,
  orgsInteractionsGetPullRequestCreationCapForOrg,
  orgsInteractionsGetPullRequestCreationCapForRepo,
  orgsInteractionsGetRestrictionsForAuthenticatedUser,
  orgsInteractionsGetRestrictionsForOrg,
  orgsInteractionsGetRestrictionsForRepo,
  orgsInteractionsRemovePullRequestBypassListForRepo,
  orgsInteractionsRemoveRestrictionsForAuthenticatedUser,
  orgsInteractionsRemoveRestrictionsForOrg,
  orgsInteractionsRemoveRestrictionsForRepo,
  orgsInteractionsSetPullRequestBypassListForRepo,
  orgsInteractionsSetRestrictionsForAuthenticatedUser,
  orgsInteractionsSetRestrictionsForOrg,
  orgsInteractionsSetRestrictionsForRepo,
  orgsInteractionsUpdatePullRequestCreationCapForOrg,
  orgsInteractionsUpdatePullRequestCreationCapForRepo,
];
