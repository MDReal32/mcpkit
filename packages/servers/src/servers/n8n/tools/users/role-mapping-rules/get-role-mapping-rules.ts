import { defineTool } from "@usemcpkit/core";

export const usersRoleMappingRulesGetRoleMappingRules = defineTool({
  name: "users:role_mapping_rules:get_role_mapping_rules",
  description:
    "Retrieve role-mapping rules. Returns the configured role-mapping rules. `order` is the rule's evaluation position within its own `type`, so instance and project rules each have their own sequence starting at 0 — filter by `type` to retrieve a single evaluation order.",
  input: {
    type: "object",
    properties: {
      limit: {
        type: "number",
        default: 100,
        description: "The maximum number of items to return.",
      },
      cursor: {
        type: "string",
        description:
          'Paginate by setting the cursor parameter to the nextCursor attribute returned by the previous request\'s response. Default value fetches the first "page" of the collection. See pagination for more detail.',
      },
      type: {
        type: "string",
        enum: ["instance", "project"],
      },
    },
  },
  request: {
    method: "GET",
    path: "/role-mapping-rules",
    query: ["limit", "cursor", "type"],
  },
});
