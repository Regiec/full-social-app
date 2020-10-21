const { AuthenticationError } = require('apollo-server')

const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config')

module.exports = (context) => {
  const authHeader = context.req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split('user ')[1];
    if (token) {
      try {
        const user = jwt.verify(token, SECRET_KEY);
        return user;
      } catch (err) {
        throw new AuthenticationError('Invalid/Expired token')
      }
    }
    throw new Error('Authentication toke must be \'user [token]')
  }
  throw new Error('Authorization header must be provided')
}
