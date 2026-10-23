import { defineTool } from '@usemcpkit/core';

export const securityAdvisoriesGetGlobalAdvisory = defineTool({
  name: 'security_advisories:get_global_advisory',
  description:
    'Get a global security advisory. Gets a global security advisory using its GitHub Security Advisory (GHSA) identifier.',
  input: {
    type: 'object',
    properties: {
      ghsa_id: {
        type: 'string',
        description: 'The GHSA (GitHub Security Advisory) identifier of the advisory.',
      },
    },
    required: ['ghsa_id'],
  },
  request: {
    method: 'GET',
    path: '/advisories/{ghsa_id}',
  },
});
