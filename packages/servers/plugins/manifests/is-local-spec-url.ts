import { ABSOLUTE_URL_PATTERN } from "./const";

/** A source url without a scheme names a document in the server's own folder. */
export const isLocalSpecUrl = (url: string) => !ABSOLUTE_URL_PATTERN.test(url);
