import { defineTool } from "@usemcpkit/core";

export const invitesTargetUsersGetInviteTargetUsersJobStatus = defineTool({
  name: "invites:target_users:get_invite_target_users_job_status",
  description: ". Get the target users job status for an invite.",
  input: {
    type: "object",
    properties: {
      code: {
        type: "string",
      },
    },
    required: ["code"],
  },
  request: {
    method: "GET",
    path: "/invites/{code}/target-users/job-status",
  },
});
