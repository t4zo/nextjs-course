import Image from 'next/image';

import Button from '../../ui/button';

import DateIcon from '../../icons/date-icon';
import AddressIcon from '../../icons/address-icon';
import ArrowRightIcon from '../../icons/arrow-right-icon';

import styles from './event-item.module.css';

export default function EventItem({ event }) {
  const formattedDate = new Date(event.date).toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const formattedAddress = event.location.replace(', ', '\n');

  const exploreLink = `/events/${event.id}`;

  return (
    <li className={styles.item}>
      <Image src={`/${event.image}`} alt={event.title} width='320' height='160' />
      <div className={styles.content}>
        <section className={styles.summary}>
          <h2>{event.title}</h2>
          <div className={styles.date}>
            <DateIcon />
            <time>{formattedDate}</time>
          </div>
          <div className={styles.address}>
            <AddressIcon />
            <address>{formattedAddress}</address>
          </div>
        </section>
        <div className={styles.actions}>
          <Button href={exploreLink}>
            <span>Explore Event</span>
            <span className={styles.icon}><ArrowRightIcon /></span>
          </Button>
        </div>
      </div>
    </li>
  );
}
