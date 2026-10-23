import { defineTool } from "@usemcpkit/core";

export const usersActivityMarkThreadAsDone = defineTool({
  name: "users:activity:mark_thread_as_done",
  description:
    'Mark a thread as done. Marks a thread as "done." Marking a thread as "done" is equivalent to marking a notification in your notification inbox on GitHub as done: https://github.com/notifications.',
  input: {
    type: "object",
    properties: {
      thread_id: {
        type: "integer",
        description:
          "The unique identifier of the notification thread. This corresponds to the value returned in the `id` field when you retrieve notifications (for example with the `GET /notifications` operation).",
      },
    },
    required: ["thread_id"],
  },
  request: {
    method: "DELETE",
    path: "/notifications/threads/{thread_id}",
  },
});
