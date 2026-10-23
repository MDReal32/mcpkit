export interface EditionPair {
  /** operationId of the Cloud endpoint; its request becomes the `cloud` edition. */
  cloud: string;
  /** operationId of the Data Center endpoint; its request is the default one. */
  dataCenter: string;
}
