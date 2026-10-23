import { adminBatchedBackgroundOperationsGetAdminBatchedBackgroundOperations } from "./get-admin-batched-background-operations";
import { adminBatchedBackgroundOperationsListAdminBatchedBackgroundOperations } from "./list-admin-batched-background-operations";
import { adminBatchedBackgroundOperationsUpdateAdminBatchedBackgroundOperationsRestart } from "./update-admin-batched-background-operations-restart";
import { adminBatchedBackgroundOperationsUpdateAdminBatchedBackgroundOperationsStop } from "./update-admin-batched-background-operations-stop";

export const adminBatchedBackgroundOperationsTools = [
  adminBatchedBackgroundOperationsGetAdminBatchedBackgroundOperations,
  adminBatchedBackgroundOperationsListAdminBatchedBackgroundOperations,
  adminBatchedBackgroundOperationsUpdateAdminBatchedBackgroundOperationsRestart,
  adminBatchedBackgroundOperationsUpdateAdminBatchedBackgroundOperationsStop,
];
