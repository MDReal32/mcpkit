import { defineTool } from "@usemcpkit/core";

export const instanceSourceControlGetSourceControlStatus = defineTool({
  name: "instance:source_control:get_source_control_status",
  description:
    "Preview pending source control changes. Previews the pending changes between the instance and the connected Git branch in either the `push` or `pull` direction.",
  input: {
    type: "object",
    properties: {
      direction: {
        type: "string",
        enum: ["push", "pull"],
      },
    },
    required: ["direction"],
  },
  request: {
    method: "GET",
    path: "/source-control/status",
    query: ["direction"],
  },
});
