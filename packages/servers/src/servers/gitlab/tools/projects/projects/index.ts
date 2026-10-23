import { projectsProjectsCreateProjectsAiAgentAuditEvents } from "./create-projects-ai-agent-audit-events";
import { projectsProjectsCreateProjectsAiAgentIdentities } from "./create-projects-ai-agent-identities";
import { projectsProjectsCreateProjectsAiAgentSessions } from "./create-projects-ai-agent-sessions";
import { projectsProjectsCreateProjectsArchive } from "./create-projects-archive";
import { projectsProjectsCreateProjectsCreateCiConfig } from "./create-projects-create-ci-config";
import { projectsProjectsCreateProjectsFork } from "./create-projects-fork";
import { projectsProjectsCreateProjectsForkPost } from "./create-projects-fork-post";
import { projectsProjectsCreateProjectsHousekeeping } from "./create-projects-housekeeping";
import { projectsProjectsCreateProjectsImportProjectMembers } from "./create-projects-import-project-members";
import { projectsProjectsCreateProjectsIssues } from "./create-projects-issues";
import { projectsProjectsCreateProjectsIssuesClone } from "./create-projects-issues-clone";
import { projectsProjectsCreateProjectsIssuesMove } from "./create-projects-issues-move";
import { projectsProjectsCreateProjectsPackagesProtectionRules } from "./create-projects-packages-protection-rules";
import { projectsProjectsCreateProjectsRegistryProtectionRepositoryRules } from "./create-projects-registry-protection-repository-rules";
import { projectsProjectsCreateProjectsRegistryProtectionTagRules } from "./create-projects-registry-protection-tag-rules";
import { projectsProjectsCreateProjectsRepositorySize } from "./create-projects-repository-size";
import { projectsProjectsCreateProjectsRestore } from "./create-projects-restore";
import { projectsProjectsCreateProjectsShare } from "./create-projects-share";
import { projectsProjectsCreateProjectsStar } from "./create-projects-star";
import { projectsProjectsCreateProjectsTerraformStateProtectionRules } from "./create-projects-terraform-state-protection-rules";
import { projectsProjectsCreateProjectsUnarchive } from "./create-projects-unarchive";
import { projectsProjectsCreateProjectsUnstar } from "./create-projects-unstar";
import { projectsProjectsCreateProjectsUploadsAuthorize } from "./create-projects-uploads-authorize";
import { projectsProjectsDeleteProjects } from "./delete-projects";
import { projectsProjectsDeleteProjectsFork } from "./delete-projects-fork";
import { projectsProjectsDeleteProjectsIssues } from "./delete-projects-issues";
import { projectsProjectsDeleteProjectsPackagesProtectionRules } from "./delete-projects-packages-protection-rules";
import { projectsProjectsDeleteProjectsRegistryProtectionRepositoryRules } from "./delete-projects-registry-protection-repository-rules";
import { projectsProjectsDeleteProjectsRegistryProtectionTagRules } from "./delete-projects-registry-protection-tag-rules";
import { projectsProjectsDeleteProjectsShare } from "./delete-projects-share";
import { projectsProjectsDeleteProjectsTerraformStateProtectionRules } from "./delete-projects-terraform-state-protection-rules";
import { projectsProjectsDeleteProjectsUploads } from "./delete-projects-uploads";
import { projectsProjectsDeleteProjectsUploadsDelete } from "./delete-projects-uploads-delete";
import { projectsProjectsGetProjects } from "./get-projects";
import { projectsProjectsGetProjectsAuditEvents } from "./get-projects-audit-events";
import { projectsProjectsGetProjectsIssues } from "./get-projects-issues";
import { projectsProjectsGetProjectsIssuesStatistics } from "./get-projects-issues-statistics";
import { projectsProjectsGetProjectsLanguages } from "./get-projects-languages";
import { projectsProjectsGetProjectsPagesAccess } from "./get-projects-pages-access";
import { projectsProjectsGetProjectsStatistics } from "./get-projects-statistics";
import { projectsProjectsGetProjectsStorage } from "./get-projects-storage";
import { projectsProjectsGetProjectsUploads } from "./get-projects-uploads";
import { projectsProjectsGetProjectsUploadsGet } from "./get-projects-uploads-get";
import { projectsProjectsListProjects } from "./list-projects";
import { projectsProjectsListProjectsAiAgentSessions } from "./list-projects-ai-agent-sessions";
import { projectsProjectsListProjectsAuditEvents } from "./list-projects-audit-events";
import { projectsProjectsListProjectsForks } from "./list-projects-forks";
import { projectsProjectsListProjectsGroups } from "./list-projects-groups";
import { projectsProjectsListProjectsInvitedGroups } from "./list-projects-invited-groups";
import { projectsProjectsListProjectsIssues } from "./list-projects-issues";
import { projectsProjectsListProjectsIssuesClosedBy } from "./list-projects-issues-closed-by";
import { projectsProjectsListProjectsPackagesProtectionRules } from "./list-projects-packages-protection-rules";
import { projectsProjectsListProjectsRegistryProtectionRepositoryRules } from "./list-projects-registry-protection-repository-rules";
import { projectsProjectsListProjectsRegistryProtectionTagRules } from "./list-projects-registry-protection-tag-rules";
import { projectsProjectsListProjectsSecuritySettings } from "./list-projects-security-settings";
import { projectsProjectsListProjectsShareLocations } from "./list-projects-share-locations";
import { projectsProjectsListProjectsStarrers } from "./list-projects-starrers";
import { projectsProjectsListProjectsTerraformStateProtectionRules } from "./list-projects-terraform-state-protection-rules";
import { projectsProjectsListProjectsTransferLocations } from "./list-projects-transfer-locations";
import { projectsProjectsListProjectsUploads } from "./list-projects-uploads";
import { projectsProjectsListProjectsUsers } from "./list-projects-users";
import { projectsProjectsListUsersContributedProjects } from "./list-users-contributed-projects";
import { projectsProjectsListUsersProjects } from "./list-users-projects";
import { projectsProjectsListUsersStarredProjects } from "./list-users-starred-projects";
import { projectsProjectsUpdateProjectsAiAgentSessions } from "./update-projects-ai-agent-sessions";
import { projectsProjectsUpdateProjectsIssues } from "./update-projects-issues";
import { projectsProjectsUpdateProjectsIssuesReorder } from "./update-projects-issues-reorder";
import { projectsProjectsUpdateProjectsPackagesProtectionRules } from "./update-projects-packages-protection-rules";
import { projectsProjectsUpdateProjectsRegistryProtectionRepositoryRules } from "./update-projects-registry-protection-repository-rules";
import { projectsProjectsUpdateProjectsRegistryProtectionTagRules } from "./update-projects-registry-protection-tag-rules";
import { projectsProjectsUpdateProjectsSecuritySettings } from "./update-projects-security-settings";
import { projectsProjectsUpdateProjectsTerraformStateProtectionRules } from "./update-projects-terraform-state-protection-rules";
import { projectsProjectsUpdateProjectsTransfer } from "./update-projects-transfer";

export const projectsProjectsTools = [
  projectsProjectsCreateProjectsAiAgentAuditEvents,
  projectsProjectsCreateProjectsAiAgentIdentities,
  projectsProjectsCreateProjectsAiAgentSessions,
  projectsProjectsCreateProjectsArchive,
  projectsProjectsCreateProjectsCreateCiConfig,
  projectsProjectsCreateProjectsFork,
  projectsProjectsCreateProjectsForkPost,
  projectsProjectsCreateProjectsHousekeeping,
  projectsProjectsCreateProjectsImportProjectMembers,
  projectsProjectsCreateProjectsIssues,
  projectsProjectsCreateProjectsIssuesClone,
  projectsProjectsCreateProjectsIssuesMove,
  projectsProjectsCreateProjectsPackagesProtectionRules,
  projectsProjectsCreateProjectsRegistryProtectionRepositoryRules,
  projectsProjectsCreateProjectsRegistryProtectionTagRules,
  projectsProjectsCreateProjectsRepositorySize,
  projectsProjectsCreateProjectsRestore,
  projectsProjectsCreateProjectsShare,
  projectsProjectsCreateProjectsStar,
  projectsProjectsCreateProjectsTerraformStateProtectionRules,
  projectsProjectsCreateProjectsUnarchive,
  projectsProjectsCreateProjectsUnstar,
  projectsProjectsCreateProjectsUploadsAuthorize,
  projectsProjectsDeleteProjects,
  projectsProjectsDeleteProjectsFork,
  projectsProjectsDeleteProjectsIssues,
  projectsProjectsDeleteProjectsPackagesProtectionRules,
  projectsProjectsDeleteProjectsRegistryProtectionRepositoryRules,
  projectsProjectsDeleteProjectsRegistryProtectionTagRules,
  projectsProjectsDeleteProjectsShare,
  projectsProjectsDeleteProjectsTerraformStateProtectionRules,
  projectsProjectsDeleteProjectsUploads,
  projectsProjectsDeleteProjectsUploadsDelete,
  projectsProjectsGetProjects,
  projectsProjectsGetProjectsAuditEvents,
  projectsProjectsGetProjectsIssues,
  projectsProjectsGetProjectsIssuesStatistics,
  projectsProjectsGetProjectsLanguages,
  projectsProjectsGetProjectsPagesAccess,
  projectsProjectsGetProjectsStatistics,
  projectsProjectsGetProjectsStorage,
  projectsProjectsGetProjectsUploads,
  projectsProjectsGetProjectsUploadsGet,
  projectsProjectsListProjects,
  projectsProjectsListProjectsAiAgentSessions,
  projectsProjectsListProjectsAuditEvents,
  projectsProjectsListProjectsForks,
  projectsProjectsListProjectsGroups,
  projectsProjectsListProjectsInvitedGroups,
  projectsProjectsListProjectsIssues,
  projectsProjectsListProjectsIssuesClosedBy,
  projectsProjectsListProjectsPackagesProtectionRules,
  projectsProjectsListProjectsRegistryProtectionRepositoryRules,
  projectsProjectsListProjectsRegistryProtectionTagRules,
  projectsProjectsListProjectsSecuritySettings,
  projectsProjectsListProjectsShareLocations,
  projectsProjectsListProjectsStarrers,
  projectsProjectsListProjectsTerraformStateProtectionRules,
  projectsProjectsListProjectsTransferLocations,
  projectsProjectsListProjectsUploads,
  projectsProjectsListProjectsUsers,
  projectsProjectsListUsersContributedProjects,
  projectsProjectsListUsersProjects,
  projectsProjectsListUsersStarredProjects,
  projectsProjectsUpdateProjectsAiAgentSessions,
  projectsProjectsUpdateProjectsIssues,
  projectsProjectsUpdateProjectsIssuesReorder,
  projectsProjectsUpdateProjectsPackagesProtectionRules,
  projectsProjectsUpdateProjectsRegistryProtectionRepositoryRules,
  projectsProjectsUpdateProjectsRegistryProtectionTagRules,
  projectsProjectsUpdateProjectsSecuritySettings,
  projectsProjectsUpdateProjectsTerraformStateProtectionRules,
  projectsProjectsUpdateProjectsTransfer,
];
