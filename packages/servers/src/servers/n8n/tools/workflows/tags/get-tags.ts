import { defineTool } from "@usemcpkit/core";

export const workflowsTagsGetTags = defineTool({
  name: "workflows:tags:get_tags",
  description: "Retrieve all tags. Retrieve all tags from your instance.",
  input: {
    type: "object",
    properties: {
      limit: {
        type: "number",
        default: 100,
        description: "The maximum number of items to return.",
      },
      cursor: {
        type: "string",
        description:
          'Paginate by setting the cursor parameter to the nextCursor attribute returned by the previous request\'s response. Default value fetches the first "page" of the collection. See pagination for more detail.',
      },
    },
  },
  request: {
    method: "GET",
    path: "/tags",
    query: ["limit", "cursor"],
  },
});
