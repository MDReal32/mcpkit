import { defineTool } from "@usemcpkit/core";

export const orgsOrgsListInvitationTeams = defineTool({
  name: "orgs:orgs:list_invitation_teams",
  description:
    "List organization invitation teams. List all teams associated with an invitation. In order to see invitations in an organization, the authenticated user must be an organization owner.",
  input: {
    type: "object",
    properties: {
      org: {
        type: "string",
        description: "The organization name. The name is not case sensitive.",
      },
      invitation_id: {
        type: "integer",
        description: "The unique identifier of the invitation.",
      },
      per_page: {
        type: "integer",
        default: 30,
        description:
          'The number of results per page (max 100). For more information, see "Using pagination in the REST API."',
      },
      page: {
        type: "integer",
        default: 1,
        description:
          'The page number of the results to fetch. For more information, see "Using pagination in the REST API."',
      },
    },
    required: ["org", "invitation_id"],
  },
  request: {
    method: "GET",
    path: "/orgs/{org}/invitations/{invitation_id}/teams",
    query: ["per_page", "page"],
  },
});
