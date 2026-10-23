import { defineTool } from "@usemcpkit/core";

export const issuesIssueRemoteLinksCreateOrUpdateRemoteIssueLink = defineTool({
  name: "issues:issue_remote_links:create_or_update_remote_issue_link",
  description: "Create or update remote issue link. Creates or updates a remote issue link for an issue.",
  input: {
    type: "object",
    properties: {
      issueIdOrKey: {
        type: "string",
        description: "The ID or key of the issue.",
      },
      application: {
        type: "object",
        description: "Details of the remote application the linked item is in. For example, trello.",
        properties: {
          name: {
            type: "string",
            description:
              'The name of the application. Used in conjunction with the (remote) object icon title to display a tooltip for the link\'s icon. The tooltip takes the format "\\[application name\\] icon title". Blank items are excluded from the tooltip title. If both items are blank, the icon tooltop displays as "Web Link". Grouping and sorting of links may place links without an application name last.',
          },
          type: {
            type: "string",
            description: "The name-spaced type of the application, used by registered rendering apps.",
          },
        },
      },
      globalId: {
        type: "string",
        description:
          "An identifier for the remote item in the remote system. For example, the global ID for a remote item in Confluence would consist of the app ID and page ID, like this: `appId=456&pageId=123`.",
      },
      object: {
        type: "object",
        description: "Details of the item linked to.",
        properties: {
          icon: {
            type: "object",
            description:
              "Details of the icon for the item. If no icon is defined, the default link icon is used in Jira.",
            properties: {
              link: {
                type: "string",
                description:
                  "The URL of the tooltip, used only for a status icon. If not set, the status icon in Jira is not clickable.",
              },
              title: {
                type: "string",
                description: "The title of the icon. This is used as follows:",
              },
              url16x16: {
                type: "string",
                description: "The URL of an icon that displays at 16x16 pixel in Jira.",
              },
            },
          },
          status: {
            type: "object",
            description: "The status of the item.",
            properties: {
              icon: {
                type: "object",
                description:
                  "Details of the icon representing the status. If not provided, no status icon displays in Jira.",
              },
              resolved: {
                type: "boolean",
                description:
                  'Whether the item is resolved. If set to "true", the link to the issue is displayed in a strikethrough font, otherwise the link displays in normal font.',
              },
            },
          },
          summary: {
            type: "string",
            description: "The summary details of the item.",
          },
          title: {
            type: "string",
            description: "The title of the item.",
          },
          url: {
            type: "string",
            description: "The URL of the item.",
          },
        },
        required: ["title", "url"],
      },
      relationship: {
        type: "string",
        description:
          'Description of the relationship between the issue and the linked item. If not set, the relationship description "links to" is used in Jira.',
      },
    },
    required: ["issueIdOrKey", "object"],
  },
  request: {
    method: "POST",
    path: "/rest/api/2/issue/{issueIdOrKey}/remotelink",
    body: ["application", "globalId", "object", "relationship"],
  },
});
