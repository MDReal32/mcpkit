import { defineTool } from "@usemcpkit/core";

export const projectsProjectKeyAndNameValidationGetValidProjectName = defineTool({
  name: "projects:project_key_and_name_validation:get_valid_project_name",
  description:
    "Get valid project name. Checks that a project name isn't in use. If the name isn't in use, the passed string is returned. If the name is in use, this operation attempts to generate a valid project name based on the one supplied, usually by adding a sequence number. If a valid project name cannot be generated, a 404 response is returned.",
  input: {
    type: "object",
    properties: {
      name: {
        type: "string",
        description: "The project name.",
      },
    },
    required: ["name"],
  },
  request: {
    method: "GET",
    path: "/rest/api/2/projectvalidate/validProjectName",
    query: ["name"],
  },
});
