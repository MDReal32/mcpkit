import { defineTool } from "@usemcpkit/core";

export const libraryVariablesGetLocalVariables = defineTool({
  name: "library:variables:get_local_variables",
  description: "Get local variables. **This API is available to full members of Enterprise orgs.**",
  input: {
    type: "object",
    properties: {
      file_key: {
        type: "string",
        description:
          "File to get variables from. This can be a file key or branch key. Use `GET /v1/files/:key` with the `branch_data` query param to get the branch key.",
      },
    },
    required: ["file_key"],
  },
  request: {
    method: "GET",
    path: "/v1/files/{file_key}/variables/local",
  },
});
