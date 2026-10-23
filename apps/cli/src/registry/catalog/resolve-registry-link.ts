import type { RegistryContext } from "../types/registry-context";

export const resolveRegistryLink = ({ registryUrl }: RegistryContext, link: string) =>
  new URL(link, `${registryUrl.replace(/\/$/, "")}/`).href;
