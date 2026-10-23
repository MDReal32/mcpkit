import { defineTool } from '@usemcpkit/core';

export const collaborationDashboardsAddGadget = defineTool({
  name: 'collaboration:dashboards:add_gadget',
  description: 'Add gadget to dashboard. Adds a gadget to a dashboard.',
  input: {
    type: 'object',
    properties: {
      dashboardId: {
        type: 'integer',
        description: 'The ID of the dashboard.',
      },
      color: {
        type: 'string',
        description:
          'The color of the gadget. Should be one of `blue`, `red`, `yellow`, `green`, `cyan`, `purple`, `gray`, or `white`.',
      },
      ignoreUriAndModuleKeyValidation: {
        type: 'boolean',
        description:
          "Whether to ignore the validation of module key and URI. For example, when a gadget is created that is a part of an application that isn't installed.",
      },
      moduleKey: {
        type: 'string',
        description: "The module key of the gadget type. Can't be provided with `uri`.",
      },
      position: {
        type: 'object',
        description:
          'The position of the gadget. When the gadget is placed into the position, other gadgets in the same column are moved down to accommodate it.',
        properties: {
          'The column position of the gadget.': {
            type: 'integer',
          },
          'The row position of the gadget.': {
            type: 'integer',
          },
        },
        required: ['The column position of the gadget.', 'The row position of the gadget.'],
      },
      title: {
        type: 'string',
        description: 'The title of the gadget.',
      },
      uri: {
        type: 'string',
        description: "The URI of the gadget type. Can't be provided with `moduleKey`.",
      },
    },
    required: ['dashboardId'],
  },
  request: {
    method: 'POST',
    path: '/rest/api/2/dashboard/{dashboardId}/gadget',
    body: ['color', 'ignoreUriAndModuleKeyValidation', 'moduleKey', 'position', 'title', 'uri'],
  },
});
