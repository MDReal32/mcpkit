import { groupsOrganizationsCreateInternalOrgMoverCancelMaintenance } from "./create-internal-org-mover-cancel-maintenance";
import { groupsOrganizationsCreateInternalOrgMoverConfirmMaintenance } from "./create-internal-org-mover-confirm-maintenance";
import { groupsOrganizationsCreateInternalOrgMoverExitMaintenance } from "./create-internal-org-mover-exit-maintenance";
import { groupsOrganizationsCreateInternalOrgMoverStartMaintenance } from "./create-internal-org-mover-start-maintenance";
import { groupsOrganizationsCreateOrganizationsRestore } from "./create-organizations-restore";
import { groupsOrganizationsDeleteOrganizations } from "./delete-organizations";
import { groupsOrganizationsGetInternalOrgMoverMaintenanceReadiness } from "./get-internal-org-mover-maintenance-readiness";
import { groupsOrganizationsGetInternalOrgMoverMaintenanceState } from "./get-internal-org-mover-maintenance-state";

export const groupsOrganizationsTools = [
  groupsOrganizationsCreateInternalOrgMoverCancelMaintenance,
  groupsOrganizationsCreateInternalOrgMoverConfirmMaintenance,
  groupsOrganizationsCreateInternalOrgMoverExitMaintenance,
  groupsOrganizationsCreateInternalOrgMoverStartMaintenance,
  groupsOrganizationsCreateOrganizationsRestore,
  groupsOrganizationsDeleteOrganizations,
  groupsOrganizationsGetInternalOrgMoverMaintenanceReadiness,
  groupsOrganizationsGetInternalOrgMoverMaintenanceState,
];
