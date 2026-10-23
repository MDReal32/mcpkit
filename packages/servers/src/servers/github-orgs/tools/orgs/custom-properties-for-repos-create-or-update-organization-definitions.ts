import { defineTool } from '@usemcpkit/core';

export const orgsCustomPropertiesForReposCreateOrUpdateOrganizationDefinitions = defineTool({
  name: 'orgs:custom_properties_for_repos_create_or_update_organization_definitions',
  description:
    'Create or update custom properties for an organization. Creates new or updates existing custom properties defined for an organization in a batch.',
  input: {
    type: 'object',
    properties: {
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
      },
      properties: {
        type: 'array',
        description: 'The array of custom properties to create or update.',
        items: {
          type: 'object',
          description: 'Custom property defined on an organization',
          properties: {
            property_name: {
              type: 'string',
              description: 'The name of the property',
            },
            url: {
              type: 'string',
              description: 'The URL that can be used to fetch, update, or delete info about this property via the API.',
            },
            source_type: {
              type: 'string',
              description: 'The source type of the property',
              enum: ['organization', 'enterprise'],
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
          required: ['property_name', 'value_type'],
        },
      },
    },
    required: ['org', 'properties'],
  },
  request: {
    method: 'PATCH',
    path: '/orgs/{org}/properties/schema',
    body: ['properties'],
  },
});
