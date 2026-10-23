import { defineTool } from "@usemcpkit/core";

export const issuesIssuesAssignIssue = defineTool({
  name: "issues:issues:assign_issue",
  description:
    "Assign issue. Assigns an issue to a user. Use this operation when the calling user does not have the *Edit Issues* permission but has the *Assign issue* permission for the project that the issue is in.",
  input: {
    type: "object",
    properties: {
      issueIdOrKey: {
        type: "string",
        description: "The ID or key of the issue to be assigned.",
      },
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
        description: "The locale of the user. Depending on the user’s privacy setting, this may be returned as null.",
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
    required: ["issueIdOrKey"],
  },
  request: {
    method: "PUT",
    path: "/rest/api/2/issue/{issueIdOrKey}/assignee",
    body: [
      "accountId",
      "accountType",
      "active",
      "appType",
      "applicationRoles",
      "avatarUrls",
      "displayName",
      "emailAddress",
      "expand",
      "groups",
      "guest",
      "key",
      "locale",
      "name",
      "self",
      "timeZone",
    ],
  },
});
