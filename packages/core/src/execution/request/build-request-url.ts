export const buildRequestUrl = (baseUrl: string, path: string, params: Readonly<Record<string, unknown>>) => {
  const url = new URL(baseUrl.replace(/\/$/, '') + path);
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, String(value));
  }
  return url.toString();
};
