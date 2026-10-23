import { defineTool } from "@usemcpkit/core";

export const orgsInteractionsGetRestrictionsForAuthenticatedUser = defineTool({
  name: "orgs:interactions:get_restrictions_for_authenticated_user",
  description:
    "Get interaction restrictions for your public repositories. Shows which type of GitHub user can interact with your public repositories and when the restriction expires.",
  input: {
    type: "object",
    properties: {},
  },
  request: {
    method: "GET",
    path: "/user/interaction-limits",
  },
});
