import { defineTool } from "@usemcpkit/core";

export const datacenterColorSchemeUpdate = defineTool({
  name: "datacenter:color_scheme:update",
  description: "[Data Center] Set global color scheme. Update the current color scheme of the instance",
  input: {
    type: "object",
    properties: {
      colorSchemeModelLight: {
        type: "object",
        properties: {
          topBarColor: {
            type: "string",
          },
          topBarMenuSelectedBgColor: {
            type: "string",
          },
          topBarMenuSelectedTextColor: {
            type: "string",
          },
          breadcrumbsTextColor: {
            type: "string",
          },
          headerButtonBgColor: {
            type: "string",
          },
          headerButtonTextColor: {
            type: "string",
          },
          searchFieldTextColor: {
            type: "string",
          },
          searchFieldBgColor: {
            type: "string",
          },
          menuItemSelectedBgColor: {
            type: "string",
          },
          menuItemSelectedTextColor: {
            type: "string",
          },
          menuItemTextColor: {
            type: "string",
          },
          headingTextColor: {
            type: "string",
          },
          linkColor: {
            type: "string",
          },
        },
      },
      colorSchemeModelDark: {
        type: "object",
        properties: {
          topBarColor: {
            type: "string",
          },
          topBarMenuSelectedBgColor: {
            type: "string",
          },
          topBarMenuSelectedTextColor: {
            type: "string",
          },
          breadcrumbsTextColor: {
            type: "string",
          },
          headerButtonBgColor: {
            type: "string",
          },
          headerButtonTextColor: {
            type: "string",
          },
          searchFieldTextColor: {
            type: "string",
          },
          searchFieldBgColor: {
            type: "string",
          },
          menuItemSelectedBgColor: {
            type: "string",
          },
          menuItemSelectedTextColor: {
            type: "string",
          },
          menuItemTextColor: {
            type: "string",
          },
          headingTextColor: {
            type: "string",
          },
          linkColor: {
            type: "string",
          },
        },
      },
    },
  },
  request: {
    method: "PUT",
    path: "/rest/api/color-scheme",
    body: ["colorSchemeModelLight", "colorSchemeModelDark"],
  },
});
