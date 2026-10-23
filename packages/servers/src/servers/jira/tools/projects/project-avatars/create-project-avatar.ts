import { defineTool } from "@usemcpkit/core";

export const projectsProjectAvatarsCreateProjectAvatar = defineTool({
  name: "projects:project_avatars:create_project_avatar",
  description: "Load project avatar. Loads an avatar for a project.",
  input: {
    type: "object",
    properties: {
      projectIdOrKey: {
        type: "string",
        description: "The ID or (case-sensitive) key of the project.",
      },
      x: {
        type: "integer",
        default: 0,
        description: "The X coordinate of the top-left corner of the crop region.",
      },
      y: {
        type: "integer",
        default: 0,
        description: "The Y coordinate of the top-left corner of the crop region.",
      },
      size: {
        type: "integer",
        default: 0,
        description: "The length of each side of the crop region.",
      },
      body: {
        type: "string",
        description: "Path of a local file to upload.",
      },
    },
    required: ["projectIdOrKey", "body"],
  },
  request: {
    method: "POST",
    path: "/rest/api/2/project/{projectIdOrKey}/avatar2",
    query: ["x", "y", "size"],
    bodyArg: "body",
    contentType: "application/octet-stream",
    fileArgs: ["body"],
  },
});
