import { defineTool } from "@usemcpkit/core";

export const metaJiraForgeSubscriptionsListIntegrationsJiraForgeSubscriptions = defineTool({
  name: "meta:jira_forge_subscriptions:list_integrations_jira_forge_subscriptions",
  description:
    "List GitLab for Jira (Forge) namespace subscriptions. Lists the GitLab namespaces subscribed to the Forge installation.",
  input: {
    type: "object",
    properties: {},
  },
  request: {
    method: "GET",
    path: "/integrations/jira_forge/subscriptions",
  },
});
