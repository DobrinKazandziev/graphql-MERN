let authorized = true;

const authCheck = (req, res, next = (f) => (f)) => {
  if (!req.headers.authtoken) throw new Error('Unauthorized. Missing authtoken!');

  //  token validity check
  const valid = req.headers.authtoken === 'secret'

  if (!valid) {
    throw new Error('Unauthorized. Invalid authtoken!')
  } else {
    next()
  }
};

export {
  authCheck
}
