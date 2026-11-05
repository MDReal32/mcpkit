import { defineTool } from "@usemcpkit/core";

export const instancePackagesImportPackageSelection = defineTool({
  name: "instance:packages:import_package_selection",
  description:
    "Beta: Import a selected subset of workflows from an n8n package. **Beta** — breaking changes may still occur without major version bump.",
  input: {
    type: "object",
    properties: {
      package: {
        type: "string",
        description: "Path of a local file to upload.",
      },
      selectedProjectId: {
        type: "string",
        description: "Id of the single source project the selection is scoped to, as it appears in the package.",
      },
      selectedWorkflowIds: {
        type: "string",
        description:
          'JSON-encoded array of source workflow ids to import from `selectedProjectId`, e.g. `["wf-1","wf-2"]`. An empty array (`[]`) is allowed — useful for a delete-only request. Ids outside the scoped project are dropped.',
      },
      deletedWorkflowIds: {
        type: "string",
        description:
          'Optional JSON-encoded array of destination workflow ids to remove from the scoped project, e.g. `["wf-3"]`. Removal happens even under the additive profile, and the manner of removal follows `overwriteDeletionPolicy` (archive by default). An absent id is a no-op unless it is also a selected destination. Must not contain a selected workflow\'s destination id. Needs the `workflow:delete` scope.',
      },
      workflowConflictPolicy: {
        type: "string",
        description:
          "What happens when a selected workflow matches an existing workflow by source id in the target project. `new-version` (default) updates it and creates a new version; `fail` rejects the import when any matching workflow exists; `skip` leaves matching workflows unchanged. An archive state change also needs the `workflow:delete` scope.",
        default: "new-version",
        enum: ["new-version", "fail", "skip"],
      },
      workflowIdPolicy: {
        type: "string",
        description:
          "Controls the id each newly created workflow receives. `source` (default) reuses the package's own workflow id on the target instance; `new` mints a fresh id and records the package id as `sourceWorkflowId`. Workflows matched to an existing workflow keep that workflow's current id, regardless of policy.",
        default: "source",
        enum: ["new", "source"],
      },
      overwriteDeletionPolicy: {
        type: "string",
        description:
          "How the ids in `deletedWorkflowIds` are removed. `archive` (default) archives each one, so it stays recoverable along with its execution history. `hard-delete` archives it — the step that unpublishes it, which a delete will not do on its own — and then deletes the workflow and its executions permanently. Each entry in `removedWorkflows` reports what actually happened in its `deletion` field: a `h…",
        default: "archive",
        enum: ["archive", "hard-delete"],
      },
    },
    required: ["package", "selectedProjectId", "selectedWorkflowIds"],
  },
  request: {
    method: "POST",
    path: "/n8n-packages/import-selection",
    body: [
      "package",
      "selectedProjectId",
      "selectedWorkflowIds",
      "deletedWorkflowIds",
      "workflowConflictPolicy",
      "workflowIdPolicy",
      "overwriteDeletionPolicy",
    ],
    contentType: "multipart/form-data",
    fileArgs: ["package"],
  },
});
