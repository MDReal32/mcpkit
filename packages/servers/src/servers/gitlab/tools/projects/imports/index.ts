import { projectsImportsCreateBulkImportsCancel } from "./create-bulk-imports-cancel";
import { projectsImportsCreateImportGithubGists } from "./create-import-github-gists";
import { projectsImportsGetBulkImports } from "./get-bulk-imports";
import { projectsImportsGetBulkImportsEntities } from "./get-bulk-imports-entities";
import { projectsImportsListBulkImports } from "./list-bulk-imports";
import { projectsImportsListBulkImportsEntities } from "./list-bulk-imports-entities";
import { projectsImportsListBulkImportsEntitiesFailures } from "./list-bulk-imports-entities-failures";
import { projectsImportsListBulkImportsEntitiesGet } from "./list-bulk-imports-entities-get";

export const projectsImportsTools = [
  projectsImportsCreateBulkImportsCancel,
  projectsImportsCreateImportGithubGists,
  projectsImportsGetBulkImports,
  projectsImportsGetBulkImportsEntities,
  projectsImportsListBulkImports,
  projectsImportsListBulkImportsEntities,
  projectsImportsListBulkImportsEntitiesFailures,
  projectsImportsListBulkImportsEntitiesGet,
];
