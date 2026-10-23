import { defineTool } from "@usemcpkit/core";

export const ciPipelinesListPipelines = defineTool({
  name: "ci:pipelines:list_pipelines",
  description:
    "List pipelines triggered by the authenticated user. Lists recently created pipelines across all projects that were triggered by the authenticated user. By default, child pipelines are not included in the results. To return child pipelines, set `source` to `parent_pipeline`. This endpoint only supports keyset pagination.",
  input: {
    type: "object",
    properties: {
      source: {
        type: "string",
        enum: [
          "unknown",
          "push",
          "web",
          "trigger",
          "schedule",
          "api",
          "external",
          "pipeline",
          "chat",
          "webide",
          "merge_request_event",
          "external_pull_request_event",
          "parent_pipeline",
          "ondemand_dast_scan",
          "ondemand_dast_validation",
          "security_orchestration_policy",
          "container_registry_push",
          "duo_workflow",
          "pipeline_execution_policy_schedule",
          "dependency_management_security_update",
        ],
        description: "The source of pipelines",
      },
      created_before: {
        type: "string",
        description: "Return pipelines created before the specified datetime. Format: ISO 8601 YYYY-MM-DDTHH:MM:SSZ",
      },
      created_after: {
        type: "string",
        description: "Return pipelines created after the specified datetime. Format: ISO 8601 YYYY-MM-DDTHH:MM:SSZ",
      },
      order_by: {
        type: "string",
        default: "created_at",
        enum: ["created_at"],
        description: "Return pipelines ordered by `created_at`",
      },
      sort: {
        type: "string",
        default: "desc",
        enum: ["desc"],
        description: "Return pipelines sorted in `desc` order",
      },
      cursor: {
        type: "string",
        description: "Cursor for obtaining the next set of records",
      },
      per_page: {
        type: "integer",
        default: 20,
        description: "Number of items per page",
      },
    },
  },
  request: {
    method: "GET",
    path: "/pipelines",
    query: ["source", "created_before", "created_after", "order_by", "sort", "cursor", "per_page"],
  },
});
