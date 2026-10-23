import type { Operation } from "../types/operation";
import { isDownloadResponse } from "./is-download-response";

export const isDownload = (operation: Operation, downloadPaths: readonly RegExp[]) =>
  operation.method === "get" &&
  (isDownloadResponse(operation.spec) || downloadPaths.some((pattern) => pattern.test(operation.path)));
