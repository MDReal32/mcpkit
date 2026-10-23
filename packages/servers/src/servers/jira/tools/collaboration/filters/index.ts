import { collaborationFiltersChangeFilterOwner } from "./change-filter-owner";
import { collaborationFiltersCreateFilter } from "./create-filter";
import { collaborationFiltersDeleteFavouriteForFilter } from "./delete-favourite-for-filter";
import { collaborationFiltersDeleteFilter } from "./delete-filter";
import { collaborationFiltersGetColumns } from "./get-columns";
import { collaborationFiltersGetFavouriteFilters } from "./get-favourite-filters";
import { collaborationFiltersGetFilter } from "./get-filter";
import { collaborationFiltersGetFiltersPaginated } from "./get-filters-paginated";
import { collaborationFiltersGetMyFilters } from "./get-my-filters";
import { collaborationFiltersResetColumns } from "./reset-columns";
import { collaborationFiltersSetColumns } from "./set-columns";
import { collaborationFiltersSetFavouriteForFilter } from "./set-favourite-for-filter";
import { collaborationFiltersUpdateFilter } from "./update-filter";

export const collaborationFiltersTools = [
  collaborationFiltersChangeFilterOwner,
  collaborationFiltersCreateFilter,
  collaborationFiltersDeleteFavouriteForFilter,
  collaborationFiltersDeleteFilter,
  collaborationFiltersGetColumns,
  collaborationFiltersGetFavouriteFilters,
  collaborationFiltersGetFilter,
  collaborationFiltersGetFiltersPaginated,
  collaborationFiltersGetMyFilters,
  collaborationFiltersResetColumns,
  collaborationFiltersSetColumns,
  collaborationFiltersSetFavouriteForFilter,
  collaborationFiltersUpdateFilter,
];
