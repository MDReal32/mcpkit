import { defineTool } from "@usemcpkit/core";
import { GITLAB_SELF_MANAGED } from "../../const";
import { MERGE_REQUEST_IID_PROPERTY, PROJECT_ID_PROPERTY } from "./const";

export const createMergeRequestDiscussion = defineTool({
  name: "api/v4/projects/{id}/merge_requests/{noteable_id}/discussions:post",
  description:
    "Start a discussion on a merge request: a general thread, or one on a line of the diff when a position is given.",
  input: {
    type: "object",
    properties: {
      id: PROJECT_ID_PROPERTY,
      noteable_id: MERGE_REQUEST_IID_PROPERTY,
      body: { type: "string", description: "The first note of the thread, Markdown." },
      commit_id: { type: "string", description: "SHA of the commit the thread is about." },
      created_at: { type: "string", description: "Creation date as ISO 8601, for administrators and project owners." },
      position: {
        type: "object",
        description:
          "Where on the diff the thread sits: base_sha, start_sha, head_sha, position_type (text, image or file), new_path, old_path and new_line or old_line.",
      },
    },
    required: ["id", "noteable_id", "body"],
  },
  request: {
    method: "POST",
    path: "/api/v4/projects/{id}/merge_requests/{noteable_id}/discussions",
    body: ["body", "commit_id", "created_at", "position"],
  },
  applies: GITLAB_SELF_MANAGED,
});
