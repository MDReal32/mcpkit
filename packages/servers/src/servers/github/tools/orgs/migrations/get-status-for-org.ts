import { defineTool } from "@usemcpkit/core";

export const orgsMigrationsGetStatusForOrg = defineTool({
  name: "orgs:migrations:get_status_for_org",
  description: "Get an organization migration status. Fetches the status of a migration.",
  input: {
    type: "object",
    properties: {
      org: {
        type: "string",
        description: "The organization name. The name is not case sensitive.",
      },
      migration_id: {
        type: "integer",
        description: "The unique identifier of the migration.",
      },
      exclude: {
        type: "string",
        description: "Exclude attributes from the API response to improve performance (comma-separated)",
      },
    },
    required: ["org", "migration_id"],
  },
  request: {
    method: "GET",
    path: "/orgs/{org}/migrations/{migration_id}",
    query: ["exclude"],
  },
});
