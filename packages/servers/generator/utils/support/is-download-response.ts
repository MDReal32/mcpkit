import type { OpenApiOperation } from "../types/open-api-operation";

const isReadableType = (contentType: string) =>
  contentType.includes("json") || contentType.startsWith("text/") || contentType.includes("xml");

export const isDownloadResponse = ({ responses }: OpenApiOperation) => {
  const success = Object.entries(responses ?? {}).find(([status]) => status.startsWith("2"));
  const types = Object.keys(success?.[1].content ?? {});
  return types.length > 0 && !types.some(isReadableType);
};
