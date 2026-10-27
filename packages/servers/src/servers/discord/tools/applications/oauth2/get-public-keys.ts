import { defineTool } from "@usemcpkit/core";

export const applicationsOauth2GetPublicKeys = defineTool({
  name: "applications:oauth2:get_public_keys",
  description: "",
  input: {
    type: "object",
    properties: {},
  },
  request: {
    method: "GET",
    path: "/oauth2/keys",
  },
});
