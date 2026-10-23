import { fillTemplate, readPlaceholders } from "../../manifest";
import { UI_DOMAIN_PLACEHOLDERS } from "../../manifest/ui/const";
import { toWebHost } from "./to-web-host";

/** Undefined while the link needs a domain and there is none yet. */
export const resolveLinkUrl = (url: string, domain: string | undefined) => {
  const needsDomain = readPlaceholders(url).some((name) => UI_DOMAIN_PLACEHOLDERS.includes(name));
  if (needsDomain && !domain) {
    return undefined;
  }
  return fillTemplate(url, { domain: domain ?? "", webHost: domain ? toWebHost(domain) : "" });
};
