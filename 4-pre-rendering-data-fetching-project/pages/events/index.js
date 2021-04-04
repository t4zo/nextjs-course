import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import EventSearch from '../../components/events/event-search';
import EventList from '../../components/events/event-list';

export default function EventsPage(props) {
  const router = useRouter();
  const [events, setEvents] = useState(props.events);

  const { data, error } = useSWR(`https://nextjs-course-ae0b3-default-rtdb.firebaseio.com/events.json`);

  if (error) {
    return <p>Error.</p>;
  }

  if (!data && !events) {
    return <p>Loading...</p>;
  }

  useEffect(() => {
    if (data) {
        const events = [];

        for (const key in data) {
          events.push({
            id: key,
            ...data[key]
          });
        }

        setEvents(events);
    }
  }, [data]);

  function handleSearch({ selectedYear, selectedMonth }) {
    router.push(`/events/${selectedYear}/${selectedMonth}`);
  }

  return (
    <>
      <h1 style={{ textAlign: 'center', marginTop: '3rem' }}>All Events</h1>
      <EventSearch onSearch={handleSearch} />
      <EventList events={events} />
    </>
  );
}

export async function getStaticProps() {
  const blob = await fetch('https://nextjs-course-ae0b3-default-rtdb.firebaseio.com/events.json');
  const data = await blob.json();

  const events = [];
  for (const key in data) {
    events.push({
      id: key,
      ...data[key]
    });
  }

  return {
    props: {
      events
    },
    revalidate: 120
  }
}
