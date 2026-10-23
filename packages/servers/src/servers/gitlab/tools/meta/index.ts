import { metaExperimentsTools } from './experiments';
import { metaFeaturesTools } from './features';
import { metaGlqlTools } from './glql';
import { metaInstanceTools } from './instance';
import { metaJiraConnectSubscriptionsTools } from './jira-connect-subscriptions';
import { metaJiraForgeInstallationTools } from './jira-forge-installation';
import { metaJiraForgeSubscriptionsTools } from './jira-forge-subscriptions';
import { metaJiraForgeUserDelegationTools } from './jira-forge-user-delegation';
import { metaMarkdownTools } from './markdown';
import { metaMcpTools } from './mcp';
import { metaMetadataTools } from './metadata';
import { metaMetricsTools } from './metrics';
import { metaUsageDataTools } from './usage-data';
import { metaVscodeTools } from './vscode';

export const metaGroupTools = [
  ...metaExperimentsTools,
  ...metaFeaturesTools,
  ...metaGlqlTools,
  ...metaInstanceTools,
  ...metaJiraConnectSubscriptionsTools,
  ...metaJiraForgeInstallationTools,
  ...metaJiraForgeSubscriptionsTools,
  ...metaJiraForgeUserDelegationTools,
  ...metaMarkdownTools,
  ...metaMcpTools,
  ...metaMetadataTools,
  ...metaMetricsTools,
  ...metaUsageDataTools,
  ...metaVscodeTools,
];
