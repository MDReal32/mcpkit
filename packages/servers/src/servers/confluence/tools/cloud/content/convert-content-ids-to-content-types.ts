import { defineTool } from '@usemcpkit/core';

export const cloudContentConvertContentIdsToContentTypes = defineTool({
  name: 'cloud:content:convert_content_ids_to_content_types',
  description:
    '[Cloud] Convert content ids to content types. Converts a list of content ids into their associated content types. This is useful for users migrating from v1 to v2 who may have stored just content ids without their associated type. This will return types as they should be used in v2. Notably, this will return `inline-comment` for inline comments and `footer-comment` for footer comments, which is distinct from them both being represented by `c…',
  input: {
    type: 'object',
    properties: {
      contentIds: {
        type: 'array',
        description: 'The content ids to convert. They may be provided as strings or numbers.',
        items: {},
      },
    },
    required: ['contentIds'],
  },
  request: {
    method: 'POST',
    path: '/wiki/api/v2/content/convert-ids-to-types',
    body: ['contentIds'],
  },
});
