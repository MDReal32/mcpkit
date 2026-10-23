import { defineTool } from "@usemcpkit/core";

export const projectsProjectsUpdateProject = defineTool({
  name: "projects:projects:update_project",
  description: "Update project. Updates the project details of a project.",
  input: {
    type: "object",
    properties: {
      projectIdOrKey: {
        type: "string",
        description: "The project ID or project key (case sensitive).",
      },
      expand: {
        type: "string",
        description:
          "Use expand to include additional information in the response. This parameter accepts a comma-separated list. Note that the project description, issue types, and project lead are included in all responses by default. Expand options include:",
      },
      assigneeType: {
        type: "string",
        description: "The default assignee when creating issues for this project.",
        enum: ["PROJECT_LEAD", "UNASSIGNED"],
      },
      avatarId: {
        type: "integer",
        description: "An integer value for the project's avatar.",
      },
      categoryId: {
        type: "integer",
        description:
          "The ID of the project's category. A complete list of category IDs is found using the Get all project categories operation. To remove the project category from the project, set the value to `-1.`",
      },
      description: {
        type: "string",
        description: "A brief description of the project.",
      },
      issueSecurityScheme: {
        type: "integer",
        description:
          "The ID of the issue security scheme for the project, which enables you to control who can and cannot view issues. Use the Get issue security schemes resource to get all issue security scheme IDs.",
      },
      key: {
        type: "string",
        description:
          "Project keys must be unique and start with an uppercase letter followed by one or more uppercase alphanumeric characters. The maximum length is 10 characters.",
      },
      lead: {
        type: "string",
        description:
          "This parameter is deprecated because of privacy changes. Use `leadAccountId` instead. See the migration guide for details. The user name of the project lead. Cannot be provided with `leadAccountId`.",
      },
      leadAccountId: {
        type: "string",
        description: "The account ID of the project lead. Cannot be provided with `lead`.",
      },
      name: {
        type: "string",
        description: "The name of the project.",
      },
      notificationScheme: {
        type: "integer",
        description:
          "The ID of the notification scheme for the project. Use the Get notification schemes resource to get a list of notification scheme IDs.",
      },
      permissionScheme: {
        type: "integer",
        description:
          "The ID of the permission scheme for the project. Use the Get all permission schemes resource to see a list of all permission scheme IDs.",
      },
      releasedProjectKeys: {
        type: "array",
        description:
          "Previous project keys to be released from the current project. Released keys must belong to the current project and not contain the current project key",
        items: {
          type: "string",
        },
      },
      url: {
        type: "string",
        description: "A link to information about this project, such as project documentation",
      },
    },
    required: ["projectIdOrKey"],
  },
  request: {
    method: "PUT",
    path: "/rest/api/2/project/{projectIdOrKey}",
    query: ["expand"],
    body: [
      "assigneeType",
      "avatarId",
      "categoryId",
      "description",
      "issueSecurityScheme",
      "key",
      "lead",
      "leadAccountId",
      "name",
      "notificationScheme",
      "permissionScheme",
      "releasedProjectKeys",
      "url",
    ],
  },
});
