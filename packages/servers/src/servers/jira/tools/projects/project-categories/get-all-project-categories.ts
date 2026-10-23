import { defineTool } from '@usemcpkit/core';

export const projectsProjectCategoriesGetAllProjectCategories = defineTool({
  name: 'projects:project_categories:get_all_project_categories',
  description: 'Get all project categories. Returns all project categories.',
  input: {
    type: 'object',
    properties: {},
  },
  request: {
    method: 'GET',
    path: '/rest/api/2/projectCategory',
  },
});
