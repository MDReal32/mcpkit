import type { EnvPortSource } from "./env-port-source";
import type { LogPortSource } from "./log-port-source";

export type PortSource = EnvPortSource | LogPortSource;
