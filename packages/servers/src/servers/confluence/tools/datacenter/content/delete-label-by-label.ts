import { defineTool } from '@usemcpkit/core';

export const datacenterContentDeleteLabelByLabel = defineTool({
  name: 'datacenter:content:delete_label_by_label',
  description:
    "[Data Center] Delete label. Deletes a labels to the specified content. The body is the json representation of the list. When calling this method through REST the label parameter doesn't accept `/` characters in label names, because of security constraints. For this case please use the query parameter version of this method (`/content/{id}/label?name={label}`)",
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
      },
      label: {
        type: 'string',
        description: 'the name of the label to be removed from the content',
      },
    },
    required: ['id', 'label'],
  },
  request: {
    method: 'DELETE',
    path: '/rest/api/content/{id}/label/{label}',
  },
});
