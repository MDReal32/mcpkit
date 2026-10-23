import { number, string } from '@usemcpkit/core';

export const PAGE_ID = string('Page id');

export const LIMIT = number('Maximum number of results (max 100)', { default: 25 });

export const STORAGE_REPRESENTATION = 'storage';

export const SERVER_PAGE_FIELDS = { id: 'id', title: 'title', space: 'space.key', version: 'version.number' };

export const CLOUD_PAGE_FIELDS = { id: 'id', title: 'title', space_id: 'spaceId', version: 'version.number' };

export const SERVER_PAGE_LIST_FIELDS = { id: 'id', title: 'title' };

export const CLOUD_PAGE_LIST_FIELDS = { id: 'id', title: 'title', status: 'status' };

export const SPACE_FIELDS = { id: 'id', key: 'key', name: 'name', type: 'type' };
