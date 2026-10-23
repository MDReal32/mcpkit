import { defineTool } from "@usemcpkit/core";

export const datacenterContentList = defineTool({
  name: "datacenter:content:list",
  description: "[Data Center] Get content. Returns a paginated list of Content. Example request URI(s):",
  input: {
    type: "object",
    properties: {
      spaceKey: {
        type: "string",
        description: "the space key to find content under.",
      },
      xoauth_requestor_id: {
        type: "string",
      },
      expand: {
        type: "string",
        description:
          "a comma separated list of properties to expand on the content. Default value: <code>history,space,version</code>.",
      },
      limit: {
        type: "integer",
        description: "the limit of the number of items to return, this may be restricted by fixed system limits.",
      },
      start: {
        type: "integer",
        description: "the start point of the collection to return.",
      },
      postingDay: {
        type: "string",
        description:
          "the posting day of the blog post. Required for <code>blogpost</code> type. Format: <code>yyyy-mm-dd</code>. Example: <code>2013-02-13</code>",
      },
      ids: {
        type: "string",
        description: "a list of content ids to fetch. (comma-separated)",
      },
      title: {
        type: "string",
        description: "the title of the page to find. Required for <code>page</code> type.",
      },
      type: {
        type: "string",
        description:
          "the content type to return. Default value: <code>page</code>. Valid values: <code>page, blogpost</code>. All types are returned if fetching via list of IDS",
      },
      status: {
        type: "string",
        description:
          "list of statuses the content to be found is in. Defaults to current is not specified. If set to 'any', content in 'current' and 'trashed' status will be fetched. Does not support 'historical' status for now. (comma-separated)",
      },
    },
  },
  request: {
    method: "GET",
    path: "/rest/api/content",
    query: [
      "spaceKey",
      "xoauth_requestor_id",
      "expand",
      "limit",
      "start",
      "postingDay",
      "ids",
      "title",
      "type",
      "status",
    ],
  },
});
