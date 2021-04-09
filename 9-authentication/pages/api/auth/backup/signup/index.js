import { getFirebaseInstance } from '../../../../../firebase/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const firebase = getFirebaseInstance();
    const { email, password } = req.body;

    if (!email || !email.includes('@')) {
      return res.status(422).json({ message: 'Invalid email' });
    }

    if (!password || password.trim().length < 6) {
      return res.status(422).json({ message: 'Invalid password - password must be at leats 6 characters long.' });
    }

    try {
      const firebaseAuth = firebase.auth();
      const response = await firebaseAuth.createUserWithEmailAndPassword(email, password);

      const user = {
        uid: response.user.uid,
        email: response.user.email,
      };

      return res.status(201).json({ user, message: 'User created successfully!' });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
}
