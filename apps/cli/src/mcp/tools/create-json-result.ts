import { createTextResult } from "./create-text-result";

export const createJsonResult = (value: unknown) => createTextResult(JSON.stringify(value, null, 2));
