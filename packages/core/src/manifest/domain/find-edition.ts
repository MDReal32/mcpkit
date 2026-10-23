import type { Manifest } from "../types/manifest";

export const findEdition = (editions: Manifest["editions"], domain: string) => {
  const host = (domain.split("/")[0] ?? "").split(":")[0]?.toLowerCase() ?? "";
  const match = Object.entries(editions ?? {}).find(([, edition]) =>
    edition.hosts.some((suffix) => host.endsWith(suffix.toLowerCase())),
  );
  return match?.[0];
};
