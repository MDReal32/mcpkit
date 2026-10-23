import { cloudV1AnalyticsTools } from './analytics';
import { cloudV1AuditTools } from './audit';
import { cloudV1ContentTools } from './content';
import { cloudV1ContentStatesTools } from './content-states';
import { cloudV1ContentbodyTools } from './contentbody';
import { cloudV1GroupTools } from './group';
import { cloudV1LabelTools } from './label';
import { cloudV1LongtaskTools } from './longtask';
import { cloudV1RelationTools } from './relation';
import { cloudV1SearchTools } from './search';
import { cloudV1SettingsTools } from './settings';
import { cloudV1SpaceTools } from './space';
import { cloudV1TemplateTools } from './template';
import { cloudV1UserTools } from './user';

export const cloudV1AllTools = [
  ...cloudV1AnalyticsTools,
  ...cloudV1AuditTools,
  ...cloudV1ContentStatesTools,
  ...cloudV1ContentTools,
  ...cloudV1ContentbodyTools,
  ...cloudV1GroupTools,
  ...cloudV1LabelTools,
  ...cloudV1LongtaskTools,
  ...cloudV1RelationTools,
  ...cloudV1SearchTools,
  ...cloudV1SettingsTools,
  ...cloudV1SpaceTools,
  ...cloudV1TemplateTools,
  ...cloudV1UserTools,
];
