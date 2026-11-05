import { defineTool } from "@usemcpkit/core";

export const instancePromotionsApplyPackage = defineTool({
  name: "instance:promotions:apply_package",
  description:
    "Apply a package to the instance. Checks the full package at the configured branch tip. Optionally send expectedSource with the environmentId, branchName, and full commitSha from the reviewed change preview; status `source-changed` means the branch moved since that review and nothing was imported. Returns status `blocked` before import writes if bindings need setup or if the apply would delete team projects that the package does…",
  input: {
    type: "object",
    properties: {
      promotionEnvironmentId: {
        type: "string",
        description: "The ID of the promotion environment.",
      },
      expectedSource: {
        type: "object",
        properties: {
          environmentId: {
            type: "string",
          },
          branchName: {
            type: "string",
          },
          commitSha: {
            type: "string",
          },
        },
        required: ["environmentId", "branchName", "commitSha"],
      },
    },
    required: ["promotionEnvironmentId"],
  },
  request: {
    method: "POST",
    path: "/promotions/environments/{promotionEnvironmentId}/apply",
    body: ["expectedSource"],
  },
});
