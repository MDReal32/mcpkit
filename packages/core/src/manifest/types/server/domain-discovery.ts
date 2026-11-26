import type { PortSource } from "./port-source";

/**
 * Finds the domain of a program that picks its port when it starts, such as an IDE's MCP server, so the host needs no
 * question: the domain is `host:port` with the first port a source yields.
 */
export interface DomainDiscovery {
  /** The host the port belongs to, such as `127.0.0.1`. */
  host: string;
  /** Tried in order. */
  ports: readonly PortSource[];
}
