import { defineTool } from "@usemcpkit/core";

export const securitySecurityAdvisoriesListGlobalAdvisories = defineTool({
  name: "security:security_advisories:list_global_advisories",
  description:
    "List global security advisories. Lists all global security advisories that match the specified parameters. If no other parameters are defined, the request will return only GitHub-reviewed advisories that are not malware.",
  input: {
    type: "object",
    properties: {
      ghsa_id: {
        type: "string",
        description:
          "If specified, only advisories with this GHSA (GitHub Security Advisory) identifier will be returned.",
      },
      type: {
        type: "string",
        default: "reviewed",
        enum: ["reviewed", "malware", "unreviewed"],
        description:
          "If specified, only advisories of this type will be returned. By default, a request with no other parameters defined will only return reviewed advisories that are not malware.",
      },
      cve_id: {
        type: "string",
        description:
          "If specified, only advisories with this CVE (Common Vulnerabilities and Exposures) identifier will be returned.",
      },
      ecosystem: {
        type: "string",
        description: "If specified, only advisories for these ecosystems will be returned.",
        enum: [
          "rubygems",
          "npm",
          "pip",
          "maven",
          "nuget",
          "composer",
          "go",
          "rust",
          "erlang",
          "actions",
          "pub",
          "other",
          "swift",
        ],
      },
      severity: {
        type: "string",
        enum: ["unknown", "low", "medium", "high", "critical"],
        description: "If specified, only advisories with these severities will be returned.",
      },
      cwes: {
        description: "If specified, only advisories with these Common Weakness Enumerations (CWEs) will be returned.",
      },
      is_withdrawn: {
        type: "boolean",
        description: "Whether to only return advisories that have been withdrawn.",
      },
      affects: {
        description:
          "If specified, only return advisories that affect any of `package` or `package@version`. A maximum of 1000 packages can be specified. If the query parameter causes the URL to exceed the maximum URL length supported by your client, you must specify fewer packages.",
      },
      published: {
        type: "string",
        description: "If specified, only return advisories that were published on a date or date range.",
      },
      updated: {
        type: "string",
        description: "If specified, only return advisories that were updated on a date or date range.",
      },
      modified: {
        type: "string",
        description: "If specified, only show advisories that were updated or published on a date or date range.",
      },
      epss_percentage: {
        type: "string",
        description:
          "If specified, only return advisories that have an EPSS percentage score that matches the provided value. The EPSS percentage represents the likelihood of a CVE being exploited.",
      },
      epss_percentile: {
        type: "string",
        description:
          "If specified, only return advisories that have an EPSS percentile score that matches the provided value. The EPSS percentile represents the relative rank of the CVE's likelihood of being exploited compared to other CVEs.",
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
      direction: {
        type: "string",
        default: "desc",
        enum: ["asc", "desc"],
        description: "The direction to sort the results by.",
      },
      per_page: {
        type: "integer",
        default: 30,
        description:
          'The number of results per page (max 100). For more information, see "Using pagination in the REST API."',
      },
      sort: {
        type: "string",
        default: "published",
        enum: ["updated", "published", "epss_percentage", "epss_percentile"],
        description: "The property to sort the results by.",
      },
    },
  },
  request: {
    method: "GET",
    path: "/advisories",
    query: [
      "ghsa_id",
      "type",
      "cve_id",
      "ecosystem",
      "severity",
      "cwes",
      "is_withdrawn",
      "affects",
      "published",
      "updated",
      "modified",
      "epss_percentage",
      "epss_percentile",
      "before",
      "after",
      "direction",
      "per_page",
      "sort",
    ],
  },
});
