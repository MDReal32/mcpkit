export const buildRequestUrl = (
  baseUrl: string,
  path: string,
  params: Readonly<Record<string, unknown>>,
  commaKeys: readonly string[] = [],
) => {
  const url = new URL(baseUrl.replace(/\/$/, "") + path);
  for (const [key, value] of Object.entries(params)) {
    if (!Array.isArray(value) || commaKeys.includes(key)) {
      url.searchParams.set(key, String(value));
      continue;
    }
    for (const item of value) {
      url.searchParams.append(key, String(item));
    }
  }
  return url.toString();
};
