import { defineTool } from "@usemcpkit/core";

export const projectsProjectAvatarsUpdateProjectAvatar = defineTool({
  name: "projects:project_avatars:update_project_avatar",
  description: "Set project avatar. Sets the avatar displayed for a project.",
  input: {
    type: "object",
    properties: {
      projectIdOrKey: {
        type: "string",
        description: "The ID or (case-sensitive) key of the project.",
      },
      fileName: {
        type: "string",
        description: "The file name of the avatar icon. Returned for system avatars.",
      },
      id: {
        type: "string",
        description: "The ID of the avatar.",
      },
      isDeletable: {
        type: "boolean",
        description: "Whether the avatar can be deleted.",
      },
      isSelected: {
        type: "boolean",
        description: "Whether the avatar is used in Jira. For example, shown as a project's avatar.",
      },
      isSystemAvatar: {
        type: "boolean",
        description: "Whether the avatar is a system avatar.",
      },
      owner: {
        type: "string",
        description:
          "The owner of the avatar. For a system avatar the owner is null (and nothing is returned). For non-system avatars this is the appropriate identifier, such as the ID for a project or the account ID for a user.",
      },
      urls: {
        type: "object",
        description: "The list of avatar icon URLs.",
      },
    },
    required: ["projectIdOrKey", "id"],
  },
  request: {
    method: "PUT",
    path: "/rest/api/2/project/{projectIdOrKey}/avatar",
    body: ["fileName", "id", "isDeletable", "isSelected", "isSystemAvatar", "owner", "urls"],
  },
});
