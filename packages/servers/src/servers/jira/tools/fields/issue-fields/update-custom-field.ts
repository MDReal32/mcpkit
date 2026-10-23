import { defineTool } from '@usemcpkit/core';

export const fieldsIssueFieldsUpdateCustomField = defineTool({
  name: 'fields:issue_fields:update_custom_field',
  description: 'Update custom field. Updates a custom field.',
  input: {
    type: 'object',
    properties: {
      fieldId: {
        type: 'string',
        description: 'The ID of the custom field.',
      },
      description: {
        type: 'string',
        description: 'The description of the custom field. The maximum length is 40000 characters.',
      },
      name: {
        type: 'string',
        description:
          "The name of the custom field. It doesn't have to be unique. The maximum length is 255 characters.",
      },
      searcherKey: {
        type: 'string',
        description:
          'The searcher that defines the way the field is searched in Jira. It can be set to `null`, otherwise you must specify the valid searcher for the field type, as listed below (abbreviated values shown):',
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
    },
    required: ['fieldId'],
  },
  request: {
    method: 'PUT',
    path: '/rest/api/2/field/{fieldId}',
    body: ['description', 'name', 'searcherKey'],
  },
});
