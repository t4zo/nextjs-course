import { getFirebaseInstance } from '../../../../../firebase/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const firebase = getFirebaseInstance();

    try {
      const firebaseAuth = firebase.auth();
      
      if (firebaseAuth.currentUser) {
        const user = {
          uid: firebaseAuth.currentUser.uid,
          email: firebaseAuth.currentUser.email,
        };

        return res.status(200).json({ user, message: 'User logged in!' });
      }

      return res.status(400).json({ message: 'error' });
    } catch (error) {
      console.log(error.message);
      return res.status(422).json({ message: error.message });
    }
  }
}
