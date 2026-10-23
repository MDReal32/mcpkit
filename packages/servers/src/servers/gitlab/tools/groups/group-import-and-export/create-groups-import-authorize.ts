import { defineTool } from "@usemcpkit/core";

export const groupsGroupImportAndExportCreateGroupsImportAuthorize = defineTool({
  name: "groups:group_import_and_export:create_groups_import_authorize",
  description: "Workhorse authorize the group import upload. This feature was introduced in GitLab 12.8",
  input: {
    type: "object",
    properties: {},
  },
  request: {
    method: "POST",
    path: "/groups/import/authorize",
  },
});
