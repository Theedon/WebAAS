import gql from "graphql-tag";

import { getClient } from "@/lib/apollo-clients/RSCClient";
import {
  AllEventsQuery,
  AllEventsQueryVariables,
} from "./__generated__/page.generated";
import EventCard from "@/components/schedule/EventCard";

async function SchedulePage() {
  const ALL_EVENTS = gql`
    query AllEvents {
      allEvents {
        description
        id
        title
        creator {
          firstName
          lastName
        }
        event_date
        creator_id
      }
    }
  `;

  const { data, error } = await getClient().query<
    AllEventsQuery,
    AllEventsQueryVariables
  >({
    query: ALL_EVENTS,
  });
  if (!data.allEvents) {
    return <div>No Events</div>;
  }
  return (
    <>
      <h2 className="mb-5 grid place-items-center text-2xl font-bold text-primary-foreground">
        <p>Events | Schedule</p>
      </h2>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(350px,1fr))] gap-3">
        {data.allEvents.map((event) => (
          <EventCard
            key={event.id}
            title={event.title}
            description={event.description}
            date={event.event_date}
            creatorName={`${event.creator?.lastName}, ${event.creator?.firstName}`}
          />
        ))}
      </div>
    </>
  );
}

export default SchedulePage;
