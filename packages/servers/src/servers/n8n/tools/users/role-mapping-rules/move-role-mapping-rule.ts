import { defineTool } from "@usemcpkit/core";

export const usersRoleMappingRulesMoveRoleMappingRule = defineTool({
  name: "users:role_mapping_rules:move_role_mapping_rule",
  description:
    "Move a role-mapping rule. Changes a rule's position in the evaluation order for its type. `targetIndex` is the desired 0-based position within the rule's own `type` sequence; a value beyond the last position moves the rule to the end.",
  input: {
    type: "object",
    properties: {
      roleMappingRuleId: {
        type: "string",
        description: "The ID of the role mapping rule.",
      },
      targetIndex: {
        type: "integer",
      },
    },
    required: ["roleMappingRuleId", "targetIndex"],
  },
  request: {
    method: "POST",
    path: "/role-mapping-rules/{roleMappingRuleId}/move",
    body: ["targetIndex"],
  },
});
