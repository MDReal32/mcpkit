import { hierarchyWorkspacesGetAuthorizedWorkspaces } from "./get-authorized-workspaces";
import { hierarchyWorkspacesGetWorkspacePlan } from "./get-workspace-plan";
import { hierarchyWorkspacesGetWorkspaceSeats } from "./get-workspace-seats";

export const hierarchyWorkspacesTools = [
  hierarchyWorkspacesGetAuthorizedWorkspaces,
  hierarchyWorkspacesGetWorkspacePlan,
  hierarchyWorkspacesGetWorkspaceSeats,
];
