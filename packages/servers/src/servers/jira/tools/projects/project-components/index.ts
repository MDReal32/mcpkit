import { projectsProjectComponentsCreateComponent } from "./create-component";
import { projectsProjectComponentsDeleteComponent } from "./delete-component";
import { projectsProjectComponentsFindComponentsForProjects } from "./find-components-for-projects";
import { projectsProjectComponentsGetComponent } from "./get-component";
import { projectsProjectComponentsGetComponentRelatedIssues } from "./get-component-related-issues";
import { projectsProjectComponentsGetProjectComponents } from "./get-project-components";
import { projectsProjectComponentsGetProjectComponentsPaginated } from "./get-project-components-paginated";
import { projectsProjectComponentsUpdateComponent } from "./update-component";

export const projectsProjectComponentsTools = [
  projectsProjectComponentsCreateComponent,
  projectsProjectComponentsDeleteComponent,
  projectsProjectComponentsFindComponentsForProjects,
  projectsProjectComponentsGetComponent,
  projectsProjectComponentsGetComponentRelatedIssues,
  projectsProjectComponentsGetProjectComponents,
  projectsProjectComponentsGetProjectComponentsPaginated,
  projectsProjectComponentsUpdateComponent,
];
