import { cloudV1AuditCreateAuditRecord } from "./create-audit-record";
import { cloudV1AuditExportAuditRecords } from "./export-audit-records";
import { cloudV1AuditGetAuditRecords } from "./get-audit-records";
import { cloudV1AuditGetAuditRecordsForTimePeriod } from "./get-audit-records-for-time-period";
import { cloudV1AuditGetRetentionPeriod } from "./get-retention-period";
import { cloudV1AuditSetRetentionPeriod } from "./set-retention-period";

export const cloudV1AuditTools = [
  cloudV1AuditCreateAuditRecord,
  cloudV1AuditExportAuditRecords,
  cloudV1AuditGetAuditRecords,
  cloudV1AuditGetAuditRecordsForTimePeriod,
  cloudV1AuditGetRetentionPeriod,
  cloudV1AuditSetRetentionPeriod,
];
