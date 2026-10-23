import { defineTool } from "@usemcpkit/core";

export const adminSidekiqDeleteAdminSidekiqQueues = defineTool({
  name: "admin:sidekiq:delete_admin_sidekiq_queues",
  description:
    "Delete jobs from a Sidekiq queue. Deletes jobs from a Sidekiq queue that match the specified metadata. At least one of 32 related parameters must be provided.",
  input: {
    type: "object",
    properties: {
      queue_name: {
        type: "string",
        description: "Name of the queue to delete jobs from.",
      },
      organization_id: {
        type: "string",
        description: "Metadata key to match",
      },
      user: {
        type: "string",
        description: "Metadata key to match",
      },
      user_id: {
        type: "string",
        description: "Metadata key to match",
      },
      gl_user_id: {
        type: "string",
        description: "Metadata key to match",
      },
      scoped_user: {
        type: "string",
        description: "Metadata key to match",
      },
      scoped_user_id: {
        type: "string",
        description: "Metadata key to match",
      },
      project: {
        type: "string",
        description: "Metadata key to match",
      },
      root_namespace: {
        type: "string",
        description: "Metadata key to match",
      },
      gl_root_namespace_id: {
        type: "string",
        description: "Metadata key to match",
      },
      client_id: {
        type: "string",
        description: "Metadata key to match",
      },
      caller_id: {
        type: "string",
        description: "Metadata key to match",
      },
      remote_ip: {
        type: "string",
        description: "Metadata key to match",
      },
      job_id: {
        type: "string",
        description: "Metadata key to match",
      },
      pipeline_id: {
        type: "string",
        description: "Metadata key to match",
      },
      related_class: {
        type: "string",
        description: "Metadata key to match",
      },
      feature_category: {
        type: "string",
        description: "Metadata key to match",
      },
      artifact_size: {
        type: "string",
        description: "Metadata key to match",
      },
      artifact_used_cdn: {
        type: "string",
        description: "Metadata key to match",
      },
      artifacts_dependencies_size: {
        type: "string",
        description: "Metadata key to match",
      },
      artifacts_dependencies_count: {
        type: "string",
        description: "Metadata key to match",
      },
      root_caller_id: {
        type: "string",
        description: "Metadata key to match",
      },
      merge_action_status: {
        type: "string",
        description: "Metadata key to match",
      },
      bulk_import_entity_id: {
        type: "string",
        description: "Metadata key to match",
      },
      sidekiq_destination_shard_redis: {
        type: "string",
        description: "Metadata key to match",
      },
      kubernetes_agent_id: {
        type: "string",
        description: "Metadata key to match",
      },
      mvcc_manifest: {
        type: "string",
        description: "Metadata key to match",
      },
      client_type: {
        type: "string",
        description: "Metadata key to match",
      },
      client_name: {
        type: "string",
        description: "Metadata key to match",
      },
      client_version: {
        type: "string",
        description: "Metadata key to match",
      },
      subscription_plan: {
        type: "string",
        description: "Metadata key to match",
      },
      ai_resource: {
        type: "string",
        description: "Metadata key to match",
      },
      worker_class: {
        type: "string",
        description: "Metadata key to match",
      },
    },
    required: ["queue_name"],
  },
  request: {
    method: "DELETE",
    path: "/admin/sidekiq/queues/{queue_name}",
    query: [
      "organization_id",
      "user",
      "user_id",
      "gl_user_id",
      "scoped_user",
      "scoped_user_id",
      "project",
      "root_namespace",
      "gl_root_namespace_id",
      "client_id",
      "caller_id",
      "remote_ip",
      "job_id",
      "pipeline_id",
      "related_class",
      "feature_category",
      "artifact_size",
      "artifact_used_cdn",
      "artifacts_dependencies_size",
      "artifacts_dependencies_count",
      "root_caller_id",
      "merge_action_status",
      "bulk_import_entity_id",
      "sidekiq_destination_shard_redis",
      "kubernetes_agent_id",
      "mvcc_manifest",
      "client_type",
      "client_name",
      "client_version",
      "subscription_plan",
      "ai_resource",
      "worker_class",
    ],
  },
});
