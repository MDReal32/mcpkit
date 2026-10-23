import { adminAuditEventsGetAuditEvents } from "./get-audit-events";
import { adminAuditEventsListAuditEvents } from "./list-audit-events";
import { adminAuditEventsListGroupsAuditEvents } from "./list-groups-audit-events";

export const adminAuditEventsTools = [
  adminAuditEventsGetAuditEvents,
  adminAuditEventsListAuditEvents,
  adminAuditEventsListGroupsAuditEvents,
];
