import { defineTool } from "@usemcpkit/core";

export const datacenterIndexManagementCreateUnindex = defineTool({
  name: "datacenter:index_management:create_unindex",
  description:
    "[Data Center] Remove all content from search index. Removes all content from the search index, effectively clearing the entire search index. This operation is destructive and will require a full reindex to restore search functionality. This operation is only available to system administrators.",
  input: {
    type: "object",
    properties: {},
  },
  request: {
    method: "POST",
    path: "/rest/api/index/unindex",
  },
});
