import { defineTool } from "@usemcpkit/core";

export const usersCodeSearchListAdminZoektShards = defineTool({
  name: "users:code_search:list_admin_zoekt_shards",
  description: "Get all the Zoekt nodes. Returns a list of all Zoekt search nodes available in the instance.",
  input: {
    type: "object",
    properties: {},
  },
  request: {
    method: "GET",
    path: "/admin/zoekt/shards",
  },
});
