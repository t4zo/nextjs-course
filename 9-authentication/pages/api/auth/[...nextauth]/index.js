import NextAuth from 'next-auth';
import providers from 'next-auth/providers';

import { getFirebaseInstance } from '../../../../firebase/db';

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    providers.Credentials({
      async authorize({ email, password }) {
        const firebase = getFirebaseInstance();
        const firebaseAuth = firebase.auth();

        if (firebaseAuth.currentUser) {
          firebaseAuth.signOut();
        }
        
        try {
          const response = await firebaseAuth.signInWithEmailAndPassword(email, password);

          if (response.user) {
            const user = {
              uid: response.user.uid,
              email: response.user.email,
            };

            return user;
          }
        } catch (error) {
          throw new Error(error.message);
        }
      },
    }),
  ],
});
