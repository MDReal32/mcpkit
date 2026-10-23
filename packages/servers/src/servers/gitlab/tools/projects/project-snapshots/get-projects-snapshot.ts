import { defineTool } from "@usemcpkit/core";

export const projectsProjectSnapshotsGetProjectsSnapshot = defineTool({
  name: "projects:project_snapshots:get_projects_snapshot",
  description: "Download snapshot of a Git repository. Downloads snapshot of a Git repository.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      wiki: {
        type: "boolean",
        description: "If `true`, downloads the wiki repository instead of the project repository.",
      },
      save_to: {
        type: "string",
        description: "Local path the downloaded file is saved to.",
      },
    },
    required: ["id", "save_to"],
  },
  request: {
    method: "GET",
    path: "/projects/{id}/snapshot",
    query: ["wiki"],
    saveToArg: "save_to",
  },
});
