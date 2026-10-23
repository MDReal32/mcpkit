import { defineTool } from "@usemcpkit/core";

export const projectsProjectTemplatesCreateProjectWithCustomTemplate = defineTool({
  name: "projects:project_templates:create_project_with_custom_template",
  description: "Create custom project. Creates a project based on a custom template provided in the request.",
  input: {
    type: "object",
    properties: {
      details: {
        type: "object",
        description: "Project Details",
        properties: {
          accessLevel: {
            type: "string",
            description: "The access level of the project. Only used by team-managed project",
            enum: ["open", "limited", "private", "free"],
          },
          additionalProperties: {
            type: "object",
            description: "Additional properties of the project",
          },
          assigneeType: {
            type: "string",
            description: "The default assignee when creating issues in the project",
            enum: ["PROJECT_DEFAULT", "COMPONENT_LEAD", "PROJECT_LEAD", "UNASSIGNED"],
          },
          avatarId: {
            type: "integer",
            description:
              "The ID of the project's avatar. Use the \\Get project avatars\\ operation to list the available avatars in a project.",
          },
          categoryId: {
            type: "integer",
            description:
              "The ID of the project's category. A complete list of category IDs is found using the Get all project categories operation.",
          },
          description: {
            type: "string",
            description: "Brief description of the project",
          },
          enableComponents: {
            type: "boolean",
            description: "Whether components are enabled for the project. Only used by company-managed project",
            default: false,
          },
          key: {
            type: "string",
            description:
              "Project keys must be unique and start with an uppercase letter followed by one or more uppercase alphanumeric characters. The maximum length is 10 characters.",
          },
          language: {
            type: "string",
            description: "The default language for the project",
          },
          leadAccountId: {
            type: "string",
            description:
              "The account ID of the project lead. Either `lead` or `leadAccountId` must be set when creating a project. Cannot be provided with `lead`.",
          },
          name: {
            type: "string",
            description: "Name of the project",
          },
          url: {
            type: "string",
            description: "A link to information about this project, such as project documentation",
          },
        },
      },
      template: {
        type: "object",
        description: "The specific request object for creating a project with template.",
        properties: {
          boardFeatures: {
            type: "object",
            description:
              "Configuration of features for one or more boards. Replaces the deprecated features field on BoardPayload",
            properties: {
              boardFeatures: {
                type: "object",
                description: "A map of board PCRIs to the list of features to enable on each board.",
              },
            },
          },
          boards: {
            type: "object",
            properties: {
              boards: {
                type: "array",
                description: "The boards to be associated with the project.",
                items: {
                  type: "object",
                  description: "The payload for creating a board",
                },
              },
            },
          },
          field: {
            type: "object",
            description:
              "Defines the payload for the fields, screens, screen schemes, issue type screen schemes, field layouts, and field layout schemes",
            properties: {
              customFieldDefinitions: {
                type: "array",
                description:
                  "The custom field definitions. See https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-fields/\\#api-rest-api-3-field-post",
                items: {
                  type: "object",
                  description:
                    "Defines the payload for the custom field definitions. See https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-fields/\\#api-rest-api-3-field-post",
                },
              },
              fieldLayoutScheme: {
                type: "object",
                description:
                  "Deprecated use fieldAssociationScheme instead Defines the payload for the field layout schemes. See Field configuration scheme.",
              },
              fieldLayouts: {
                type: "array",
                description: "The field layouts configuration.",
                items: {
                  type: "object",
                  description:
                    'Defines the payload for the field layouts. See https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-field-configurations/\\#api-group-issue-field-configurations" + fieldlayout is what users would see as "Field Configuration" in Jira\'s UI - https://support.atlassian.com/jira-cloud-administration/docs/manage-issue-field-configurations/',
                },
              },
              fieldScheme: {
                type: "object",
                description: "Defines the payload to configure the field scheme for a project. See Field schemes.",
              },
              issueLayouts: {
                type: "array",
                description: "The issue layouts configuration",
                items: {
                  type: "object",
                  description: "Defines the payload to configure the issue layouts for a project.",
                },
              },
              issueTypeScreenScheme: {
                type: "object",
                description:
                  "Defines the payload for the issue type screen schemes. See https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-type-screen-schemes/\\#api-rest-api-3-issuetypescreenscheme-post",
              },
              screenScheme: {
                type: "array",
                description:
                  "The screen schemes See https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-screen-schemes/\\#api-rest-api-3-screenscheme-post",
                items: {
                  type: "object",
                  description:
                    "Defines the payload for the screen schemes. See https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-screen-schemes/\\#api-rest-api-3-screenscheme-post",
                },
              },
              screens: {
                type: "array",
                description:
                  "The screens. See https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-screens/\\#api-rest-api-3-screens-post",
                items: {
                  type: "object",
                  description:
                    "Defines the payload for the field screens. See https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-screens/\\#api-rest-api-3-screens-post",
                },
              },
            },
          },
          issueType: {
            type: "object",
            description: "The payload for creating issue types in a project",
            properties: {
              issueTypeHierarchy: {
                type: "array",
                description:
                  "Defines the issue type hierarhy to be created and used during this project creation. This will only add new levels if there isn't an existing level",
                items: {
                  type: "object",
                  description: "The payload for creating an issue type hierarchy",
                },
              },
              issueTypeScheme: {
                type: "object",
                description: "The payload for creating issue type schemes",
              },
              issueTypes: {
                type: "array",
                description:
                  "Only needed if you want to create issue types, you can otherwise use the ids of issue types in the scheme configuration",
                items: {
                  type: "object",
                  description: "The payload for creating an issue type",
                },
              },
            },
          },
          notification: {
            type: "object",
            description:
              "The payload for creating a notification scheme. The user has to supply the ID for the default notification scheme. For CMP this is provided in the project payload and should be left empty, for TMP it's provided using this payload",
            properties: {
              description: {
                type: "string",
                description: "The description of the notification scheme",
              },
              name: {
                type: "string",
                description: "The name of the notification scheme",
              },
              notificationSchemeEvents: {
                type: "array",
                description: "The events and notifications for the notification scheme",
                items: {
                  type: "object",
                  description:
                    "The payload for creating a notification scheme event. Defines which notifications should be sent for a specific event",
                },
              },
              onConflict: {
                type: "string",
                description: "The strategy to use when there is a conflict with an existing entity",
                enum: ["FAIL", "USE", "NEW"],
              },
              pcri: {
                type: "object",
                description:
                  "Every project-created entity has an ID that must be unique within the scope of the project creation. PCRI (Project Create Resource Identifier) is a standard format for creating IDs and references to other project entities. PCRI format is defined as follows: pcri:\\[entityType\\]:\\[type\\]:\\[entityId\\] entityType - the type of an entity, e.g. status, role, workflow type - PCRI type, either `id` - The…",
              },
            },
          },
          permissionScheme: {
            type: "object",
            description: "The payload to create a permission scheme",
            properties: {
              addAddonRole: {
                type: "boolean",
                description:
                  "Configuration to generate addon role. Default is false if null. Only applies to GLOBAL-scoped permission scheme",
              },
              description: {
                type: "string",
                description: "The description of the permission scheme",
              },
              grants: {
                type: "array",
                description: "List of permission grants",
                items: {
                  type: "object",
                  description: "List of permission grants",
                },
              },
              name: {
                type: "string",
                description: "The name of the permission scheme",
              },
              onConflict: {
                type: "string",
                description:
                  "The strategy to use when there is a conflict with an existing permission scheme. FAIL - Fail execution, this always needs to be unique; USE - Use the existing entity and ignore new entity parameters; NEW - If the entity exist, try and create a new one with a different name",
                default: "FAIL",
                enum: ["FAIL", "USE", "NEW"],
              },
              pcri: {
                type: "object",
                description:
                  "Every project-created entity has an ID that must be unique within the scope of the project creation. PCRI (Project Create Resource Identifier) is a standard format for creating IDs and references to other project entities. PCRI format is defined as follows: pcri:\\[entityType\\]:\\[type\\]:\\[entityId\\] entityType - the type of an entity, e.g. status, role, workflow type - PCRI type, either `id` - The…",
              },
            },
          },
          project: {
            type: "object",
            description: "The payload for creating a project",
            properties: {
              fieldLayoutSchemeId: {
                type: "object",
                description:
                  "Every project-created entity has an ID that must be unique within the scope of the project creation. PCRI (Project Create Resource Identifier) is a standard format for creating IDs and references to other project entities. PCRI format is defined as follows: pcri:\\[entityType\\]:\\[type\\]:\\[entityId\\] entityType - the type of an entity, e.g. status, role, workflow type - PCRI type, either `id` - The…",
              },
              issueSecuritySchemeId: {
                type: "object",
                description:
                  "Every project-created entity has an ID that must be unique within the scope of the project creation. PCRI (Project Create Resource Identifier) is a standard format for creating IDs and references to other project entities. PCRI format is defined as follows: pcri:\\[entityType\\]:\\[type\\]:\\[entityId\\] entityType - the type of an entity, e.g. status, role, workflow type - PCRI type, either `id` - The…",
              },
              issueTypeSchemeId: {
                type: "object",
                description:
                  "Every project-created entity has an ID that must be unique within the scope of the project creation. PCRI (Project Create Resource Identifier) is a standard format for creating IDs and references to other project entities. PCRI format is defined as follows: pcri:\\[entityType\\]:\\[type\\]:\\[entityId\\] entityType - the type of an entity, e.g. status, role, workflow type - PCRI type, either `id` - The…",
              },
              issueTypeScreenSchemeId: {
                type: "object",
                description:
                  "Every project-created entity has an ID that must be unique within the scope of the project creation. PCRI (Project Create Resource Identifier) is a standard format for creating IDs and references to other project entities. PCRI format is defined as follows: pcri:\\[entityType\\]:\\[type\\]:\\[entityId\\] entityType - the type of an entity, e.g. status, role, workflow type - PCRI type, either `id` - The…",
              },
              notificationSchemeId: {
                type: "object",
                description:
                  "Every project-created entity has an ID that must be unique within the scope of the project creation. PCRI (Project Create Resource Identifier) is a standard format for creating IDs and references to other project entities. PCRI format is defined as follows: pcri:\\[entityType\\]:\\[type\\]:\\[entityId\\] entityType - the type of an entity, e.g. status, role, workflow type - PCRI type, either `id` - The…",
              },
              pcri: {
                type: "object",
                description:
                  "Every project-created entity has an ID that must be unique within the scope of the project creation. PCRI (Project Create Resource Identifier) is a standard format for creating IDs and references to other project entities. PCRI format is defined as follows: pcri:\\[entityType\\]:\\[type\\]:\\[entityId\\] entityType - the type of an entity, e.g. status, role, workflow type - PCRI type, either `id` - The…",
              },
              permissionSchemeId: {
                type: "object",
                description:
                  "Every project-created entity has an ID that must be unique within the scope of the project creation. PCRI (Project Create Resource Identifier) is a standard format for creating IDs and references to other project entities. PCRI format is defined as follows: pcri:\\[entityType\\]:\\[type\\]:\\[entityId\\] entityType - the type of an entity, e.g. status, role, workflow type - PCRI type, either `id` - The…",
              },
              projectTypeKey: {
                type: "string",
                description:
                  "The project type, which defines the application-specific feature set. If you don't specify the project template you have to specify the project type.",
                enum: ["software", "business", "service_desk", "product_discovery"],
              },
              workflowSchemeId: {
                type: "object",
                description:
                  "Every project-created entity has an ID that must be unique within the scope of the project creation. PCRI (Project Create Resource Identifier) is a standard format for creating IDs and references to other project entities. PCRI format is defined as follows: pcri:\\[entityType\\]:\\[type\\]:\\[entityId\\] entityType - the type of an entity, e.g. status, role, workflow type - PCRI type, either `id` - The…",
              },
            },
          },
          role: {
            type: "object",
            properties: {
              roleToProjectActors: {
                type: "object",
                description:
                  "A map of role PCRI (can be ID or REF) to a list of user or group PCRI IDs to associate with the role and project.",
              },
              roles: {
                type: "array",
                description: "The list of roles to create.",
                items: {
                  type: "object",
                  description:
                    "The payload used to create a project role. It is optional for CMP projects, as a default role actor will be provided. TMP will add new role actors to the table.",
                },
              },
            },
          },
          scope: {
            type: "object",
            description:
              "The payload for creating a scope. Defines if a project is team-managed project or company-managed project",
            properties: {
              type: {
                type: "string",
                description:
                  "The type of the scope. Use `GLOBAL` or empty for company-managed project, and `PROJECT` for team-managed project",
                enum: ["GLOBAL", "PROJECT"],
              },
            },
          },
          security: {
            type: "object",
            description:
              "The payload for creating a security scheme. See https://support.atlassian.com/jira-cloud-administration/docs/configure-issue-security-schemes/",
            properties: {
              description: {
                type: "string",
                description: "The description of the security scheme",
              },
              name: {
                type: "string",
                description: "The name of the security scheme",
              },
              pcri: {
                type: "object",
                description:
                  "Every project-created entity has an ID that must be unique within the scope of the project creation. PCRI (Project Create Resource Identifier) is a standard format for creating IDs and references to other project entities. PCRI format is defined as follows: pcri:\\[entityType\\]:\\[type\\]:\\[entityId\\] entityType - the type of an entity, e.g. status, role, workflow type - PCRI type, either `id` - The…",
              },
              securityLevels: {
                type: "array",
                description: "The security levels for the security scheme",
                items: {
                  type: "object",
                  description:
                    "The payload for creating a security level. See https://support.atlassian.com/jira-cloud-administration/docs/configure-issue-security-schemes/",
                },
              },
            },
          },
          workflow: {
            type: "object",
            description:
              "The payload for creating a workflows. See https://www.atlassian.com/software/jira/guides/workflows/overview\\#what-is-a-jira-workflow",
            properties: {
              statuses: {
                type: "array",
                description: "The statuses for the workflow",
                items: {
                  type: "object",
                  description: "The payload for creating a status",
                },
              },
              workflowScheme: {
                type: "object",
                description:
                  "The payload for creating a workflow scheme. See https://www.atlassian.com/software/jira/guides/workflows/overview\\#what-is-a-jira-workflow-scheme",
              },
              workflows: {
                type: "array",
                description: "The transitions for the workflow",
                items: {
                  type: "object",
                  description:
                    "The payload for creating workflow, see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-workflows/\\#api-rest-api-3-workflows-create-post",
                },
              },
            },
          },
        },
      },
    },
  },
  request: {
    method: "POST",
    path: "/rest/api/2/project-template",
    body: ["details", "template"],
  },
});
