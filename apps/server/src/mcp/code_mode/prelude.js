(host) => {
  const unwrap = (reply) => {
    const parsed = JSON.parse(reply);
    if ("error" in parsed) {
      throw new Error(parsed.error);
    }
    return parsed.value;
  };
  const show = (value) => (typeof value === "string" ? value : (JSON.stringify(value) ?? String(value)));
  const log = (...values) => host.log(values.map(show).join(" "));
  globalThis.codemode = Object.freeze({
    servers: async () => unwrap(host.servers()),
    groups: async (server) => unwrap(await host.groups(String(server))),
    tools: async (server, group) => unwrap(await host.tools(String(server), group == null ? null : String(group))),
    call: async (id, args) => unwrap(await host.call(String(id), JSON.stringify(args ?? {}))),
  });
  globalThis.console = Object.freeze({ log, info: log, warn: log, error: log, debug: log });
};
