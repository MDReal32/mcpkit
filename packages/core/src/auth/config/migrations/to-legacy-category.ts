import { LEGACY_SERVER_CATEGORIES, UNKNOWN_CATEGORY } from "../../const";

/** 3 → 4: `servers.<name>` becomes `servers.<category>.<name>`. */
export const toLegacyCategory = (name: string) => LEGACY_SERVER_CATEGORIES[name] ?? UNKNOWN_CATEGORY;
