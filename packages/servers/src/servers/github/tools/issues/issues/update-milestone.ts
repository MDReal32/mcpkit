import { defineTool } from "@usemcpkit/core";

export const issuesIssuesUpdateMilestone = defineTool({
  name: "issues:issues:update_milestone",
  description: "Update a milestone",
  input: {
    type: "object",
    properties: {
      owner: {
        type: "string",
        description: "The account owner of the repository. The name is not case sensitive.",
      },
      repo: {
        type: "string",
        description: "The name of the repository without the `.git` extension. The name is not case sensitive.",
      },
      milestone_number: {
        type: "integer",
        description: "The number that identifies the milestone.",
      },
      title: {
        type: "string",
        description: "The title of the milestone.",
      },
      state: {
        type: "string",
        description: "The state of the milestone. Either `open` or `closed`.",
        default: "open",
        enum: ["open", "closed"],
      },
      description: {
        type: "string",
        description: "A description of the milestone.",
      },
      due_on: {
        type: "string",
        description: "The milestone due date. This is a timestamp in ISO 8601 format: `YYYY-MM-DDTHH:MM:SSZ`.",
      },
    },
    required: ["owner", "repo", "milestone_number"],
  },
  request: {
    method: "PATCH",
    path: "/repos/{owner}/{repo}/milestones/{milestone_number}",
    body: ["title", "state", "description", "due_on"],
  },
});
