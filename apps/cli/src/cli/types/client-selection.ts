/** How `install`/`uninstall` pick clients: `clients` is a comma-separated id list. */
export interface ClientSelection {
  all: boolean;
  clients?: string;
}
