import { fillSlot } from "./fill-slot";
import type { CatalogServer } from "./types";

/** Clones the card `<template>` of `server-catalog.astro`; every value goes in as text, never as markup. */
export const renderServerCard = (template: HTMLTemplateElement, server: CatalogServer) => {
  const fragment = template.content.cloneNode(true);
  if (!(fragment instanceof DocumentFragment)) {
    throw new Error("the server card template did not clone into a fragment");
  }
  fillSlot(fragment, "mark", server.displayName.charAt(0).toUpperCase());
  fillSlot(fragment, "category", server.category);
  fillSlot(fragment, "name", server.displayName);
  fillSlot(fragment, "description", server.tagline);
  const card = fragment.querySelector<HTMLElement>("[data-server]");
  if (card) {
    card.dataset.server = `${server.id} ${server.displayName} ${server.description}`.toLowerCase();
  }
  return fragment;
};
