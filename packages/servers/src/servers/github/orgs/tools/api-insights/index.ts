import { apiInsightsGetRouteStatsByActor } from './get-route-stats-by-actor';
import { apiInsightsGetSubjectStats } from './get-subject-stats';
import { apiInsightsGetSummaryStats } from './get-summary-stats';
import { apiInsightsGetSummaryStatsByActor } from './get-summary-stats-by-actor';
import { apiInsightsGetSummaryStatsByUser } from './get-summary-stats-by-user';
import { apiInsightsGetTimeStats } from './get-time-stats';
import { apiInsightsGetTimeStatsByActor } from './get-time-stats-by-actor';
import { apiInsightsGetTimeStatsByUser } from './get-time-stats-by-user';
import { apiInsightsGetUserStats } from './get-user-stats';

export const apiInsightsTools = [
  apiInsightsGetRouteStatsByActor,
  apiInsightsGetSubjectStats,
  apiInsightsGetSummaryStats,
  apiInsightsGetSummaryStatsByActor,
  apiInsightsGetSummaryStatsByUser,
  apiInsightsGetTimeStats,
  apiInsightsGetTimeStatsByActor,
  apiInsightsGetTimeStatsByUser,
  apiInsightsGetUserStats,
];
