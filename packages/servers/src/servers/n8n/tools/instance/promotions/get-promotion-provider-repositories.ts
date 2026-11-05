import { defineTool } from "@usemcpkit/core";

export const instancePromotionsGetPromotionProviderRepositories = defineTool({
  name: "instance:promotions:get_promotion_provider_repositories",
  description:
    "List repositories of a promotion provider. Lists repositories where the GitLab token identity has at least the Developer role. The token also needs Git write scope for promotions. Protected branches can restrict pushes. Use remoteUrl as an environment remote. Search matches names and namespaces in similarity order. Unfiltered results use ascending repository ID order. The limit is an upper bound. GitLab returns at most 100 items per page.…",
  input: {
    type: "object",
    properties: {
      promotionProviderId: {
        type: "string",
        description: "The ID of the promotion provider.",
      },
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
      search: {
        type: "string",
      },
    },
    required: ["promotionProviderId"],
  },
  request: {
    method: "GET",
    path: "/promotions/providers/{promotionProviderId}/repositories",
    query: ["limit", "cursor", "search"],
  },
});
