import { defineTool } from '@usemcpkit/core';

export const orgsOrgsEnableOrDisableSecurityProductOnAllOrgRepos = defineTool({
  name: 'orgs:orgs:enable_or_disable_security_product_on_all_org_repos',
  description:
    '[Deprecated] Enable or disable a security feature for an organization. > [!WARNING] > **Closing down notice:** The ability to enable or disable a security feature for all eligible repositories in an organization is closing down. Please use code security configurations instead. For more information, see the changelog.',
  input: {
    type: 'object',
    properties: {
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
      },
      security_product: {
        type: 'string',
        enum: [
          'dependency_graph',
          'dependabot_alerts',
          'dependabot_security_updates',
          'advanced_security',
          'code_scanning_default_setup',
          'secret_scanning',
          'secret_scanning_push_protection',
        ],
        description: 'The security feature to enable or disable.',
      },
      enablement: {
        type: 'string',
        enum: ['enable_all', 'disable_all'],
        description: 'The action to take.',
      },
      query_suite: {
        type: 'string',
        description:
          "CodeQL query suite to be used. If you specify the `query_suite` parameter, the default setup will be configured with this query suite only on all repositories that didn't have default setup already configured. It will not change the query suite on repositories that already have default setup configured. If you don't specify any `query_suite` in your request, the preferred query suite of the organ…",
        enum: ['default', 'extended'],
      },
    },
    required: ['org', 'security_product', 'enablement'],
  },
  request: {
    method: 'POST',
    path: '/orgs/{org}/{security_product}/{enablement}',
    body: ['query_suite'],
  },
});
