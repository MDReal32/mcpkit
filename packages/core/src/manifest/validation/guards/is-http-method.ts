import { HTTP_METHODS } from "../../const";
import type { HttpMethod } from "../../types/tool/http-method";

export const isHttpMethod = (value: unknown): value is HttpMethod => HTTP_METHODS.some((method) => method === value);
