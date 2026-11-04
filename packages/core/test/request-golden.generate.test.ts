import { readFileSync, writeFileSync } from "node:fs";
import { writeFile } from "node:fs/promises";
import { join } from "node:path";
import { useTempDir } from "@usemcpkit/testing";
import { it } from "vitest";
import type { ResolvedAuth } from "../src/auth";
import { buildRequest, prepareToolArgs } from "../src/execution";
import { loadFileArgs } from "../src/execution/request/load-file-args";
import { isJsonObject } from "../src/json";
import type { Manifest, ToolArgs, ToolSpec } from "../src/manifest";
import { toNameMapping } from "../src/manifest";
import { applyDomain } from "../src/manifest/domain/apply-domain";

const REGISTRY = join(__dirname, "../../servers/build/manifests");
const OUTPUT = process.env.REQUEST_GOLDEN_OUTPUT ?? "";

/** Read from the folder the Rust test writes them to, so both sides send the same bytes. */
const UPLOADS: Readonly<Record<string, Uint8Array>> = {
  "upload.txt": new TextEncoder().encode("hello é\n"),
  "second.bin": new Uint8Array([0, 1, 2, 255]),
};

const DOMAINS: Readonly<Record<string, readonly string[]>> = {
  "atlassian:confluence": ["acme.atlassian.net", "wiki.example.com/confluence"],
  "atlassian:jira": ["acme.atlassian.net", "jira.example.com/jira"],
  "git:github": ["api.github.com", "ghe.example.com/api/v3"],
  "git:gitlab": ["gitlab.com", "git.example.com/gitlab"],
};

const AUTHS: readonly ResolvedAuth[] = [
  { headers: { Authorization: "Bearer token-1" }, query: {} },
  { headers: {}, query: { api_key: "key a/é" } },
];

const CASES_PER_FEATURE = 2;

const SAMPLE_STRING = "a/é'()*!,~ ?#&=+";

interface Feature {
  name: string;
  matches: (tool: ToolSpec) => boolean;
}

interface Schema {
  type?: string | string[];
  enum?: unknown[];
  const?: unknown;
  oneOf?: Schema[];
  anyOf?: Schema[];
  items?: Schema;
  properties?: Record<string, Schema>;
  required?: string[];
  default?: unknown;
}

interface GoldenCase {
  server: string;
  feature: string;
  domain: string | null;
  tool: ToolSpec;
  args: ToolArgs;
  auth: ResolvedAuth;
  request: unknown;
}

const readJson = (path: string): unknown => JSON.parse(readFileSync(join(REGISTRY, path), "utf8"));

const propertiesOf = (tool: ToolSpec): Record<string, Schema> => {
  const properties = tool.input.properties;
  return isJsonObject(properties) ? (properties as Record<string, Schema>) : {};
};

const outgoingKeys = (spec: ToolSpec["request"]["body"]) => (spec ? Object.keys(toNameMapping(spec)) : []);

const hasArrayQuery = (tool: ToolSpec) => {
  const query = tool.request.query;
  if (!query) {
    return false;
  }
  const properties = propertiesOf(tool);
  return Object.values(toNameMapping(query)).some((argName) => properties[argName]?.type === "array");
};

const FEATURES: readonly Feature[] = [
  { name: "get", matches: (tool) => tool.request.method === "GET" },
  { name: "post", matches: (tool) => tool.request.method === "POST" },
  { name: "put", matches: (tool) => tool.request.method === "PUT" },
  { name: "patch", matches: (tool) => tool.request.method === "PATCH" },
  { name: "delete", matches: (tool) => tool.request.method === "DELETE" },
  { name: "path-params", matches: (tool) => tool.request.path.includes("{") },
  { name: "comma-query", matches: (tool) => (tool.request.commaQuery?.length ?? 0) > 0 },
  { name: "array-query", matches: hasArrayQuery },
  { name: "bracket-query", matches: (tool) => outgoingKeys(tool.request.query).some((key) => key.endsWith("[]")) },
  { name: "body-arg", matches: (tool) => tool.request.bodyArg !== undefined },
  { name: "text-body", matches: (tool) => tool.request.contentType?.startsWith("text/") ?? false },
  { name: "json-patch", matches: (tool) => tool.request.contentType?.includes("json-patch") ?? false },
  { name: "octet-stream", matches: (tool) => tool.request.contentType === "application/octet-stream" },
  { name: "multipart", matches: (tool) => tool.request.contentType === "multipart/form-data" },
  { name: "dotted-body", matches: (tool) => outgoingKeys(tool.request.body).some((key) => key.includes(".")) },
  {
    name: "numeric-body",
    matches: (tool) => outgoingKeys(tool.request.body).some((key) => /\.\d+(\.|$)/.test(key)),
  },
  { name: "file-args", matches: (tool) => (tool.request.fileArgs?.length ?? 0) > 0 },
  { name: "save-to", matches: (tool) => tool.request.saveToArg !== undefined },
  { name: "fixed-query", matches: (tool) => tool.request.fixedQuery !== undefined },
  { name: "fixed-headers", matches: (tool) => tool.request.fixedHeaders !== undefined },
  { name: "fixed-body", matches: (tool) => tool.request.fixedBody !== undefined },
  { name: "defaults", matches: (tool) => Object.values(propertiesOf(tool)).some((schema) => "default" in schema) },
  { name: "editions", matches: (tool) => tool.editions !== undefined },
];

/** The return type is declared because TypeScript cannot infer it for this recursive function. */
const sampleValue = (schema: Schema, name: string, depth: number): unknown => {
  if (schema.enum && schema.enum.length > 0) {
    return schema.enum[0];
  }
  if (schema.const !== undefined) {
    return schema.const;
  }
  const variant = schema.oneOf?.[0] ?? schema.anyOf?.[0];
  if (variant) {
    return sampleValue(variant, name, depth);
  }
  const type = Array.isArray(schema.type) ? schema.type.find((candidate) => candidate !== "null") : schema.type;
  switch (type) {
    case "integer":
      return 7;
    case "number":
      return 2.5;
    case "boolean":
      return true;
    case "array":
      return [
        sampleValue(schema.items ?? {}, `${name}1`, depth + 1),
        sampleValue(schema.items ?? {}, `${name}2`, depth + 1),
      ];
    case "object":
      if (depth > 2 || !schema.properties) {
        return { key: `${name} value`, count: 1 };
      }
      return Object.fromEntries(
        Object.entries(schema.properties).map(([key, property]) => [key, sampleValue(property, key, depth + 1)]),
      );
    default:
      return `${name} ${SAMPLE_STRING}`;
  }
};

/** Every argument without a schema default, so the defaults are filled in by the executor. */
const sampleArgs = (tool: ToolSpec) => {
  const fileArgs = tool.request.fileArgs ?? [];
  const sampleArg = (name: string, schema: Schema) => {
    if (!fileArgs.includes(name)) {
      return sampleValue(schema, name, 0);
    }
    return schema.type === "array" ? ["upload.txt", "second.bin"] : "upload.txt";
  };
  return Object.fromEntries(
    Object.entries(propertiesOf(tool))
      .filter(([, schema]) => !("default" in schema))
      .map(([name, schema]) => [name, sampleArg(name, schema)]),
  );
};

const toLocalPath = (dir: string, value: unknown) =>
  Array.isArray(value) ? value.map((name) => join(dir, String(name))) : join(dir, String(value));

const toFixtureBody = async (body: string | FormData | Blob | undefined) => {
  if (body === undefined) {
    return undefined;
  }
  if (typeof body === "string") {
    return { text: body };
  }
  if (body instanceof FormData) {
    const parts = [];
    for (const [name, value] of body.entries()) {
      parts.push({
        name,
        value:
          typeof value === "string"
            ? { text: value }
            : { file: { fileName: value.name, data: [...new Uint8Array(await value.arrayBuffer())] } },
      });
    }
    return { form: parts };
  }
  return { bytes: [...new Uint8Array(await body.arrayBuffer())] };
};

const readServerTools = (id: string) => {
  const shell = readJson(`${id.replace(":", "/")}.json`) as Manifest & { parts?: { name: string }[] };
  const { parts = [], ...manifest } = shell;
  const partTools = parts.flatMap(
    (part) => (readJson(`${id.replace(":", "/")}/${part.name}.json`) as { tools: ToolSpec[] }).tools,
  );
  return { manifest: { ...manifest, tools: [] } satisfies Manifest, tools: [...(manifest.tools ?? []), ...partTools] };
};

const tempDir = useTempDir("usemcpkit-request-golden-");

/**
 * Writes `crates/execution/tests/fixtures/requests.json`, which the Rust executor's request test rebuilds: for each
 * server that is not an upstream, the first tools showing each request feature, called with arguments sampled from
 * their schema, and the request the TypeScript executor builds for them.
 */
it.skipIf(OUTPUT === "")("writes the built request golden file", async () => {
  const dir = tempDir();
  for (const [name, data] of Object.entries(UPLOADS)) {
    await writeFile(join(dir, name), data);
  }
  const index = readJson("index.json") as { servers: { id: string; upstream?: unknown }[] };
  const manifests: Record<string, Manifest> = {};
  const cases: GoldenCase[] = [];
  for (const server of index.servers) {
    if (server.upstream) {
      continue;
    }
    const { manifest, tools } = readServerTools(server.id);
    manifests[server.id] = manifest;
    const domains = DOMAINS[server.id] ?? [undefined];
    const picked = new Set<string>();
    for (const feature of FEATURES) {
      const matching = tools.filter((tool) => feature.matches(tool) && !picked.has(tool.name));
      for (const tool of matching.slice(0, CASES_PER_FEATURE)) {
        picked.add(tool.name);
        const caseDomains = feature.name === "editions" ? domains : [domains[cases.length % domains.length]];
        for (const domain of caseDomains) {
          const auth = AUTHS[cases.length % AUTHS.length] ?? AUTHS[0];
          const resolved = applyDomain({ ...manifest, tools: [tool] }, domain);
          const resolvedTool = resolved.tools[0];
          if (!auth || !resolvedTool) {
            throw new Error(`nothing to build for ${server.id} ${tool.name}`);
          }
          const args = sampleArgs(tool);
          const localArgs = Object.fromEntries(
            Object.entries(args).map(([argName, value]) => [
              argName,
              (tool.request.fileArgs ?? []).includes(argName) ? toLocalPath(dir, value) : value,
            ]),
          );
          const prepared = prepareToolArgs(resolvedTool, localArgs);
          const request = buildRequest(resolved, resolvedTool, await loadFileArgs(resolvedTool, prepared), auth);
          cases.push({
            server: server.id,
            feature: feature.name,
            domain: domain ?? null,
            tool,
            args,
            auth,
            request: { ...request, body: await toFixtureBody(request.body) },
          });
        }
      }
    }
  }
  const uploads = Object.fromEntries(Object.entries(UPLOADS).map(([name, data]) => [name, [...data]]));
  writeFileSync(OUTPUT, `${JSON.stringify({ uploads, manifests, cases }, null, 1)}\n`);
});
