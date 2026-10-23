import { defineTool } from '@usemcpkit/core';

export const appsIssueCustomFieldConfigurationAppsGetCustomFieldsConfigurations = defineTool({
  name: 'apps:issue_custom_field_configuration_apps:get_custom_fields_configurations',
  description:
    'Bulk get custom field configurations. Returns a paginated list of configurations for list of custom fields of a type created by a Forge app.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description:
          "The list of configuration IDs. To include multiple configurations, separate IDs with an ampersand: `id=10000&id=10001`. Can't be provided with `fieldContextId`, `issueId`, `projectKeyOrId`, or `issueTypeId`. (comma-separated)",
      },
      fieldContextId: {
        type: 'string',
        description:
          "The list of field context IDs. To include multiple field contexts, separate IDs with an ampersand: `fieldContextId=10000&fieldContextId=10001`. Can't be provided with `id`, `issueId`, `projectKeyOrId`, or `issueTypeId`. (comma-separated)",
      },
      issueId: {
        type: 'integer',
        description:
          "The ID of the issue to filter results by. If the issue doesn't exist, an empty list is returned. Can't be provided with `projectKeyOrId`, or `issueTypeId`.",
      },
      projectKeyOrId: {
        type: 'string',
        description:
          "The ID or key of the project to filter results by. Must be provided with `issueTypeId`. Can't be provided with `issueId`.",
      },
      issueTypeId: {
        type: 'string',
        description:
          "The ID of the issue type to filter results by. Must be provided with `projectKeyOrId`. Can't be provided with `issueId`.",
      },
      startAt: {
        type: 'integer',
        default: 0,
        description: 'The index of the first item to return in a page of results (page offset).',
      },
      maxResults: {
        type: 'integer',
        default: 100,
        description: 'The maximum number of items to return per page.',
      },
      fieldIdsOrKeys: {
        type: 'array',
        description: 'List of IDs or keys of the custom fields. It can be a mix of IDs and keys in the same query.',
        items: {
          type: 'string',
        },
      },
    },
    required: ['fieldIdsOrKeys'],
  },
  request: {
    method: 'POST',
    path: '/rest/api/2/app/field/context/configuration/list',
    query: ['id', 'fieldContextId', 'issueId', 'projectKeyOrId', 'issueTypeId', 'startAt', 'maxResults'],
    body: ['fieldIdsOrKeys'],
  },
});
