import { cloudEmbedsCreateSmartLink } from './create-smart-link';
import { cloudEmbedsCreateSmartLinkProperty } from './create-smart-link-property';
import { cloudEmbedsDeleteSmartLink } from './delete-smart-link';
import { cloudEmbedsDeleteSmartLinkPropertyById } from './delete-smart-link-property-by-id';
import { cloudEmbedsGetSmartLinkAncestors } from './get-smart-link-ancestors';
import { cloudEmbedsGetSmartLinkById } from './get-smart-link-by-id';
import { cloudEmbedsGetSmartLinkContentProperties } from './get-smart-link-content-properties';
import { cloudEmbedsGetSmartLinkContentPropertiesById } from './get-smart-link-content-properties-by-id';
import { cloudEmbedsGetSmartLinkDescendants } from './get-smart-link-descendants';
import { cloudEmbedsGetSmartLinkDirectChildren } from './get-smart-link-direct-children';
import { cloudEmbedsGetSmartLinkOperations } from './get-smart-link-operations';
import { cloudEmbedsUpdateSmartLinkPropertyById } from './update-smart-link-property-by-id';

export const cloudEmbedsTools = [
  cloudEmbedsCreateSmartLink,
  cloudEmbedsCreateSmartLinkProperty,
  cloudEmbedsDeleteSmartLink,
  cloudEmbedsDeleteSmartLinkPropertyById,
  cloudEmbedsGetSmartLinkAncestors,
  cloudEmbedsGetSmartLinkById,
  cloudEmbedsGetSmartLinkContentProperties,
  cloudEmbedsGetSmartLinkContentPropertiesById,
  cloudEmbedsGetSmartLinkDescendants,
  cloudEmbedsGetSmartLinkDirectChildren,
  cloudEmbedsGetSmartLinkOperations,
  cloudEmbedsUpdateSmartLinkPropertyById,
];
