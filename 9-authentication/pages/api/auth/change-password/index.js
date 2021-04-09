import { getSession } from 'next-auth/client';
import { getFirebaseInstance } from '../../../../firebase/db';

export default async function handler(req, res) {
  if (req.method === 'PATCH') {
    const firebase = getFirebaseInstance();
    const { oldPassword, newPassword } = req.body;

    const session = await getSession({ req });
    if (!session) {
      return res.status(401).json({ message: 'Not authenticated!' });
    }

    try {
      const firebaseAuth = firebase.auth();

      if (!firebaseAuth.currentUser) {
        return res.status(401).json({ message: 'User not signed in' });
      }

      if (!newPassword || newPassword.trim().length < 6) {
        return res.status(422).json({ message: 'Invalid password - password must be at leats 6 characters long.' });
      }

      const user = await firebaseAuth.signInWithEmailAndPassword(firebaseAuth.currentUser.email, oldPassword);
      if (user) {
        await firebaseAuth.currentUser.updatePassword(newPassword);
      }

      return res.status(200).json({ message: 'Password successfully updated!' });
    } catch (error) {
      console.log(error.message);
      return res.status(422).json({ message: error.message });
    }
  }
}
