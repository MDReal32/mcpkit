import { defineTool } from '@usemcpkit/core';

export const fieldsIssueFieldsCreateCustomField = defineTool({
  name: 'fields:issue_fields:create_custom_field',
  description: 'Create custom field. Creates a custom field.',
  input: {
    type: 'object',
    properties: {
      description: {
        type: 'string',
        description: 'The description of the custom field, which is displayed in Jira.',
      },
      name: {
        type: 'string',
        description: 'The name of the custom field, which is displayed in Jira. This is not the unique identifier.',
      },
      searcherKey: {
        type: 'string',
        description:
          'The searcher defines the way the field is searched in Jira. For example, *com.atlassian.jira.plugin.system.customfieldtypes:grouppickersearcher*. The search UI (basic search and JQL search) will display different operations and values for the field, based on the field searcher. You must specify a searcher that is valid for the field type, as listed below (abbreviated values shown):',
        enum: [
          'com.atlassian.jira.plugin.system.customfieldtypes:cascadingselectsearcher',
          'com.atlassian.jira.plugin.system.customfieldtypes:daterange',
          'com.atlassian.jira.plugin.system.customfieldtypes:datetimerange',
          'com.atlassian.jira.plugin.system.customfieldtypes:exactnumber',
          'com.atlassian.jira.plugin.system.customfieldtypes:exacttextsearcher',
          'com.atlassian.jira.plugin.system.customfieldtypes:grouppickersearcher',
          'com.atlassian.jira.plugin.system.customfieldtypes:labelsearcher',
          'com.atlassian.jira.plugin.system.customfieldtypes:multiselectsearcher',
          'com.atlassian.jira.plugin.system.customfieldtypes:numberrange',
          'com.atlassian.jira.plugin.system.customfieldtypes:projectsearcher',
          'com.atlassian.jira.plugin.system.customfieldtypes:textsearcher',
          'com.atlassian.jira.plugin.system.customfieldtypes:userpickergroupsearcher',
          'com.atlassian.jira.plugin.system.customfieldtypes:versionsearcher',
        ],
      },
      type: {
        type: 'string',
        description: 'The type of the custom field. These built-in custom field types are available:',
      },
    },
    required: ['name', 'type'],
  },
  request: {
    method: 'POST',
    path: '/rest/api/2/field',
    body: ['description', 'name', 'searcherKey', 'type'],
  },
});
