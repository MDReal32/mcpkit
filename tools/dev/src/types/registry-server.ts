export interface RegistryServer {
  url: string;
  close: () => Promise<void>;
}
