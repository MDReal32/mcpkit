import { createHash } from "node:crypto";
import { HASH_LENGTH } from "./const";

export const hashText = (text: string) => createHash("sha256").update(text).digest("hex").slice(0, HASH_LENGTH);
