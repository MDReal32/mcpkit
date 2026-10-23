import { defineTool } from '@usemcpkit/core';

export const issuesJiraExpressionsAnalyseExpression = defineTool({
  name: 'issues:jira_expressions:analyse_expression',
  description: 'Analyse Jira expression. Analyses and validates Jira expressions.',
  input: {
    type: 'object',
    properties: {
      check: {
        type: 'string',
        default: 'syntax',
        enum: ['syntax', 'type', 'complexity'],
        description: 'The check to perform:',
      },
      contextVariables: {
        type: 'object',
        description:
          'Context variables and their types. The type checker assumes that common context variables, such as `issue` or `project`, are available in context and sets their type. Use this property to override the default types or provide details of new variables.',
      },
      expressions: {
        type: 'array',
        description: 'The list of Jira expressions to analyse.',
        items: {
          type: 'string',
          description: 'The list of Jira expressions to analyse.',
        },
      },
    },
    required: ['expressions'],
  },
  request: {
    method: 'POST',
    path: '/rest/api/2/expression/analyse',
    query: ['check'],
    body: ['contextVariables', 'expressions'],
  },
});
