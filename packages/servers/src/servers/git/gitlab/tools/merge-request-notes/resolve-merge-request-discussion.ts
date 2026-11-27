import { defineTool } from "@usemcpkit/core";
import { GITLAB_SELF_MANAGED } from "../../const";
import { DISCUSSION_ID_PROPERTY, MERGE_REQUEST_IID_PROPERTY, PROJECT_ID_PROPERTY } from "./const";

export const resolveMergeRequestDiscussion = defineTool({
  name: "api/v4/projects/{id}/merge_requests/{noteable_id}/discussions/{discussion_id}:put",
  description: "Resolve or reopen a discussion of a merge request.",
  input: {
    type: "object",
    properties: {
      id: PROJECT_ID_PROPERTY,
      noteable_id: MERGE_REQUEST_IID_PROPERTY,
      discussion_id: DISCUSSION_ID_PROPERTY,
      resolved: { type: "boolean", description: "true to resolve the thread, false to reopen it." },
    },
    required: ["id", "noteable_id", "discussion_id", "resolved"],
  },
  request: {
    method: "PUT",
    path: "/api/v4/projects/{id}/merge_requests/{noteable_id}/discussions/{discussion_id}",
    body: ["resolved"],
  },
  applies: GITLAB_SELF_MANAGED,
});
