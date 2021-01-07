const admin = require("firebase-admin");

const serviceAccount = require("../config/firebaseServiceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // databaseURL: "https://graphqlreactnode-822de-default-rtdb.europe-west1.firebasedatabase.app"
});

const authCheck = async (req) => {
  try {
    const currentUser = await admin.auth().verifyIdToken(req.headers.authtoken);
    console.log('CURRENT USER:', currentUser)
    return currentUser;
  } catch (error) {
    console.log('AUTH CHECK ERROR:', error);
    throw new Error(error);
  }
}


// const authCheck = (req, res, next = (f) => (f)) => {
//   if (!req.headers.authtoken) throw new Error('Unauthorized. Missing authtoken!');

//   //  token validity check
//   const valid = req.headers.authtoken === 'secret'

//   if (!valid) {
//     throw new Error('Unauthorized. Invalid authtoken!')
//   } else {
//     next()
//   }
// };

export {
  authCheck
}
