import { defineTool } from "@usemcpkit/core";

export const usersAuthnGetIamUserinfo = defineTool({
  name: "users:authn:get_iam_userinfo",
  description:
    'Return the OIDC ID-token claims for the caller identified by an IAM OAuth token. Authenticates exclusively via an IAM-issued OAuth JWT and returns the subset of OIDC claims documented as "Included in ID Token" in the OpenID Connect provider docs',
  input: {
    type: "object",
    properties: {},
  },
  request: {
    method: "GET",
    path: "/iam/userinfo",
  },
});
