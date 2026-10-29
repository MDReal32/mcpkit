import { applicationsEntitlementsConsumeEntitlement } from "./consume-entitlement";
import { applicationsEntitlementsCreateEntitlement } from "./create-entitlement";
import { applicationsEntitlementsDeleteEntitlement } from "./delete-entitlement";
import { applicationsEntitlementsGetEntitlement } from "./get-entitlement";
import { applicationsEntitlementsGetEntitlements } from "./get-entitlements";

export const applicationsEntitlementsTools = [
  applicationsEntitlementsConsumeEntitlement,
  applicationsEntitlementsCreateEntitlement,
  applicationsEntitlementsDeleteEntitlement,
  applicationsEntitlementsGetEntitlement,
  applicationsEntitlementsGetEntitlements,
];
