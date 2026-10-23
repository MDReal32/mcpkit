import { defineGithubServer } from '../../../providers/github';

import { agentAutomationsCreateRepoAutomation } from './tools/agent-automations/create-repo-automation';
import { agentAutomationsDeleteRepoAutomation } from './tools/agent-automations/delete-repo-automation';
import { agentAutomationsEditRepoAutomation } from './tools/agent-automations/edit-repo-automation';
import { agentAutomationsGetAutomation } from './tools/agent-automations/get-automation';
import { agentAutomationsGetRepoAutomation } from './tools/agent-automations/get-repo-automation';
import { agentAutomationsListAutomationTasks } from './tools/agent-automations/list-automation-tasks';
import { agentAutomationsListAutomations } from './tools/agent-automations/list-automations';
import { agentAutomationsListAvailableAutomationTools } from './tools/agent-automations/list-available-automation-tools';
import { agentAutomationsListAvailableAutomationTriggers } from './tools/agent-automations/list-available-automation-triggers';
import { agentAutomationsListRepoAutomations } from './tools/agent-automations/list-repo-automations';
import { agentTasksCreateTaskInRepo } from './tools/agent-tasks/create-task-in-repo';
import { agentTasksGetTaskById } from './tools/agent-tasks/get-task-by-id';
import { agentTasksGetTaskByRepoAndId } from './tools/agent-tasks/get-task-by-repo-and-id';
import { agentTasksListTasks } from './tools/agent-tasks/list-tasks';
import { agentTasksListTasksForRepo } from './tools/agent-tasks/list-tasks-for-repo';
import { agentsAddSelectedRepoToOrgSecret } from './tools/agents/add-selected-repo-to-org-secret';
import { agentsAddSelectedRepoToOrgVariable } from './tools/agents/add-selected-repo-to-org-variable';
import { agentsCreateOrUpdateOrgSecret } from './tools/agents/create-or-update-org-secret';
import { agentsCreateOrUpdateRepoSecret } from './tools/agents/create-or-update-repo-secret';
import { agentsCreateOrgVariable } from './tools/agents/create-org-variable';
import { agentsCreateRepoVariable } from './tools/agents/create-repo-variable';
import { agentsDeleteOrgSecret } from './tools/agents/delete-org-secret';
import { agentsDeleteOrgVariable } from './tools/agents/delete-org-variable';
import { agentsDeleteRepoSecret } from './tools/agents/delete-repo-secret';
import { agentsDeleteRepoVariable } from './tools/agents/delete-repo-variable';
import { agentsGetOrgPublicKey } from './tools/agents/get-org-public-key';
import { agentsGetOrgSecret } from './tools/agents/get-org-secret';
import { agentsGetOrgVariable } from './tools/agents/get-org-variable';
import { agentsGetRepoPublicKey } from './tools/agents/get-repo-public-key';
import { agentsGetRepoSecret } from './tools/agents/get-repo-secret';
import { agentsGetRepoVariable } from './tools/agents/get-repo-variable';
import { agentsListOrgSecrets } from './tools/agents/list-org-secrets';
import { agentsListOrgVariables } from './tools/agents/list-org-variables';
import { agentsListRepoOrganizationSecrets } from './tools/agents/list-repo-organization-secrets';
import { agentsListRepoOrganizationVariables } from './tools/agents/list-repo-organization-variables';
import { agentsListRepoSecrets } from './tools/agents/list-repo-secrets';
import { agentsListRepoVariables } from './tools/agents/list-repo-variables';
import { agentsListSelectedReposForOrgSecret } from './tools/agents/list-selected-repos-for-org-secret';
import { agentsListSelectedReposForOrgVariable } from './tools/agents/list-selected-repos-for-org-variable';
import { agentsRemoveSelectedRepoFromOrgSecret } from './tools/agents/remove-selected-repo-from-org-secret';
import { agentsRemoveSelectedRepoFromOrgVariable } from './tools/agents/remove-selected-repo-from-org-variable';
import { agentsSetSelectedReposForOrgSecret } from './tools/agents/set-selected-repos-for-org-secret';
import { agentsSetSelectedReposForOrgVariable } from './tools/agents/set-selected-repos-for-org-variable';
import { agentsUpdateOrgVariable } from './tools/agents/update-org-variable';
import { agentsUpdateRepoVariable } from './tools/agents/update-repo-variable';
import { copilotAddCopilotSeatsForTeams } from './tools/copilot/add-copilot-seats-for-teams';
import { copilotAddCopilotSeatsForUsers } from './tools/copilot/add-copilot-seats-for-users';
import { copilotAddOrganizationsToEnterpriseCodingAgentPolicy } from './tools/copilot/add-organizations-to-enterprise-coding-agent-policy';
import { copilotCancelCopilotSeatAssignmentForTeams } from './tools/copilot/cancel-copilot-seat-assignment-for-teams';
import { copilotCancelCopilotSeatAssignmentForUsers } from './tools/copilot/cancel-copilot-seat-assignment-for-users';
import { copilotCopilotContentExclusionForOrganization } from './tools/copilot/copilot-content-exclusion-for-organization';
import { copilotCopilotEnterpriseOneDayUsageMetrics } from './tools/copilot/copilot-enterprise-one-day-usage-metrics';
import { copilotCopilotEnterpriseReposOneDayReport } from './tools/copilot/copilot-enterprise-repos-one-day-report';
import { copilotCopilotEnterpriseUsageMetrics } from './tools/copilot/copilot-enterprise-usage-metrics';
import { copilotCopilotEnterpriseUserTeamsOneDayReport } from './tools/copilot/copilot-enterprise-user-teams-one-day-report';
import { copilotCopilotOrganizationOneDayUsageMetrics } from './tools/copilot/copilot-organization-one-day-usage-metrics';
import { copilotCopilotOrganizationReposOneDayReport } from './tools/copilot/copilot-organization-repos-one-day-report';
import { copilotCopilotOrganizationUsageMetrics } from './tools/copilot/copilot-organization-usage-metrics';
import { copilotCopilotOrganizationUserTeamsOneDayReport } from './tools/copilot/copilot-organization-user-teams-one-day-report';
import { copilotCopilotOrganizationUsersOneDayUsageMetrics } from './tools/copilot/copilot-organization-users-one-day-usage-metrics';
import { copilotCopilotOrganizationUsersUsageMetrics } from './tools/copilot/copilot-organization-users-usage-metrics';
import { copilotCopilotUsersOneDayUsageMetrics } from './tools/copilot/copilot-users-one-day-usage-metrics';
import { copilotCopilotUsersUsageMetrics } from './tools/copilot/copilot-users-usage-metrics';
import { copilotDisableCopilotCodingAgentForRepositoryInOrganization } from './tools/copilot/disable-copilot-coding-agent-for-repository-in-organization';
import { copilotEnableCopilotCodingAgentForRepositoryInOrganization } from './tools/copilot/enable-copilot-coding-agent-for-repository-in-organization';
import { copilotGetCopilotCloudAgentConfiguration } from './tools/copilot/get-copilot-cloud-agent-configuration';
import { copilotGetCopilotCodingAgentPermissionsOrganization } from './tools/copilot/get-copilot-coding-agent-permissions-organization';
import { copilotGetCopilotOrganizationDetails } from './tools/copilot/get-copilot-organization-details';
import { copilotGetCopilotSeatDetailsForUser } from './tools/copilot/get-copilot-seat-details-for-user';
import { copilotListCopilotCodingAgentSelectedRepositoriesForOrganization } from './tools/copilot/list-copilot-coding-agent-selected-repositories-for-organization';
import { copilotListCopilotSeats } from './tools/copilot/list-copilot-seats';
import { copilotRemoveOrganizationsFromEnterpriseCodingAgentPolicy } from './tools/copilot/remove-organizations-from-enterprise-coding-agent-policy';
import { copilotSetCopilotCodingAgentPermissionsOrganization } from './tools/copilot/set-copilot-coding-agent-permissions-organization';
import { copilotSetCopilotCodingAgentSelectedRepositoriesForOrganization } from './tools/copilot/set-copilot-coding-agent-selected-repositories-for-organization';
import { copilotSetEnterpriseCodingAgentPolicy } from './tools/copilot/set-enterprise-coding-agent-policy';
import { copilotSpacesAddCollaboratorForOrg } from './tools/copilot-spaces/add-collaborator-for-org';
import { copilotSpacesAddCollaboratorForUser } from './tools/copilot-spaces/add-collaborator-for-user';
import { copilotSpacesCreateForOrg } from './tools/copilot-spaces/create-for-org';
import { copilotSpacesCreateForUser } from './tools/copilot-spaces/create-for-user';
import { copilotSpacesCreateResourceForOrg } from './tools/copilot-spaces/create-resource-for-org';
import { copilotSpacesCreateResourceForUser } from './tools/copilot-spaces/create-resource-for-user';
import { copilotSpacesDeleteForOrg } from './tools/copilot-spaces/delete-for-org';
import { copilotSpacesDeleteForUser } from './tools/copilot-spaces/delete-for-user';
import { copilotSpacesDeleteResourceForOrg } from './tools/copilot-spaces/delete-resource-for-org';
import { copilotSpacesDeleteResourceForUser } from './tools/copilot-spaces/delete-resource-for-user';
import { copilotSpacesGetForOrg } from './tools/copilot-spaces/get-for-org';
import { copilotSpacesGetForUser } from './tools/copilot-spaces/get-for-user';
import { copilotSpacesGetResourceForOrg } from './tools/copilot-spaces/get-resource-for-org';
import { copilotSpacesGetResourceForUser } from './tools/copilot-spaces/get-resource-for-user';
import { copilotSpacesListCollaboratorsForOrg } from './tools/copilot-spaces/list-collaborators-for-org';
import { copilotSpacesListCollaboratorsForUser } from './tools/copilot-spaces/list-collaborators-for-user';
import { copilotSpacesListForOrg } from './tools/copilot-spaces/list-for-org';
import { copilotSpacesListForUser } from './tools/copilot-spaces/list-for-user';
import { copilotSpacesListResourcesForOrg } from './tools/copilot-spaces/list-resources-for-org';
import { copilotSpacesListResourcesForUser } from './tools/copilot-spaces/list-resources-for-user';
import { copilotSpacesRemoveCollaboratorForOrg } from './tools/copilot-spaces/remove-collaborator-for-org';
import { copilotSpacesRemoveCollaboratorForUser } from './tools/copilot-spaces/remove-collaborator-for-user';
import { copilotSpacesUpdateCollaboratorForOrg } from './tools/copilot-spaces/update-collaborator-for-org';
import { copilotSpacesUpdateCollaboratorForUser } from './tools/copilot-spaces/update-collaborator-for-user';
import { copilotSpacesUpdateForOrg } from './tools/copilot-spaces/update-for-org';
import { copilotSpacesUpdateForUser } from './tools/copilot-spaces/update-for-user';
import { copilotSpacesUpdateResourceForOrg } from './tools/copilot-spaces/update-resource-for-org';
import { copilotSpacesUpdateResourceForUser } from './tools/copilot-spaces/update-resource-for-user';

export const githubCopilot = defineGithubServer({
  name: 'github_copilot',
  description: 'GitHub REST API: Copilot, agents and automations.',
  tools: [
    agentAutomationsCreateRepoAutomation,
    agentAutomationsDeleteRepoAutomation,
    agentAutomationsEditRepoAutomation,
    agentAutomationsGetAutomation,
    agentAutomationsGetRepoAutomation,
    agentAutomationsListAutomationTasks,
    agentAutomationsListAutomations,
    agentAutomationsListAvailableAutomationTools,
    agentAutomationsListAvailableAutomationTriggers,
    agentAutomationsListRepoAutomations,
    agentTasksCreateTaskInRepo,
    agentTasksGetTaskById,
    agentTasksGetTaskByRepoAndId,
    agentTasksListTasks,
    agentTasksListTasksForRepo,
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
    copilotSpacesAddCollaboratorForOrg,
    copilotSpacesAddCollaboratorForUser,
    copilotSpacesCreateForOrg,
    copilotSpacesCreateForUser,
    copilotSpacesCreateResourceForOrg,
    copilotSpacesCreateResourceForUser,
    copilotSpacesDeleteForOrg,
    copilotSpacesDeleteForUser,
    copilotSpacesDeleteResourceForOrg,
    copilotSpacesDeleteResourceForUser,
    copilotSpacesGetForOrg,
    copilotSpacesGetForUser,
    copilotSpacesGetResourceForOrg,
    copilotSpacesGetResourceForUser,
    copilotSpacesListCollaboratorsForOrg,
    copilotSpacesListCollaboratorsForUser,
    copilotSpacesListForOrg,
    copilotSpacesListForUser,
    copilotSpacesListResourcesForOrg,
    copilotSpacesListResourcesForUser,
    copilotSpacesRemoveCollaboratorForOrg,
    copilotSpacesRemoveCollaboratorForUser,
    copilotSpacesUpdateCollaboratorForOrg,
    copilotSpacesUpdateCollaboratorForUser,
    copilotSpacesUpdateForOrg,
    copilotSpacesUpdateForUser,
    copilotSpacesUpdateResourceForOrg,
    copilotSpacesUpdateResourceForUser,
    copilotAddCopilotSeatsForTeams,
    copilotAddCopilotSeatsForUsers,
    copilotAddOrganizationsToEnterpriseCodingAgentPolicy,
    copilotCancelCopilotSeatAssignmentForTeams,
    copilotCancelCopilotSeatAssignmentForUsers,
    copilotCopilotContentExclusionForOrganization,
    copilotCopilotEnterpriseOneDayUsageMetrics,
    copilotCopilotEnterpriseReposOneDayReport,
    copilotCopilotEnterpriseUsageMetrics,
    copilotCopilotEnterpriseUserTeamsOneDayReport,
    copilotCopilotOrganizationOneDayUsageMetrics,
    copilotCopilotOrganizationReposOneDayReport,
    copilotCopilotOrganizationUsageMetrics,
    copilotCopilotOrganizationUserTeamsOneDayReport,
    copilotCopilotOrganizationUsersOneDayUsageMetrics,
    copilotCopilotOrganizationUsersUsageMetrics,
    copilotCopilotUsersOneDayUsageMetrics,
    copilotCopilotUsersUsageMetrics,
    copilotDisableCopilotCodingAgentForRepositoryInOrganization,
    copilotEnableCopilotCodingAgentForRepositoryInOrganization,
    copilotGetCopilotCloudAgentConfiguration,
    copilotGetCopilotCodingAgentPermissionsOrganization,
    copilotGetCopilotOrganizationDetails,
    copilotGetCopilotSeatDetailsForUser,
    copilotListCopilotCodingAgentSelectedRepositoriesForOrganization,
    copilotListCopilotSeats,
    copilotRemoveOrganizationsFromEnterpriseCodingAgentPolicy,
    copilotSetCopilotCodingAgentPermissionsOrganization,
    copilotSetCopilotCodingAgentSelectedRepositoriesForOrganization,
    copilotSetEnterpriseCodingAgentPolicy,
  ],
});
