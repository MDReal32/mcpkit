import { defineTool } from "@usemcpkit/core";

export const channelsPollsGetAnswerVoters = defineTool({
  name: "channels:polls:get_answer_voters",
  description: "",
  input: {
    type: "object",
    properties: {
      channel_id: {
        type: "string",
      },
      message_id: {
        type: "string",
      },
      answer_id: {
        type: "integer",
      },
      after: {
        type: "string",
      },
      limit: {
        type: "integer",
      },
    },
    required: ["channel_id", "message_id", "answer_id"],
  },
  request: {
    method: "GET",
    path: "/channels/{channel_id}/polls/{message_id}/answers/{answer_id}",
    query: ["after", "limit"],
  },
});
