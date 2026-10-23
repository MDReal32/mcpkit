import { defineTool } from "@usemcpkit/core";

export const ciRunnersCreateRunnersResetRegistrationToken = defineTool({
  name: "ci:runners:create_runners_reset_registration_token",
  description:
    "Reset the runner registration token for the instance. Resets the runner registration token for the GitLab instance.",
  input: {
    type: "object",
    properties: {},
  },
  request: {
    method: "POST",
    path: "/runners/reset_registration_token",
  },
});
