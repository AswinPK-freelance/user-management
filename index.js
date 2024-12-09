require("dotenv").config();
const express = require("express");
const setupMiddlewares = require("./middleware/setup.middlewares");
const routerMiddlewares = require("./middleware/router.middleares");
const app = express();

setupMiddlewares(app);
routerMiddlewares(app);

const port = process.env.PORT || 3000;
app.use((req, res) => {
  res.status(404).json({ message: "Invalid URL Passed" });
});
app.listen(port, () => console.log(`Server running on ${port}`));
