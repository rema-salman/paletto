const express = require("express");
const { PORT } = require("./config");
const expressApp = require("./express-app");

const StartServer = async () => {
  const app = express();

  await expressApp(app);

  const port = process.env.PORT || 5000;

  app
    .listen(port, () => {
      console.log(`listening to port ${port}`);
    })
    .on("error", (err) => {
      console.log(err);
      process.exit();
    });
};

StartServer();
