let authorized = true;

const authCheck = (req, res, next) => {
  if (authorized) {
    next();
  } else {
    throw new Error('Unauthorized');
  }
};

export {
  authCheck
}