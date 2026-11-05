import { defineTool } from "@usemcpkit/core";

export const usersRoleMappingRulesUpdateRoleMappingRule = defineTool({
  name: "users:role_mapping_rules:update_role_mapping_rule",
  description:
    "Update a role-mapping rule. Updates a rule's claim expression, role, and/or project assignments. A rule's type cannot be changed once created, so `type` isn't accepted here, and reordering is handled by the move endpoint.",
  input: {
    type: "object",
    properties: {
      roleMappingRuleId: {
        type: "string",
        description: "The ID of the role mapping rule.",
      },
      expression: {
        type: "string",
      },
      role: {
        type: "string",
      },
      projectIds: {
        type: "array",
        items: {
          type: "string",
        },
      },
    },
    required: ["roleMappingRuleId"],
  },
  request: {
    method: "PATCH",
    path: "/role-mapping-rules/{roleMappingRuleId}",
    body: ["expression", "role", "projectIds"],
  },
});
