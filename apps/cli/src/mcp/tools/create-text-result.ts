import { createTextContent } from "../rpc/create-text-content";

export const createTextResult = (text: string, isError = false) => ({
  content: createTextContent(text),
  ...(isError ? { isError } : {}),
});
