// import { useRef } from 'react';
import Button from '../../ui/button';

import styles from './events-search.module.scss';

export default function EventSearch({ onSearch }) {
  // const yearInputRef = useRef();
  // const monthInputRef = useRef();

  function handleSubmit(event) {
    event.preventDefault();
    
    const selectedYear = event.target.year.value;
    const selectedMonth = event.target.month.value;

    onSearch({ selectedYear, selectedMonth });
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.controls}>
        <div className={styles.control}>
          <label htmlFor="year">Year</label>
          {/* <select name="year" id="year" ref={yearInputRef}> */}
          <select name="year" id="year">
            <option value="2021">2021</option>
            <option value="2022">2022</option>
          </select>
        </div>
        <div className={styles.control}>
          <label htmlFor="month">Month</label>
          {/* <select name="month" id="month" ref={monthInputRef}> */}
          <select name="month" id="month">
            <option value="1">January</option>
            <option value="2">February</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
        </div>

        <Button>Find Events</Button>
      </div>
    </form>
  );
}