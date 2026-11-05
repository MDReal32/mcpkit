import { defineTool } from "@usemcpkit/core";

export const projectsProjectsCreateProject = defineTool({
  name: "projects:projects:create_project",
  description: "Create a project. Create a team project on your instance.",
  input: {
    type: "object",
    properties: {
      name: {
        type: "string",
      },
      id: {
        type: "string",
        description: "Project ID. The server generates an ID when omitted. An ID that is in use returns HTTP 409.",
      },
      icon: {
        type: "object",
        properties: {
          type: {
            type: "string",
            enum: ["emoji", "icon"],
          },
          value: {
            type: "string",
          },
          color: {
            type: "string",
          },
        },
        required: ["type", "value"],
      },
      description: {
        type: "string",
      },
      customTelemetryTags: {
        type: "array",
        items: {
          type: "object",
          properties: {
            key: {
              type: "string",
            },
            value: {
              type: "string",
            },
          },
          required: ["key", "value"],
        },
      },
      type: {
        type: "string",
      },
    },
    required: ["name"],
  },
  request: {
    method: "POST",
    path: "/projects",
    body: ["name", "id", "icon", "description", "customTelemetryTags", "type"],
  },
});
