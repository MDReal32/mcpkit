import { writeFileSync } from "node:fs";
import { it } from "vitest";
import { formatTomlValue } from "../src/config/format-toml-value";
import { hasJsonEntry } from "../src/config/has-json-entry";
import { hasTomlTable } from "../src/config/has-toml-table";
import { parseJsonConfig } from "../src/config/parse-json-config";
import { removeJsonEntry } from "../src/config/remove-json-entry";
import { removeTomlTable } from "../src/config/remove-toml-table";
import { upsertJsonEntry } from "../src/config/upsert-json-entry";
import { upsertTomlTable } from "../src/config/upsert-toml-table";

const OUTPUT = process.env.CONFIG_EDITS_GOLDEN_OUTPUT ?? "";

const NAME = "usemcpkit";
const PATH = "config.json";
const ENTRY = { type: "stdio", command: "C:\\Program Files\\usemcpkit\\usemcpkit.exe", args: ["serve"] };
const OTHER_ENTRY = {
  type: "local",
  command: ["/opt/usemcpkit", "serve"],
  enabled: true,
  n: 1.5,
  label: 'ü€😀\u2028"',
};
const TOML_ENTRY = { command: "C:\\usemcpkit.exe", args: ["serve", "--x"], enabled: true, n: 1.5 };

const outcome = (run: () => unknown) => {
  try {
    return { value: run() };
  } catch (error) {
    return { error: (error as Error).message };
  }
};

const COMMENTED =
  '{\n  // line comment\n  "theme": "dark", /* block */\n  "mcpServers": {\n    "other": { "command": "x" } // same line\n  }\n}\n';

const JSON_CASES: [string, string, string[]?][] = [
  ["comments", COMMENTED],
  ["trailing commas", '{\n  "mcpServers": {\n    "other": {},\n  },\n}\n'],
  ["crlf", COMMENTED.replaceAll("\n", "\r\n")],
  ["tabs", '{\n\t"mcpServers": {\n\t\t"other": {}\n\t}\n}'],
  ["four spaces", '{\n    "theme": "dark",\n    "mcpServers": {\n        "other": {}\n    }\n}\n'],
  ["empty", ""],
  ["whitespace only", "   \n  "],
  ["empty object", "{}"],
  ["bom object", "\uFEFF{}"],
  ["bom only", "\uFEFF"],
  ["no servers", '{ "theme": "dark" }'],
  ["empty servers", '{ "mcpServers": {} }'],
  ["replace", '{\n  "mcpServers": {\n    "usemcpkit": { "command": "old" },\n    "other": {}\n  }\n}'],
  ["last with trailing comma", '{ "mcpServers": { "a": 1, "usemcpkit": {}, } }'],
  ["only entry", '{\n  "mcpServers": {\n    "usemcpkit": {\n      "command": "old"\n    }\n  }\n}\n'],
  ["first of several", '{\n  "mcpServers": {\n    "usemcpkit": {},\n    "b": {}\n  }\n}\n'],
  ["middle", '{\n  "mcpServers": {\n    "a": {},\n    "usemcpkit": {},\n    "b": {}\n  }\n}\n'],
  ["vscode", '{\n  "inputs": [],\n  "servers": {}\n}', ["servers"]],
  ["zed one line", '{"theme":"One Dark","context_servers":{"other":{"command":"x"}}}', ["context_servers"]],
  ["servers number", '{ "mcpServers": 1 }'],
  ["servers array", '{ "mcpServers": [] }'],
  ["root array", "[]"],
  ["root string", '"x"'],
  ["duplicate servers, entry in last", '{ "mcpServers": { "other": {} }, "mcpServers": { "usemcpkit": {} } }'],
  ["duplicate servers, entry in first", '{ "mcpServers": { "usemcpkit": {} }, "mcpServers": { "other": {} } }'],
  ["non-ascii", '{\n  "név": "ü€😀",\n  "mcpServers": {\n    "ü": "€"\n  }\n}\n'],
  ["comment after brace", '{ // c\n  "mcpServers": { /* in */ }\n}'],
  ["one line with more", '{"mcpServers": {"other": {}}, "x": 1}'],
  ["entry with escapes", '{ "mcpServers": { "mcp\\u006bit": {} } }'],
  ["nested arrays and numbers", '{\n  "a": [1, 2.5e3, -0, true, null, { "b": [] }],\n  "mcpServers": {}\n}\n'],
  ["comment at end", '{\n  "mcpServers": {}\n}\n// done\n'],
  ["block comment lines", '{\n  /*\n   * many\n   */\n  "mcpServers": {\n  }\n}'],
  ["broken", "{ broken"],
  ["comma expected", '{ "a": 1 "b": 2 }'],
  ["colon expected", '{ "a" 1 }'],
  ["value expected", '{ "a": }'],
  ["close bracket expected", "[1, 2"],
  ["close brace expected", '{ "a": 1'],
  ["end of file expected", "{} {}"],
  ["invalid symbol after", '{ "a": 1 } x'],
  ["invalid escape", '{ "a": "\\x" }'],
  ["invalid unicode", '{ "a": "\\u12" }'],
  ["open comment", "/* open"],
  ["open string", '{ "a": "open'],
  ["string broken by a line", '{ "a": "open\n" }'],
  ["end of number", '{ "a": 1. }'],
  ["end of exponent", '{ "a": 1e }'],
  ["control character", '{ "a": "tab\there" }'],
  ["leading zero", '{ "a": 01 }'],
  ["lone minus", '{ "a": -x }'],
  ["bad keyword", '{ "a": tru }'],
  ["only a comment", "// nothing"],
  ["astral before error", '{ "😀😀": 1 2 }'],
  ["property name expected", "{ 1: 2 }"],
  ["leading comma", "{ , }"],
];

const TOML_CASES: [string, string][] = [
  ["empty", ""],
  ["append", 'model = "o3" # pick\n\n[mcp_servers.other]\ncommand = "x"\n'],
  ["replace with trailing blank", '[mcp_servers.usemcpkit]\ncommand = "old"\n\n[profiles.x]\nmodel = "y"\n'],
  ["replace without trailing blank", '[mcp_servers.usemcpkit]\ncommand = "old"\n[profiles.x]\n'],
  [
    "subtables",
    '[mcp_servers.usemcpkit]\ncommand = "old"\n\n[mcp_servers.usemcpkit.env]\nA = "1"\n\n[profiles.x]\nmodel = "y"\n',
  ],
  ["inline under servers", '[mcp_servers]\nusemcpkit = { command = "x" }\n'],
  ["inline dotted", 'mcp_servers.usemcpkit = { command = "x" }\n'],
  ["inline across lines", "a = 1\nmcp_servers.usemcpkit\n=\n{ }\n"],
  ["crlf", '[mcp_servers.usemcpkit]\r\ncommand = "old"\r\n\r\n[other]\r\n'],
  ["header comment", '[mcp_servers.usemcpkit] # note\ncommand = "old"\n'],
  ["crlf header comment", '[mcp_servers.usemcpkit] # note\r\ncommand = "old"\r\n'],
  ["spaced header", '[ mcp_servers . usemcpkit ]\ncommand = "old"\n'],
  ["no final newline", 'a = 1\n[mcp_servers.usemcpkit]\ncommand = "old"'],
  ["blank tail", "a = 1\n\n\n   \n"],
  ["array of tables", "[[mcp_servers.usemcpkit]]\ncommand = 1\n"],
  ["indented header", '  [mcp_servers.usemcpkit]\n  command = "old"\n'],
  ["other header first", "[mcp_servers.usemcpkitx]\na = 1\n"],
  ["bom", '\uFEFF[mcp_servers.usemcpkit]\ncommand = "old"\n'],
];

const TOML_VALUES = [["a", 1, true], {}, null, 'ü\n"', 1e21, [[1], []]];

/**
 * Writes `crates/clients/tests/fixtures/config-edits.json`, which the Rust config editing tests compare against: how
 * each JSONC text parses and what adding, replacing and removing the `usemcpkit` entry gives, the same for Codex TOML,
 * and how TOML values are written.
 */
it.skipIf(OUTPUT === "")("writes the config edit golden file", () => {
  const json = JSON_CASES.map(([name, text, serversPath = ["mcpServers"]]) => {
    const parse = outcome(() => hasJsonEntry(parseJsonConfig(text, PATH), serversPath, NAME));
    if (!("value" in parse)) {
      return { name, text, serversPath, parse };
    }
    return {
      name,
      text,
      serversPath,
      parse,
      upsert: outcome(() => upsertJsonEntry(text, serversPath, NAME, ENTRY)),
      upsertOther: outcome(() => upsertJsonEntry(text, serversPath, NAME, OTHER_ENTRY)),
      remove: outcome(() => removeJsonEntry(text, serversPath, NAME)),
    };
  });
  const toml = TOML_CASES.map(([name, text]) => ({
    name,
    text,
    has: hasTomlTable(text, ["mcp_servers"], NAME),
    upsert: outcome(() => upsertTomlTable(text, ["mcp_servers"], NAME, TOML_ENTRY, "config.toml")),
    remove: removeTomlTable(text, ["mcp_servers"], NAME),
  }));
  const tomlValues = TOML_VALUES.map((value) => ({ value, formatted: outcome(() => formatTomlValue(value)) }));
  const golden = { entry: ENTRY, otherEntry: OTHER_ENTRY, tomlEntry: TOML_ENTRY, json, toml, tomlValues };
  writeFileSync(OUTPUT, `${JSON.stringify(golden, null, 2)}\n`);
});
