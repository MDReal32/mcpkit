import { defineTool } from "@usemcpkit/core";

export const adminGeoCreateGeoStatus = defineTool({
  name: "admin:geo:create_geo_status",
  description:
    "Create a status for a secondary site. Creates a status for a secondary Geo site on the primary site, including replication metrics.",
  input: {
    type: "object",
    properties: {
      data: {
        type: "object",
        description: "Object that contains status information and replication metrics for the Geo node.",
        properties: {
          geo_node_id: {
            type: "integer",
            description: "ID of the Geo node the status applies to.",
          },
          db_replication_lag_seconds: {
            type: "integer",
            description: "Database replication lag, in seconds.",
          },
          last_event_id: {
            type: "integer",
            description: "ID of the last event.",
          },
          last_event_date: {
            type: "string",
            description: "Last event date.",
          },
          cursor_last_event_id: {
            type: "integer",
            description: "ID of the last event processed by the cursor.",
          },
          cursor_last_event_date: {
            type: "string",
            description: "Date of the last event processed by the cursor.",
          },
          last_successful_status_check_at: {
            type: "string",
            description: "Last successful status check date.",
          },
          status_message: {
            type: "string",
            description: "Status message.",
          },
          replication_slots_count: {
            type: "integer",
            description: "Number of replication slots.",
          },
          replication_slots_used_count: {
            type: "integer",
            description: "Number of replication slots in use.",
          },
          replication_slots_max_retained_wal_bytes: {
            type: "integer",
            description: "Maximum number of bytes retained in the WAL on the primary.",
          },
          version: {
            type: "string",
            description: "GitLab version.",
          },
          revision: {
            type: "string",
            description: "GitLab revision.",
          },
          status: {
            type: "object",
            description:
              "Object that contains information on replication and verification status metrics for GitLab resources on Geo nodes.",
            properties: {
              projects_count: {
                type: "integer",
                description: "Number of projects.",
              },
              container_repositories_replication_enabled: {
                type: "boolean",
                description: "If `true`, container repository replication is enabled.",
              },
              lfs_objects_count: {
                type: "integer",
                description: "Number of LFS objects.",
              },
              lfs_objects_checksum_total_count: {
                type: "integer",
                description: "Number of LFS objects available to checksum on the primary site.",
              },
              lfs_objects_checksummed_count: {
                type: "integer",
                description: "Number of LFS objects that have been checksummed.",
              },
              lfs_objects_checksum_failed_count: {
                type: "integer",
                description: "Number of LFS objects for which checksum calculation failed.",
              },
              lfs_objects_synced_count: {
                type: "integer",
                description: "Number of LFS objects synced.",
              },
              lfs_objects_failed_count: {
                type: "integer",
                description: "Number of LFS objects that failed to sync.",
              },
              lfs_objects_registry_count: {
                type: "integer",
                description: "Number of LFS objects tracked in the registry.",
              },
              lfs_objects_verification_total_count: {
                type: "integer",
                description: "Number of LFS objects available to verify on the secondary site.",
              },
              lfs_objects_verified_count: {
                type: "integer",
                description: "Number of LFS objects verified.",
              },
              lfs_objects_verification_failed_count: {
                type: "integer",
                description: "Number of LFS objects for which verification failed.",
              },
              merge_request_diffs_count: {
                type: "integer",
                description: "Number of merge request diffs.",
              },
              merge_request_diffs_checksum_total_count: {
                type: "integer",
                description: "Number of merge request diffs available to checksum on the primary site.",
              },
              merge_request_diffs_checksummed_count: {
                type: "integer",
                description: "Number of merge request diffs that have been checksummed.",
              },
              merge_request_diffs_checksum_failed_count: {
                type: "integer",
                description: "Number of merge request diffs for which checksum calculation failed.",
              },
              merge_request_diffs_synced_count: {
                type: "integer",
                description: "Number of merge request diffs synced.",
              },
              merge_request_diffs_failed_count: {
                type: "integer",
                description: "Number of merge request diffs that failed to sync.",
              },
              merge_request_diffs_registry_count: {
                type: "integer",
                description: "Number of merge request diffs tracked in the registry.",
              },
              merge_request_diffs_verification_total_count: {
                type: "integer",
                description: "Number of merge request diffs available to verify on the secondary site.",
              },
              merge_request_diffs_verified_count: {
                type: "integer",
                description: "Number of merge request diffs verified.",
              },
              merge_request_diffs_verification_failed_count: {
                type: "integer",
                description: "Number of merge request diffs for which verification failed.",
              },
              package_files_count: {
                type: "integer",
                description: "Number of package files.",
              },
              package_files_checksum_total_count: {
                type: "integer",
                description: "Number of package files available to checksum on the primary site.",
              },
              package_files_checksummed_count: {
                type: "integer",
                description: "Number of package files that have been checksummed.",
              },
              package_files_checksum_failed_count: {
                type: "integer",
                description: "Number of package files for which checksum calculation failed.",
              },
              package_files_synced_count: {
                type: "integer",
                description: "Number of package files synced.",
              },
              package_files_failed_count: {
                type: "integer",
                description: "Number of package files that failed to sync.",
              },
              package_files_registry_count: {
                type: "integer",
                description: "Number of package files tracked in the registry.",
              },
              package_files_verification_total_count: {
                type: "integer",
                description: "Number of package files available to verify on the secondary site.",
              },
              package_files_verified_count: {
                type: "integer",
                description: "Number of package files verified.",
              },
              package_files_verification_failed_count: {
                type: "integer",
                description: "Number of package files for which verification failed.",
              },
              packages_nuget_symbols_count: {
                type: "integer",
                description: "Number of NuGet symbols.",
              },
              packages_nuget_symbols_checksum_total_count: {
                type: "integer",
                description: "Number of NuGet symbols available to checksum on the primary site.",
              },
              packages_nuget_symbols_checksummed_count: {
                type: "integer",
                description: "Number of NuGet symbols that have been checksummed.",
              },
              packages_nuget_symbols_checksum_failed_count: {
                type: "integer",
                description: "Number of NuGet symbols for which checksum calculation failed.",
              },
              packages_nuget_symbols_synced_count: {
                type: "integer",
                description: "Number of NuGet symbols synced.",
              },
              packages_nuget_symbols_failed_count: {
                type: "integer",
                description: "Number of NuGet symbols that failed to sync.",
              },
              packages_nuget_symbols_registry_count: {
                type: "integer",
                description: "Number of NuGet symbols tracked in the registry.",
              },
              packages_nuget_symbols_verification_total_count: {
                type: "integer",
                description: "Number of NuGet symbols available to verify on the secondary site.",
              },
              packages_nuget_symbols_verified_count: {
                type: "integer",
                description: "Number of NuGet symbols verified.",
              },
              packages_nuget_symbols_verification_failed_count: {
                type: "integer",
                description: "Number of NuGet symbols for which verification failed.",
              },
              terraform_state_versions_count: {
                type: "integer",
                description: "Number of Terraform state versions.",
              },
              terraform_state_versions_checksum_total_count: {
                type: "integer",
                description: "Number of Terraform state versions available to checksum on the primary site.",
              },
              terraform_state_versions_checksummed_count: {
                type: "integer",
                description: "Number of Terraform state versions that have been checksummed.",
              },
              terraform_state_versions_checksum_failed_count: {
                type: "integer",
                description: "Number of Terraform state versions for which checksum calculation failed.",
              },
              terraform_state_versions_synced_count: {
                type: "integer",
                description: "Number of Terraform state versions synced.",
              },
              terraform_state_versions_failed_count: {
                type: "integer",
                description: "Number of Terraform state versions that failed to sync.",
              },
              terraform_state_versions_registry_count: {
                type: "integer",
                description: "Number of Terraform state versions tracked in the registry.",
              },
              terraform_state_versions_verification_total_count: {
                type: "integer",
                description: "Number of Terraform state versions available to verify on the secondary site.",
              },
              terraform_state_versions_verified_count: {
                type: "integer",
                description: "Number of Terraform state versions verified.",
              },
              terraform_state_versions_verification_failed_count: {
                type: "integer",
                description: "Number of Terraform state versions for which verification failed.",
              },
              snippet_repositories_count: {
                type: "integer",
                description: "Number of snippet repositories.",
              },
              snippet_repositories_checksum_total_count: {
                type: "integer",
                description: "Number of snippet repositories available to checksum on the primary site.",
              },
              snippet_repositories_checksummed_count: {
                type: "integer",
                description: "Number of snippet repositories that have been checksummed.",
              },
              snippet_repositories_checksum_failed_count: {
                type: "integer",
                description: "Number of snippet repositories for which checksum calculation failed.",
              },
              snippet_repositories_synced_count: {
                type: "integer",
                description: "Number of snippet repositories synced.",
              },
              snippet_repositories_failed_count: {
                type: "integer",
                description: "Number of snippet repositories that failed to sync.",
              },
              snippet_repositories_registry_count: {
                type: "integer",
                description: "Number of snippet repositories tracked in the registry.",
              },
              snippet_repositories_verification_total_count: {
                type: "integer",
                description: "Number of snippet repositories available to verify on the secondary site.",
              },
              snippet_repositories_verified_count: {
                type: "integer",
                description: "Number of snippet repositories verified.",
              },
              snippet_repositories_verification_failed_count: {
                type: "integer",
                description: "Number of snippet repositories for which verification failed.",
              },
              group_wiki_repositories_count: {
                type: "integer",
                description: "Number of group wiki repositories.",
              },
              group_wiki_repositories_checksum_total_count: {
                type: "integer",
                description: "Number of group wiki repositories available to checksum on the primary site.",
              },
              group_wiki_repositories_checksummed_count: {
                type: "integer",
                description: "Number of group wiki repositories that have been checksummed.",
              },
              group_wiki_repositories_checksum_failed_count: {
                type: "integer",
                description: "Number of group wiki repositories for which checksum calculation failed.",
              },
              group_wiki_repositories_synced_count: {
                type: "integer",
                description: "Number of group wiki repositories synced.",
              },
              group_wiki_repositories_failed_count: {
                type: "integer",
                description: "Number of group wiki repositories that failed to sync.",
              },
              group_wiki_repositories_registry_count: {
                type: "integer",
                description: "Number of group wiki repositories tracked in the registry.",
              },
              group_wiki_repositories_verification_total_count: {
                type: "integer",
                description: "Number of group wiki repositories available to verify on the secondary site.",
              },
              group_wiki_repositories_verified_count: {
                type: "integer",
                description: "Number of group wiki repositories verified.",
              },
              group_wiki_repositories_verification_failed_count: {
                type: "integer",
                description: "Number of group wiki repositories for which verification failed.",
              },
              pipeline_artifacts_count: {
                type: "integer",
                description: "Number of pipeline artifacts.",
              },
              pipeline_artifacts_checksum_total_count: {
                type: "integer",
                description: "Number of pipeline artifacts available to checksum on the primary site.",
              },
              pipeline_artifacts_checksummed_count: {
                type: "integer",
                description: "Number of pipeline artifacts that have been checksummed.",
              },
              pipeline_artifacts_checksum_failed_count: {
                type: "integer",
                description: "Number of pipeline artifacts for which checksum calculation failed.",
              },
              pipeline_artifacts_synced_count: {
                type: "integer",
                description: "Number of pipeline artifacts synced.",
              },
              pipeline_artifacts_failed_count: {
                type: "integer",
                description: "Number of pipeline artifacts that failed to sync.",
              },
              pipeline_artifacts_registry_count: {
                type: "integer",
                description: "Number of pipeline artifacts tracked in the registry.",
              },
              pipeline_artifacts_verification_total_count: {
                type: "integer",
                description: "Number of pipeline artifacts available to verify on the secondary site.",
              },
              pipeline_artifacts_verified_count: {
                type: "integer",
                description: "Number of pipeline artifacts verified.",
              },
              pipeline_artifacts_verification_failed_count: {
                type: "integer",
                description: "Number of pipeline artifacts for which verification failed.",
              },
              pages_deployments_count: {
                type: "integer",
                description: "Number of Pages deployments.",
              },
              pages_deployments_checksum_total_count: {
                type: "integer",
                description: "Number of Pages deployments available to checksum on the primary site.",
              },
              pages_deployments_checksummed_count: {
                type: "integer",
                description: "Number of Pages deployments that have been checksummed.",
              },
              pages_deployments_checksum_failed_count: {
                type: "integer",
                description: "Number of Pages deployments for which checksum calculation failed.",
              },
              pages_deployments_synced_count: {
                type: "integer",
                description: "Number of Pages deployments synced.",
              },
              pages_deployments_failed_count: {
                type: "integer",
                description: "Number of Pages deployments that failed to sync.",
              },
              pages_deployments_registry_count: {
                type: "integer",
                description: "Number of Pages deployments tracked in the registry.",
              },
              pages_deployments_verification_total_count: {
                type: "integer",
                description: "Number of Pages deployments available to verify on the secondary site.",
              },
              pages_deployments_verified_count: {
                type: "integer",
                description: "Number of Pages deployments verified.",
              },
              pages_deployments_verification_failed_count: {
                type: "integer",
                description: "Number of Pages deployments for which verification failed.",
              },
              uploads_count: {
                type: "integer",
                description: "Number of uploads.",
              },
              uploads_checksum_total_count: {
                type: "integer",
                description: "Number of uploads available to checksum on the primary site.",
              },
              uploads_checksummed_count: {
                type: "integer",
                description: "Number of uploads that have been checksummed.",
              },
              uploads_checksum_failed_count: {
                type: "integer",
                description: "Number of uploads for which checksum calculation failed.",
              },
              uploads_synced_count: {
                type: "integer",
                description: "Number of uploads synced.",
              },
              uploads_failed_count: {
                type: "integer",
                description: "Number of uploads that failed to sync.",
              },
              uploads_registry_count: {
                type: "integer",
                description: "Number of uploads tracked in the registry.",
              },
              uploads_verification_total_count: {
                type: "integer",
                description: "Number of uploads available to verify on the secondary site.",
              },
              uploads_verified_count: {
                type: "integer",
                description: "Number of uploads verified.",
              },
              uploads_verification_failed_count: {
                type: "integer",
                description: "Number of uploads for which verification failed.",
              },
              job_artifacts_count: {
                type: "integer",
                description: "Number of job artifacts.",
              },
              job_artifacts_checksum_total_count: {
                type: "integer",
                description: "Number of job artifacts available to checksum on the primary site.",
              },
              job_artifacts_checksummed_count: {
                type: "integer",
                description: "Number of job artifacts that have been checksummed.",
              },
              job_artifacts_checksum_failed_count: {
                type: "integer",
                description: "Number of job artifacts for which checksum calculation failed.",
              },
              job_artifacts_synced_count: {
                type: "integer",
                description: "Number of job artifacts synced.",
              },
              job_artifacts_failed_count: {
                type: "integer",
                description: "Number of job artifacts that failed to sync.",
              },
              job_artifacts_registry_count: {
                type: "integer",
                description: "Number of job artifacts tracked in the registry.",
              },
              job_artifacts_verification_total_count: {
                type: "integer",
                description: "Number of job artifacts available to verify on the secondary site.",
              },
              job_artifacts_verified_count: {
                type: "integer",
                description: "Number of job artifacts verified.",
              },
              job_artifacts_verification_failed_count: {
                type: "integer",
                description: "Number of job artifacts for which verification failed.",
              },
              ci_secure_files_count: {
                type: "integer",
                description: "Number of CI/CD secure files.",
              },
              ci_secure_files_checksum_total_count: {
                type: "integer",
                description: "Number of CI/CD secure files available to checksum on the primary site.",
              },
              ci_secure_files_checksummed_count: {
                type: "integer",
                description: "Number of CI/CD secure files that have been checksummed.",
              },
              ci_secure_files_checksum_failed_count: {
                type: "integer",
                description: "Number of CI/CD secure files for which checksum calculation failed.",
              },
              ci_secure_files_synced_count: {
                type: "integer",
                description: "Number of CI/CD secure files synced.",
              },
              ci_secure_files_failed_count: {
                type: "integer",
                description: "Number of CI/CD secure files that failed to sync.",
              },
              ci_secure_files_registry_count: {
                type: "integer",
                description: "Number of CI/CD secure files tracked in the registry.",
              },
              ci_secure_files_verification_total_count: {
                type: "integer",
                description: "Number of CI/CD secure files available to verify on the secondary site.",
              },
              ci_secure_files_verified_count: {
                type: "integer",
                description: "Number of CI/CD secure files verified.",
              },
              ci_secure_files_verification_failed_count: {
                type: "integer",
                description: "Number of CI/CD secure files for which verification failed.",
              },
              container_repositories_count: {
                type: "integer",
                description: "Number of container repositories.",
              },
              container_repositories_checksum_total_count: {
                type: "integer",
                description: "Number of container repositories available to checksum on the primary site.",
              },
              container_repositories_checksummed_count: {
                type: "integer",
                description: "Number of container repositories that have been checksummed.",
              },
              container_repositories_checksum_failed_count: {
                type: "integer",
                description: "Number of container repositories for which checksum calculation failed.",
              },
              container_repositories_synced_count: {
                type: "integer",
                description: "Number of container repositories synced.",
              },
              container_repositories_failed_count: {
                type: "integer",
                description: "Number of container repositories that failed to sync.",
              },
              container_repositories_registry_count: {
                type: "integer",
                description: "Number of container repositories tracked in the registry.",
              },
              container_repositories_verification_total_count: {
                type: "integer",
                description: "Number of container repositories available to verify on the secondary site.",
              },
              container_repositories_verified_count: {
                type: "integer",
                description: "Number of container repositories verified.",
              },
              container_repositories_verification_failed_count: {
                type: "integer",
                description: "Number of container repositories for which verification failed.",
              },
              git_fetch_event_count_weekly: {
                type: "integer",
                description: "Number of Git fetch events in the past week.",
              },
              git_push_event_count_weekly: {
                type: "integer",
                description: "Number of Git push events in the past week.",
              },
              proxy_remote_requests_event_count_weekly: {
                type: "integer",
                description: "Number of remote requests proxied in the past week.",
              },
              proxy_local_requests_event_count_weekly: {
                type: "integer",
                description: "Number of HTTP requests received by the secondary site in the past week.",
              },
            },
          },
        },
        required: ["geo_node_id"],
      },
    },
  },
  request: {
    method: "POST",
    path: "/geo/status",
    body: ["data"],
  },
});
