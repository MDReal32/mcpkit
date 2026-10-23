import { defineTool } from '@usemcpkit/core';

export const securityPrivateRegistriesCreateOrgPrivateRegistry = defineTool({
  name: 'security:private_registries:create_org_private_registry',
  description:
    'Create a private registry for an organization. Creates a private registry configuration with an encrypted value for an organization. Encrypt your secret using LibSodium. For more information, see "Encrypting secrets for the REST API." For OIDC-based registries (`oidc_azure`, `oidc_aws`, `oidc_jfrog`, `oidc_cloudsmith`, or `oidc_gcp`), the `encrypted_value` and `key_id` fields should be omitted. For anonymous registries (`anonymous`), the `use…',
  input: {
    type: 'object',
    properties: {
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
      },
      registry_type: {
        type: 'string',
        description: 'The registry type.',
        enum: [
          'maven_repository',
          'nuget_feed',
          'goproxy_server',
          'npm_registry',
          'rubygems_server',
          'cargo_registry',
          'composer_repository',
          'docker_registry',
          'git_source',
          'helm_registry',
          'hex_organization',
          'hex_repository',
          'pub_repository',
          'python_index',
          'terraform_registry',
        ],
      },
      url: {
        type: 'string',
        description: 'The URL of the private registry.',
      },
      username: {
        type: 'string',
        description:
          'The username to use when authenticating with the private registry. This field should be omitted if the private registry does not require a username for authentication.',
      },
      replaces_base: {
        type: 'boolean',
        description:
          'Whether this private registry should replace the base registry (e.g., npmjs.org for npm, rubygems.org for rubygems). When set to `true`, Dependabot will only use this registry and will not fall back to the public registry. When set to `false` (default), Dependabot will use this registry for scoped packages but may fall back to the public registry for other packages.',
        default: false,
      },
      encrypted_value: {
        type: 'string',
        description:
          'The value for your secret, encrypted with LibSodium using the public key retrieved from the Get private registries public key for an organization endpoint. Required when `auth_type` is `token` or `username_password`. Should be omitted for OIDC auth types.',
      },
      key_id: {
        type: 'string',
        description:
          'The ID of the key you used to encrypt the secret. Required when `auth_type` is `token` or `username_password`. Should be omitted for OIDC auth types.',
      },
      visibility: {
        type: 'string',
        description:
          'Which type of organization repositories have access to the private registry. `selected` means only the repositories specified by `selected_repository_ids` can access the private registry.',
        enum: ['all', 'private', 'selected'],
      },
      selected_repository_ids: {
        type: 'array',
        description:
          'An array of repository IDs that can access the organization private registry. You can only provide a list of repository IDs when `visibility` is set to `selected`. You can manage the list of selected repositories using the Update a private registry for an organization endpoint. This field should be omitted if `visibility` is set to `all` or `private`.',
        items: {
          type: 'integer',
        },
      },
      auth_type: {
        type: 'string',
        description:
          'The authentication type for the private registry. Defaults to `token` if not specified. Use `oidc_azure`, `oidc_aws`, `oidc_jfrog`, `oidc_cloudsmith`, or `oidc_gcp` for OIDC authentication. Use `anonymous` for registries that do not require authentication; `username`, `encrypted_value`, and `key_id` must be omitted.',
        enum: [
          'token',
          'username_password',
          'oidc_azure',
          'oidc_aws',
          'oidc_jfrog',
          'oidc_cloudsmith',
          'oidc_gcp',
          'anonymous',
        ],
      },
      tenant_id: {
        type: 'string',
        description: 'The tenant ID of the Azure AD application. Required when `auth_type` is `oidc_azure`.',
      },
      client_id: {
        type: 'string',
        description: 'The client ID of the Azure AD application. Required when `auth_type` is `oidc_azure`.',
      },
      aws_region: {
        type: 'string',
        description: 'The AWS region. Required when `auth_type` is `oidc_aws`.',
      },
      account_id: {
        type: 'string',
        description: 'The AWS account ID. Required when `auth_type` is `oidc_aws`.',
      },
      role_name: {
        type: 'string',
        description: 'The AWS IAM role name. Required when `auth_type` is `oidc_aws`.',
      },
      domain: {
        type: 'string',
        description: 'The CodeArtifact domain. Required when `auth_type` is `oidc_aws`.',
      },
      domain_owner: {
        type: 'string',
        description: 'The CodeArtifact domain owner (AWS account ID). Required when `auth_type` is `oidc_aws`.',
      },
      jfrog_oidc_provider_name: {
        type: 'string',
        description: 'The JFrog OIDC provider name. Required when `auth_type` is `oidc_jfrog`.',
      },
      audience: {
        type: 'string',
        description:
          'The OIDC audience. Optional for `oidc_aws`, `oidc_jfrog`, and `oidc_gcp`, and required for `oidc_cloudsmith` auth types.',
      },
      identity_mapping_name: {
        type: 'string',
        description: 'The JFrog identity mapping name. Optional for `oidc_jfrog` auth type.',
      },
      namespace: {
        type: 'string',
        description: 'The Cloudsmith organization namespace. Required when `auth_type` is `oidc_cloudsmith`.',
      },
      service_slug: {
        type: 'string',
        description: 'The Cloudsmith service account slug. Required when `auth_type` is `oidc_cloudsmith`.',
      },
      api_host: {
        type: 'string',
        description:
          'The Cloudsmith API host. Optional for `oidc_cloudsmith` auth type. If omitted, `api.cloudsmith.io` is used by default.',
      },
      workload_identity_provider: {
        type: 'string',
        description:
          'The full resource name of the GCP Workload Identity Provider (e.g. `projects/<NUM>/locations/global/workloadIdentityPools/<POOL>/providers/<PROVIDER>`). Required when `auth_type` is `oidc_gcp`.',
      },
      service_account: {
        type: 'string',
        description:
          'The GCP service account email to impersonate. Optional for `oidc_gcp` auth type. If omitted, the federated token is used directly (direct WIF).',
      },
    },
    required: ['org', 'registry_type', 'url', 'visibility'],
  },
  request: {
    method: 'POST',
    path: '/orgs/{org}/private-registries',
    body: [
      'registry_type',
      'url',
      'username',
      'replaces_base',
      'encrypted_value',
      'key_id',
      'visibility',
      'selected_repository_ids',
      'auth_type',
      'tenant_id',
      'client_id',
      'aws_region',
      'account_id',
      'role_name',
      'domain',
      'domain_owner',
      'jfrog_oidc_provider_name',
      'audience',
      'identity_mapping_name',
      'namespace',
      'service_slug',
      'api_host',
      'workload_identity_provider',
      'service_account',
    ],
  },
});
