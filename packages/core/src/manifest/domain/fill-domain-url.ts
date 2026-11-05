import { fillDomain } from "./fill-domain";
import { toLoopbackHttpUrl } from "./to-loopback-http-url";

/** A URL template with `{domain}` filled in, over `http://` for a loopback domain when the server allows it (`domain.loopbackHttp`). */
export const fillDomainUrl = (template: string, domain: string, loopbackHttp: boolean) => {
  const url = fillDomain(template, domain);
  return loopbackHttp ? toLoopbackHttpUrl(url, domain) : url;
};
