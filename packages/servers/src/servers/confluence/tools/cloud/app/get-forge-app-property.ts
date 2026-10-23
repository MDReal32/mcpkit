import { defineTool } from "@usemcpkit/core";

export const cloudAppGetForgeAppProperty = defineTool({
  name: "cloud:app:get_forge_app_property",
  description:
    "[Cloud] Get a Forge app property by key. Gets a Forge app property by property key. This API can only be accessed using asApp() requests from Forge.",
  input: {
    type: "object",
    properties: {
      propertyKey: {
        type: "string",
        description: "The key of the property",
      },
    },
    required: ["propertyKey"],
  },
  request: {
    method: "GET",
    path: "/wiki/api/v2/app/properties/{propertyKey}",
  },
});
