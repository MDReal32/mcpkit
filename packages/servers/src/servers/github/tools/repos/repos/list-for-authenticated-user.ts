import { defineTool } from "@usemcpkit/core";

export const reposReposListForAuthenticatedUser = defineTool({
  name: "repos:repos:list_for_authenticated_user",
  description:
    "List repositories for the authenticated user. Lists repositories that the authenticated user has explicit permission (`:read`, `:write`, or `:admin`) to access.",
  input: {
    type: "object",
    properties: {
      visibility: {
        type: "string",
        default: "all",
        enum: ["all", "public", "private"],
        description: "Limit results to repositories with the specified visibility.",
      },
      affiliation: {
        type: "string",
        default: "owner,collaborator,organization_member",
        description:
          "Comma-separated list of values. Can include: * `owner`: Repositories that are owned by the authenticated user. * `collaborator`: Repositories that the user has been added to as a collaborator. * `organization_member`: Repositories that the user has access to through being a member of an organization. This includes every repository on every team that the user is on.",
      },
      type: {
        type: "string",
        default: "all",
        enum: ["all", "owner", "public", "private", "member"],
        description:
          "Limit results to repositories of the specified type. Will cause a `422` error if used in the same request as **visibility** or **affiliation**.",
      },
      sort: {
        type: "string",
        default: "full_name",
        enum: ["created", "updated", "pushed", "full_name"],
        description: "The property to sort the results by.",
      },
      direction: {
        type: "string",
        enum: ["asc", "desc"],
        description: "The order to sort by. Default: `asc` when using `full_name`, otherwise `desc`.",
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
      since: {
        type: "string",
        description:
          "Only show repositories updated after the given time. This is a timestamp in ISO 8601 format: `YYYY-MM-DDTHH:MM:SSZ`.",
      },
      before: {
        type: "string",
        description:
          "Only show repositories updated before the given time. This is a timestamp in ISO 8601 format: `YYYY-MM-DDTHH:MM:SSZ`.",
      },
    },
  },
  request: {
    method: "GET",
    path: "/user/repos",
    query: ["visibility", "affiliation", "type", "sort", "direction", "per_page", "page", "since", "before"],
  },
});
