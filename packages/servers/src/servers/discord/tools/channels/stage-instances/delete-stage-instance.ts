import { defineTool } from "@usemcpkit/core";

export const channelsStageInstancesDeleteStageInstance = defineTool({
  name: "channels:stage_instances:delete_stage_instance",
  description: "",
  input: {
    type: "object",
    properties: {
      channel_id: {
        type: "string",
      },
    },
    required: ["channel_id"],
  },
  request: {
    method: "DELETE",
    path: "/stage-instances/{channel_id}",
  },
});
