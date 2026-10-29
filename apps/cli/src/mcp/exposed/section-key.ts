import { TOOL_ID_SEPARATOR } from "../tools/const";
import type { ExposedSection } from "./exposed-section";

export const sectionKey = ({ serverId, group }: Pick<ExposedSection, "serverId" | "group">) =>
  group === undefined ? serverId : `${serverId}${TOOL_ID_SEPARATOR}${group}`;
