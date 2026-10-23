/** Per server: the provided auth that last worked, tried right after `tokens.json` so rejected entries are not re-sent. */
export const preferredAuthLabels = new Map<string, string>();
