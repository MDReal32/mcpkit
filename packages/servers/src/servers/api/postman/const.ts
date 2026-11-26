import type { UpstreamNameRule } from "@usemcpkit/core";
import { defineUI } from "@usemcpkit/core";

/** The Full mode (every Postman API tool); `/minimal` and `/code` serve smaller sets of the same tools. */
export const POSTMAN_MCP_URL = "https://mcp.postman.com/mcp";

export const POSTMAN_API_KEY_ENV = "POSTMAN_API_KEY";

export const POSTMAN_API_KEY_UI = defineUI({
  inputs: {
    [POSTMAN_API_KEY_ENV]: {
      label: "API key",
      placeholder: "PMAK-…",
      hint: "A Postman API key (Settings → API keys). The AI can do whatever the key's user can. You can also set the POSTMAN_API_KEY environment variable.",
    },
  },
  actions: [
    {
      type: "link",
      label: "Create an API key ↗",
      url: "https://go.postman.co/settings/me/api-keys",
    },
    {
      type: "link",
      label: "About this server ↗",
      url: "https://github.com/postmanlabs/postman-mcp-server",
    },
  ],
});

/**
 * Postman names its tools in camelCase (`createCollectionFolder`), so each rule captures only the leading verb, which
 * is already lowercase, and spells out the rest. A tool Postman adds later matches none and stays
 * `tools:<snake_case>`, which makes the server open as one flat list until a rule names it.
 */
export const POSTMAN_NAMING: readonly UpstreamNameRule[] = [
  { match: "^getCollections$", name: "collections:collections:list" },
  {
    match: "^(create|delete|generate|get|patch|put|duplicate|run)Collection$",
    name: "collections:collections:$1",
  },
  { match: "^getDuplicateCollectionTaskStatus$", name: "collections:duplicates:get_status" },
  { match: "^syncCollectionWithSpec$", name: "collections:collections:sync_with_spec" },
  { match: "^(get|update)CollectionTags$", name: "collections:tags:$1" },
  { match: "^getCollectionUpdatesTasks$", name: "collections:updates:list_tasks" },
  { match: "^getGeneratedCollectionSpecs$", name: "collections:specs:list_generated" },
  { match: "^getCollectionForks$", name: "collections:forks:list" },
  { match: "^getCollectionsForkedByUser$", name: "collections:forks:list_mine" },
  { match: "^getSourceCollectionStatus$", name: "collections:forks:get_source_status" },
  { match: "^pullCollectionChanges$", name: "collections:forks:pull" },
  { match: "^(create|merge)CollectionFork$", name: "collections:forks:$1" },
  { match: "^asyncMergePullCollectionFork$", name: "collections:forks:merge_or_pull" },
  { match: "^asyncMergePullCollectionTaskStatus$", name: "collections:forks:get_merge_status" },
  { match: "^(get|update)CollectionRoles$", name: "collections:roles:$1" },
  { match: "^getCollectionPullRequests$", name: "collections:pull_requests:list" },
  { match: "^createCollectionPullRequest$", name: "collections:pull_requests:create" },
  { match: "^(get|update|review)PullRequest$", name: "collections:pull_requests:$1" },
  { match: "^(create|delete|get|update|transfer)CollectionFolders?$", name: "collections:folders:$1" },
  { match: "^(create|delete|get|update|transfer)CollectionRequests?$", name: "collections:requests:$1" },
  { match: "^(create|delete|get|update|transfer)CollectionResponses?$", name: "collections:responses:$1" },
  { match: "^getCollectionComments$", name: "collections:comments:list" },
  { match: "^(create|delete|update)CollectionComment$", name: "collections:comments:$1" },
  { match: "^resolveCommentThread$", name: "collections:comments:resolve_thread" },
  { match: "^getFolderComments$", name: "collections:folder_comments:list" },
  { match: "^(create|delete|update)FolderComment$", name: "collections:folder_comments:$1" },
  { match: "^getRequestComments$", name: "collections:request_comments:list" },
  { match: "^(create|delete|update)RequestComment$", name: "collections:request_comments:$1" },
  { match: "^getResponseComments$", name: "collections:response_comments:list" },
  { match: "^(create|delete|update)ResponseComment$", name: "collections:response_comments:$1" },
  { match: "^(publish|unpublish)Documentation$", name: "collections:documentation:$1" },

  { match: "^getEnvironments$", name: "environments:environments:list" },
  { match: "^(create|delete|get|patch|put)Environment$", name: "environments:environments:$1" },
  { match: "^getEnvironmentForks$", name: "environments:forks:list" },
  { match: "^forkEnvironment$", name: "environments:forks:create" },
  { match: "^mergeEnvironmentFork$", name: "environments:forks:merge" },
  { match: "^pullEnvironment$", name: "environments:forks:pull" },

  { match: "^getMocks$", name: "mocks:mocks:list" },
  { match: "^(create|delete|get|update|publish|unpublish)Mock$", name: "mocks:mocks:$1" },
  { match: "^getMockServerResponses$", name: "mocks:responses:list" },
  { match: "^(create|delete|get|update)MockServerResponse$", name: "mocks:responses:$1" },

  { match: "^getMonitors$", name: "monitors:monitors:list" },
  { match: "^(create|delete|get|update|run)Monitor$", name: "monitors:monitors:$1" },
  { match: "^listMonitorExecutions$", name: "monitors:executions:list" },
  { match: "^listRunsForExecution$", name: "monitors:runs:list" },
  { match: "^getMonitorRunResults$", name: "monitors:runs:get_results" },

  { match: "^getPackages$", name: "packages:packages:list" },
  { match: "^(create|delete|get|update)Package$", name: "packages:packages:$1" },

  { match: "^getApiCatalogDiscoveryServices$", name: "catalog:discovery_services:list" },
  { match: "^postApiCatalogDiscoveryServices$", name: "catalog:discovery_services:create" },
  { match: "^getApiCatalogDiscoveryService$", name: "catalog:discovery_services:get" },
  { match: "^getApiCatalogServices$", name: "catalog:services:list" },
  { match: "^getApiCatalogService$", name: "catalog:services:get" },
  { match: "^getApiCatalogServiceEndpoints$", name: "catalog:services:list_endpoints" },
  { match: "^getApiCatalogServiceMonitorRuns$", name: "catalog:services:list_monitor_runs" },
  { match: "^getApiCatalogServiceSpecificationLints$", name: "catalog:services:list_spec_lints" },
  { match: "^getApiCatalogServiceCiRuns$", name: "catalog:services:list_ci_runs" },
  { match: "^getApiCatalogSystemEnvironments$", name: "catalog:system_environments:list" },
  { match: "^(create|get|update)ApiCatalogSystemEnvironment$", name: "catalog:system_environments:$1" },
  { match: "^getApiCatalogSystemEnvironmentAssociations$", name: "catalog:associations:list" },
  { match: "^(add|remove)ApiCatalogSystemEnvironmentAssociations$", name: "catalog:associations:$1" },

  { match: "^getAllRulesets$", name: "governance:rulesets:list" },
  { match: "^(create|delete|get|update)Ruleset$", name: "governance:rulesets:$1" },
  { match: "^getRulesetAssignments$", name: "governance:ruleset_assignments:list" },
  { match: "^(create|delete)RulesetAssignment$", name: "governance:ruleset_assignments:$1" },
  { match: "^getAllGovernanceGroups$", name: "governance:groups:list" },
  { match: "^(create|delete|update)GovernanceGroup$", name: "governance:groups:$1" },
  { match: "^getGovernanceGroupAssignments$", name: "governance:groups:list_assignments" },
  { match: "^getGovernanceGroupWorkspaces$", name: "governance:groups:list_workspaces" },
  { match: "^updateGovernanceGroupWorkspaces$", name: "governance:groups:update_workspaces" },
  { match: "^getAllCustomFunctions$", name: "governance:custom_functions:list" },
  { match: "^(create|delete|get|update)CustomFunction$", name: "governance:custom_functions:$1" },

  { match: "^getAllComponents$", name: "components:components:list" },
  { match: "^(create|get|update)Component$", name: "components:components:$1" },
  { match: "^(get|update)ComponentDraft$", name: "components:drafts:$1" },
  { match: "^getComponentVersions$", name: "components:versions:list" },
  { match: "^(create|get)ComponentVersion$", name: "components:versions:$1" },

  { match: "^getAllSpecs$", name: "specs:specs:list" },
  { match: "^(create|delete|get)Spec$", name: "specs:specs:$1" },
  { match: "^getSpecDefinition$", name: "specs:specs:get_definition" },
  { match: "^updateSpecProperties$", name: "specs:specs:update_properties" },
  { match: "^updateSpecSyncOptions$", name: "specs:specs:update_sync_options" },
  { match: "^syncSpecWithCollection$", name: "specs:specs:sync_with_collection" },
  { match: "^generateSpecFromCollection$", name: "specs:specs:generate_from_collection" },
  { match: "^getSpecCollections$", name: "specs:collections:list" },
  { match: "^getSpecFiles$", name: "specs:files:list" },
  { match: "^(create|delete|get|update)SpecFile$", name: "specs:files:$1" },
  { match: "^getSpecVersionTags$", name: "specs:version_tags:list" },
  { match: "^(create|get)SpecVersionTag$", name: "specs:version_tags:$1" },
  { match: "^getAsyncSpecTaskStatus$", name: "specs:tasks:get_status" },
  { match: "^getStatusOfAnAsyncApiTask$", name: "specs:tasks:get_api_task_status" },

  { match: "^getWorkspaces$", name: "workspaces:workspaces:list" },
  { match: "^(create|delete|get|update)Workspace$", name: "workspaces:workspaces:$1" },
  { match: "^transferWorkspaceToTeam$", name: "workspaces:workspaces:transfer_to_team" },
  { match: "^(get|update)WorkspaceGlobalVariables$", name: "workspaces:globals:$1" },
  { match: "^(get|update)WorkspaceTags$", name: "workspaces:tags:$1" },
  { match: "^getWorkspaceActivityFeed$", name: "workspaces:activity:list" },
  { match: "^transferWorkspaceElement$", name: "workspaces:elements:transfer" },
  { match: "^managePartnerWorkspaceInvites$", name: "workspaces:partner_invites:manage" },
  { match: "^getAllWorkspaceRoles$", name: "workspaces:roles:list" },
  { match: "^(get|update)WorkspaceRoles$", name: "workspaces:roles:$1" },
  { match: "^getWorkspaceUpdates$", name: "workspaces:updates:list" },
  { match: "^(create|delete|get|patch)WorkspaceUpdate$", name: "workspaces:updates:$1" },

  { match: "^listPrivateNetworkWorkspaces$", name: "network:workspaces:list" },
  { match: "^addWorkspaceToPrivateNetwork$", name: "network:workspaces:add" },
  { match: "^removeWorkspaceFromPrivateNetwork$", name: "network:workspaces:remove" },
  { match: "^listPrivateNetworkAddRequests$", name: "network:add_requests:list" },
  { match: "^respondPrivateNetworkAddRequest$", name: "network:add_requests:respond" },

  { match: "^detectedSecretsQueries$", name: "secrets:detected:query" },
  { match: "^getDetectedSecretsLocations$", name: "secrets:detected:list_locations" },
  { match: "^updateDetectedSecretResolutions$", name: "secrets:detected:update_resolutions" },
  { match: "^getSecretTypes$", name: "secrets:types:list" },

  { match: "^getAuditLogs$", name: "audit:logs:list" },
  { match: "^getAuditLogEventActions$", name: "audit:logs:list_event_actions" },

  { match: "^getSdks$", name: "sdks:sdks:list" },
  { match: "^(create|delete|get)Sdk$", name: "sdks:sdks:$1" },
  { match: "^getSdkDownloadUrl$", name: "sdks:sdks:get_download_url" },
  { match: "^getSdkGitConnections$", name: "sdks:git_connections:list" },
  { match: "^(create|get|update)SdkGitConnection$", name: "sdks:git_connections:$1" },
  { match: "^getSdkGitConnectionPullRequests$", name: "sdks:git_connections:list_pull_requests" },

  { match: "^getTeams$", name: "teams:teams:list" },
  { match: "^(create|get)Team$", name: "teams:teams:$1" },
  { match: "^(get|update)TeamSettings$", name: "teams:settings:$1" },
  { match: "^getTeamAccessRequests$", name: "teams:access_requests:list" },
  { match: "^createAccessRequest$", name: "teams:access_requests:create" },
  { match: "^approveDenyAccessRequest$", name: "teams:access_requests:respond" },
  { match: "^manageTeamMemberRoles$", name: "teams:members:manage_roles" },
  { match: "^removeTeamMembers$", name: "teams:members:remove" },
  { match: "^getTeamUsers$", name: "teams:users:list" },
  { match: "^getTeamUser$", name: "teams:users:get" },
  { match: "^getAuthenticatedUser$", name: "teams:users:get_me" },
  { match: "^getGroups$", name: "teams:groups:list" },
  { match: "^getGroup$", name: "teams:groups:get" },

  { match: "^getTaggedEntities$", name: "search:tags:list_entities" },
  { match: "^searchPostmanElements$", name: "search:elements:search" },
  { match: "^searchLearningCenter$", name: "search:learning_center:search" },

  { match: "^getAnalyticsData$", name: "analytics:data:get" },
  { match: "^getAnalyticsMetadata$", name: "analytics:metadata:get" },

  { match: "^submitContextGraphAsk$", name: "guides:context_graph:submit_ask" },
  { match: "^getContextGraphAsk$", name: "guides:context_graph:get_ask" },
  { match: "^getPostmanContextOverview$", name: "guides:context:get_overview" },
  { match: "^getCodeGenerationInstructions$", name: "guides:instructions:code_generation" },
  { match: "^getApiDiscoveryInstructions$", name: "guides:instructions:api_discovery" },
  { match: "^getInstalledApiMaintenanceInstructions$", name: "guides:instructions:api_maintenance" },
  { match: "^getEnabledTools$", name: "guides:tools:list_enabled" },
];
