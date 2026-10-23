import { agentsAddSelectedRepoToOrgSecret } from './add-selected-repo-to-org-secret';
import { agentsAddSelectedRepoToOrgVariable } from './add-selected-repo-to-org-variable';
import { agentsCreateOrUpdateOrgSecret } from './create-or-update-org-secret';
import { agentsCreateOrUpdateRepoSecret } from './create-or-update-repo-secret';
import { agentsCreateOrgVariable } from './create-org-variable';
import { agentsCreateRepoVariable } from './create-repo-variable';
import { agentsDeleteOrgSecret } from './delete-org-secret';
import { agentsDeleteOrgVariable } from './delete-org-variable';
import { agentsDeleteRepoSecret } from './delete-repo-secret';
import { agentsDeleteRepoVariable } from './delete-repo-variable';
import { agentsGetOrgPublicKey } from './get-org-public-key';
import { agentsGetOrgSecret } from './get-org-secret';
import { agentsGetOrgVariable } from './get-org-variable';
import { agentsGetRepoPublicKey } from './get-repo-public-key';
import { agentsGetRepoSecret } from './get-repo-secret';
import { agentsGetRepoVariable } from './get-repo-variable';
import { agentsListOrgSecrets } from './list-org-secrets';
import { agentsListOrgVariables } from './list-org-variables';
import { agentsListRepoOrganizationSecrets } from './list-repo-organization-secrets';
import { agentsListRepoOrganizationVariables } from './list-repo-organization-variables';
import { agentsListRepoSecrets } from './list-repo-secrets';
import { agentsListRepoVariables } from './list-repo-variables';
import { agentsListSelectedReposForOrgSecret } from './list-selected-repos-for-org-secret';
import { agentsListSelectedReposForOrgVariable } from './list-selected-repos-for-org-variable';
import { agentsRemoveSelectedRepoFromOrgSecret } from './remove-selected-repo-from-org-secret';
import { agentsRemoveSelectedRepoFromOrgVariable } from './remove-selected-repo-from-org-variable';
import { agentsSetSelectedReposForOrgSecret } from './set-selected-repos-for-org-secret';
import { agentsSetSelectedReposForOrgVariable } from './set-selected-repos-for-org-variable';
import { agentsUpdateOrgVariable } from './update-org-variable';
import { agentsUpdateRepoVariable } from './update-repo-variable';

export const agentsTools = [
  agentsAddSelectedRepoToOrgSecret,
  agentsAddSelectedRepoToOrgVariable,
  agentsCreateOrUpdateOrgSecret,
  agentsCreateOrUpdateRepoSecret,
  agentsCreateOrgVariable,
  agentsCreateRepoVariable,
  agentsDeleteOrgSecret,
  agentsDeleteOrgVariable,
  agentsDeleteRepoSecret,
  agentsDeleteRepoVariable,
  agentsGetOrgPublicKey,
  agentsGetOrgSecret,
  agentsGetOrgVariable,
  agentsGetRepoPublicKey,
  agentsGetRepoSecret,
  agentsGetRepoVariable,
  agentsListOrgSecrets,
  agentsListOrgVariables,
  agentsListRepoOrganizationSecrets,
  agentsListRepoOrganizationVariables,
  agentsListRepoSecrets,
  agentsListRepoVariables,
  agentsListSelectedReposForOrgSecret,
  agentsListSelectedReposForOrgVariable,
  agentsRemoveSelectedRepoFromOrgSecret,
  agentsRemoveSelectedRepoFromOrgVariable,
  agentsSetSelectedReposForOrgSecret,
  agentsSetSelectedReposForOrgVariable,
  agentsUpdateOrgVariable,
  agentsUpdateRepoVariable,
];
