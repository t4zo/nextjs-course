import Head from 'next/head';

import EventList from '../components/events/event-list'
import { getFeaturedEvents } from '../data/dummy-data'

export default function HomePage() {
  const featuredEvents = getFeaturedEvents();

  return (
    <>
      <Head>
        <title>Home Page</title>
      </Head>
      <h1 style={{textAlign: 'center', marginTop: '3rem'}}>Featured Events</h1>
      <EventList events={featuredEvents} />
    </>
  );
}
