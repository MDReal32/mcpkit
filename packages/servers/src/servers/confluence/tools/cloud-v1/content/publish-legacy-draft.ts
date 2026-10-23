import { defineTool } from "@usemcpkit/core";

export const cloudV1ContentPublishLegacyDraft = defineTool({
  name: "cloud_v1:content:publish_legacy_draft",
  description:
    "[Cloud v1] Publish legacy draft. Publishes a legacy draft of a page created from a blueprint. Legacy drafts will eventually be removed in favor of shared drafts. For now, this method works the same as Publish shared draft.",
  input: {
    type: "object",
    properties: {
      draftId: {
        type: "string",
        description:
          "The ID of the draft page that was created from a blueprint. You can find the `draftId` in the Confluence application by opening the draft page and checking the page URL.",
      },
      status: {
        type: "string",
        description:
          "The status of the content to be updated, i.e. the draft. This is set to 'draft' by default, so you shouldn't need to specify it.",
      },
      expand: {
        type: "string",
        description: "A multi-value parameter indicating which properties of the content to expand. (comma-separated)",
      },
      version: {
        type: "object",
        description: "The version for the new content.",
        properties: {
          number: {
            type: "integer",
            description: "The version number. Set this to `1`.",
          },
        },
        required: ["number"],
      },
      title: {
        type: "string",
        description:
          "The title of the content. If you don't want to change the title, set this to the current title of the draft.",
      },
      type: {
        type: "string",
        description: "The type of content. Set this to `page`.",
        enum: ["page"],
      },
      body_status: {
        type: "string",
        description: "The status of the content. Set this to `current` or omit it altogether.",
        enum: ["current"],
      },
      space: {
        type: "object",
        description: "The space for the content.",
        properties: {
          key: {
            type: "string",
            description: "The key of the space",
          },
        },
        required: ["key"],
      },
      ancestors: {
        type: "array",
        description:
          "The new ancestor (i.e. parent page) for the content. If you have specified an ancestor, you must also specify a `space` property in the request body for the space that the ancestor is in.",
        items: {
          type: "object",
        },
      },
    },
    required: ["draftId", "version", "title", "type"],
  },
  request: {
    method: "POST",
    path: "/wiki/rest/api/content/blueprint/instance/{draftId}",
    query: ["status", "expand"],
    commaQuery: ["expand"],
    body: {
      version: "version",
      title: "title",
      type: "type",
      status: "body_status",
      space: "space",
      ancestors: "ancestors",
    },
  },
});
