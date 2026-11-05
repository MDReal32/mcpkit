import { defineTool } from "@usemcpkit/core";

export const settingsNodeTypePoliciesGetNodeTypeInstancePolicy = defineTool({
  name: "settings:node_type_policies:get_node_type_instance_policy",
  description:
    "Preview: Retrieve the instance node type policy. **Preview** — breaking changes may still occur without major version bump.",
  input: {
    type: "object",
    properties: {},
  },
  request: {
    method: "GET",
    path: "/node-type-policies/instance",
  },
});
