import { defineTool } from "@usemcpkit/core";

export const usersActivitySetThreadSubscription = defineTool({
  name: "users:activity:set_thread_subscription",
  description:
    "Set a thread subscription. If you are watching a repository, you receive notifications for all threads by default. Use this endpoint to ignore future notifications for threads until you comment on the thread or get an **@mention**.",
  input: {
    type: "object",
    properties: {
      thread_id: {
        type: "integer",
        description:
          "The unique identifier of the notification thread. This corresponds to the value returned in the `id` field when you retrieve notifications (for example with the `GET /notifications` operation).",
      },
      ignored: {
        type: "boolean",
        description: "Whether to block all notifications from a thread.",
        default: false,
      },
    },
    required: ["thread_id"],
  },
  request: {
    method: "PUT",
    path: "/notifications/threads/{thread_id}/subscription",
    body: ["ignored"],
  },
});
