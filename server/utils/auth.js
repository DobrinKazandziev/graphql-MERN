const admin = require("firebase-admin");

const serviceAccount = require("../config/firebaseServiceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // databaseURL: "https://graphqlreactnode-822de-default-rtdb.europe-west1.firebasedatabase.app"
});

const authCheck = async (req) => {
  try {
    const currentUser = await admin.auth().verifyIdToken(req.headers.authtoken);
    return currentUser;
  } catch (error) {
    console.log('AUTH CHECK ERROR:', error);
    throw new Error(error);
  }
}

export {
  authCheck
}
