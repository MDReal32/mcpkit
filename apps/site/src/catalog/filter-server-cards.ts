/** Hides the cards whose id and description do not contain every word of the query; returns how many stay. */
export const filterServerCards = (list: HTMLElement, query: string) => {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  let shown = 0;
  for (const card of list.querySelectorAll<HTMLElement>("[data-server]")) {
    const text = card.dataset.server ?? "";
    const matches = words.every((word) => text.includes(word));
    card.hidden = !matches;
    if (matches) {
      shown += 1;
    }
  }
  return shown;
};
