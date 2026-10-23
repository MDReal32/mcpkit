import { defineTool } from "@usemcpkit/core";

export const projectsProjectComponentsGetProjectComponents = defineTool({
  name: "projects:project_components:get_project_components",
  description:
    "Get project components. Returns all components in a project. See the Get project components paginated resource if you want to get a full list of components with pagination.",
  input: {
    type: "object",
    properties: {
      projectIdOrKey: {
        type: "string",
        description: "The project ID or project key (case sensitive).",
      },
      componentSource: {
        type: "string",
        default: "jira",
        enum: ["jira", "compass", "auto"],
        description:
          "The source of the components to return. Can be `jira` (default), `compass` or `auto`. When `auto` is specified, the API will return connected Compass components if the project is opted into Compass, otherwise it will return Jira components. Defaults to `jira`.",
      },
    },
    required: ["projectIdOrKey"],
  },
  request: {
    method: "GET",
    path: "/rest/api/2/project/{projectIdOrKey}/components",
    query: ["componentSource"],
  },
});
