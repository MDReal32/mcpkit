import { defineTool } from "@usemcpkit/core";

export const channelsStageInstancesUpdateStageInstance = defineTool({
  name: "channels:stage_instances:update_stage_instance",
  description: "",
  input: {
    type: "object",
    properties: {
      channel_id: {
        type: "string",
      },
      topic: {
        type: "string",
      },
      privacy_level: {
        type: "integer",
      },
    },
    required: ["channel_id"],
  },
  request: {
    method: "PATCH",
    path: "/stage-instances/{channel_id}",
    body: ["topic", "privacy_level"],
  },
});
