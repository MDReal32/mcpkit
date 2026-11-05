import { defineTool } from "@usemcpkit/core";

export const instancePromotionsGetPromotionEnvironments = defineTool({
  name: "instance:promotions:get_promotion_environments",
  description:
    "List promotion environments. Returns a cursor-paginated list of environments. Filter by `scope` and `direction` for the instance environments, or by `providerId` to see which environments a provider edit affects.",
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
      scope: {
        type: "string",
        enum: ["instance", "projects"],
      },
      direction: {
        type: "string",
        enum: ["apply", "promote"],
      },
      providerId: {
        type: "string",
      },
    },
  },
  request: {
    method: "GET",
    path: "/promotions/environments",
    query: ["limit", "cursor", "scope", "direction", "providerId"],
  },
});
