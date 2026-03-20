const crypto = require("crypto");
const { promisify } = require("util");

const scryptAsync = promisify(crypto.scrypt);
const HASH_PREFIX = "scrypt";
const KEY_LENGTH = 64;
const SALT_LENGTH = 16;

const isHashedPassword = (value = "") =>
  typeof value === "string" && value.startsWith(`${HASH_PREFIX}:`);

const hashPassword = async (password) => {
  const salt = crypto.randomBytes(SALT_LENGTH).toString("hex");
  const derivedKey = await scryptAsync(password, salt, KEY_LENGTH);

  return `${HASH_PREFIX}:${salt}:${derivedKey.toString("hex")}`;
};

const verifyPassword = async (password, storedPassword) => {
  if (!storedPassword) {
    return false;
  }

  if (!isHashedPassword(storedPassword)) {
    return password === storedPassword;
  }

  const [, salt, hashedValue] = storedPassword.split(":");

  if (!salt || !hashedValue) {
    return false;
  }

  const derivedKey = await scryptAsync(password, salt, KEY_LENGTH);
  const storedBuffer = Buffer.from(hashedValue, "hex");

  if (storedBuffer.length !== derivedKey.length) {
    return false;
  }

  return crypto.timingSafeEqual(storedBuffer, derivedKey);
};

module.exports = {
  hashPassword,
  isHashedPassword,
  verifyPassword,
};
