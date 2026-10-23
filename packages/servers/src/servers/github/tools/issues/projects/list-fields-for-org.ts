import { defineTool } from "@usemcpkit/core";

export const issuesProjectsListFieldsForOrg = defineTool({
  name: "issues:projects:list_fields_for_org",
  description: "List project fields for organization. List all fields for a specific organization-owned project.",
  input: {
    type: "object",
    properties: {
      project_number: {
        type: "integer",
        description: "The project's number.",
      },
      org: {
        type: "string",
        description: "The organization name. The name is not case sensitive.",
      },
      per_page: {
        type: "integer",
        default: 30,
        description:
          'The number of results per page (max 100). For more information, see "Using pagination in the REST API."',
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
    },
    required: ["project_number", "org"],
  },
  request: {
    method: "GET",
    path: "/orgs/{org}/projectsV2/{project_number}/fields",
    query: ["per_page", "before", "after"],
  },
});
