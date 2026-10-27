import { defineTool } from "@usemcpkit/core";

export const channelsStageInstancesGetStageInstance = defineTool({
  name: "channels:stage_instances:get_stage_instance",
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
    method: "GET",
    path: "/stage-instances/{channel_id}",
  },
});
