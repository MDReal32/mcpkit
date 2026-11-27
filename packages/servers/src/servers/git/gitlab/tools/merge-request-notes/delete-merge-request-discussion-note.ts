import { defineTool } from "@usemcpkit/core";
import { GITLAB_SELF_MANAGED } from "../../const";
import { DISCUSSION_ID_PROPERTY, MERGE_REQUEST_IID_PROPERTY, NOTE_ID_PROPERTY, PROJECT_ID_PROPERTY } from "./const";

export const deleteMergeRequestDiscussionNote = defineTool({
  name: "api/v4/projects/{id}/merge_requests/{noteable_id}/discussions/{discussion_id}/notes/{note_id}:delete",
  description: "Delete a note of a discussion of a merge request.",
  input: {
    type: "object",
    properties: {
      id: PROJECT_ID_PROPERTY,
      noteable_id: MERGE_REQUEST_IID_PROPERTY,
      discussion_id: DISCUSSION_ID_PROPERTY,
      note_id: NOTE_ID_PROPERTY,
    },
    required: ["id", "noteable_id", "discussion_id", "note_id"],
  },
  request: {
    method: "DELETE",
    path: "/api/v4/projects/{id}/merge_requests/{noteable_id}/discussions/{discussion_id}/notes/{note_id}",
  },
  applies: GITLAB_SELF_MANAGED,
});
