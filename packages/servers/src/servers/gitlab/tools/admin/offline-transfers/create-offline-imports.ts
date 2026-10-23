import { defineTool } from '@usemcpkit/core';

export const adminOfflineTransfersCreateOfflineImports = defineTool({
  name: 'admin:offline_transfers:create_offline_imports',
  description:
    'Start a new offline transfer import. Initiates a new offline transfer import from object storage. For more information, see https://docs.gitlab.com/user/group/import/offline_transfer_migrations/',
  input: {
    type: 'object',
    properties: {
      bucket: {
        type: 'string',
        description: 'Name of the object storage bucket where export data is stored.',
      },
      aws_s3_configuration: {
        type: 'object',
        description:
          'AWS S3 object storage configuration. Exactly one of `aws_s3_configuration`, `s3_compatible_configuration`, `gcs_configuration`, `gcs_hmac_configuration`, `gcs_adc_configuration` must be provided.',
        properties: {
          aws_access_key_id: {
            type: 'string',
            description: 'AWS S3 access key ID.',
          },
          aws_secret_access_key: {
            type: 'string',
            description: 'AWS S3 secret access key.',
          },
          region: {
            type: 'string',
            description: 'AWS S3 object storage region.',
          },
          path_style: {
            type: 'boolean',
            description: 'If `true`, uses path-style URLs instead of virtual-hosted-style URLs.',
            default: false,
          },
        },
        required: ['aws_access_key_id', 'aws_secret_access_key', 'region'],
      },
      s3_compatible_configuration: {
        type: 'object',
        description:
          'MinIO or other S3-compatible object storage configuration. Exactly one of `aws_s3_configuration`, `s3_compatible_configuration`, `gcs_configuration`, `gcs_hmac_configuration`, `gcs_adc_configuration` must be provided.',
        properties: {
          aws_access_key_id: {
            type: 'string',
            description: 'S3-compatible access key ID.',
          },
          aws_secret_access_key: {
            type: 'string',
            description: 'S3-compatible secret access key.',
          },
          region: {
            type: 'string',
            description: 'S3-compatible object storage region.',
          },
          endpoint: {
            type: 'string',
            description: 'Object storage location endpoint.',
          },
          path_style: {
            type: 'boolean',
            description: 'If `true`, uses path-style URLs instead of virtual-hosted-style URLs.',
            default: true,
          },
        },
        required: ['aws_access_key_id', 'aws_secret_access_key', 'region', 'endpoint'],
      },
      gcs_configuration: {
        type: 'object',
        description:
          'Google Cloud Storage configuration using a service account JSON key. Exactly one of `aws_s3_configuration`, `s3_compatible_configuration`, `gcs_configuration`, `gcs_hmac_configuration`, `gcs_adc_configuration` must be provided.',
        properties: {
          google_project: {
            type: 'string',
            description: 'Google Cloud project ID.',
          },
          google_json_key_string: {
            type: 'string',
            description: 'Google Cloud service account JSON key contents.',
          },
        },
        required: ['google_project', 'google_json_key_string'],
      },
      gcs_hmac_configuration: {
        type: 'object',
        description:
          'Google Cloud Storage configuration using S3-interoperability HMAC keys. Exactly one of `aws_s3_configuration`, `s3_compatible_configuration`, `gcs_configuration`, `gcs_hmac_configuration`, `gcs_adc_configuration` must be provided.',
        properties: {
          google_storage_access_key_id: {
            type: 'string',
            description: 'GCS HMAC access key ID.',
          },
          google_storage_secret_access_key: {
            type: 'string',
            description: 'GCS HMAC secret.',
          },
          region: {
            type: 'string',
            description: 'GCS bucket region.',
          },
          path_style: {
            type: 'boolean',
            description: 'If `true`, uses path-style URLs instead of virtual-hosted-style URLs.',
            default: true,
          },
        },
        required: ['google_storage_access_key_id', 'google_storage_secret_access_key', 'region'],
      },
      gcs_adc_configuration: {
        type: 'object',
        description:
          'Google Cloud Storage configuration using Application Default Credentials. Available on GitLab Self-Managed or GitLab Dedicated, and must be enabled by an administrator. Only administrators can use these credentials, and the bucket name must start with "gitlab-offline-transfer-". For more information, see https://docs.gitlab.com/administration/settings/import_and_export_settings/#allow-application…',
        properties: {
          google_project: {
            type: 'string',
            description: 'Google Cloud project ID.',
          },
        },
        required: ['google_project'],
      },
      export_prefix: {
        type: 'string',
        description: 'Prefix of the export within the bucket.',
      },
      entities: {
        type: 'array',
        description: 'List of entities to import. Exactly one of `entities`, `import_all` must be provided.',
        items: {
          type: 'object',
          properties: {
            source_type: {
              type: 'string',
              description: 'Type of the entity to import.',
              enum: ['group_entity', 'project_entity'],
            },
            source_full_path: {
              type: 'string',
              description: 'Full path of the entity on the source instance.',
            },
            destination_namespace: {
              type: 'string',
              description: 'Full path of the destination namespace.',
            },
            destination_slug: {
              type: 'string',
              description: 'Destination slug for the imported entity.',
            },
          },
          required: ['source_type', 'source_full_path', 'destination_namespace'],
        },
      },
      import_all: {
        type: 'object',
        description:
          'Import every top-level group in the export, recreating the source instance structure. Exactly one of `entities`, `import_all` must be provided.',
        properties: {
          destination_namespace: {
            type: 'string',
            description:
              'Full path of the destination namespace the source structure is recreated under. Use an empty string to recreate it at the instance root.',
          },
        },
        required: ['destination_namespace'],
      },
    },
    required: ['bucket', 'export_prefix'],
  },
  request: {
    method: 'POST',
    path: '/offline_imports',
    body: [
      'bucket',
      'aws_s3_configuration',
      's3_compatible_configuration',
      'gcs_configuration',
      'gcs_hmac_configuration',
      'gcs_adc_configuration',
      'export_prefix',
      'entities',
      'import_all',
    ],
  },
});
