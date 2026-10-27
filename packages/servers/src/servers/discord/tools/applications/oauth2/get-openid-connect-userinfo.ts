import { defineTool } from "@usemcpkit/core";

export const applicationsOauth2GetOpenidConnectUserinfo = defineTool({
  name: "applications:oauth2:get_openid_connect_userinfo",
  description: "",
  input: {
    type: "object",
    properties: {},
  },
  request: {
    method: "GET",
    path: "/oauth2/userinfo",
  },
});
