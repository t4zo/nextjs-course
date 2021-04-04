import Button from '../../components/ui/button';
import ErrorAlert from '../../components/ui/error-alert';

import EventSummary from '../../components/events/event-detail/event-summary';
import EventLogistics from '../../components/events/event-detail/event-logistics';
import EventContent from '../../components/events/event-detail/event-content';

export default function EventsPage({ event }) {
  // const router = useRouter();
  // const event = getEventById(router.query.id);

  if (!event) {
    return (
      <>
        <div style={{ textAlign: 'center' }}>
          <p>Loading...</p>
        </div>
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

export async function getStaticProps(context) {
  const { id } = context.params;
  const blob = await fetch(`https://nextjs-course-ae0b3-default-rtdb.firebaseio.com/events/${id}.json`);
  const event = await blob.json();

  if (!event) {
    return {
      notFound: true
      // redirect: {
      //   destination: '/nodata',
      // },
    };
  }

  return {
    props: {
      event
    },
    revalidate: 60
  }
}

export async function getStaticPaths() {
  const blob = await fetch(`https://nextjs-course-ae0b3-default-rtdb.firebaseio.com/events.json`);
  const data = await blob.json();

  const events = [];
  for (const key in data) {
    events.push({
      id: key,
      ...data[key]
    });
  }
  
  const featuredEvents = events.filter(event => event.isFeatured);
  const paths = featuredEvents.map(event => event.id).map(id => ({ params: { id } }));

  return {
    paths,
    // paths: [
    //   { params: { id: `${event.id}` } }
    // ],
    // fallback: false
    // fallback: true
    fallback: 'blocking'
  }
}