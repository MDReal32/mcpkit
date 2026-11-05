import type { Manifest } from "../types/manifest";
import { toDomainHost } from "./to-domain-host";

export const findEdition = (editions: Manifest["editions"], domain: string) => {
  const host = toDomainHost(domain);
  const match = Object.entries(editions ?? {}).find(([, edition]) =>
    edition.hosts.some((suffix) => host.endsWith(suffix.toLowerCase())),
  );
  return match?.[0];
};
