import { defineTool } from "@usemcpkit/core";

export const ciRunnersListRunnersJobs = defineTool({
  name: "ci:runners:list_runners_jobs",
  description:
    "List all jobs processed by a runner. Lists all jobs that are being processed or were processed by a specified runner. The list of jobs is limited to projects where the user has the Reporter, Developer, Maintainer, or Owner role.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        description: "ID of the runner.",
      },
      system_id: {
        type: "string",
        description: "System ID associated with the runner manager.",
      },
      status: {
        type: "string",
        enum: [
          "created",
          "waiting_for_resource",
          "preparing",
          "waiting_for_callback",
          "pending",
          "running",
          "success",
          "failed",
          "canceling",
          "canceled",
          "skipped",
          "manual",
          "scheduled",
        ],
        description: "Status of the job.",
      },
      order_by: {
        type: "string",
        enum: ["id"],
        description: "Sort results by the specified field.",
      },
      sort: {
        type: "string",
        default: "desc",
        enum: ["asc", "desc"],
        description: "Sort results in ascending or descending order. Specify `order_by` as well, including for `id`.",
      },
      cursor: {
        type: "string",
        description: "Cursor for obtaining the next set of records.",
      },
      page: {
        type: "integer",
        default: 1,
        description: "Page number of results to retrieve.",
      },
      per_page: {
        type: "integer",
        default: 20,
        description: "Number of items to list per page.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "GET",
    path: "/runners/{id}/jobs",
    query: ["system_id", "status", "order_by", "sort", "cursor", "page", "per_page"],
  },
});
