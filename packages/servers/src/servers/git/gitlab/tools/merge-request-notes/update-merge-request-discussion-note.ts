import { defineTool } from "@usemcpkit/core";
import { GITLAB_SELF_MANAGED } from "../../const";
import { DISCUSSION_ID_PROPERTY, MERGE_REQUEST_IID_PROPERTY, NOTE_ID_PROPERTY, PROJECT_ID_PROPERTY } from "./const";

export const updateMergeRequestDiscussionNote = defineTool({
  name: "api/v4/projects/{id}/merge_requests/{noteable_id}/discussions/{discussion_id}/notes/{note_id}:put",
  description: "Change the text of a note in a discussion of a merge request, or resolve or reopen the note.",
  input: {
    type: "object",
    properties: {
      id: PROJECT_ID_PROPERTY,
      noteable_id: MERGE_REQUEST_IID_PROPERTY,
      discussion_id: DISCUSSION_ID_PROPERTY,
      note_id: NOTE_ID_PROPERTY,
      body: { type: "string", description: "The new text, Markdown; leave out to only change resolved." },
      resolved: {
        type: "boolean",
        description: "true to resolve the note, false to reopen it; leave out to only change the text.",
      },
    },
    required: ["id", "noteable_id", "discussion_id", "note_id"],
  },
  request: {
    method: "PUT",
    path: "/api/v4/projects/{id}/merge_requests/{noteable_id}/discussions/{discussion_id}/notes/{note_id}",
    body: ["body", "resolved"],
  },
  applies: GITLAB_SELF_MANAGED,
});
