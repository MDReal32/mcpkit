import { defineTool } from '@usemcpkit/core';

export const codesOfConductGetAllCodesOfConduct = defineTool({
  name: 'codes_of_conduct:get_all_codes_of_conduct',
  description: "Get all codes of conduct. Returns array of all GitHub's codes of conduct.",
  input: {
    type: 'object',
    properties: {},
  },
  request: {
    method: 'GET',
    path: '/codes_of_conduct',
  },
});
