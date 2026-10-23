import { SERVER_ID_PATTERN } from "../const";

export const parseServerId = (id: string) => {
  if (!SERVER_ID_PATTERN.test(id)) {
    return undefined;
  }
  const [category = "", name = ""] = id.split(":");
  return { category, name };
};
