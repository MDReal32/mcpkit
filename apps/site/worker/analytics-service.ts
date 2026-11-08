/** The service binding to the `mcpkit` analytics Worker, which no longer has a public route of its own. */
export interface AnalyticsService {
  fetch: (request: Request) => Promise<Response>;
}
