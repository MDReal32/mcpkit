import { fillTemplate, readPlaceholders, toLoopbackHttpUrl, UI_DOMAIN_PLACEHOLDERS } from "../manifest";
import { toWebHost } from "./to-web-host";

/** Undefined while the link needs a domain and there is none yet; with `loopbackHttp` a link to a loopback domain opens over `http://`. */
export const resolveLinkUrl = (url: string, domain: string | undefined, loopbackHttp: boolean) => {
  const needsDomain = readPlaceholders(url).some((name) => UI_DOMAIN_PLACEHOLDERS.includes(name));
  if (needsDomain && !domain) {
    return undefined;
  }
  const filled = fillTemplate(url, { domain: domain ?? "", webHost: domain ? toWebHost(domain) : "" });
  return domain && loopbackHttp ? toLoopbackHttpUrl(filled, domain) : filled;
};
