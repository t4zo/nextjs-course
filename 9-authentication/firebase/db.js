import firebase from 'firebase';

export function getFirebaseInstance() {
  if(!firebase.apps.length) {
    const { apiKey, authDomain, databaseURL, projectId, storageBucket, messagingSenderId, appId } = process.env;
    var firebaseConfig = {
      apiKey,
      authDomain,
      databaseURL,
      projectId,
      storageBucket,
      messagingSenderId,
      appId
    };

    return firebase.initializeApp(firebaseConfig);
  }

  return firebase.app();
}