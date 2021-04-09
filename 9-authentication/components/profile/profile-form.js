import { useRouter } from 'next/router';
import { signOut } from 'next-auth/client';
import axios from 'axios';
import classes from './profile-form.module.css';

function ProfileForm() {
  const router = useRouter();

  async function handleChangePassword(e) {
    e.preventDefault();
    const oldPassword = e.target['old-password'].value;
    const newPassword = e.target['new-password'].value;

    try {
      const response = await axios.patch('/api/auth/change-password', { oldPassword, newPassword });
      if (response.status === 200) {
        signOut();
        router.replace('/auth');
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form className={classes.form} onSubmit={handleChangePassword}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' name='new-password' />
      </div>
      <div className={classes.control}>
        <label htmlFor='old-password'>Old Password</label>
        <input type='password' id='old-password' name='old-password' />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
