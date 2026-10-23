import type { SyncReport } from "../../registry";

export const describeSyncReport = ({ servers, refreshed, failed }: SyncReport) => [
  `${servers} server(s) in the registry`,
  ...refreshed.map((id) => `updated ${id}`),
  ...failed.map(({ id, error }) => `failed ${id}: ${error}`),
];
