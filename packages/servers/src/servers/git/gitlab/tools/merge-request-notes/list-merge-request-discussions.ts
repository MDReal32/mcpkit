import { defineTool } from "@usemcpkit/core";
import { GITLAB_SELF_MANAGED } from "../../const";
import { MERGE_REQUEST_IID_PROPERTY, PAGE_PROPERTY, PER_PAGE_PROPERTY, PROJECT_ID_PROPERTY } from "./const";

export const listMergeRequestDiscussions = defineTool({
  name: "api/v4/projects/{id}/merge_requests/{noteable_id}/discussions:get",
  description:
    "List the discussions (threads of notes, with their resolved state and diff position) of a merge request.",
  input: {
    type: "object",
    properties: {
      id: PROJECT_ID_PROPERTY,
      noteable_id: MERGE_REQUEST_IID_PROPERTY,
      page: PAGE_PROPERTY,
      per_page: PER_PAGE_PROPERTY,
    },
    required: ["id", "noteable_id"],
  },
  request: {
    method: "GET",
    path: "/api/v4/projects/{id}/merge_requests/{noteable_id}/discussions",
    query: ["page", "per_page"],
  },
  applies: GITLAB_SELF_MANAGED,
});
