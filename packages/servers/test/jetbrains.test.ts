import { describe, expect, it } from "vitest";
import { servers } from "../src/servers";

const IDES = "clion datagrip dataspell goland intellij phpstorm pycharm rider rubymine rustrover webstorm".split(" ");

const ides = servers.filter((server) => server.category === "orgs/jetbrains");

describe("JetBrains IDE servers", () => {
  it("cover every JetBrains IDE", () => {
    expect(ides.map((server) => server.name).sort()).toEqual(IDES);
  });

  it("reach the IDE's own MCP server on the local port found for it, with no sign-in", () => {
    for (const server of ides) {
      expect(server.auth, server.name).toBeUndefined();
      expect(server.upstream, server.name).toEqual({ type: "http", url: "https://{domain}/stream" });
      expect(server.domain?.loopbackHttp, server.name).toBe(true);
      expect(server.domain?.discover?.host, server.name).toBe("127.0.0.1");
    }
  });

  it("look for the port in the env var, then in the log of each platform", () => {
    const webstorm = servers.find((server) => server.name === "webstorm");
    const [env, log] = webstorm?.domain?.discover?.ports ?? [];

    expect(env).toEqual({ type: "env", name: "IJ_MCP_SERVER_PORT" });
    expect(log?.type === "log" ? log.files : []).toEqual([
      "~/Library/Logs/JetBrains/WebStorm*/idea*.log",
      "~/.cache/JetBrains/WebStorm*/log/idea*.log",
      "~/AppData/Local/JetBrains/WebStorm*/log/idea*.log",
    ]);
  });

  it("read the port from the line the IDE logs when its server starts", () => {
    const [, log] = servers.find((server) => server.name === "webstorm")?.domain?.discover?.ports ?? [];
    const pattern = new RegExp(log?.type === "log" ? log.pattern : "");
    const line =
      "2026-11-25 18:57:11,749 [  10240]   INFO - io.ktor.server.Application - Responding at http://127.0.0.1:64542";

    expect(line.match(pattern)?.[1]).toBe("64542");
  });
});
