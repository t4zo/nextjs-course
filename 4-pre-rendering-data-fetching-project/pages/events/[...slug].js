import Button from '../../components/ui/button';
import ErrorAlert from '../../components/ui/error-alert';

import EventList from '../../components/events/event-list';
import ResultsTitle from '../../components/events/results-title';

export default function FilteredEventsPage({ filteredEvents, invalidFilter, noEvents, date }) {  
  if (!date.year && !date.month) {
    return <p className='center'>Loading...</p>;
  }

  if (invalidFilter) {
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

  if (noEvents) {
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

  const formattedDate = new Date(date.year, date.month - 1);

  return (
    <>
      <ResultsTitle date={formattedDate} />
      <EventList events={filteredEvents} />
    </>
  );
}

export async function getServerSideProps(context) {
  const { slug } = context.query;
  const year = +slug[0];
  const month = +slug[1];
  const date = {
    year,
    month
  };

  if (isNaN(year) || isNaN(month) || year > 2030 || year < 2021 || month > 12 || month < 1) {
    return {
      props: {
        invalidFilter: true,
        date
      }
      // notFound: true
      // redirect: {
      //   distination: error
      // }
    }
  }

  const blob = await fetch(`https://nextjs-course-ae0b3-default-rtdb.firebaseio.com/events.json`);
  const data = await blob.json();

  const events = [];
  for (const key in data) {
    events.push({
      id: key,
      ...data[key]
    });
  }

  let filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.date);
    return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1;
  });

  if(filteredEvents.length === 0) {
    return {
      props: {
        noEvents: true,
        date
      },
    }
  }

  return {
    props: {
      filteredEvents,
      date
    }
  }
}