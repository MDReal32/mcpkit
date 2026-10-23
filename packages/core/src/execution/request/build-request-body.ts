import type { RequestSpec, ToolArgs } from "../../manifest";
import { buildBodyPayload } from "./build-body-payload";
import { buildFormData } from "./build-form-data";
import { MULTIPART_CONTENT_TYPE, NO_HEADERS } from "./const";
import { isUploadedFile } from "./is-uploaded-file";
import type { RequestContent } from "./request-content";
import { serializeBody } from "./serialize-body";

export const buildRequestBody = (spec: RequestSpec, args: ToolArgs, contentType: string) => {
  if (contentType === MULTIPART_CONTENT_TYPE) {
    const form = buildFormData(spec, args);
    return [...form.keys()].length > 0 ? ({ body: form, headers: NO_HEADERS } satisfies RequestContent) : undefined;
  }
  const payload = buildBodyPayload(spec, args);
  if (payload === undefined) {
    return undefined;
  }
  if (isUploadedFile(payload)) {
    return { body: new Blob([payload.data]), headers: { "Content-Type": contentType } } satisfies RequestContent;
  }
  return {
    body: serializeBody(payload, contentType),
    headers: { "Content-Type": contentType },
  } satisfies RequestContent;
};
