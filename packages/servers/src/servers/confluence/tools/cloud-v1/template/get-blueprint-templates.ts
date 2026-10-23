import { defineTool } from '@usemcpkit/core';

export const cloudV1TemplateGetBlueprintTemplates = defineTool({
  name: 'cloud_v1:template:get_blueprint_templates',
  description:
    '[Cloud v1] Get blueprint templates. Returns all templates provided by blueprints. Use this method to retrieve all global blueprint templates or all blueprint templates in a space.',
  input: {
    type: 'object',
    properties: {
      spaceKey: {
        type: 'string',
        description:
          'The key of the space to be queried for templates. If the `spaceKey` is not specified, global blueprint templates will be returned.',
      },
      start: {
        type: 'integer',
        description: 'The starting index of the returned templates.',
      },
      limit: {
        type: 'integer',
        description:
          'The maximum number of templates to return per page. Note, this may be restricted by fixed system limits.',
      },
      expand: {
        type: 'string',
        description: 'A multi-value parameter indicating which properties of the template to expand. (comma-separated)',
      },
    },
  },
  request: {
    method: 'GET',
    path: '/wiki/rest/api/template/blueprint',
    query: ['spaceKey', 'start', 'limit', 'expand'],
  },
});
