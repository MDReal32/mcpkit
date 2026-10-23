import { defineTool } from '@usemcpkit/core';

export const datacenterSpaceCreateCategory = defineTool({
  name: 'datacenter:space:create_category',
  description:
    '[Data Center] Add a category to a space. Adds a category the description of a given {@link Space} identified by spaceKey.',
  input: {
    type: 'object',
    properties: {
      spaceKey: {
        type: 'string',
        description: 'a string containing the key of the space',
      },
      labelName: {
        type: 'string',
        description: 'the name of the label to be added (do not include any prefix, team: prefix assumed)',
      },
    },
    required: ['spaceKey', 'labelName'],
  },
  request: {
    method: 'POST',
    path: '/rest/api/space/{spaceKey}/category/{labelName}',
  },
});
