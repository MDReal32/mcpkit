import { defineTool } from "@usemcpkit/core";

export const projectsProjectComponentsUpdateComponent = defineTool({
  name: "projects:project_components:update_component",
  description:
    'Update component. Updates a component. Any fields included in the request are overwritten. If `leadAccountId` is an empty string ("") the component lead is removed.',
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "The ID of the component.",
      },
      ari: {
        type: "string",
        description: "Compass component's ID. Can't be updated. Not required for creating a Project Component.",
      },
      assignee: {
        type: "object",
        description:
          "The details of the user associated with `assigneeType`, if any. See `realAssignee` for details of the user assigned to issues created with this component.",
        properties: {
          accountId: {
            type: "string",
            description:
              "The account ID of the user, which uniquely identifies the user across all Atlassian products. For example, *5b10ac8d82e05b22cc7d4ef5*. Required in requests.",
          },
          accountType: {
            type: "string",
            description: "The user account type. Can take the following values:",
            enum: ["atlassian", "app", "customer", "unknown"],
          },
          active: {
            type: "boolean",
            description: "Whether the user is active.",
          },
          appType: {
            type: "string",
            description: "The app type of the user account when accountType is 'app'. Can take the following values:",
          },
          applicationRoles: {
            type: "object",
            description: "The application roles the user is assigned to.",
            properties: {
              callback: {
                type: "object",
              },
              items: {
                type: "array",
                items: {
                  type: "object",
                  description: "Details of an application role.",
                },
              },
              "max-results": {
                type: "integer",
              },
              pagingCallback: {
                type: "object",
              },
              size: {
                type: "integer",
              },
            },
          },
          avatarUrls: {
            type: "object",
            description: "The avatars of the user.",
            properties: {
              "16x16": {
                type: "string",
                description: "The URL of the item's 16x16 pixel avatar.",
              },
              "24x24": {
                type: "string",
                description: "The URL of the item's 24x24 pixel avatar.",
              },
              "32x32": {
                type: "string",
                description: "The URL of the item's 32x32 pixel avatar.",
              },
              "48x48": {
                type: "string",
                description: "The URL of the item's 48x48 pixel avatar.",
              },
            },
          },
          displayName: {
            type: "string",
            description:
              "The display name of the user. Depending on the user’s privacy setting, this may return an alternative value.",
          },
          emailAddress: {
            type: "string",
            description:
              "The email address of the user. Depending on the user’s privacy setting, this may be returned as null.",
          },
          expand: {
            type: "string",
            description: "Expand options that include additional user details in the response.",
          },
          groups: {
            type: "object",
            description: "The groups that the user belongs to.",
            properties: {
              callback: {
                type: "object",
              },
              items: {
                type: "array",
                items: {
                  type: "object",
                  description: "Details about a group.",
                },
              },
              "max-results": {
                type: "integer",
              },
              pagingCallback: {
                type: "object",
              },
              size: {
                type: "integer",
              },
            },
          },
          guest: {
            type: "boolean",
            description: "Whether the user is a guest.",
          },
          key: {
            type: "string",
            description:
              "This property is no longer available and will be removed from the documentation soon. See the deprecation notice for details.",
          },
          locale: {
            type: "string",
            description:
              "The locale of the user. Depending on the user’s privacy setting, this may be returned as null.",
          },
          name: {
            type: "string",
            description:
              "This property is no longer available and will be removed from the documentation soon. See the deprecation notice for details.",
          },
          self: {
            type: "string",
            description: "The URL of the user.",
          },
          timeZone: {
            type: "string",
            description:
              "The time zone specified in the user's profile. If the user's time zone is not visible to the current user (due to user's profile setting), or if a time zone has not been set, the instance's default time zone will be returned.",
          },
        },
      },
      assigneeType: {
        type: "string",
        description:
          "The nominal user type used to determine the assignee for issues created with this component. See `realAssigneeType` for details on how the type of the user, and hence the user, assigned to issues is determined. Can take the following values:",
        enum: ["PROJECT_DEFAULT", "COMPONENT_LEAD", "PROJECT_LEAD", "UNASSIGNED"],
      },
      description: {
        type: "string",
        description: "The description for the component. Optional when creating or updating a component.",
      },
      body_id: {
        type: "string",
        description: "The unique identifier for the component.",
      },
      isAssigneeTypeValid: {
        type: "boolean",
        description:
          "Whether a user is associated with `assigneeType`. For example, if the `assigneeType` is set to `COMPONENT_LEAD` but the component lead is not set, then `false` is returned.",
      },
      lead: {
        type: "object",
        description: "The user details for the component's lead user.",
        properties: {
          accountId: {
            type: "string",
            description:
              "The account ID of the user, which uniquely identifies the user across all Atlassian products. For example, *5b10ac8d82e05b22cc7d4ef5*. Required in requests.",
          },
          accountType: {
            type: "string",
            description: "The user account type. Can take the following values:",
            enum: ["atlassian", "app", "customer", "unknown"],
          },
          active: {
            type: "boolean",
            description: "Whether the user is active.",
          },
          appType: {
            type: "string",
            description: "The app type of the user account when accountType is 'app'. Can take the following values:",
          },
          applicationRoles: {
            type: "object",
            description: "The application roles the user is assigned to.",
            properties: {
              callback: {
                type: "object",
              },
              items: {
                type: "array",
                items: {
                  type: "object",
                  description: "Details of an application role.",
                },
              },
              "max-results": {
                type: "integer",
              },
              pagingCallback: {
                type: "object",
              },
              size: {
                type: "integer",
              },
            },
          },
          avatarUrls: {
            type: "object",
            description: "The avatars of the user.",
            properties: {
              "16x16": {
                type: "string",
                description: "The URL of the item's 16x16 pixel avatar.",
              },
              "24x24": {
                type: "string",
                description: "The URL of the item's 24x24 pixel avatar.",
              },
              "32x32": {
                type: "string",
                description: "The URL of the item's 32x32 pixel avatar.",
              },
              "48x48": {
                type: "string",
                description: "The URL of the item's 48x48 pixel avatar.",
              },
            },
          },
          displayName: {
            type: "string",
            description:
              "The display name of the user. Depending on the user’s privacy setting, this may return an alternative value.",
          },
          emailAddress: {
            type: "string",
            description:
              "The email address of the user. Depending on the user’s privacy setting, this may be returned as null.",
          },
          expand: {
            type: "string",
            description: "Expand options that include additional user details in the response.",
          },
          groups: {
            type: "object",
            description: "The groups that the user belongs to.",
            properties: {
              callback: {
                type: "object",
              },
              items: {
                type: "array",
                items: {
                  type: "object",
                  description: "Details about a group.",
                },
              },
              "max-results": {
                type: "integer",
              },
              pagingCallback: {
                type: "object",
              },
              size: {
                type: "integer",
              },
            },
          },
          guest: {
            type: "boolean",
            description: "Whether the user is a guest.",
          },
          key: {
            type: "string",
            description:
              "This property is no longer available and will be removed from the documentation soon. See the deprecation notice for details.",
          },
          locale: {
            type: "string",
            description:
              "The locale of the user. Depending on the user’s privacy setting, this may be returned as null.",
          },
          name: {
            type: "string",
            description:
              "This property is no longer available and will be removed from the documentation soon. See the deprecation notice for details.",
          },
          self: {
            type: "string",
            description: "The URL of the user.",
          },
          timeZone: {
            type: "string",
            description:
              "The time zone specified in the user's profile. If the user's time zone is not visible to the current user (due to user's profile setting), or if a time zone has not been set, the instance's default time zone will be returned.",
          },
        },
      },
      leadAccountId: {
        type: "string",
        description:
          "The accountId of the component's lead user. The accountId uniquely identifies the user across all Atlassian products. For example, *5b10ac8d82e05b22cc7d4ef5*.",
      },
      leadUserName: {
        type: "string",
        description:
          "This property is no longer available and will be removed from the documentation soon. See the deprecation notice for details.",
      },
      metadata: {
        type: "object",
        description: "Compass component's metadata. Can't be updated. Not required for creating a Project Component.",
      },
      name: {
        type: "string",
        description:
          "The unique name for the component in the project. Required when creating a component. Optional when updating a component. The maximum length is 255 characters.",
      },
      project: {
        type: "string",
        description:
          "The key of the project the component is assigned to. Required when creating a component. Can't be updated.",
      },
      projectId: {
        type: "integer",
        description: "The ID of the project the component is assigned to.",
      },
      realAssignee: {
        type: "object",
        description:
          "The user assigned to issues created with this component, when `assigneeType` does not identify a valid assignee.",
        properties: {
          accountId: {
            type: "string",
            description:
              "The account ID of the user, which uniquely identifies the user across all Atlassian products. For example, *5b10ac8d82e05b22cc7d4ef5*. Required in requests.",
          },
          accountType: {
            type: "string",
            description: "The user account type. Can take the following values:",
            enum: ["atlassian", "app", "customer", "unknown"],
          },
          active: {
            type: "boolean",
            description: "Whether the user is active.",
          },
          appType: {
            type: "string",
            description: "The app type of the user account when accountType is 'app'. Can take the following values:",
          },
          applicationRoles: {
            type: "object",
            description: "The application roles the user is assigned to.",
            properties: {
              callback: {
                type: "object",
              },
              items: {
                type: "array",
                items: {
                  type: "object",
                  description: "Details of an application role.",
                },
              },
              "max-results": {
                type: "integer",
              },
              pagingCallback: {
                type: "object",
              },
              size: {
                type: "integer",
              },
            },
          },
          avatarUrls: {
            type: "object",
            description: "The avatars of the user.",
            properties: {
              "16x16": {
                type: "string",
                description: "The URL of the item's 16x16 pixel avatar.",
              },
              "24x24": {
                type: "string",
                description: "The URL of the item's 24x24 pixel avatar.",
              },
              "32x32": {
                type: "string",
                description: "The URL of the item's 32x32 pixel avatar.",
              },
              "48x48": {
                type: "string",
                description: "The URL of the item's 48x48 pixel avatar.",
              },
            },
          },
          displayName: {
            type: "string",
            description:
              "The display name of the user. Depending on the user’s privacy setting, this may return an alternative value.",
          },
          emailAddress: {
            type: "string",
            description:
              "The email address of the user. Depending on the user’s privacy setting, this may be returned as null.",
          },
          expand: {
            type: "string",
            description: "Expand options that include additional user details in the response.",
          },
          groups: {
            type: "object",
            description: "The groups that the user belongs to.",
            properties: {
              callback: {
                type: "object",
              },
              items: {
                type: "array",
                items: {
                  type: "object",
                  description: "Details about a group.",
                },
              },
              "max-results": {
                type: "integer",
              },
              pagingCallback: {
                type: "object",
              },
              size: {
                type: "integer",
              },
            },
          },
          guest: {
            type: "boolean",
            description: "Whether the user is a guest.",
          },
          key: {
            type: "string",
            description:
              "This property is no longer available and will be removed from the documentation soon. See the deprecation notice for details.",
          },
          locale: {
            type: "string",
            description:
              "The locale of the user. Depending on the user’s privacy setting, this may be returned as null.",
          },
          name: {
            type: "string",
            description:
              "This property is no longer available and will be removed from the documentation soon. See the deprecation notice for details.",
          },
          self: {
            type: "string",
            description: "The URL of the user.",
          },
          timeZone: {
            type: "string",
            description:
              "The time zone specified in the user's profile. If the user's time zone is not visible to the current user (due to user's profile setting), or if a time zone has not been set, the instance's default time zone will be returned.",
          },
        },
      },
      realAssigneeType: {
        type: "string",
        description:
          "The type of the assignee that is assigned to issues created with this component, when an assignee cannot be set from the `assigneeType`. For example, `assigneeType` is set to `COMPONENT_LEAD` but no component lead is set. This property is set to one of the following values:",
        enum: ["PROJECT_DEFAULT", "COMPONENT_LEAD", "PROJECT_LEAD", "UNASSIGNED"],
      },
      self: {
        type: "string",
        description: "The URL of the component.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "PUT",
    path: "/rest/api/2/component/{id}",
    body: {
      ari: "ari",
      assignee: "assignee",
      assigneeType: "assigneeType",
      description: "description",
      id: "body_id",
      isAssigneeTypeValid: "isAssigneeTypeValid",
      lead: "lead",
      leadAccountId: "leadAccountId",
      leadUserName: "leadUserName",
      metadata: "metadata",
      name: "name",
      project: "project",
      projectId: "projectId",
      realAssignee: "realAssignee",
      realAssigneeType: "realAssigneeType",
      self: "self",
    },
  },
});
