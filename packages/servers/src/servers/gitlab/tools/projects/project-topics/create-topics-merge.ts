import { defineTool } from '@usemcpkit/core';

export const projectsProjectTopicsCreateTopicsMerge = defineTool({
  name: 'projects:project_topics:create_topics_merge',
  description:
    'Merge topics. Merges a source topic into a target topic. This action deletes the source topic and moves all assigned projects to the target topic. Administrators only.',
  input: {
    type: 'object',
    properties: {
      source_topic_id: {
        type: 'integer',
        description: 'ID of the project topic to merge from.',
      },
      target_topic_id: {
        type: 'integer',
        description: 'ID of the project topic to merge into.',
      },
    },
    required: ['source_topic_id', 'target_topic_id'],
  },
  request: {
    method: 'POST',
    path: '/topics/merge',
    body: ['source_topic_id', 'target_topic_id'],
  },
});
