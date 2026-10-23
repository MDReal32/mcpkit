import type { HttpMethod } from "../../manifest";

export interface HttpRequest {
  url: string;
  method: HttpMethod;
  headers: Readonly<Record<string, string>>;
  body?: string;
}
