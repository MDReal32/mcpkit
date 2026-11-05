import { WEB_HOST_API_PREFIX } from "./const";

/** `api.github.com` → `github.com`, `api.acme.ghe.com` → `acme.ghe.com`, `ghe.example.com/api/v3` → `ghe.example.com`. */
export const toWebHost = (domain: string) => {
  const [host = domain, ...path] = domain.split("/");
  if (path.length === 0 && host.startsWith(WEB_HOST_API_PREFIX)) {
    return host.slice(WEB_HOST_API_PREFIX.length);
  }
  return host;
};
