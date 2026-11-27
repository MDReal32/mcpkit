import { defineTool } from "@usemcpkit/core";
import { GITLAB_SELF_MANAGED } from "../../const";
import { DISCUSSION_ID_PROPERTY, MERGE_REQUEST_IID_PROPERTY, PROJECT_ID_PROPERTY } from "./const";

export const getMergeRequestDiscussion = defineTool({
  name: "api/v4/projects/{id}/merge_requests/{noteable_id}/discussions/{discussion_id}:get",
  description: "Get one discussion of a merge request with all its notes.",
  input: {
    type: "object",
    properties: {
      id: PROJECT_ID_PROPERTY,
      noteable_id: MERGE_REQUEST_IID_PROPERTY,
      discussion_id: DISCUSSION_ID_PROPERTY,
    },
    required: ["id", "noteable_id", "discussion_id"],
  },
  request: {
    method: "GET",
    path: "/api/v4/projects/{id}/merge_requests/{noteable_id}/discussions/{discussion_id}",
  },
  applies: GITLAB_SELF_MANAGED,
});
