import { projectsAttestationsTools } from "./attestations";
import { projectsBadgesTools } from "./badges";
import { projectsBranchesTools } from "./branches";
import { projectsCommitStatusesTools } from "./commit-statuses";
import { projectsCommitsTools } from "./commits";
import { projectsDeployResourcesTools } from "./deploy-resources";
import { projectsFilesTools } from "./files";
import { projectsFreezePeriodsTools } from "./freeze-periods";
import { projectsGitlabPagesTools } from "./gitlab-pages";
import { projectsHooksTools } from "./hooks";
import { projectsImportsTools } from "./imports";
import { projectsIntegrationsTools } from "./integrations";
import { projectsKeysTools } from "./keys";
import { projectsNamespaceProjectsTools } from "./namespace-projects";
import { projectsProjectAliasTools } from "./project-alias";
import { projectsProjectGoogleCloudIntegrationTools } from "./project-google-cloud-integration";
import { projectsProjectImportTools } from "./project-import";
import { projectsProjectMirrorsTools } from "./project-mirrors";
import { projectsProjectSnapshotsTools } from "./project-snapshots";
import { projectsProjectTemplatesTools } from "./project-templates";
import { projectsProjectTopicsTools } from "./project-topics";
import { projectsProjectsTools } from "./projects";
import { projectsProjectsJobTokenScopeTools } from "./projects-job-token-scope";
import { projectsProtectedBranchesTools } from "./protected-branches";
import { projectsProtectedTagsTools } from "./protected-tags";
import { projectsPushRulesTools } from "./push-rules";
import { projectsReleasesTools } from "./releases";
import { projectsRemoteMirrorsTools } from "./remote-mirrors";
import { projectsRepositoriesTools } from "./repositories";
import { projectsSnippetsTools } from "./snippets";
import { projectsSubmodulesTools } from "./submodules";
import { projectsTagsTools } from "./tags";
import { projectsTemplatesTools } from "./templates";
import { projectsWebCommitsTools } from "./web-commits";
import { projectsWikisTools } from "./wikis";

export const projectsGroupTools = [
  ...projectsAttestationsTools,
  ...projectsBadgesTools,
  ...projectsBranchesTools,
  ...projectsCommitStatusesTools,
  ...projectsCommitsTools,
  ...projectsDeployResourcesTools,
  ...projectsFilesTools,
  ...projectsFreezePeriodsTools,
  ...projectsGitlabPagesTools,
  ...projectsHooksTools,
  ...projectsImportsTools,
  ...projectsIntegrationsTools,
  ...projectsKeysTools,
  ...projectsNamespaceProjectsTools,
  ...projectsProjectAliasTools,
  ...projectsProjectGoogleCloudIntegrationTools,
  ...projectsProjectImportTools,
  ...projectsProjectMirrorsTools,
  ...projectsProjectSnapshotsTools,
  ...projectsProjectTemplatesTools,
  ...projectsProjectTopicsTools,
  ...projectsProjectsJobTokenScopeTools,
  ...projectsProjectsTools,
  ...projectsProtectedBranchesTools,
  ...projectsProtectedTagsTools,
  ...projectsPushRulesTools,
  ...projectsReleasesTools,
  ...projectsRemoteMirrorsTools,
  ...projectsRepositoriesTools,
  ...projectsSnippetsTools,
  ...projectsSubmodulesTools,
  ...projectsTagsTools,
  ...projectsTemplatesTools,
  ...projectsWebCommitsTools,
  ...projectsWikisTools,
];
