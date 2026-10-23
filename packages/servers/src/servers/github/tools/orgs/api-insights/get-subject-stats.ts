import { defineTool } from '@usemcpkit/core';

export const orgsApiInsightsGetSubjectStats = defineTool({
  name: 'orgs:api_insights:get_subject_stats',
  description:
    'Get subject stats. Get API request statistics for all subjects within an organization within a specified time frame. Subjects can be users or GitHub Apps.',
  input: {
    type: 'object',
    properties: {
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
      },
      min_timestamp: {
        type: 'string',
        description:
          'The minimum timestamp to query for stats. This is a timestamp in ISO 8601 format: `YYYY-MM-DDTHH:MM:SSZ`.',
      },
      max_timestamp: {
        type: 'string',
        description:
          'The maximum timestamp to query for stats. Defaults to the time 30 days ago. This is a timestamp in ISO 8601 format: `YYYY-MM-DDTHH:MM:SSZ`.',
      },
      page: {
        type: 'integer',
        default: 1,
        description:
          'The page number of the results to fetch. For more information, see "Using pagination in the REST API."',
      },
      per_page: {
        type: 'integer',
        default: 30,
        description:
          'The number of results per page (max 100). For more information, see "Using pagination in the REST API."',
      },
      direction: {
        type: 'string',
        default: 'desc',
        enum: ['asc', 'desc'],
        description: 'The direction to sort the results by.',
      },
      sort: {
        type: 'string',
        description: 'The property to sort the results by. (comma-separated)',
      },
      subject_name_substring: {
        type: 'string',
        description:
          'Providing a substring will filter results where the subject name contains the substring. This is a case-insensitive search.',
      },
    },
    required: ['org', 'min_timestamp'],
  },
  request: {
    method: 'GET',
    path: '/orgs/{org}/insights/api/subject-stats',
    query: ['min_timestamp', 'max_timestamp', 'page', 'per_page', 'direction', 'sort', 'subject_name_substring'],
  },
});
