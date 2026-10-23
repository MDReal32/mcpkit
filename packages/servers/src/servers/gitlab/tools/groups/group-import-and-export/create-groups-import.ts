import { defineTool } from "@usemcpkit/core";

export const groupsGroupImportAndExportCreateGroupsImport = defineTool({
  name: "groups:group_import_and_export:create_groups_import",
  description:
    "Create a group import. Creates a group import. The maximum import file size can be set by the Administrator on GitLab Self-Managed (defaults to `0` (unlimited)).",
  input: {
    type: "object",
    properties: {
      path: {
        type: "string",
        description: "Group path",
      },
      name: {
        type: "string",
        description: "Group name",
      },
      file: {
        type: "string",
        description: "Path of a local file to upload.",
      },
      parent_id: {
        type: "integer",
        description:
          "The ID of the parent group that the group will be imported into. Defaults to the current user's namespace.",
      },
      organization_id: {
        type: "integer",
        description: "The ID of the organization that the group will be part of.",
      },
    },
    required: ["path", "name", "file"],
  },
  request: {
    method: "POST",
    path: "/groups/import",
    body: ["path", "name", "file", "parent_id", "organization_id"],
    contentType: "multipart/form-data",
    fileArgs: ["file"],
  },
});
