import { defineTool } from "@usemcpkit/core";

export const cloudV1SpaceUpdateSpaceSettings = defineTool({
  name: "cloud_v1:space:update_space_settings",
  description: "[Cloud v1] Update space settings. Updates the settings for a space.",
  input: {
    type: "object",
    properties: {
      spaceKey: {
        type: "string",
        description: "The key of the space whose settings will be updated.",
      },
      routeOverrideEnabled: {
        type: "boolean",
        description:
          "Defines whether an override for the space home should be used. This is used in conjunction with a space theme provided by an app. For example, if this property is set to true, a theme can display a page other than the space homepage when users visit the root URL for a space. This property allows apps to provide content-only theming without overriding the space home.",
      },
      contentMode: {
        type: "string",
        description:
          'The content rendering mode for the space. Controls spacing and typography in the editor and renderer. Valid values are "standard" and "compact". When set to "compact", content is rendered more densely with smaller spacing and typography.',
        enum: ["standard", "compact"],
      },
    },
    required: ["spaceKey"],
  },
  request: {
    method: "PUT",
    path: "/wiki/rest/api/space/{spaceKey}/settings",
    body: ["routeOverrideEnabled", "contentMode"],
  },
});
