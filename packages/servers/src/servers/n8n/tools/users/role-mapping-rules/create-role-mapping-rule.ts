import { defineTool } from "@usemcpkit/core";

export const usersRoleMappingRulesCreateRoleMappingRule = defineTool({
  name: "users:role_mapping_rules:create_role_mapping_rule",
  description:
    "Create a role-mapping rule. Creates a rule that maps an identity-provider claim expression to a role. Set `type` to `instance` for a rule granting a global role, or `project` for a rule granting a project role on the projects named in `projectIds`. Omitting `order` appends the rule to the end of the evaluation order for its type.",
  input: {
    type: "object",
    properties: {
      expression: {
        type: "string",
      },
      role: {
        type: "string",
      },
      type: {
        type: "string",
        enum: ["instance", "project"],
      },
      order: {
        type: "integer",
      },
      projectIds: {
        type: "array",
        items: {
          type: "string",
        },
      },
    },
    required: ["expression", "role", "type"],
  },
  request: {
    method: "POST",
    path: "/role-mapping-rules",
    body: ["expression", "role", "type", "order", "projectIds"],
  },
});
