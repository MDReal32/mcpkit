import { defineTool } from "@usemcpkit/core";

export const adminGeoCreateGeoNodes = defineTool({
  name: "admin:geo:create_geo_nodes",
  description: "Create a Geo node. Creates a Geo node.",
  input: {
    type: "object",
    properties: {
      primary: {
        type: "boolean",
        description: "Specifying whether this node will be primary.",
        default: false,
      },
      enabled: {
        type: "boolean",
        description: "Specifying whether this node will be enabled.",
        default: true,
      },
      name: {
        type: "string",
        description:
          "Unique identifier for the Geo node. Must match `geo_node_name` if it is set in `gitlab.rb`, otherwise it must match `external_url`.",
      },
      url: {
        type: "string",
        description: "User-facing URL of the Geo node.",
      },
      internal_url: {
        type: "string",
        description:
          "URL defined on the primary node that secondary nodes use to contact it. Returns `url` if not set.",
      },
      files_max_capacity: {
        type: "integer",
        description: "Control the maximum concurrency of LFS/attachment backfill for this secondary node.",
        default: 10,
      },
      repos_max_capacity: {
        type: "integer",
        description: "Control the maximum concurrency of repository backfill for this secondary node.",
        default: 10,
      },
      verification_max_capacity: {
        type: "integer",
        description: "Control the maximum concurrency of repository verification for this node.",
        default: 10,
      },
      container_repositories_max_capacity: {
        type: "integer",
        description: "Control the maximum concurrency of container repository sync for this node.",
        default: 2,
      },
      sync_object_storage: {
        type: "boolean",
        description: "Flag indicating if the secondary Geo node will replicate blobs in Object Storage.",
        default: false,
      },
      selective_sync_type: {
        type: "string",
        description:
          "Limit syncing to only specific groups or shards. Possible values are `namespaces`, `shards`, and `null`.",
      },
      selective_sync_shards: {
        type: "array",
        description: "Repository storages to sync projects from if `selective_sync_type` is `shards`.",
        items: {
          type: "string",
        },
      },
      selective_sync_namespace_ids: {
        type: "array",
        description: "IDs of groups to sync if `selective_sync_type` is `namespaces`.",
        items: {
          type: "integer",
        },
      },
      selective_sync_organization_ids: {
        type: "array",
        description: "IDs of organizations to sync if `selective_sync_type` is `organizations`.",
        items: {
          type: "integer",
        },
      },
      minimum_reverification_interval: {
        type: "integer",
        description:
          "Interval, in days, after which repository verification expires and is repeated. Has no effect when set on a secondary node.",
      },
      checksum_mismatch_report_threshold: {
        type: "integer",
        description:
          "Number of consecutive checksum mismatches on a secondary node before it reports the resource to the primary for self-heal re-verification. Read from the secondary node, and has no effect when set on the primary.",
      },
      checksum_mismatch_self_heal_cooldown_minutes: {
        type: "integer",
        description:
          "Minimum time, in minutes, between self-heal re-verification triggers for the same resource. The primary and each secondary node use their own value. Secondary nodes use it to throttle re-reporting the same resource, and the primary uses it to throttle re-verifying an already-verified resource.",
      },
    },
    required: ["name", "url"],
  },
  request: {
    method: "POST",
    path: "/geo_nodes",
    body: [
      "primary",
      "enabled",
      "name",
      "url",
      "internal_url",
      "files_max_capacity",
      "repos_max_capacity",
      "verification_max_capacity",
      "container_repositories_max_capacity",
      "sync_object_storage",
      "selective_sync_type",
      "selective_sync_shards",
      "selective_sync_namespace_ids",
      "selective_sync_organization_ids",
      "minimum_reverification_interval",
      "checksum_mismatch_report_threshold",
      "checksum_mismatch_self_heal_cooldown_minutes",
    ],
  },
});
