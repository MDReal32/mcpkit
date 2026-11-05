import { settingsLogStreamingCreateLogStreamingDestination } from "./create-log-streaming-destination";
import { settingsLogStreamingDeleteLogStreamingDestination } from "./delete-log-streaming-destination";
import { settingsLogStreamingGetLogStreamingDestination } from "./get-log-streaming-destination";
import { settingsLogStreamingGetLogStreamingDestinations } from "./get-log-streaming-destinations";
import { settingsLogStreamingGetLogStreamingEventTypes } from "./get-log-streaming-event-types";
import { settingsLogStreamingTestLogStreamingDestination } from "./test-log-streaming-destination";
import { settingsLogStreamingUpdateLogStreamingDestination } from "./update-log-streaming-destination";

export const settingsLogStreamingTools = [
  settingsLogStreamingCreateLogStreamingDestination,
  settingsLogStreamingDeleteLogStreamingDestination,
  settingsLogStreamingGetLogStreamingDestination,
  settingsLogStreamingGetLogStreamingDestinations,
  settingsLogStreamingGetLogStreamingEventTypes,
  settingsLogStreamingTestLogStreamingDestination,
  settingsLogStreamingUpdateLogStreamingDestination,
];
