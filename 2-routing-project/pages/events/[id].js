import { useRouter } from 'next/router';
import { getEventById } from '../../data/dummy-data';

import Button from '../../components/ui/button';
import ErrorAlert from '../../components/ui/error-alert';

import EventSummary from '../../components/events/event-detail/event-summary';
import EventLogistics from '../../components/events/event-detail/event-logistics';
import EventContent from '../../components/events/event-detail/event-content';

export default function EventsPage() {
  const router = useRouter();
  const event = getEventById(router.query.id);

  if (!event) {
    return (
      <>
        <ErrorAlert>
          <p>Event not found!</p>
        </ErrorAlert>
        <div className='center' style={{ display: 'flex', justifyContent: 'center' }}>
          <Button href='/events'>Show All Events</Button>
        </div>
      </>
    );
  }

  return (
    <>
      <EventSummary title={event.title} />
      <EventLogistics date={event.date} address={event.location} image={event.image} imageAlt={event.title} />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </>
  );
}
