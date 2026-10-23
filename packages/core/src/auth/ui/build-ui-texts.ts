import type { Manifest, UiTexts } from "../../manifest";
import { DEFAULT_UI_TEXTS, fillTemplate } from "../../manifest";
import { UI_TEXT_KEYS } from "../../manifest/ui/const";

/** The manifest's texts over the defaults, with the server's name filled in. */
export const buildUiTexts = (manifest: Manifest) => {
  const merged: UiTexts = { ...DEFAULT_UI_TEXTS, ...manifest.ui?.texts };
  const texts: UiTexts = { ...merged };
  for (const key of UI_TEXT_KEYS) {
    texts[key] = fillTemplate(merged[key], { server: manifest.name });
  }
  return texts;
};
