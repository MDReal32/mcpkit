import { defineTool } from "@usemcpkit/core";

export const cloudV1SettingsUpdateLookAndFeelSettings = defineTool({
  name: "cloud_v1:settings:update_look_and_feel_settings",
  description:
    "[Cloud v1] Update look and feel settings. Updates the look and feel settings for the site or for a single space. If custom settings exist, they are updated. If no custom settings exist, then a set of custom settings is created.",
  input: {
    type: "object",
    properties: {
      spaceKey: {
        type: "string",
        description:
          "The key of the space for which the look and feel settings will be updated. If this is not set, the global look and feel settings will be updated.",
      },
      headings: {
        type: "object",
        properties: {
          color: {
            type: "string",
          },
        },
        required: ["color"],
      },
      links: {
        type: "object",
        properties: {
          color: {
            type: "string",
          },
        },
        required: ["color"],
      },
      menus: {
        type: "object",
        properties: {
          hoverOrFocus: {
            type: "object",
          },
          color: {
            type: "string",
          },
        },
        required: ["color", "hoverOrFocus"],
      },
      header: {
        type: "object",
        properties: {
          backgroundColor: {
            type: "string",
          },
          button: {
            type: "object",
          },
          primaryNavigation: {
            type: "object",
          },
          secondaryNavigation: {
            type: "object",
          },
          search: {
            type: "object",
          },
        },
        required: ["backgroundColor", "button", "primaryNavigation", "search", "secondaryNavigation"],
      },
      horizontalHeader: {
        type: "object",
        properties: {
          backgroundColor: {
            type: "string",
          },
          button: {
            type: "object",
          },
          primaryNavigation: {
            type: "object",
          },
          secondaryNavigation: {
            type: "object",
          },
          search: {
            type: "object",
          },
        },
        required: ["backgroundColor", "primaryNavigation"],
      },
      content: {
        type: "object",
        properties: {
          screen: {
            type: "object",
          },
          container: {
            type: "object",
          },
          header: {
            type: "object",
          },
          body: {
            type: "object",
          },
        },
      },
      bordersAndDividers: {
        type: "object",
        properties: {
          color: {
            type: "string",
          },
        },
        required: ["color"],
      },
      spaceReference: {
        type: "object",
      },
    },
    required: ["headings", "links", "menus", "header", "content", "bordersAndDividers"],
  },
  request: {
    method: "POST",
    path: "/wiki/rest/api/settings/lookandfeel/custom",
    query: ["spaceKey"],
    body: [
      "headings",
      "links",
      "menus",
      "header",
      "horizontalHeader",
      "content",
      "bordersAndDividers",
      "spaceReference",
    ],
  },
});
