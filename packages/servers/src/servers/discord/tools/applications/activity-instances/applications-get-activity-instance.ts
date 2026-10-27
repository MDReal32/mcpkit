import { defineTool } from "@usemcpkit/core";

export const applicationsActivityInstancesApplicationsGetActivityInstance = defineTool({
  name: "applications:activity_instances:applications_get_activity_instance",
  description: "",
  input: {
    type: "object",
    properties: {
      application_id: {
        type: "string",
      },
      instance_id: {
        type: "string",
      },
    },
    required: ["application_id", "instance_id"],
  },
  request: {
    method: "GET",
    path: "/applications/{application_id}/activity-instances/{instance_id}",
  },
});
