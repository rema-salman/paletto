const dotEnv = require("dotenv");

dotEnv.config();

module.exports = {
  PORT: process.env.PORT,
  UPSPLASH_ACCESS_KEY: process.env.UPSPLASH_ACCESS_KEY,
  UPSPLASH_SECRET_KEY: process.env.UPSPLASH_SECRET_KEY,
  NODE_ENV: process.env.NODE_ENV,
};
