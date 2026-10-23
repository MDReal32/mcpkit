import { defineTool } from "@usemcpkit/core";

export const metaFeaturesListFeatures = defineTool({
  name: "meta:features:list_features",
  description: "List all feature flags. Lists all feature flags for the instance.",
  input: {
    type: "object",
    properties: {},
  },
  request: {
    method: "GET",
    path: "/features",
  },
});
