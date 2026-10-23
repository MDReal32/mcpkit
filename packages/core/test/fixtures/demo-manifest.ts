import type { Manifest } from "../../src/main";
import { defineTool, input, number, optional, string } from "../../src/main";

export const DEMO_ENV = { TOKEN: "secret" };

export const listItemsTool = defineTool({
  name: "list_items",
  description: "List items",
  input: input({
    owner: string(),
    state: string("", { default: "open" }),
    page: optional(number()),
  }),
  request: { method: "GET", path: "/owners/{owner}/items", query: { s: "state", page: "page" } },
  response: { root: "data", fields: { id: "id", author: "user.login" } },
});

export const createItemTool = defineTool({
  name: "create_item",
  description: "Create an item",
  input: input({ owner: string(), title: string() }),
  request: { method: "POST", path: "/owners/{owner}/items", body: ["title"] },
});

export const demoManifest: Manifest = {
  name: "demo",
  category: "test",
  version: "1.0.0",
  baseUrl: "https://api.example.com/",
  headers: { Accept: "application/json" },
  tools: [listItemsTool, createItemTool],
};
