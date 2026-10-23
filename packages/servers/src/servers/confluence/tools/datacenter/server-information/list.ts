import { defineTool } from "@usemcpkit/core";

export const datacenterServerInformationList = defineTool({
  name: "datacenter:server_information:list",
  description:
    "[Data Center] Get server information. Returns information about the current application build running on this instance.",
  input: {
    type: "object",
    properties: {},
  },
  request: {
    method: "GET",
    path: "/rest/api/server-information",
  },
});
