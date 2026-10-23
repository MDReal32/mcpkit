import { defineTool } from '@usemcpkit/core';

export const usersMyselfSetLocale = defineTool({
  name: 'users:myself:set_locale',
  description:
    '[Deprecated] Set locale. Deprecated, use Update a user profile from the user management REST API instead.',
  input: {
    type: 'object',
    properties: {
      locale: {
        type: 'string',
        description:
          'The locale code. The Java the locale format is used: a two character language code (ISO 639), an underscore, and two letter country code (ISO 3166). For example, en\\_US represents a locale of English (United States). Required on create.',
      },
    },
  },
  request: {
    method: 'PUT',
    path: '/rest/api/2/mypreferences/locale',
    body: ['locale'],
  },
});
