import { defineTool } from "@usemcpkit/core";

export const issuesAwardEmojiListGroupsEpicsAwardEmoji = defineTool({
  name: "issues:award_emoji:list_groups_epics_award_emoji",
  description:
    "List all emoji reactions for an epic. Lists all emoji reactions for a specified epic. This endpoint can be accessed without authentication if the epic is publicly accessible.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the group.",
      },
      epic_iid: {
        type: "integer",
        description: "ID (`iid` for merge requests/issues/epics, `id` for snippets) of an awardable.",
      },
      page: {
        type: "integer",
        default: 1,
        description: "Page number of results to retrieve.",
      },
      per_page: {
        type: "integer",
        default: 20,
        description: "Number of items to list per page.",
      },
    },
    required: ["id", "epic_iid"],
  },
  request: {
    method: "GET",
    path: "/groups/{id}/epics/{epic_iid}/award_emoji",
    query: ["page", "per_page"],
  },
});
