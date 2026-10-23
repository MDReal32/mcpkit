import { defineTool } from '@usemcpkit/core';

export const datacenterIndexManagementCreateReindex = defineTool({
  name: 'datacenter:index_management:create_reindex',
  description:
    "[Data Center] Rebuild Confluence search index. Rebuilds Confluence's search index. This operation is only available to system administrators and may take significant time to complete.",
  input: {
    type: 'object',
    properties: {
      spaceKey: {
        type: 'string',
        description:
          "Optional space keys to limit the reindex to specific spaces. If specified, only content within these spaces will be reindexed. If no space key's are specified, the entire site will be reindexed. Multiple space keys can be provided to reindex multiple spaces. If a space key does not match any existing space, it will be silently ignored. (comma-separated)",
      },
      option: {
        type: 'string',
        description:
          'The reindex options to control what content types are indexed. Available options: - CONTENT_ONLY: Index only content (pages, blog posts, etc.) - ATTACHMENT_ONLY: Index only file attachments - USER_ONLY: Index only user information (Only relevant for whole site reindexing, not for specific spaces) (comma-separated)',
      },
    },
  },
  request: {
    method: 'POST',
    path: '/rest/api/index/reindex',
    query: ['spaceKey', 'option'],
  },
});
