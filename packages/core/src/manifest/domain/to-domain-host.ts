/** The lowercase host of a domain value: what comes before its path and port. */
export const toDomainHost = (domain: string) => (domain.split("/")[0] ?? "").split(":")[0]?.toLowerCase() ?? "";
