import { adminOfflineTransfersCreateOfflineExports } from "./create-offline-exports";
import { adminOfflineTransfersCreateOfflineImports } from "./create-offline-imports";
import { adminOfflineTransfersGetOfflineExports } from "./get-offline-exports";
import { adminOfflineTransfersListOfflineExports } from "./list-offline-exports";

export const adminOfflineTransfersTools = [
  adminOfflineTransfersCreateOfflineExports,
  adminOfflineTransfersCreateOfflineImports,
  adminOfflineTransfersGetOfflineExports,
  adminOfflineTransfersListOfflineExports,
];
