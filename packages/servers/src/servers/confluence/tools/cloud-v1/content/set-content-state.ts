import { defineTool } from "@usemcpkit/core";

export const cloudV1ContentSetContentState = defineTool({
  name: "cloud_v1:content:set_content_state",
  description:
    "[Cloud v1] Set the content state of a content and publishes a new version of the content. Sets the content state of the content specified and creates a new version (publishes the content without changing the body) of the content with the new state.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "The Id of the content whose content state is to be set.",
      },
      status: {
        type: "string",
        enum: ["current", "draft"],
        description:
          "Status of content onto which state will be placed. If draft, then draft state will change. If current, state will be placed onto a new version of the content with same body as previous version.",
      },
      name: {
        type: "string",
        description: "Name of content state. Maximum 20 characters.",
      },
      color: {
        type: "string",
        description:
          "Color of state. Must be in 6 digit hex form (#FFFFFF). The default colors offered in the UI are: #ff7452 (red), #2684ff (blue), #ffc400 (yellow), #57d9a3 (green), and #8777d9 (purple)",
      },
      body_id: {
        type: "integer",
        description: "id of state. This can be 0,1, or 2 if you wish to specify a default space state.",
      },
    },
    required: ["id", "status"],
  },
  request: {
    method: "PUT",
    path: "/wiki/rest/api/content/{id}/state",
    query: ["status"],
    body: {
      name: "name",
      color: "color",
      id: "body_id",
    },
  },
});
