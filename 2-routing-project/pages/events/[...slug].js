import { useRouter } from 'next/router';
import { getFilteredEvents } from '../../data/dummy-data';

import Button from '../../components/ui/button';
import ErrorAlert from '../../components/ui/error-alert';

import EventList from '../../components/events/event-list';
import ResultsTitle from '../../components/events/results-title';

export default function FilteredEventsPage() {
  const router = useRouter();

  const dateFilter = router.query.slug;
  if (!dateFilter) {
    return <p className='center'>Loading...</p>;
  }

  const filteredYear = +dateFilter[0];
  const filteredMonth = +dateFilter[1];

  if (isNaN(filteredYear) || isNaN(filteredMonth) || filteredYear > 2030 || filteredYear < 2021 || filteredMonth > 12 || filteredMonth < 1) {
    return (
      <>
        <ErrorAlert>
          <p>Invalid filter, please adjust your values!</p>
        </ErrorAlert>
        <div className='center' style={{ display: 'flex', justifyContent: 'center' }}>
          <Button href='/events'>Show All Events</Button>
        </div>
      </>
    );
  }

  const filteredEvents = getFilteredEvents({
    year: filteredYear,
    month: filteredMonth,
  });

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <>
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>
        <div className='center' style={{ display: 'flex', justifyContent: 'center' }}>
          <Button href='/events'>Show All Events</Button>
        </div>
      </>
    );
  }

  const date = new Date(filteredYear, filteredMonth - 1);

  return (
    <>
      {/* <h1 style={{ textAlign: 'center', marginTop: '3rem' }}>{filteredEvents.length} events found :)</h1> */}
      <ResultsTitle date={date} />
      <EventList events={filteredEvents} />
    </>
  );
}
