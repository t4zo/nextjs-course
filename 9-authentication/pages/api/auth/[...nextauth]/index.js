import NextAuth from 'next-auth';
import providers from 'next-auth/providers';

import { getFirebaseInstance } from '../../../../firebase/db';

export default NextAuth({
  session: {
    // Use JSON Web Tokens for session instead of database sessions.
    // This option can be used with or without a database for users/accounts.
    // Note: `jwt` is automatically set to `true` if no database is specified.
    jwt: true,
    // Seconds - How long until an idle session expires and is no longer valid.
    // maxAge: 30 * 24 * 60 * 60, // 30 days
    maxAge: 60 * 60, // 1 hour
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
