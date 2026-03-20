const jwt = require("jsonwebtoken");

const DEFAULT_JWT_SECRET = "career-coach-dev-secret";

const getJwtSecret = () =>
  process.env.JWT_SECRET || process.env.JWT_SECRET_KEY || DEFAULT_JWT_SECRET;

const signAuthToken = (userId) =>
  jwt.sign({ userId }, getJwtSecret(), {
    expiresIn: "7d",
  });

const verifyAuthToken = (token) => jwt.verify(token, getJwtSecret());

module.exports = {
  signAuthToken,
  verifyAuthToken,
};
