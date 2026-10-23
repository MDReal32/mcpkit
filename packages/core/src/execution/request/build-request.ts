import type { ResolvedAuth } from "../../auth";
import type { Manifest, ToolArgs, ToolSpec } from "../../manifest";
import type { HttpRequest } from "../response/http-request";
import { buildRequestBody } from "./build-request-body";
import { buildRequestUrl } from "./build-request-url";
import { collectArgs } from "./collect-args";
import { JSON_CONTENT_TYPE } from "./const";
import { fillPath } from "./fill-path";

/** Expects args already passed through prepareToolArgs and loadFileArgs. */
export const buildRequest = (manifest: Manifest, tool: ToolSpec, args: ToolArgs, auth: ResolvedAuth) => {
  const { method, path, query, fixedQuery, fixedHeaders, commaQuery, contentType = JSON_CONTENT_TYPE } = tool.request;
  const content = method === "GET" ? undefined : buildRequestBody(tool.request, args, contentType);
  const params = { ...fixedQuery, ...collectArgs(query, args), ...auth.query };
  const request: HttpRequest = {
    url: buildRequestUrl(manifest.baseUrl, fillPath(path, args), params, commaQuery),
    method,
    headers: { ...manifest.headers, ...fixedHeaders, ...auth.headers, ...content?.headers },
    ...(content ? { body: content.body } : {}),
  };
  return request;
};
