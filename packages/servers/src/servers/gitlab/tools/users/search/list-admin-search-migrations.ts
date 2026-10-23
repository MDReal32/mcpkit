import { defineTool } from "@usemcpkit/core";

export const usersSearchListAdminSearchMigrations = defineTool({
  name: "users:search:list_admin_search_migrations",
  description: "List all advanced search migrations. Lists all advanced search migrations for the GitLab instance.",
  input: {
    type: "object",
    properties: {},
  },
  request: {
    method: "GET",
    path: "/admin/search/migrations",
  },
});
