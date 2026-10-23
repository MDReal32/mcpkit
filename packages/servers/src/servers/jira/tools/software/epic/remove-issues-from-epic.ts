import { defineTool } from "@usemcpkit/core";

export const softwareEpicRemoveIssuesFromEpic = defineTool({
  name: "software:epic:remove_issues_from_epic",
  description:
    "Remove issues from epic. Removes issues from epics. The user needs to have the edit issue permission for all issue they want to remove from epics. The maximum number of issues that can be moved in one operation is 50. **Note:** This operation does not work for epics in next-gen projects. Instead, update the issue using `\\{ fields: \\{ parent: \\{\\} \\} \\}`",
  input: {
    type: "object",
    properties: {
      issues: {
        type: "array",
        items: {
          type: "string",
        },
      },
    },
  },
  request: {
    method: "POST",
    path: "/rest/agile/1.0/epic/none/issue",
    body: ["issues"],
  },
});
