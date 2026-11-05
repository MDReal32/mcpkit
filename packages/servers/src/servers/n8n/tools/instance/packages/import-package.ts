import { defineTool } from "@usemcpkit/core";

export const instancePackagesImportPackage = defineTool({
  name: "instance:packages:import_package",
  description:
    "Beta: Import an n8n package into a project. **Beta** — breaking changes may still occur without major version bump.",
  input: {
    type: "object",
    properties: {
      package: {
        type: "string",
        description: "Path of a local file to upload.",
      },
      projectId: {
        type: "string",
        description: "Target project id. Omit or send empty to import into the caller's personal project.",
      },
      folderId: {
        type: "string",
        description: "Optional folder within the target project. Omit or send empty for project root.",
      },
      credentialMatchingMode: {
        type: "string",
        description:
          "How credential references in `requirements.credentials` are matched on the target instance. `id-only` (default) matches by id. `name-and-type` matches credentials with the exact same name and type. `type-only` matches any credential of the same type. For `name-and-type` and `type-only`, candidates are ranked by scope — a credential owned by the target project wins over one merely shared into it,…",
        default: "id-only",
        enum: ["id-only", "name-and-type", "type-only"],
      },
      credentialMissingMode: {
        type: "string",
        description:
          "What to do when a credential reference cannot be resolved. `create-stub` (default) creates empty credential placeholders in the target project for missing references. `create-with-values` also creates them, seeded from the expression data bundled in the package (see the export option `credentialExportPolicy`); a reference the package carries no data for falls back to an empty stub. A credential c…",
        default: "create-stub",
        enum: ["must-preexist", "create-stub", "create-with-values"],
      },
      credentialConflictPolicy: {
        type: "string",
        description:
          "What to do when a credential reference matches an existing credential and the package has different values for it. `keep-existing` (default) never changes a matched credential. `overwrite` writes the package name and the expression values from the package to a matched credential that a project of the import owns. It keeps all other stored values: secrets, other fields, the OAuth connection, and a…",
        default: "keep-existing",
        enum: ["keep-existing", "overwrite", "fail"],
      },
      bindings: {
        type: "string",
        description:
          'Optional JSON object of explicit source→target id bindings, keyed by entity type. Only `credentials` is supported today: send `{"credentials":{"<packageCredentialId>":"<targetCredentialId>"}}` to map credential ids from the package to credential ids on the target instance. These explicit bindings are validated on type and applied before `credentialMatchingMode` resolution runs.',
        default: "{}",
      },
      workflowConflictPolicy: {
        type: "string",
        description:
          "`new-version` updates matching workflows and creates a new version; the archived state follows the package, so a matching workflow is archived or unarchived to match it. `fail` rejects the import when any matching workflow exists, and `skip` leaves matching workflows unchanged. Archived workflows in the target project match like any other. An archive state change also needs the `workflow:delete`…",
        enum: ["new-version", "fail", "skip"],
      },
      workflowPublishingPolicy: {
        type: "string",
        description:
          "Controls whether imported workflows are published after content is written. `preserve-published-state` (default) keeps new workflows inactive, and republishes an updated workflow only when it was already published and the package carries the version the source publishes — so drafts are never published. `match-source` publishes the version the package carries when the source publishes it, and unpu…",
        default: "preserve-published-state",
        enum: ["preserve-published-state", "match-source", "publish-all", "unpublish-all"],
      },
      workflowIdPolicy: {
        type: "string",
        description:
          "Controls the id each newly created workflow receives. `source` (default) reuses the package's own workflow id on the target instance, which best fits promotion use cases where the same workflow moves between environments. `new` mints a fresh id and records the package id as `sourceWorkflowId`, so the same package can be imported repeatedly without id collisions — best suited to marketplace import…",
        default: "source",
        enum: ["new", "source"],
      },
      missingNodeTypeMode: {
        type: "string",
        description:
          "What to do when a workflow in the package uses a node type — or a version of a node type — this instance does not have. `fail` (default) rejects the import before anything is written, listing every missing `(nodeType, typeVersion)` pair and the workflows that use it. `import-anyway` imports the package; workflows containing missing node types are never published by this import, regardless of `wor…",
        default: "fail",
        enum: ["fail", "import-anyway"],
      },
      projectConflictPolicy: {
        type: "string",
        description:
          "What to do when a project the package defines already exists here (matched by id), and — unless `folderConflictPolicy` overrides it — how its contents are treated. `merge` (default) leaves the existing project's name, description, icon and custom span attributes untouched and adds the package's contents alongside. `overwrite` replaces those details with the package's; a detail the package omits i…",
        default: "merge",
        enum: ["merge", "fail", "overwrite"],
      },
      folderConflictPolicy: {
        type: "string",
        description:
          "What to do when a package folder already exists at the same position in the target project. Defaults to whatever `projectConflictPolicy` is, so the intent is stated once; a workflow package defines no projects, so it defaults to `merge` there. `merge` reuses the existing folder and merges the package's children into it. `fail` rejects the import. `overwrite` reuses folders as `merge` does and add…",
        enum: ["merge", "fail", "overwrite"],
      },
      overwriteDeletionPolicy: {
        type: "string",
        description:
          "How `folderConflictPolicy=overwrite` removes a workflow the package does not contain. `archive` (default) archives it, so it stays recoverable along with its execution history. `hard-delete` archives it — the step that unpublishes it, which a delete will not do on its own — and then deletes the workflow and its executions permanently. Each entry in `removedWorkflows` reports what actually happene…",
        default: "archive",
        enum: ["archive", "hard-delete"],
      },
      dataTableMatchingMode: {
        type: "string",
        description:
          "How data tables referenced by the package's workflows are matched against the target project. `by-id` matches the target-project table with the same id (imported tables keep their source id) and never falls back to name matching, so a match survives a rename on the target. Currently the only mode.",
        default: "by-id",
        enum: ["by-id"],
      },
      dataTableMissingMode: {
        type: "string",
        description:
          "Controls what happens when a referenced data table has no match in the target project. `create` (default) creates it from the package schema, keeping the source id, with no rows; requires the `dataTable:create` scope. `must-preexist` rejects the import. `do-nothing` skips creation of missing tables. Under the `keep-existing`, `fail`, and `overwrite-non-destructive` schema conflict policies, match…",
        default: "create",
        enum: ["create", "must-preexist", "do-nothing"],
      },
      dataTableSchemaConflictPolicy: {
        type: "string",
        description:
          "How strictly a matched data table's schema is compared. `keep-existing` (default) accepts a target table that has every package column with the same name and type. The target table can have extra columns. `fail` rejects any difference, including target-only columns. Under `keep-existing` and `fail`, a missing package column or a type mismatch rejects the import, and the target table does not chan…",
        default: "keep-existing",
        enum: ["keep-existing", "fail", "overwrite", "overwrite-non-destructive"],
      },
      variableMissingMode: {
        type: "string",
        description:
          "Controls what happens when a variable referenced by the package's workflows is absent from the target project and the global scope (lookup order: project, then global). `create-with-value` (default) creates the variable with its package value and lists its name under `variables.created`. When the package carries no value for it — values were excluded at export, or the exported value was itself em…",
        default: "create-with-value",
        enum: ["do-nothing", "must-preexist", "create-stub", "create-with-value"],
      },
      variableConflictPolicy: {
        type: "string",
        description:
          "What to do when a referenced variable resolves in the target project or global scope but the package bundles a *different* value for it. `keep-existing` (default) leaves the target value untouched and reports the name under `variables.matched`. `overwrite` silently replaces the value of the existing variable at whichever scope it was found — the target project or the global scope, so a global var…",
        default: "keep-existing",
        enum: ["keep-existing", "overwrite", "fail"],
      },
      variableParentPolicy: {
        type: "string",
        description:
          "Where `create-with-value` and `create-stub` create missing variables for workflow/folder packages. `project` — also the behaviour when the field is omitted — creates them in the import target project (`projectId`, else the caller's personal project). `global` creates them at the global scope. The license and `variable:create` requirements described under `variableMissingMode` apply to both placem…",
        enum: ["project", "global"],
      },
      tagMissingMode: {
        type: "string",
        description:
          "What to do when a tag referenced by the package's workflows has no tag with the same id on the target instance (tags are matched by source id, never by name). `create` (default) creates the tag globally with its package (source) id and name; when the import would create a tag this needs an API key carrying the `tag:create` scope. `do-nothing` imports the workflows without the missing tags — nothi…",
        default: "create",
        enum: ["create", "do-nothing"],
      },
      tagConflictPolicy: {
        type: "string",
        description:
          "What to do when a referenced tag conflicts on the target instance — either the same-id target tag carries a different name (rename drift), or the tag's name is already held by a different tag (name collision). `skip` (default) drops the conflicted tags from the import (not created, not renamed, not attached anywhere; the import proceeds and lists them under `tags.skipped`). `fail` rejects the imp…",
        default: "skip",
        enum: ["skip", "fail", "rename"],
      },
    },
    required: ["package", "workflowConflictPolicy"],
  },
  request: {
    method: "POST",
    path: "/n8n-packages/import",
    body: [
      "package",
      "projectId",
      "folderId",
      "credentialMatchingMode",
      "credentialMissingMode",
      "credentialConflictPolicy",
      "bindings",
      "workflowConflictPolicy",
      "workflowPublishingPolicy",
      "workflowIdPolicy",
      "missingNodeTypeMode",
      "projectConflictPolicy",
      "folderConflictPolicy",
      "overwriteDeletionPolicy",
      "dataTableMatchingMode",
      "dataTableMissingMode",
      "dataTableSchemaConflictPolicy",
      "variableMissingMode",
      "variableConflictPolicy",
      "variableParentPolicy",
      "tagMissingMode",
      "tagConflictPolicy",
    ],
    contentType: "multipart/form-data",
    fileArgs: ["package"],
  },
});
