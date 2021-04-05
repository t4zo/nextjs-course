import classes from './newsletter-registration.module.css';

function NewsletterRegistration() {
  async function registrationHandler(event) {
    event.preventDefault();
    const email = event.target.email.value;
    
    const blob = await fetch('/api/newsletter', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
    const data = await blob.json();
    console.log(data);
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type='email'
            id='email'
            placeholder='Your email'
            aria-label='Your email'
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
