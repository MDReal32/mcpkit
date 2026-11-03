import { defineTool } from "@usemcpkit/core";

export const libraryVariablesGetPublishedVariables = defineTool({
  name: "library:variables:get_published_variables",
  description: "Get published variables. **This API is available to full members of Enterprise orgs.**",
  input: {
    type: "object",
    properties: {
      file_key: {
        type: "string",
        description:
          "File to get variables from. This must be a main file key, not a branch key, as it is not possible to publish from branches.",
      },
    },
    required: ["file_key"],
  },
  request: {
    method: "GET",
    path: "/v1/files/{file_key}/variables/published",
  },
});
