import { defineTool } from "@usemcpkit/core";
import { GITLAB_SELF_MANAGED } from "../../const";
import { MERGE_REQUEST_IID_PROPERTY, PROJECT_ID_PROPERTY } from "./const";

export const createMergeRequestNote = defineTool({
  name: "api/v4/projects/{id}/merge_requests/{noteable_id}/notes:post",
  description: "Add a note (comment) to a merge request.",
  input: {
    type: "object",
    properties: {
      id: PROJECT_ID_PROPERTY,
      noteable_id: MERGE_REQUEST_IID_PROPERTY,
      body: { type: "string", description: "The note, Markdown." },
      created_at: { type: "string", description: "Creation date as ISO 8601, for administrators and project owners." },
    },
    required: ["id", "noteable_id", "body"],
  },
  request: {
    method: "POST",
    path: "/api/v4/projects/{id}/merge_requests/{noteable_id}/notes",
    body: ["body", "created_at"],
  },
  applies: GITLAB_SELF_MANAGED,
});
