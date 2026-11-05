import { defineTool } from "@usemcpkit/core";

export const instancePackagesExportPackage = defineTool({
  name: "instance:packages:export_package",
  description:
    "Beta: Export agents, workflows, folders, or projects as an n8n package. **Beta** — breaking changes may still occur without major version bump.",
  input: {
    type: "object",
    properties: {
      agentIds: {
        type: "array",
        description: "IDs of the agents to include. Requires the agents module.",
        items: {
          type: "string",
        },
      },
      workflowIds: {
        type: "array",
        description: "IDs of the workflows to include in the exported package.",
        items: {
          type: "string",
        },
      },
      folderIds: {
        type: "array",
        description:
          "IDs of the folders to include in the exported package. Each folder is exported with its nested folders.",
        items: {
          type: "string",
        },
      },
      projectIds: {
        type: "array",
        description:
          "IDs of the projects to include in the exported package. Includes their agents when the agents module is enabled.",
        items: {
          type: "string",
        },
      },
      includeVariableValues: {
        type: "boolean",
        description:
          "Whether values of variables referenced by the exported entities are bundled into the package. When `false`, variables still travel as name/type files and are listed in the package requirements, but no values travel with the package.",
        default: true,
      },
      includeTags: {
        type: "boolean",
        description:
          "Whether tags assigned to the exported workflows are bundled into the package. When `false`, no tag files, tag references, or tag requirements travel with the package.",
        default: true,
      },
      dependencyPolicy: {
        type: "string",
        description:
          "Policy for workflow and agent dependencies outside the selected package contents. Includes static workflow references and disabled agent references. `fail` aborts when a required workflow or agent is absent from the package. `include-in-package` adds accessible dependencies recursively. `reference-only` records external requirements without including those definitions. The same policy applies to…",
        default: "fail",
        enum: ["fail", "reference-only", "include-in-package"],
      },
      versionPolicy: {
        type: "string",
        description:
          "Which version of each workflow and agent travels in the package. `latest` exports the current draft. `published-strict` requires a published version. `prefer-published` uses the published version when available and the draft otherwise. `ignore-unpublished` skips unpublished selections. Dependencies that cannot be included cause the export to fail only when `dependencyPolicy` is `fail` or `include…",
        default: "latest",
        enum: ["published-strict", "prefer-published", "ignore-unpublished", "latest"],
      },
      credentialExportPolicy: {
        type: "string",
        description:
          "Whether expression values from credential data are bundled into the package. `expression-values-only` includes credential fields whose value is an n8n expression (for example `={{ $secrets.apiKey }}`); literal values never travel either way. `no-values` keeps credential data out of the package entirely, so each credential file carries only its id, name and type.",
        default: "expression-values-only",
        enum: ["expression-values-only", "no-values"],
      },
      includeArchivedWorkflows: {
        type: "boolean",
        description:
          "Whether folder and project exports include their archived workflows. When `false` (default) they are left out. When `true` they travel with `isArchived: true` and are archived on import. Workflows listed in `workflowIds` always export, also when archived.",
        default: false,
      },
    },
  },
  request: {
    method: "POST",
    path: "/n8n-packages/export",
    body: [
      "agentIds",
      "workflowIds",
      "folderIds",
      "projectIds",
      "includeVariableValues",
      "includeTags",
      "dependencyPolicy",
      "versionPolicy",
      "credentialExportPolicy",
      "includeArchivedWorkflows",
    ],
  },
});
