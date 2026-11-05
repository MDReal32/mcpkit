import { nameUpstreamTool } from "@usemcpkit/core";
import { describe, expect, it } from "vitest";
import { postman } from "../src/servers/postman/postman";

/** The Full mode tools of github.com/postmanlabs/postman-mcp-server (`full` in `src/enabledResources.ts`, 2.15.0). */
const UPSTREAM_TOOLS =
  "createCollection deleteCollection generateCollection getCollection getCollections patchCollection putCollection getCollectionTags updateCollectionTags getCollectionUpdatesTasks syncCollectionWithSpec syncSpecWithCollection generateSpecFromCollection getGeneratedCollectionSpecs getSpecCollections getCollectionForks getSourceCollectionStatus getCollectionsForkedByUser pullCollectionChanges createCollectionFork mergeCollectionFork asyncMergePullCollectionFork asyncMergePullCollectionTaskStatus getCollectionRoles updateCollectionRoles getCollectionPullRequests createCollectionPullRequest getPullRequest updatePullRequest reviewPullRequest createCollectionFolder deleteCollectionFolder getCollectionFolder updateCollectionFolder transferCollectionFolders createCollectionRequest deleteCollectionRequest getCollectionRequest updateCollectionRequest transferCollectionRequests createCollectionResponse deleteCollectionResponse getCollectionResponse updateCollectionResponse transferCollectionResponses runCollection createCollectionComment deleteCollectionComment getCollectionComments updateCollectionComment createFolderComment deleteFolderComment getFolderComments updateFolderComment createRequestComment deleteRequestComment getRequestComments updateRequestComment createResponseComment deleteResponseComment getResponseComments updateResponseComment resolveCommentThread createEnvironment deleteEnvironment getEnvironment getEnvironments patchEnvironment putEnvironment getEnvironmentForks forkEnvironment mergeEnvironmentFork pullEnvironment createMock deleteMock getMock getMocks updateMock publishMock unpublishMock createMockServerResponse deleteMockServerResponse getMockServerResponse getMockServerResponses updateMockServerResponse createMonitor deleteMonitor getMonitor getMonitors updateMonitor runMonitor listMonitorExecutions listRunsForExecution getMonitorRunResults createPackage deletePackage getPackage getPackages updatePackage getApiCatalogDiscoveryServices postApiCatalogDiscoveryServices getApiCatalogDiscoveryService getApiCatalogServices getApiCatalogService getApiCatalogServiceEndpoints getApiCatalogServiceMonitorRuns getApiCatalogServiceSpecificationLints getApiCatalogServiceCiRuns getApiCatalogSystemEnvironments createApiCatalogSystemEnvironment getApiCatalogSystemEnvironment updateApiCatalogSystemEnvironment getApiCatalogSystemEnvironmentAssociations addApiCatalogSystemEnvironmentAssociations removeApiCatalogSystemEnvironmentAssociations getAllRulesets createRuleset getRuleset updateRuleset deleteRuleset getRulesetAssignments createRulesetAssignment deleteRulesetAssignment getAllGovernanceGroups createGovernanceGroup updateGovernanceGroup deleteGovernanceGroup getGovernanceGroupAssignments getGovernanceGroupWorkspaces updateGovernanceGroupWorkspaces getAllCustomFunctions createCustomFunction getCustomFunction updateCustomFunction deleteCustomFunction createComponent getAllComponents getComponent updateComponent getComponentDraft updateComponentDraft createComponentVersion getComponentVersions getComponentVersion createSpec deleteSpec getSpec getAllSpecs getSpecDefinition updateSpecProperties createSpecFile getSpecFile getSpecFiles updateSpecFile updateSpecSyncOptions getSpecVersionTags createSpecVersionTag getSpecVersionTag createWorkspace deleteWorkspace getWorkspace getWorkspaces updateWorkspace getWorkspaceGlobalVariables updateWorkspaceGlobalVariables getWorkspaceTags updateWorkspaceTags getWorkspaceActivityFeed transferWorkspaceElement transferWorkspaceToTeam managePartnerWorkspaceInvites getAllWorkspaceRoles getWorkspaceRoles updateWorkspaceRoles getWorkspaceUpdates createWorkspaceUpdate getWorkspaceUpdate patchWorkspaceUpdate deleteWorkspaceUpdate listPrivateNetworkWorkspaces listPrivateNetworkAddRequests removeWorkspaceFromPrivateNetwork addWorkspaceToPrivateNetwork respondPrivateNetworkAddRequest publishDocumentation unpublishDocumentation getAsyncSpecTaskStatus getStatusOfAnAsyncApiTask detectedSecretsQueries getDetectedSecretsLocations updateDetectedSecretResolutions getSecretTypes getAuditLogs getAuditLogEventActions getSdks createSdk getSdk deleteSdk getSdkDownloadUrl getSdkGitConnections createSdkGitConnection getSdkGitConnection updateSdkGitConnection getSdkGitConnectionPullRequests getTeams getTeam createTeam getTeamSettings updateTeamSettings getTeamAccessRequests createAccessRequest approveDenyAccessRequest manageTeamMemberRoles removeTeamMembers getAuthenticatedUser getTeamUsers getTeamUser getTaggedEntities getGroups getGroup getCodeGenerationInstructions getPostmanContextOverview getApiDiscoveryInstructions getInstalledApiMaintenanceInstructions duplicateCollection getDuplicateCollectionTaskStatus deleteSpecFile getEnabledTools searchPostmanElements searchLearningCenter getAnalyticsData getAnalyticsMetadata submitContextGraphAsk getContextGraphAsk".split(
    " ",
  );
const MAX_NAME_LENGTH = 51;

const naming = postman.upstream?.naming;

describe("postman naming rules", () => {
  const names = UPSTREAM_TOOLS.map((tool) => nameUpstreamTool(naming, tool));

  it("name every tool of the server as <group>:<resource>:<action>", () => {
    expect(UPSTREAM_TOOLS.filter((_, index) => names[index] === undefined)).toEqual([]);
  });

  it("never give two tools the same name", () => {
    expect(new Set(names).size).toBe(UPSTREAM_TOOLS.length);
  });

  it("keep every MCP tool name within the client's limit", () => {
    const tooLong = names.filter((name) => `api_postman_${name?.replaceAll(":", "_")}`.length > MAX_NAME_LENGTH);

    expect(tooLong).toEqual([]);
  });

  it("file a few tools where their object says", () => {
    expect(nameUpstreamTool(naming, "getCollections")).toBe("collections:collections:list");
    expect(nameUpstreamTool(naming, "transferCollectionRequests")).toBe("collections:requests:transfer");
    expect(nameUpstreamTool(naming, "createFolderComment")).toBe("collections:folder_comments:create");
    expect(nameUpstreamTool(naming, "putEnvironment")).toBe("environments:environments:put");
    expect(nameUpstreamTool(naming, "something_new")).toBeUndefined();
  });
});
