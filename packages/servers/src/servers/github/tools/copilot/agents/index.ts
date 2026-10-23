import { copilotAgentsAddSelectedRepoToOrgSecret } from './add-selected-repo-to-org-secret';
import { copilotAgentsAddSelectedRepoToOrgVariable } from './add-selected-repo-to-org-variable';
import { copilotAgentsCreateOrUpdateOrgSecret } from './create-or-update-org-secret';
import { copilotAgentsCreateOrUpdateRepoSecret } from './create-or-update-repo-secret';
import { copilotAgentsCreateOrgVariable } from './create-org-variable';
import { copilotAgentsCreateRepoVariable } from './create-repo-variable';
import { copilotAgentsDeleteOrgSecret } from './delete-org-secret';
import { copilotAgentsDeleteOrgVariable } from './delete-org-variable';
import { copilotAgentsDeleteRepoSecret } from './delete-repo-secret';
import { copilotAgentsDeleteRepoVariable } from './delete-repo-variable';
import { copilotAgentsGetOrgPublicKey } from './get-org-public-key';
import { copilotAgentsGetOrgSecret } from './get-org-secret';
import { copilotAgentsGetOrgVariable } from './get-org-variable';
import { copilotAgentsGetRepoPublicKey } from './get-repo-public-key';
import { copilotAgentsGetRepoSecret } from './get-repo-secret';
import { copilotAgentsGetRepoVariable } from './get-repo-variable';
import { copilotAgentsListOrgSecrets } from './list-org-secrets';
import { copilotAgentsListOrgVariables } from './list-org-variables';
import { copilotAgentsListRepoOrganizationSecrets } from './list-repo-organization-secrets';
import { copilotAgentsListRepoOrganizationVariables } from './list-repo-organization-variables';
import { copilotAgentsListRepoSecrets } from './list-repo-secrets';
import { copilotAgentsListRepoVariables } from './list-repo-variables';
import { copilotAgentsListSelectedReposForOrgSecret } from './list-selected-repos-for-org-secret';
import { copilotAgentsListSelectedReposForOrgVariable } from './list-selected-repos-for-org-variable';
import { copilotAgentsRemoveSelectedRepoFromOrgSecret } from './remove-selected-repo-from-org-secret';
import { copilotAgentsRemoveSelectedRepoFromOrgVariable } from './remove-selected-repo-from-org-variable';
import { copilotAgentsSetSelectedReposForOrgSecret } from './set-selected-repos-for-org-secret';
import { copilotAgentsSetSelectedReposForOrgVariable } from './set-selected-repos-for-org-variable';
import { copilotAgentsUpdateOrgVariable } from './update-org-variable';
import { copilotAgentsUpdateRepoVariable } from './update-repo-variable';

export const copilotAgentsTools = [
  copilotAgentsAddSelectedRepoToOrgSecret,
  copilotAgentsAddSelectedRepoToOrgVariable,
  copilotAgentsCreateOrUpdateOrgSecret,
  copilotAgentsCreateOrUpdateRepoSecret,
  copilotAgentsCreateOrgVariable,
  copilotAgentsCreateRepoVariable,
  copilotAgentsDeleteOrgSecret,
  copilotAgentsDeleteOrgVariable,
  copilotAgentsDeleteRepoSecret,
  copilotAgentsDeleteRepoVariable,
  copilotAgentsGetOrgPublicKey,
  copilotAgentsGetOrgSecret,
  copilotAgentsGetOrgVariable,
  copilotAgentsGetRepoPublicKey,
  copilotAgentsGetRepoSecret,
  copilotAgentsGetRepoVariable,
  copilotAgentsListOrgSecrets,
  copilotAgentsListOrgVariables,
  copilotAgentsListRepoOrganizationSecrets,
  copilotAgentsListRepoOrganizationVariables,
  copilotAgentsListRepoSecrets,
  copilotAgentsListRepoVariables,
  copilotAgentsListSelectedReposForOrgSecret,
  copilotAgentsListSelectedReposForOrgVariable,
  copilotAgentsRemoveSelectedRepoFromOrgSecret,
  copilotAgentsRemoveSelectedRepoFromOrgVariable,
  copilotAgentsSetSelectedReposForOrgSecret,
  copilotAgentsSetSelectedReposForOrgVariable,
  copilotAgentsUpdateOrgVariable,
  copilotAgentsUpdateRepoVariable,
];
