import { defineTool } from "@usemcpkit/core";

export const datacenterSpaceList = defineTool({
  name: "datacenter:space:list",
  description: "[Data Center] Get spaces by key. Returns information about a number of spaces.",
  input: {
    type: "object",
    properties: {
      spaceKeySingle: {
        type: "string",
      },
      start: {
        type: "integer",
        description: "the start point of the collection to return.",
      },
      label: {
        type: "string",
        description: "filter the list of spaces returned by label. (comma-separated)",
      },
      favourite: {
        type: "boolean",
        description: "filter the list of spaces returned by favourites.",
      },
      type: {
        type: "string",
        description: "filter the list of spaces returned by type (global, personal).",
      },
      spaceKey: {
        type: "string",
        description: "the key of the space to fetch information from. (comma-separated)",
      },
      spaceId: {
        type: "string",
        description: "(comma-separated)",
      },
      xoauth_requestor_id: {
        type: "string",
      },
      expand: {
        type: "string",
        description: "a comma separated list of properties to expand on the spaces.",
      },
      hasRetentionPolicy: {
        type: "boolean",
        description: "filter the list of spaces returned by retention policy.",
      },
      limit: {
        type: "integer",
        description: "the limit of the number of spaces to return, this may be restricted by fixed system limits",
      },
      spaceKeys: {
        type: "string",
        description: "the keys of the spaces to fetch information from.",
      },
      contentLabel: {
        type: "string",
        description: "filter the list of spaces returned by content containing provided label. (comma-separated)",
      },
      spaceIds: {
        type: "string",
        description: "the ids of the spaces to fetch information from. Cannot be used in conjunction with spaceKey(s)",
      },
      status: {
        type: "string",
        description: "filter the list of spaces returned by status (current, archived).",
      },
    },
  },
  request: {
    method: "GET",
    path: "/rest/api/space",
    query: [
      "spaceKeySingle",
      "start",
      "label",
      "favourite",
      "type",
      "spaceKey",
      "spaceId",
      "xoauth_requestor_id",
      "expand",
      "hasRetentionPolicy",
      "limit",
      "spaceKeys",
      "contentLabel",
      "spaceIds",
      "status",
    ],
  },
});
