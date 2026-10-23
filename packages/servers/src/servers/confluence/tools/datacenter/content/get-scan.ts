import { defineTool } from "@usemcpkit/core";

export const datacenterContentGetScan = defineTool({
  name: "datacenter:content:get_scan",
  description: "[Data Center] Scan content by space key. Returns a paginated list of Content. Example request URI(s):",
  input: {
    type: "object",
    properties: {
      cursor: {
        type: "string",
        description:
          "the identifier which is used to skip results from a previous query when paginating. Cursor is empty in first request, to move forward or backward use cursor provided in response.",
      },
      spaceKey: {
        type: "string",
        description: "the space key to find content under.",
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
      type: {
        type: "string",
        description:
          "the content type to return. Default value: <code>page</code>. Valid values: <code>page, blogpost, comment</code>. All types are returned if fetching via list of IDS. Type is only required for first request, latest request will use cursor",
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
    path: "/rest/api/content/scan",
    query: ["cursor", "spaceKey", "expand", "limit", "type", "status"],
  },
});
