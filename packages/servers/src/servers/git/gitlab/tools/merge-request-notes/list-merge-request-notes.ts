import { defineTool } from "@usemcpkit/core";
import { GITLAB_SELF_MANAGED } from "../../const";
import {
  MERGE_REQUEST_IID_PROPERTY,
  ORDER_BY_PROPERTY,
  PAGE_PROPERTY,
  PER_PAGE_PROPERTY,
  PROJECT_ID_PROPERTY,
  SORT_PROPERTY,
} from "./const";

export const listMergeRequestNotes = defineTool({
  name: "api/v4/projects/{id}/merge_requests/{noteable_id}/notes:get",
  description: "List the notes (comments) of a merge request, system notes included.",
  input: {
    type: "object",
    properties: {
      id: PROJECT_ID_PROPERTY,
      noteable_id: MERGE_REQUEST_IID_PROPERTY,
      page: PAGE_PROPERTY,
      per_page: PER_PAGE_PROPERTY,
      sort: SORT_PROPERTY,
      order_by: ORDER_BY_PROPERTY,
    },
    required: ["id", "noteable_id"],
  },
  request: {
    method: "GET",
    path: "/api/v4/projects/{id}/merge_requests/{noteable_id}/notes",
    query: ["sort", "order_by", "page", "per_page"],
  },
  applies: GITLAB_SELF_MANAGED,
});
