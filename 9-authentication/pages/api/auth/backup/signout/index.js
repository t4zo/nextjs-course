import { getSession } from 'next-auth/client';
import { getFirebaseInstance } from '../../../../../firebase/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const firebase = getFirebaseInstance();

    const session = await getSession({ req });
    if (!session) {
      return res.status(401).json({ message: 'Not authenticated!' });
    }

    try {
      const firebaseAuth = firebase.auth();

      if (firebaseAuth.currentUser) {
        firebaseAuth.signOut();
        return res.status(200).json({ user, message: 'User signed out!' });
      }
    } catch (error) {
      return res.status(422).json({ message: error.message });
    }
  }
}
