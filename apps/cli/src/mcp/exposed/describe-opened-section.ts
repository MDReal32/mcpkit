import type { ExposedEntry } from "./exposed-entry";

const toLine = (entry: ExposedEntry) => `- ${entry.name}`;

/** The reply to calling a section: what is inside it and what to do next, written for the model. */
export const describeOpenedSection = (id: string, children: readonly ExposedEntry[]) => {
  const sections = children.filter((child) => child.kind === "section");
  if (sections.length > 0) {
    return [
      `${id} is a section, not a tool. It has ${sections.length} groups, each one another section.`,
      "Call a group (no arguments) to load its tools into the tool list:",
      ...sections.map(toLine),
    ].join("\n");
  }
  if (children.length === 0) {
    return `${id} has no tools.`;
  }
  return [
    `${id}: ${children.length} tools are now in the tool list. Call them by these names:`,
    ...children.map(toLine),
  ].join("\n");
};
