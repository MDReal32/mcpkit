import { defineTool } from "@usemcpkit/core";

export const issuesIssuesCreateMilestone = defineTool({
  name: "issues:issues:create_milestone",
  description: "Create a milestone. Creates a milestone.",
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
    required: ["owner", "repo", "title"],
  },
  request: {
    method: "POST",
    path: "/repos/{owner}/{repo}/milestones",
    body: ["title", "state", "description", "due_on"],
  },
});
