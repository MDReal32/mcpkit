import type { DomainSource } from "@usemcpkit/core";
import { isDomainValue } from "@usemcpkit/core";

/**
 * The source whose probe asks the typed host its version, as the server picks it: among the sources whose host
 * suffixes the host ends with (or, when none does, the ones that take any host) the first with versions, else the
 * first; none for an invalid host.
 */
export const findHostSource = (sources: readonly DomainSource[], typed: string) => {
  if (!isDomainValue(typed)) {
    return undefined;
  }
  const host = (typed.split(/[/:]/)[0] ?? typed).toLowerCase();
  const hosted = sources.filter((source) => source.hosts?.some((suffix) => host.endsWith(suffix.toLowerCase())));
  const matching = hosted.length > 0 ? hosted : sources.filter((source) => source.hosts === undefined);
  return matching.find((source) => source.versioned) ?? matching[0];
};
