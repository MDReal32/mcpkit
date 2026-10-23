import { defineTool } from '@usemcpkit/core';

export const securitySecretScanningListAlertsForOrg = defineTool({
  name: 'security:secret_scanning:list_alerts_for_org',
  description:
    'List secret scanning alerts for an organization. Lists secret scanning alerts for eligible repositories in an organization, from newest to oldest.',
  input: {
    type: 'object',
    properties: {
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
      },
      state: {
        type: 'string',
        enum: ['open', 'resolved'],
        description: 'Set to `open` or `resolved` to only list secret scanning alerts in a specific state.',
      },
      secret_type: {
        type: 'string',
        description:
          'A comma-separated list of secret types to return. All default secret patterns are returned. To return generic patterns, pass the token name(s) in the parameter. See "Supported secret scanning patterns" for a complete list of secret types.',
      },
      exclude_secret_types: {
        type: 'string',
        description:
          'A comma-separated list of secret types to exclude from the results. All default secret patterns are returned except those matching the specified types. Cannot be combined with the `secret_type` parameter. See "Supported secret scanning patterns" for a complete list of secret types.',
      },
      exclude_providers: {
        type: 'string',
        description:
          'A comma-separated list of provider slugs to exclude from the results. Provider slugs use lowercase with underscores (e.g., `github_secret_scanning`, `clojars`). You can find the provider slug in the `provider_slug` field of each alert. Cannot be combined with the `providers` parameter.',
      },
      providers: {
        type: 'string',
        description:
          'A comma-separated list of provider slugs to filter by. Provider slugs use lowercase with underscores (e.g., `github_secret_scanning`, `clojars`). You can find the provider slug in the `provider_slug` field of each alert. Cannot be combined with the `exclude_providers` parameter.',
      },
      resolution: {
        type: 'string',
        description:
          'A comma-separated list of resolutions. Only secret scanning alerts with one of these resolutions are listed. Valid resolutions are `false_positive`, `wont_fix`, `revoked`, `pattern_edited`, `pattern_deleted` or `used_in_tests`.',
      },
      assignee: {
        type: 'string',
        description:
          'Filters alerts by assignee. Use `*` to get all assigned alerts, `none` to get all unassigned alerts, or a GitHub username to get alerts assigned to a specific user.',
      },
      sort: {
        type: 'string',
        default: 'created',
        enum: ['created', 'updated'],
        description:
          'The property to sort the results by. `created` means when the alert was created. `updated` means when the alert was updated or resolved.',
      },
      direction: {
        type: 'string',
        default: 'desc',
        enum: ['asc', 'desc'],
        description: 'The direction to sort the results by.',
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
      before: {
        type: 'string',
        description:
          'A cursor, as given in the Link header. If specified, the query only searches for events before this cursor. To receive an initial cursor on your first request, include an empty "before" query string.',
      },
      after: {
        type: 'string',
        description:
          'A cursor, as given in the Link header. If specified, the query only searches for events after this cursor. To receive an initial cursor on your first request, include an empty "after" query string.',
      },
      validity: {
        type: 'string',
        description:
          'A comma-separated list of validities that, when present, will return alerts that match the validities in this list. Valid options are `active`, `inactive`, and `unknown`.',
      },
      is_publicly_leaked: {
        type: 'boolean',
        default: false,
        description:
          'A boolean value representing whether or not to filter alerts by the publicly-leaked tag being present.',
      },
      is_multi_repo: {
        type: 'boolean',
        default: false,
        description:
          'A boolean value representing whether or not to filter alerts by the multi-repo tag being present.',
      },
      hide_secret: {
        type: 'boolean',
        default: false,
        description: 'A boolean value representing whether or not to hide literal secrets in the results.',
      },
      is_bypassed: {
        type: 'boolean',
        description:
          'A boolean value (`true` or `false`) indicating whether to filter alerts by their push protection bypass status. When set to `true`, only alerts that were created because a push protection rule was bypassed will be returned. When set to `false`, only alerts that were not caused by a push protection bypass will be returned.',
      },
      included_metadata: {
        type: 'string',
        description:
          'A comma-separated list of metadata fields to filter alerts by. Only alerts that have all of the specified metadata fields attached will be returned. Possible values are: `owner-email`, `owner-id`, `owner-name`, `secret-id`, `secret-name`, `secret-issued-date`, `secret-expiration-date`, `organization-name`, `organization-id`, `last-used-date`, and `has-organization-access`.',
      },
      owner_email_hash: {
        type: 'string',
        description:
          'Filters alerts to only those whose attached `owner_email` metadata field matches the provided value. The value must be the lowercase hex-encoded SHA-256 hash of the email address to match (for example, the SHA-256 of `user@example.com`). Only alerts that have an `owner_email` metadata value whose SHA-256 hash equals this parameter are returned.',
      },
    },
    required: ['org'],
  },
  request: {
    method: 'GET',
    path: '/orgs/{org}/secret-scanning/alerts',
    query: [
      'state',
      'secret_type',
      'exclude_secret_types',
      'exclude_providers',
      'providers',
      'resolution',
      'assignee',
      'sort',
      'direction',
      'page',
      'per_page',
      'before',
      'after',
      'validity',
      'is_publicly_leaked',
      'is_multi_repo',
      'hide_secret',
      'is_bypassed',
      'included_metadata',
      'owner_email_hash',
    ],
  },
});
