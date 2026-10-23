import { metaLicensesGet } from "./get";
import { metaLicensesGetAllCommonlyUsed } from "./get-all-commonly-used";
import { metaLicensesGetForRepo } from "./get-for-repo";

export const metaLicensesTools = [metaLicensesGet, metaLicensesGetAllCommonlyUsed, metaLicensesGetForRepo];
