import { createHash } from "node:crypto";
import { SUPPORTED_INTEGRITY_ALGORITHMS } from "../const";

/** Checks bytes against a Subresource Integrity string as npm publishes it (`sha512-<base64>`). */
export const verifyIntegrity = (bytes: Uint8Array, integrity: string, label: string) => {
  const hashes = integrity
    .split(/\s+/)
    .map((entry) => entry.split("-"))
    .filter(([algorithm]) => algorithm !== undefined && SUPPORTED_INTEGRITY_ALGORITHMS.includes(algorithm));
  if (hashes.length === 0) {
    throw new Error(`${label}: unsupported integrity "${integrity}"`);
  }
  const matches = hashes.some(
    ([algorithm = "", expected = ""]) => createHash(algorithm).update(bytes).digest("base64") === expected,
  );
  if (!matches) {
    throw new Error(`${label}: download does not match its published integrity`);
  }
};
