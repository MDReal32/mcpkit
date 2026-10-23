import { projectsProjectRoleActorsAddActorUsers } from "./add-actor-users";
import { projectsProjectRoleActorsAddProjectRoleActorsToRole } from "./add-project-role-actors-to-role";
import { projectsProjectRoleActorsDeleteActor } from "./delete-actor";
import { projectsProjectRoleActorsDeleteProjectRoleActorsFromRole } from "./delete-project-role-actors-from-role";
import { projectsProjectRoleActorsGetProjectRoleActorsForRole } from "./get-project-role-actors-for-role";
import { projectsProjectRoleActorsSetActors } from "./set-actors";

export const projectsProjectRoleActorsTools = [
  projectsProjectRoleActorsAddActorUsers,
  projectsProjectRoleActorsAddProjectRoleActorsToRole,
  projectsProjectRoleActorsDeleteActor,
  projectsProjectRoleActorsDeleteProjectRoleActorsFromRole,
  projectsProjectRoleActorsGetProjectRoleActorsForRole,
  projectsProjectRoleActorsSetActors,
];
