import { EventDomain } from "../domains/EventDomain";
import prisma from "../prisma/prisma";

export const getAllEvents = async () => {
  const events = await prisma.event.findMany({});

  const filteredEvents = events?.map(
    (event) =>
      new EventDomain(
        event.id,
        event.creator_id,
        event.title,
        event.description ?? "",
        event.event_date,
      ),
  );

  return filteredEvents;
};
