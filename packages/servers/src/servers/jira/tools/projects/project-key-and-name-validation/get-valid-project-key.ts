import { defineTool } from "@usemcpkit/core";

export const projectsProjectKeyAndNameValidationGetValidProjectKey = defineTool({
  name: "projects:project_key_and_name_validation:get_valid_project_key",
  description:
    "Get valid project key. Validates a project key and, if the key is invalid or in use, generates a valid random string for the project key.",
  input: {
    type: "object",
    properties: {
      key: {
        type: "string",
        description: "The project key.",
      },
    },
  },
  request: {
    method: "GET",
    path: "/rest/api/2/projectvalidate/validProjectKey",
    query: ["key"],
  },
});
