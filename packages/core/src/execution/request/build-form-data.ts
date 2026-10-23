import type { RequestSpec, ToolArgs } from "../../manifest";
import { collectArgs } from "./collect-args";
import { isUploadedFile } from "./is-uploaded-file";

const toFieldValue = (value: unknown) => (typeof value === "object" ? JSON.stringify(value) : String(value));

export const buildFormData = ({ body, fixedBody }: RequestSpec, args: ToolArgs) => {
  const form = new FormData();
  for (const [key, value] of Object.entries({ ...fixedBody, ...collectArgs(body, args) })) {
    const files = [value].flat().filter(isUploadedFile);
    if (files.length > 0) {
      for (const file of files) {
        form.append(key, new Blob([file.data]), file.name);
      }
      continue;
    }
    form.append(key, toFieldValue(value));
  }
  return form;
};
