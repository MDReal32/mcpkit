import { defineTool } from "@usemcpkit/core";

export const channelsStageInstancesCreateStageInstance = defineTool({
  name: "channels:stage_instances:create_stage_instance",
  description: "",
  input: {
    type: "object",
    properties: {
      topic: {
        type: "string",
      },
      channel_id: {
        type: "string",
      },
      privacy_level: {},
      guild_scheduled_event_id: {},
      send_start_notification: {
        type: "boolean",
      },
    },
    required: ["topic", "channel_id"],
  },
  request: {
    method: "POST",
    path: "/stage-instances",
    body: ["topic", "channel_id", "privacy_level", "guild_scheduled_event_id", "send_start_notification"],
  },
});
