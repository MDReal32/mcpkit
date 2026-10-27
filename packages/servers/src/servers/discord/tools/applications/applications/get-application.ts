import { defineTool } from "@usemcpkit/core";

export const applicationsApplicationsGetApplication = defineTool({
  name: "applications:applications:get_application",
  description: "",
  input: {
    type: "object",
    properties: {
      application_id: {
        type: "string",
      },
    },
    required: ["application_id"],
  },
  request: {
    method: "GET",
    path: "/applications/{application_id}",
  },
});
