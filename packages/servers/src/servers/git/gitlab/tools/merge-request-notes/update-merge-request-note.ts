import { defineTool } from "@usemcpkit/core";
import { GITLAB_SELF_MANAGED } from "../../const";
import { MERGE_REQUEST_IID_PROPERTY, NOTE_ID_PROPERTY, PROJECT_ID_PROPERTY } from "./const";

export const updateMergeRequestNote = defineTool({
  name: "api/v4/projects/{id}/merge_requests/{noteable_id}/notes/{note_id}:put",
  description: "Change the text of a note of a merge request.",
  input: {
    type: "object",
    properties: {
      id: PROJECT_ID_PROPERTY,
      noteable_id: MERGE_REQUEST_IID_PROPERTY,
      note_id: NOTE_ID_PROPERTY,
      body: { type: "string", description: "The new text, Markdown." },
    },
    required: ["id", "noteable_id", "note_id", "body"],
  },
  request: {
    method: "PUT",
    path: "/api/v4/projects/{id}/merge_requests/{noteable_id}/notes/{note_id}",
    body: ["body"],
  },
  applies: GITLAB_SELF_MANAGED,
});
