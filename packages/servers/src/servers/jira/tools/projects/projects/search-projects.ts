import { defineTool } from '@usemcpkit/core';

export const projectsProjectsSearchProjects = defineTool({
  name: 'projects:projects:search_projects',
  description: 'Get projects paginated. Returns a paginated list of projects visible to the user.',
  input: {
    type: 'object',
    properties: {
      startAt: {
        type: 'integer',
        default: 0,
        description: 'The index of the first item to return in a page of results (page offset).',
      },
      maxResults: {
        type: 'integer',
        default: 50,
        description:
          'The maximum number of items to return per page. Must be less than or equal to 100. If a value greater than 100 is provided, the `maxResults` parameter will default to 100.',
      },
      orderBy: {
        type: 'string',
        default: 'key',
        enum: [
          'category',
          '-category',
          '+category',
          'key',
          '-key',
          '+key',
          'name',
          '-name',
          '+name',
          'owner',
          '-owner',
          '+owner',
          'issueCount',
          '-issueCount',
          '+issueCount',
          'lastIssueUpdatedDate',
          '-lastIssueUpdatedDate',
          '+lastIssueUpdatedDate',
          'archivedDate',
          '+archivedDate',
          '-archivedDate',
          'deletedDate',
          '+deletedDate',
          '-deletedDate',
        ],
        description: 'Order the results by a field.',
      },
      id: {
        type: 'string',
        description:
          'The project IDs to filter the results by. To include multiple IDs, provide an ampersand-separated list. For example, `id=10000&id=10001`. Up to 50 project IDs can be provided. (comma-separated)',
      },
      keys: {
        type: 'string',
        description:
          'The project keys to filter the results by. To include multiple keys, provide an ampersand-separated list. For example, `keys=PA&keys=PB`. Up to 50 project keys can be provided. (comma-separated)',
      },
      query: {
        type: 'string',
        description:
          'Filter the results using a literal string. Projects with a matching `key` or `name` are returned (case insensitive).',
      },
      typeKey: {
        type: 'string',
        description:
          'Orders results by the project type. This parameter accepts a comma-separated list. Valid values are `business`, `service_desk`, and `software`.',
      },
      categoryId: {
        type: 'integer',
        description:
          "The ID of the project's category. A complete list of category IDs is found using the Get all project categories operation.",
      },
      action: {
        type: 'string',
        default: 'view',
        enum: ['view', 'browse', 'edit', 'create'],
        description: 'Filter results by projects for which the user can:',
      },
      expand: {
        type: 'string',
        description:
          'Use expand to include additional information in the response. This parameter accepts a comma-separated list. Expanded options include:',
      },
      status: {
        type: 'string',
        description: 'EXPERIMENTAL. Filter results by project status: (comma-separated)',
      },
      properties: {
        type: 'string',
        description:
          'EXPERIMENTAL. A list of project properties to return for the project. This parameter accepts a comma-separated list. (comma-separated)',
      },
      propertyQuery: {
        type: 'string',
        description:
          'EXPERIMENTAL. A query string used to search properties. The query string cannot be specified using a JSON object. For example, to search for the value of `nested` from `{"something":{"nested":1,"other":2}}` use `[thepropertykey].something.nested=1`. Note that the propertyQuery key is enclosed in square brackets to enable searching where the propertyQuery key includes dot (.) or equals (=) charact…',
      },
    },
  },
  request: {
    method: 'GET',
    path: '/rest/api/2/project/search',
    query: [
      'startAt',
      'maxResults',
      'orderBy',
      'id',
      'keys',
      'query',
      'typeKey',
      'categoryId',
      'action',
      'expand',
      'status',
      'properties',
      'propertyQuery',
    ],
  },
});
