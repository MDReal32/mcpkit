import { defineTool } from "@usemcpkit/core";

export const issuesSuggestionsUpdateSuggestionsApply = defineTool({
  name: "issues:suggestions:update_suggestions_apply",
  description:
    "Apply a suggestion to a merge request. Applies a suggested patch in a merge request. You must have the Developer, Maintainer, or Owner role.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        description: "ID of the suggestion.",
      },
      commit_message: {
        type: "string",
        description:
          "Custom commit message to use instead of the default generated message or the project's default message.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "PUT",
    path: "/suggestions/{id}/apply",
    body: ["commit_message"],
  },
});
