import { usersSearchGetAdminSearchMigrations } from './get-admin-search-migrations';
import { usersSearchGetGroupsSearch } from './get-groups-search';
import { usersSearchGetProjectsSearch } from './get-projects-search';
import { usersSearchGetProjectsSearchSemantic } from './get-projects-search-semantic';
import { usersSearchGetSearch } from './get-search';
import { usersSearchListAdminSearchMigrations } from './list-admin-search-migrations';

export const usersSearchTools = [
  usersSearchGetAdminSearchMigrations,
  usersSearchGetGroupsSearch,
  usersSearchGetProjectsSearch,
  usersSearchGetProjectsSearchSemantic,
  usersSearchGetSearch,
  usersSearchListAdminSearchMigrations,
];
