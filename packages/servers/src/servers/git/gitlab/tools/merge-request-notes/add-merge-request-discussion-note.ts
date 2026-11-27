import { defineTool } from "@usemcpkit/core";
import { GITLAB_SELF_MANAGED } from "../../const";
import { DISCUSSION_ID_PROPERTY, MERGE_REQUEST_IID_PROPERTY, PROJECT_ID_PROPERTY } from "./const";

export const addMergeRequestDiscussionNote = defineTool({
  name: "api/v4/projects/{id}/merge_requests/{noteable_id}/discussions/{discussion_id}/notes:post",
  description: "Reply to a discussion of a merge request.",
  input: {
    type: "object",
    properties: {
      id: PROJECT_ID_PROPERTY,
      noteable_id: MERGE_REQUEST_IID_PROPERTY,
      discussion_id: DISCUSSION_ID_PROPERTY,
      body: { type: "string", description: "The reply, Markdown." },
      created_at: { type: "string", description: "Creation date as ISO 8601, for administrators and project owners." },
    },
    required: ["id", "noteable_id", "discussion_id", "body"],
  },
  request: {
    method: "POST",
    path: "/api/v4/projects/{id}/merge_requests/{noteable_id}/discussions/{discussion_id}/notes",
    body: ["body", "created_at"],
  },
  applies: GITLAB_SELF_MANAGED,
});
