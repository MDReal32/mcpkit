import { defineTool } from "@usemcpkit/core";

export const projectsProjectsGetProjectUsers = defineTool({
  name: "projects:projects:get_project_users",
  description:
    "List project members. Returns a list of all members of a project including their role. Requires user:list scope.",
  input: {
    type: "object",
    properties: {
      projectId: {
        type: "string",
        description: "The ID of the project.",
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
    },
    required: ["projectId"],
  },
  request: {
    method: "GET",
    path: "/projects/{projectId}/users",
    query: ["limit", "cursor"],
  },
});
