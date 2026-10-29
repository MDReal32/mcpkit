import type { ExposedTool } from "../exposed";

export type ExposedToolsLoader = () => Promise<readonly ExposedTool[]>;
