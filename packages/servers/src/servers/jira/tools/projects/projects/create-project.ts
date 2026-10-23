import { defineTool } from '@usemcpkit/core';

export const projectsProjectsCreateProject = defineTool({
  name: 'projects:projects:create_project',
  description: 'Create project. Creates a project based on a project type template, as shown in the following table:',
  input: {
    type: 'object',
    properties: {
      assigneeType: {
        type: 'string',
        description: 'The default assignee when creating issues for this project.',
        enum: ['PROJECT_LEAD', 'UNASSIGNED'],
      },
      avatarId: {
        type: 'integer',
        description: "An integer value for the project's avatar.",
      },
      categoryId: {
        type: 'integer',
        description:
          "The ID of the project's category. A complete list of category IDs is found using the Get all project categories operation.",
      },
      description: {
        type: 'string',
        description: 'A brief description of the project.',
      },
      fieldConfigurationScheme: {
        type: 'integer',
        description:
          'Deprecated use fieldScheme instead. The ID of the field configuration scheme for the project. Use the Get all field configuration schemes operation to get a list of field configuration scheme IDs. If you specify the field configuration scheme you cannot specify the project template key.',
      },
      fieldScheme: {
        type: 'integer',
        description:
          'The ID of the field scheme for the project. Use the Get field schemes operation to get a list of field scheme IDs. If you specify the field scheme you cannot specify the project template key.',
      },
      issueSecurityScheme: {
        type: 'integer',
        description:
          'The ID of the issue security scheme for the project, which enables you to control who can and cannot view issues. Use the Get issue security schemes resource to get all issue security scheme IDs.',
      },
      issueTypeScheme: {
        type: 'integer',
        description:
          'The ID of the issue type scheme for the project. Use the Get all issue type schemes operation to get a list of issue type scheme IDs. If you specify the issue type scheme you cannot specify the project template key.',
      },
      issueTypeScreenScheme: {
        type: 'integer',
        description:
          'The ID of the issue type screen scheme for the project. Use the Get all issue type screen schemes operation to get a list of issue type screen scheme IDs. If you specify the issue type screen scheme you cannot specify the project template key.',
      },
      key: {
        type: 'string',
        description:
          'Project keys must be unique and start with an uppercase letter followed by one or more uppercase alphanumeric characters. The maximum length is 10 characters.',
      },
      lead: {
        type: 'string',
        description:
          'This parameter is deprecated because of privacy changes. Use `leadAccountId` instead. See the migration guide for details. The user name of the project lead. Either `lead` or `leadAccountId` must be set when creating a project. Cannot be provided with `leadAccountId`.',
      },
      leadAccountId: {
        type: 'string',
        description:
          'The account ID of the project lead. Either `lead` or `leadAccountId` must be set when creating a project. Cannot be provided with `lead`.',
      },
      name: {
        type: 'string',
        description: 'The name of the project.',
      },
      notificationScheme: {
        type: 'integer',
        description:
          'The ID of the notification scheme for the project. Use the Get notification schemes resource to get a list of notification scheme IDs.',
      },
      permissionScheme: {
        type: 'integer',
        description:
          'The ID of the permission scheme for the project. Use the Get all permission schemes resource to see a list of all permission scheme IDs.',
      },
      projectTemplateKey: {
        type: 'string',
        description:
          'A predefined configuration for a project. The type of the `projectTemplateKey` must match with the type of the `projectTypeKey`.',
        enum: [
          'com.pyxis.greenhopper.jira:gh-simplified-agility-kanban',
          'com.pyxis.greenhopper.jira:gh-simplified-agility-scrum',
          'com.pyxis.greenhopper.jira:gh-simplified-basic',
          'com.pyxis.greenhopper.jira:gh-simplified-kanban-classic',
          'com.pyxis.greenhopper.jira:gh-simplified-scrum-classic',
          'com.pyxis.greenhopper.jira:gh-cross-team-template',
          'com.pyxis.greenhopper.jira:gh-cross-team-planning-template',
          'com.atlassian.servicedesk:simplified-it-service-management',
          'com.atlassian.servicedesk:simplified-it-service-management-basic',
          'com.atlassian.servicedesk:simplified-it-service-management-operations',
          'com.atlassian.servicedesk:simplified-internal-service-desk',
          'com.atlassian.servicedesk:simplified-external-service-desk',
          'com.atlassian.servicedesk:simplified-hr-service-desk',
          'com.atlassian.servicedesk:simplified-facilities-service-desk',
          'com.atlassian.servicedesk:simplified-legal-service-desk',
          'com.atlassian.servicedesk:simplified-marketing-service-desk',
          'com.atlassian.servicedesk:simplified-finance-service-desk',
          'com.atlassian.servicedesk:simplified-analytics-service-desk',
          'com.atlassian.servicedesk:simplified-design-service-desk',
          'com.atlassian.servicedesk:simplified-sales-service-desk',
          'com.atlassian.servicedesk:simplified-halp-service-desk',
          'com.atlassian.servicedesk:next-gen-it-service-desk',
          'com.atlassian.servicedesk:next-gen-hr-service-desk',
          'com.atlassian.servicedesk:next-gen-legal-service-desk',
          'com.atlassian.servicedesk:next-gen-marketing-service-desk',
          'com.atlassian.servicedesk:next-gen-facilities-service-desk',
          'com.atlassian.servicedesk:next-gen-analytics-service-desk',
          'com.atlassian.servicedesk:next-gen-finance-service-desk',
          'com.atlassian.servicedesk:next-gen-design-service-desk',
          'com.atlassian.servicedesk:next-gen-sales-service-desk',
          'com.atlassian.servicedesk:company-managed-blank-service-project',
          'com.atlassian.servicedesk:company-managed-general-service-project',
          'com.atlassian.servicedesk:team-managed-general-service-project',
          'com.atlassian.jira-core-project-templates:jira-core-simplified-content-management',
          'com.atlassian.jira-core-project-templates:jira-core-simplified-document-approval',
          'com.atlassian.jira-core-project-templates:jira-core-simplified-lead-tracking',
          'com.atlassian.jira-core-project-templates:jira-core-simplified-process-control',
          'com.atlassian.jira-core-project-templates:jira-core-simplified-procurement',
          'com.atlassian.jira-core-project-templates:jira-core-simplified-project-management',
          'com.atlassian.jira-core-project-templates:jira-core-simplified-recruitment',
          'com.atlassian.jira-core-project-templates:jira-core-simplified-task-',
          'com.atlassian.jcs:customer-service-management',
        ],
      },
      projectTypeKey: {
        type: 'string',
        description:
          "The project type, which defines the application-specific feature set. If you don't specify the project template you have to specify the project type.",
        enum: ['software', 'service_desk', 'business', 'customer_service'],
      },
      url: {
        type: 'string',
        description: 'A link to information about this project, such as project documentation',
      },
      workflowScheme: {
        type: 'integer',
        description:
          'The ID of the workflow scheme for the project. Use the Get all workflow schemes operation to get a list of workflow scheme IDs. If you specify the workflow scheme you cannot specify the project template key.',
      },
    },
    required: ['key', 'name'],
  },
  request: {
    method: 'POST',
    path: '/rest/api/2/project',
    body: [
      'assigneeType',
      'avatarId',
      'categoryId',
      'description',
      'fieldConfigurationScheme',
      'fieldScheme',
      'issueSecurityScheme',
      'issueTypeScheme',
      'issueTypeScreenScheme',
      'key',
      'lead',
      'leadAccountId',
      'name',
      'notificationScheme',
      'permissionScheme',
      'projectTemplateKey',
      'projectTypeKey',
      'url',
      'workflowScheme',
    ],
  },
});
