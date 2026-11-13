import type { DomainSource } from "@usemcpkit/core";
import { isDomainValue } from "@usemcpkit/core";

/** The first source whose host suffixes the typed host ends with, or that takes any host; none for an invalid host. */
export const findHostSource = (sources: readonly DomainSource[], typed: string) => {
  if (!isDomainValue(typed)) {
    return undefined;
  }
  const host = (typed.split(/[/:]/)[0] ?? typed).toLowerCase();
  return sources.find(
    (source) => source.hosts === undefined || source.hosts.some((suffix) => host.endsWith(suffix.toLowerCase())),
  );
};
