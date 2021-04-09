import { getFirebaseInstance } from '../../../../../firebase/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const firebase = getFirebaseInstance();
    const { email, password } = req.body;

    if (!email || !email.includes('@')) {
      return res.status(422).json({ message: 'Invalid email' });
    }

    if (!password || password.trim().length < 6) {
      return res.status(422).json({ message: 'Invalid password - password must be at leats 7 characters long.' });
    }

    try {
      const firebaseAuth = firebase.auth();

      if (firebaseAuth.currentUser) {
        firebaseAuth.signOut();
        // return res.status(200).json({ user, message: 'User logged in!' });
      }

      const response = await firebaseAuth.signInWithEmailAndPassword(email, password);

      if (response.user) {
        const user = {
          uid: response.user.uid,
          email: response.user.email,
        };

        return res.status(200).json({ user, message: 'User logged in!' });
      }
    } catch (error) {
      console.log(error.message);
      return res.status(422).json({ message: error.message });
    }
  }
}
