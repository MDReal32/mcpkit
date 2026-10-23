import { defineTool } from "@usemcpkit/core";

export const aiTokenExchangeCreateTokenExchange = defineTool({
  name: "ai:token_exchange:create_token_exchange",
  description:
    "Issue a short-lived JWT for a single modular-service audience. Issues a short-lived RS256 JWT scoped to one modular-service audience (such as the Artifact Registry). Claims include the requesting user id (sub), organization id, and deployment realm (saas / self-managed). Presented to the corresponding backend and verified against the instance JWKS.",
  input: {
    type: "object",
    properties: {
      audience: {
        type: "string",
        description: "Target service audience.",
        enum: ["gitlab-artifact-registry"],
      },
      expires_in: {
        type: "integer",
        description:
          "Requested token lifetime in seconds. The granted lifetime may be shorter than requested depending on the authentication method used to call this endpoint.",
        default: 300,
      },
    },
    required: ["audience"],
  },
  request: {
    method: "POST",
    path: "/token_exchange",
    body: ["audience", "expires_in"],
  },
});
