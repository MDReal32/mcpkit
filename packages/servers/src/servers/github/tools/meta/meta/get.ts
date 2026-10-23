import { defineTool } from "@usemcpkit/core";

export const metaMetaGet = defineTool({
  name: "meta:meta:get",
  description:
    "Get GitHub meta information. Returns meta information about GitHub, including a list of GitHub's IP addresses. For more information, see \"About GitHub's IP addresses.\"",
  input: {
    type: "object",
    properties: {},
  },
  request: {
    method: "GET",
    path: "/meta",
  },
});
