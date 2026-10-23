import { defineTool } from "@usemcpkit/core";

export const projectsProjectVersionsMoveVersion = defineTool({
  name: "projects:project_versions:move_version",
  description:
    "Move version. Modifies the version's sequence within the project, which affects the display order of the versions in Jira.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "The ID of the version to be moved.",
      },
      after: {
        type: "string",
        description:
          "The URL (self link) of the version after which to place the moved version. Cannot be used with `position`.",
      },
      position: {
        type: "string",
        description: "An absolute position in which to place the moved version. Cannot be used with `after`.",
        enum: ["Earlier", "Later", "First", "Last"],
      },
    },
    required: ["id"],
  },
  request: {
    method: "POST",
    path: "/rest/api/2/version/{id}/move",
    body: ["after", "position"],
  },
});
