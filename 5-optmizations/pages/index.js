import Head from 'next/head';

import EventList from '../components/events/event-list'

export default function HomePage({ events }) {
  return (
    <>
      <Head>
        <title>Featured Events</title>
        <meta name='description' content='Find a lot of events' />
      </Head>
      <h1 style={{textAlign: 'center', marginTop: '3rem'}}>Featured Events</h1>
      <EventList events={events} />
    </>
  );
}

export async function getStaticProps() {
  const blob = await fetch('https://nextjs-course-ae0b3-default-rtdb.firebaseio.com/events.json');
  const data = await blob.json();

  const events = [];
  for (const key in data) {
    if (data[key].isFeatured === true) {
      events.push({
        id: key,
        ...data[key]
      });
    }
  }

  return {
    props: {
      events
    },
    revalidate: 120
  }
}