export const readResponseBody = async (response: Response) => {
  const text = await response.text();
  if (!text) {
    return null;
  }
  const isJson = response.headers.get("content-type")?.includes("json") ?? false;
  if (!isJson) {
    return text;
  }
  const parsed: unknown = JSON.parse(text);
  return parsed;
};
