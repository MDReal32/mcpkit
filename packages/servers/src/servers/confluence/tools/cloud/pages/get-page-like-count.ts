import { defineTool } from "@usemcpkit/core";

export const cloudPagesGetPageLikeCount = defineTool({
  name: "cloud:pages:get_page_like_count",
  description: "[Cloud] Get like count for page. Returns the count of likes of specific page.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        description: "The ID of the page for which like count should be returned.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "GET",
    path: "/wiki/api/v2/pages/{id}/likes/count",
  },
});
