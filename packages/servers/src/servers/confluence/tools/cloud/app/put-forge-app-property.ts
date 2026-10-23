import { defineTool } from "@usemcpkit/core";

export const cloudAppPutForgeAppProperty = defineTool({
  name: "cloud:app:put_forge_app_property",
  description:
    "[Cloud] Create or update a Forge app property. Creates or updates a Forge app property. This API can only be accessed using asApp() requests from Forge.",
  input: {
    type: "object",
    properties: {
      propertyKey: {
        type: "string",
        description: "The key of the property",
      },
      body: {
        type: "object",
      },
    },
    required: ["propertyKey", "body"],
  },
  request: {
    method: "PUT",
    path: "/wiki/api/v2/app/properties/{propertyKey}",
    bodyArg: "body",
  },
});
