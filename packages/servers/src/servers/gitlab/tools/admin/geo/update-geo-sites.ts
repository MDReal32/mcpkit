import { defineTool } from '@usemcpkit/core';

export const adminGeoUpdateGeoSites = defineTool({
  name: 'admin:geo:update_geo_sites',
  description: 'Update a Geo site. Updates a specified Geo site.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'The ID of the site',
      },
      enabled: {
        type: 'boolean',
        description: 'If `true`, the Geo site is enabled.',
      },
      name: {
        type: 'string',
        description:
          'Unique identifier for the Geo site. Must match `geo_node_name` if it is set in `gitlab.rb`, otherwise it must match `external_url`.',
      },
      url: {
        type: 'string',
        description: 'User-facing URL of the Geo site.',
      },
      internal_url: {
        type: 'string',
        description:
          'URL defined on the primary site that secondary sites use to contact it. Returns `url` if not set.',
      },
      files_max_capacity: {
        type: 'integer',
        description: 'Maximum concurrency of LFS and attachment backfill for the secondary site.',
      },
      repos_max_capacity: {
        type: 'integer',
        description: 'Maximum concurrency of repository backfill for the secondary site.',
      },
      verification_max_capacity: {
        type: 'integer',
        description: 'Maximum concurrency of verification for the site.',
      },
      container_repositories_max_capacity: {
        type: 'integer',
        description: 'Maximum concurrency of container repository sync for the site.',
      },
      sync_object_storage: {
        type: 'boolean',
        description: 'If `true`, the secondary Geo site replicates blobs in object storage.',
      },
      selective_sync_type: {
        type: 'string',
        description:
          'Limit syncing to only specific groups, or shards. Valid values: `"namespaces"`, `"shards"`, or `null`',
      },
      selective_sync_shards: {
        type: 'array',
        description: 'Repository storages to sync projects from if `selective_sync_type` is `shards`.',
        items: {
          type: 'string',
        },
      },
      selective_sync_namespace_ids: {
        type: 'array',
        description: 'IDs of groups to sync if `selective_sync_type` is `namespaces`.',
        items: {
          type: 'integer',
        },
      },
      selective_sync_organization_ids: {
        type: 'array',
        description: 'IDs of organizations to sync if `selective_sync_type` is `organizations`.',
        items: {
          type: 'integer',
        },
      },
      minimum_reverification_interval: {
        type: 'integer',
        description:
          'Interval, in days, after which verification expires and is repeated. Has no effect when set on a secondary site.',
      },
      checksum_mismatch_report_threshold: {
        type: 'integer',
        description:
          'Number of consecutive checksum mismatches on a secondary site before it reports the resource to the primary for self-heal re-verification. Read from the secondary site, and has no effect when set on the primary.',
      },
      checksum_mismatch_self_heal_cooldown_minutes: {
        type: 'integer',
        description:
          'Minimum time, in minutes, between self-heal re-verification triggers for the same resource. The primary and each secondary site use their own value. Secondary sites use it to throttle re-reporting the same resource, and the primary uses it to throttle re-verifying an already-verified resource.',
      },
      blob_download_timeout: {
        type: 'integer',
        description: 'Maximum time (in seconds) for blob downloads during Geo sync.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'PUT',
    path: '/geo_sites/{id}',
    body: [
      'enabled',
      'name',
      'url',
      'internal_url',
      'files_max_capacity',
      'repos_max_capacity',
      'verification_max_capacity',
      'container_repositories_max_capacity',
      'sync_object_storage',
      'selective_sync_type',
      'selective_sync_shards',
      'selective_sync_namespace_ids',
      'selective_sync_organization_ids',
      'minimum_reverification_interval',
      'checksum_mismatch_report_threshold',
      'checksum_mismatch_self_heal_cooldown_minutes',
      'blob_download_timeout',
    ],
  },
});
