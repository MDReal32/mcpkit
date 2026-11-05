import { defineTool } from "@usemcpkit/core";

export const usersRoleMappingRulesDeleteRoleMappingRule = defineTool({
  name: "users:role_mapping_rules:delete_role_mapping_rule",
  description:
    "Delete a role-mapping rule. Deletes a role-mapping rule. The remaining rules of the same type close the gap, so their `order` values stay a contiguous sequence starting at 0.",
  input: {
    type: "object",
    properties: {
      roleMappingRuleId: {
        type: "string",
        description: "The ID of the role mapping rule.",
      },
    },
    required: ["roleMappingRuleId"],
  },
  request: {
    method: "DELETE",
    path: "/role-mapping-rules/{roleMappingRuleId}",
  },
});
