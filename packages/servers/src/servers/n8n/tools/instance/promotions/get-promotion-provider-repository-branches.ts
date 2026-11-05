import { defineTool } from "@usemcpkit/core";

export const instancePromotionsGetPromotionProviderRepositoryBranches = defineTool({
  name: "instance:promotions:get_promotion_provider_repository_branches",
  description:
    "List branches of a promotion repository. Lists branches of the selected GitLab repository and identifies its default branch. Pass the URL-encoded fullPath from repository discovery, or the repositoryPath of a saved GitLab environment, as repositoryId. GitLab project IDs are also accepted, but environments do not store them. Supports branch search and cursor pagination. The limit is an upper bound. GitLab returns at most 100 items per pa…",
  input: {
    type: "object",
    properties: {
      promotionProviderId: {
        type: "string",
        description: "The ID of the promotion provider.",
      },
      repositoryId: {
        type: "string",
        description: "The URL-encoded fullPath of the repository. A GitLab project ID is also accepted.",
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
    required: ["promotionProviderId", "repositoryId"],
  },
  request: {
    method: "GET",
    path: "/promotions/providers/{promotionProviderId}/repositories/{repositoryId}/branches",
    query: ["limit", "cursor", "search"],
  },
});
