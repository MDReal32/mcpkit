import { defineTool } from "@usemcpkit/core";

export const orgsOrgsListMembers = defineTool({
  name: "orgs:orgs:list_members",
  description:
    "List organization members. List all users who are members of an organization. If the authenticated user is also a member of this organization then both concealed and public members will be returned.",
  input: {
    type: "object",
    properties: {
      org: {
        type: "string",
        description: "The organization name. The name is not case sensitive.",
      },
      filter: {
        type: "string",
        default: "all",
        enum: ["2fa_disabled", "2fa_insecure", "all"],
        description:
          "Filter members returned in the list. `2fa_disabled` means that only members without two-factor authentication enabled will be returned. `2fa_insecure` means that only members with insecure 2FA methods will be returned. These options are only available for organization owners.",
      },
      role: {
        type: "string",
        default: "all",
        enum: ["all", "admin", "member"],
        description: "Filter members returned by their role.",
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
    required: ["org"],
  },
  request: {
    method: "GET",
    path: "/orgs/{org}/members",
    query: ["filter", "role", "per_page", "page"],
  },
});
