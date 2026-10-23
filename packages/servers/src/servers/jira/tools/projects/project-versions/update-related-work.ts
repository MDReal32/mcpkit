import { defineTool } from '@usemcpkit/core';

export const projectsProjectVersionsUpdateRelatedWork = defineTool({
  name: 'projects:project_versions:update_related_work',
  description:
    "Update related work. Updates the given related work. You can only update generic link related works via Rest APIs. Any archived version related works can't be edited.",
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description:
          'The ID of the version to update the related work on. For the related work id, pass it to the input JSON.',
      },
      category: {
        type: 'string',
        description: 'The category of the related work',
      },
      issueId: {
        type: 'integer',
        description:
          'The ID of the issue associated with the related work (if there is one). Cannot be updated via the Rest API.',
      },
      relatedWorkId: {
        type: 'string',
        description:
          'The id of the related work. For the native release note related work item, this will be null, and Rest API does not support updating it.',
      },
      title: {
        type: 'string',
        description: 'The title of the related work',
      },
      url: {
        type: 'string',
        description:
          'The URL of the related work. Will be null for the native release note related work item, but is otherwise required.',
      },
    },
    required: ['id', 'category'],
  },
  request: {
    method: 'PUT',
    path: '/rest/api/2/version/{id}/relatedwork',
    body: ['category', 'issueId', 'relatedWorkId', 'title', 'url'],
  },
});
