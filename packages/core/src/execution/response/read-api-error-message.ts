import { isJsonObject } from "../../json";

export const readApiErrorMessage = (body: unknown) => {
  if (isJsonObject(body) && "message" in body) {
    return String(body.message);
  }
  return body == null ? "" : String(body);
};
