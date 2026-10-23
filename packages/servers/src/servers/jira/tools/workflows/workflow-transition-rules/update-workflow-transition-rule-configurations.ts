import { defineTool } from "@usemcpkit/core";

export const workflowsWorkflowTransitionRulesUpdateWorkflowTransitionRuleConfigurations = defineTool({
  name: "workflows:workflow_transition_rules:update_workflow_transition_rule_configurations",
  description:
    "Update workflow transition rule configurations. Updates configuration of workflow transition rules. The following rule types are supported:",
  input: {
    type: "object",
    properties: {
      workflows: {
        type: "array",
        description: "The list of workflows with transition rules to update.",
        items: {
          type: "object",
          description: "A workflow with transition rules.",
          properties: {
            conditions: {
              type: "array",
              description: "The list of conditions within the workflow.",
              items: {
                type: "object",
                description: "A workflow transition rule.",
              },
            },
            postFunctions: {
              type: "array",
              description: "The list of post functions within the workflow.",
              items: {
                type: "object",
                description: "A workflow transition rule.",
              },
            },
            validators: {
              type: "array",
              description: "The list of validators within the workflow.",
              items: {
                type: "object",
                description: "A workflow transition rule.",
              },
            },
            workflowId: {
              type: "object",
              description: "Properties that identify a workflow.",
            },
          },
          required: ["workflowId"],
        },
      },
    },
    required: ["workflows"],
  },
  request: {
    method: "PUT",
    path: "/rest/api/2/workflow/rule/config",
    body: ["workflows"],
  },
});
