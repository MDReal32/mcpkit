import { defineTool } from "@usemcpkit/core";

export const securityDependabotListAlertsForOrg = defineTool({
  name: "security:dependabot:list_alerts_for_org",
  description: "List Dependabot alerts for an organization. Lists Dependabot alerts for an organization.",
  input: {
    type: "object",
    properties: {
      org: {
        type: "string",
        description: "The organization name. The name is not case sensitive.",
      },
      classification: {
        type: "string",
        description:
          "A comma-separated list of vulnerability classifications. If specified, only alerts for vulnerabilities with these classifications will be returned.",
      },
      state: {
        type: "string",
        description: "A comma-separated list of states. If specified, only alerts with these states will be returned.",
      },
      severity: {
        type: "string",
        description:
          "A comma-separated list of severities. If specified, only alerts with these severities will be returned.",
      },
      ecosystem: {
        type: "string",
        description:
          "A comma-separated list of ecosystems. If specified, only alerts for these ecosystems will be returned.",
      },
      package: {
        type: "string",
        description:
          "A comma-separated list of package names. If specified, only alerts for these packages will be returned.",
      },
      epss_percentage: {
        type: "string",
        description:
          "CVE Exploit Prediction Scoring System (EPSS) percentage. Can be specified as: - An exact number (`n`) - Comparators such as `>n`, `<n`, `>=n`, `<=n` - A range like `n..n`, where `n` is a number from 0.0 to 1.0",
      },
      artifact_registry_url: {
        type: "string",
        description:
          "A comma-separated list of artifact registry URLs. If specified, only alerts for repositories with storage records matching these URLs will be returned.",
      },
      artifact_registry: {
        type: "string",
        description:
          "A comma-separated list of Artifact Registry name strings. If specified, only alerts for repositories with storage records matching these registries will be returned.",
      },
      has: {
        description:
          "Filters the list of alerts based on whether the alert has the given value. If specified, only alerts meeting this criterion will be returned. Multiple `has` filters can be passed to filter for alerts that have all of the values.",
      },
      assignee: {
        type: "string",
        description:
          "Filter alerts by assignees. Provide a comma-separated list of user handles (e.g., `octocat` or `octocat,hubot`) to return alerts assigned to any of the specified users. Use `*` to list alerts with at least one assignee or `none` to list alerts with no assignees.",
      },
      runtime_risk: {
        type: "string",
        description:
          "A comma-separated list of runtime risk strings. If specified, only alerts for repositories with deployment records matching these risks will be returned.",
      },
      scope: {
        type: "string",
        enum: ["development", "runtime"],
        description:
          "The scope of the vulnerable dependency. If specified, only alerts with this scope will be returned.",
      },
      relationship: {
        type: "string",
        description:
          "A comma-separated list of relationships of the vulnerable dependency to your project. If specified, only alerts with these relationships will be returned.",
      },
      sort: {
        type: "string",
        default: "created",
        enum: ["created", "updated", "epss_percentage"],
        description:
          "The property by which to sort the results. `created` means when the alert was created. `updated` means when the alert's state last changed. `epss_percentage` sorts alerts by the Exploit Prediction Scoring System (EPSS) percentage.",
      },
      direction: {
        type: "string",
        default: "desc",
        enum: ["asc", "desc"],
        description: "The direction to sort the results by.",
      },
      before: {
        type: "string",
        description:
          'A cursor, as given in the Link header. If specified, the query only searches for results before this cursor. For more information, see "Using pagination in the REST API."',
      },
      after: {
        type: "string",
        description:
          'A cursor, as given in the Link header. If specified, the query only searches for results after this cursor. For more information, see "Using pagination in the REST API."',
      },
      per_page: {
        type: "integer",
        default: 30,
        description:
          'The number of results per page (max 100). For more information, see "Using pagination in the REST API."',
      },
    },
    required: ["org"],
  },
  request: {
    method: "GET",
    path: "/orgs/{org}/dependabot/alerts",
    query: [
      "classification",
      "state",
      "severity",
      "ecosystem",
      "package",
      "epss_percentage",
      "artifact_registry_url",
      "artifact_registry",
      "has",
      "assignee",
      "runtime_risk",
      "scope",
      "relationship",
      "sort",
      "direction",
      "before",
      "after",
      "per_page",
    ],
  },
});
