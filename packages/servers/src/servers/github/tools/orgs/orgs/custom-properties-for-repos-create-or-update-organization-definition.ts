import { defineTool } from '@usemcpkit/core';

export const orgsOrgsCustomPropertiesForReposCreateOrUpdateOrganizationDefinition = defineTool({
  name: 'orgs:orgs:custom_properties_for_repos_create_or_update_organization_definition',
  description:
    'Create or update a custom property for an organization. Creates a new or updates an existing custom property that is defined for an organization.',
  input: {
    type: 'object',
    properties: {
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
      },
      custom_property_name: {
        type: 'string',
        description: 'The custom property name',
      },
      value_type: {
        type: 'string',
        description: 'The type of the value for the property',
        enum: ['string', 'single_select', 'multi_select', 'true_false', 'url'],
      },
      required: {
        type: 'boolean',
        description: 'Whether the property is required.',
      },
      default_value: {
        description: 'Default value of the property',
      },
      description: {
        type: 'string',
        description: 'Short description of the property',
      },
      allowed_values: {
        type: 'array',
        description:
          'An ordered list of the allowed values of the property. The property can have up to 200 allowed values.',
        items: {
          type: 'string',
        },
      },
      values_editable_by: {
        type: 'string',
        description: 'Who can edit the values of the property',
        enum: ['org_actors', 'org_and_repo_actors'],
      },
      require_explicit_values: {
        type: 'boolean',
        description: 'Whether setting properties values is mandatory',
      },
    },
    required: ['org', 'custom_property_name', 'value_type'],
  },
  request: {
    method: 'PUT',
    path: '/orgs/{org}/properties/schema/{custom_property_name}',
    body: [
      'value_type',
      'required',
      'default_value',
      'description',
      'allowed_values',
      'values_editable_by',
      'require_explicit_values',
    ],
  },
});
