import { defineTool } from "@usemcpkit/core";

export const projectsProjectsGetProjects = defineTool({
  name: "projects:projects:get_projects",
  description: "Retrieve projects. Retrieve projects from your instance.",
  input: {
    type: "object",
    properties: {
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
  },
  request: {
    method: "GET",
    path: "/projects",
    query: ["limit", "cursor"],
  },
});
