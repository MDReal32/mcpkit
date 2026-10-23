import { defineTool } from "@usemcpkit/core";

export const securitySecurityAdvisoriesListRepositoryAdvisories = defineTool({
  name: "security:security_advisories:list_repository_advisories",
  description: "List repository security advisories. Lists security advisories in a repository.",
  input: {
    type: "object",
    properties: {
      owner: {
        type: "string",
        description: "The account owner of the repository. The name is not case sensitive.",
      },
      repo: {
        type: "string",
        description: "The name of the repository without the `.git` extension. The name is not case sensitive.",
      },
      direction: {
        type: "string",
        default: "desc",
        enum: ["asc", "desc"],
        description: "The direction to sort the results by.",
      },
      sort: {
        type: "string",
        default: "created",
        enum: ["created", "updated", "published"],
        description: "The property to sort the results by.",
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
          'The number of advisories to return per page. For more information, see "Using pagination in the REST API."',
      },
      state: {
        type: "string",
        enum: ["triage", "draft", "published", "closed"],
        description: "Filter by state of the repository advisories. Only advisories of this state will be returned.",
      },
    },
    required: ["owner", "repo"],
  },
  request: {
    method: "GET",
    path: "/repos/{owner}/{repo}/security-advisories",
    query: ["direction", "sort", "before", "after", "per_page", "state"],
  },
});
