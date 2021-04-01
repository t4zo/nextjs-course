import { useRouter } from 'next/router';

import { getAllEvents } from '../../data/dummy-data';
import EventSearch from '../../components/events/event-search';
import EventList from '../../components/events/event-list';

export default function EventsPage() {
  const router = useRouter();

  const allEvents = getAllEvents();

  function handleSearch({ selectedYear, selectedMonth }) {
    router.push(`/events/${selectedYear}/${selectedMonth}`);
  }

  return (
    <>
      <h1 style={{ textAlign: 'center', marginTop: '3rem' }}>All Events</h1>
      <EventSearch onSearch={handleSearch} />
      <EventList events={allEvents} />
    </>
  );
}
