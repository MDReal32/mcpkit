import type { UploadedFile } from "./uploaded-file";

export const isUploadedFile = (value: unknown): value is UploadedFile =>
  typeof value === "object" && value !== null && "name" in value && "data" in value && value.data instanceof Uint8Array;
