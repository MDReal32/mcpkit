import { defineTool } from "@usemcpkit/core";

export const projectsProjectVersionsCreateRelatedWork = defineTool({
  name: "projects:project_versions:create_related_work",
  description:
    "Create related work. Creates a related work for the given version. You can only create a generic link type of related works via this API. relatedWorkId will be auto-generated UUID, that does not need to be provided.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
      },
      category: {
        type: "string",
        description: "The category of the related work",
      },
      issueId: {
        type: "integer",
        description:
          "The ID of the issue associated with the related work (if there is one). Cannot be updated via the Rest API.",
      },
      relatedWorkId: {
        type: "string",
        description:
          "The id of the related work. For the native release note related work item, this will be null, and Rest API does not support updating it.",
      },
      title: {
        type: "string",
        description: "The title of the related work",
      },
      url: {
        type: "string",
        description:
          "The URL of the related work. Will be null for the native release note related work item, but is otherwise required.",
      },
    },
    required: ["id", "category"],
  },
  request: {
    method: "POST",
    path: "/rest/api/2/version/{id}/relatedwork",
    body: ["category", "issueId", "relatedWorkId", "title", "url"],
  },
});
