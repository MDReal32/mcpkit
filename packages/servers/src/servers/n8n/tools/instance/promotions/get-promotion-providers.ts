import { defineTool } from "@usemcpkit/core";

export const instancePromotionsGetPromotionProviders = defineTool({
  name: "instance:promotions:get_promotion_providers",
  description:
    "List promotion providers. Returns a cursor-paginated list of providers, without their public configuration.",
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
    path: "/promotions/providers",
    query: ["limit", "cursor"],
  },
});
