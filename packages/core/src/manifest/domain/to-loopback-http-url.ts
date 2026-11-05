import { HTTP_PREFIX, HTTPS_PREFIX, LOOPBACK_HOSTS } from "../const";
import { toDomainHost } from "./to-domain-host";

/**
 * `https://localhost:5678/api/v1` → `http://localhost:5678/api/v1` when the URL points at `domain` and that domain is
 * a loopback host; any other URL is returned as is.
 */
export const toLoopbackHttpUrl = (url: string, domain: string) => {
  const host = toDomainHost(domain);
  if (!LOOPBACK_HOSTS.includes(host) || !url.startsWith(HTTPS_PREFIX)) {
    return url;
  }
  const rest = url.slice(HTTPS_PREFIX.length);
  return toDomainHost(rest) === host ? `${HTTP_PREFIX}${rest}` : url;
};
