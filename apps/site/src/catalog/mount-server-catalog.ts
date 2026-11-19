import { describeError } from "./describe-error";
import { fetchCatalogServers } from "./fetch-catalog-servers";
import { filterServerCards } from "./filter-server-cards";
import { renderServerCard } from "./render-server-card";
import type { CatalogElements } from "./types";

/** Fetches `index.json` and fills the catalog; a failed load shows its reason and a retry button, never stale data. */
export const mountServerCatalog = async (elements: CatalogElements, indexUrl: string) => {
  elements.root.dataset.state = "loading";
  elements.list.replaceChildren();
  try {
    const servers = await fetchCatalogServers(indexUrl);
    for (const server of servers) {
      elements.list.append(renderServerCard(elements.template, server));
    }
    elements.count.textContent = String(servers.length);
    elements.root.dataset.state = servers.length > 0 ? "ready" : "empty";
    filterServerCards(elements.list, elements.search.value);
  } catch (error) {
    elements.error.textContent = describeError(error);
    elements.root.dataset.state = "error";
  }
};
