import { defineTool } from "@usemcpkit/core";

export const metaInstanceUpdateApplicationAppearance = defineTool({
  name: "meta:instance:update_application_appearance",
  description:
    "Modify appearance. Updates instance appearance settings like branding, logos, headers, and footer messages.",
  input: {
    type: "object",
    properties: {
      title: {
        type: "string",
        description: "Instance title on the sign in / sign up page",
      },
      description: {
        type: "string",
        description: "Markdown text shown on the sign in / sign up page",
      },
      pwa_name: {
        type: "string",
        description: "Name of the Progressive Web App",
      },
      pwa_short_name: {
        type: "string",
        description: "Optional, short name for Progressive Web App",
      },
      pwa_description: {
        type: "string",
        description: "An explanation of what the Progressive Web App does",
      },
      logo: {
        type: "string",
        description: "Path of a local file to upload.",
      },
      pwa_icon: {
        type: "string",
        description: "Path of a local file to upload.",
      },
      header_logo: {
        type: "string",
        description: "Path of a local file to upload.",
      },
      favicon: {
        type: "string",
        description: "Path of a local file to upload.",
      },
      member_guidelines: {
        type: "string",
        description: "Markdown text shown on the members page of a group or project",
      },
      new_project_guidelines: {
        type: "string",
        description: "Markdown text shown on the new project page",
      },
      profile_image_guidelines: {
        type: "string",
        description: "Markdown text shown on the profile page below Public Avatar",
      },
      header_message: {
        type: "string",
        description: "Message within the system header bar",
      },
      footer_message: {
        type: "string",
        description: "Message within the system footer bar",
      },
      message_background_color: {
        type: "string",
        description: "Background color for the system header / footer bar",
      },
      message_font_color: {
        type: "string",
        description: "Font color for the system header / footer bar",
      },
      email_header_and_footer_enabled: {
        type: "boolean",
        description: "Add header and footer to all outgoing emails if enabled",
      },
      site_name: {
        type: "string",
        description: "Last part of the webpage title. Defaults to empty.",
      },
    },
  },
  request: {
    method: "PUT",
    path: "/application/appearance",
    body: [
      "title",
      "description",
      "pwa_name",
      "pwa_short_name",
      "pwa_description",
      "logo",
      "pwa_icon",
      "header_logo",
      "favicon",
      "member_guidelines",
      "new_project_guidelines",
      "profile_image_guidelines",
      "header_message",
      "footer_message",
      "message_background_color",
      "message_font_color",
      "email_header_and_footer_enabled",
      "site_name",
    ],
    contentType: "multipart/form-data",
    fileArgs: ["logo", "pwa_icon", "header_logo", "favicon"],
  },
});
