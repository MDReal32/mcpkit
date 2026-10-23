import { defineTool } from "@usemcpkit/core";

export const ciRunnersGetRunners = defineTool({
  name: "ci:runners:get_runners",
  description:
    "Retrieve details on a runner. Retrieves details of a runner. Instance runner details are available to all authenticated users through this endpoint. For groups and projects, you must have the Maintainer or Owner role for the associated project or group.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        description: "ID of the runner.",
      },
      include_projects: {
        type: "boolean",
        default: true,
        description:
          "If `true`, includes projects in the response. If `false`, improves performance for runners with many projects.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "GET",
    path: "/runners/{id}",
    query: ["include_projects"],
  },
});
