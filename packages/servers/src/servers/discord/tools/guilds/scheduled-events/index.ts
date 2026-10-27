import { guildsScheduledEventsCountGuildScheduledEventUsers } from "./count-guild-scheduled-event-users";
import { guildsScheduledEventsCreateGuildScheduledEvent } from "./create-guild-scheduled-event";
import { guildsScheduledEventsCreateGuildScheduledEventException } from "./create-guild-scheduled-event-exception";
import { guildsScheduledEventsDeleteGuildScheduledEvent } from "./delete-guild-scheduled-event";
import { guildsScheduledEventsDeleteGuildScheduledEventException } from "./delete-guild-scheduled-event-exception";
import { guildsScheduledEventsGetGuildScheduledEvent } from "./get-guild-scheduled-event";
import { guildsScheduledEventsListGuildScheduledEventExceptionUsers } from "./list-guild-scheduled-event-exception-users";
import { guildsScheduledEventsListGuildScheduledEventUsers } from "./list-guild-scheduled-event-users";
import { guildsScheduledEventsListGuildScheduledEvents } from "./list-guild-scheduled-events";
import { guildsScheduledEventsUpdateGuildScheduledEvent } from "./update-guild-scheduled-event";
import { guildsScheduledEventsUpdateGuildScheduledEventException } from "./update-guild-scheduled-event-exception";

export const guildsScheduledEventsTools = [
  guildsScheduledEventsCountGuildScheduledEventUsers,
  guildsScheduledEventsCreateGuildScheduledEvent,
  guildsScheduledEventsCreateGuildScheduledEventException,
  guildsScheduledEventsDeleteGuildScheduledEvent,
  guildsScheduledEventsDeleteGuildScheduledEventException,
  guildsScheduledEventsGetGuildScheduledEvent,
  guildsScheduledEventsListGuildScheduledEventExceptionUsers,
  guildsScheduledEventsListGuildScheduledEventUsers,
  guildsScheduledEventsListGuildScheduledEvents,
  guildsScheduledEventsUpdateGuildScheduledEvent,
  guildsScheduledEventsUpdateGuildScheduledEventException,
];
