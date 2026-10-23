import { usersNotificationSettingsGetGroupsNotificationSettings } from './get-groups-notification-settings';
import { usersNotificationSettingsGetNotificationSettings } from './get-notification-settings';
import { usersNotificationSettingsGetProjectsNotificationSettings } from './get-projects-notification-settings';
import { usersNotificationSettingsUpdateGroupsNotificationSettings } from './update-groups-notification-settings';
import { usersNotificationSettingsUpdateNotificationSettings } from './update-notification-settings';
import { usersNotificationSettingsUpdateProjectsNotificationSettings } from './update-projects-notification-settings';

export const usersNotificationSettingsTools = [
  usersNotificationSettingsGetGroupsNotificationSettings,
  usersNotificationSettingsGetNotificationSettings,
  usersNotificationSettingsGetProjectsNotificationSettings,
  usersNotificationSettingsUpdateGroupsNotificationSettings,
  usersNotificationSettingsUpdateNotificationSettings,
  usersNotificationSettingsUpdateProjectsNotificationSettings,
];
