import { defineTool } from "@usemcpkit/core";

export const applicationsOauth2GetMyOauth2Application = defineTool({
  name: "applications:oauth2:get_my_oauth2_application",
  description: "",
  input: {
    type: "object",
    properties: {},
  },
  request: {
    method: "GET",
    path: "/oauth2/applications/@me",
  },
});
