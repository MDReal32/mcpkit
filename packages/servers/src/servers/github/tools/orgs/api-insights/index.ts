import { orgsApiInsightsGetRouteStatsByActor } from "./get-route-stats-by-actor";
import { orgsApiInsightsGetSubjectStats } from "./get-subject-stats";
import { orgsApiInsightsGetSummaryStats } from "./get-summary-stats";
import { orgsApiInsightsGetSummaryStatsByActor } from "./get-summary-stats-by-actor";
import { orgsApiInsightsGetSummaryStatsByUser } from "./get-summary-stats-by-user";
import { orgsApiInsightsGetTimeStats } from "./get-time-stats";
import { orgsApiInsightsGetTimeStatsByActor } from "./get-time-stats-by-actor";
import { orgsApiInsightsGetTimeStatsByUser } from "./get-time-stats-by-user";
import { orgsApiInsightsGetUserStats } from "./get-user-stats";

export const orgsApiInsightsTools = [
  orgsApiInsightsGetRouteStatsByActor,
  orgsApiInsightsGetSubjectStats,
  orgsApiInsightsGetSummaryStats,
  orgsApiInsightsGetSummaryStatsByActor,
  orgsApiInsightsGetSummaryStatsByUser,
  orgsApiInsightsGetTimeStats,
  orgsApiInsightsGetTimeStatsByActor,
  orgsApiInsightsGetTimeStatsByUser,
  orgsApiInsightsGetUserStats,
];
