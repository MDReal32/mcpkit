import { defineTool } from "@usemcpkit/core";

export const applicationsOauth2GetMyOauth2Authorization = defineTool({
  name: "applications:oauth2:get_my_oauth2_authorization",
  description: "",
  input: {
    type: "object",
    properties: {},
  },
  request: {
    method: "GET",
    path: "/oauth2/@me",
  },
});
