import type { ExposedEntry } from "./exposed-entry";
import type { ExposedSection } from "./exposed-section";

/** What the client sees: every server as a section, plus whatever the model has opened so far. */
export interface ToolExposure {
  /** The entries in catalog order, each opened section followed by what it holds. */
  list: () => readonly ExposedEntry[];
  find: (name: string) => ExposedEntry | undefined;
  /** Loads what is inside `section` once and returns the text the model gets back for calling it. */
  open: (section: ExposedSection) => Promise<string>;
}
