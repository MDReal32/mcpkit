import { defineTool } from "@usemcpkit/core";

export const applicationsApplicationsGetMyApplication = defineTool({
  name: "applications:applications:get_my_application",
  description: "",
  input: {
    type: "object",
    properties: {},
  },
  request: {
    method: "GET",
    path: "/applications/@me",
  },
});
