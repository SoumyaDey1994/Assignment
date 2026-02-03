/**
 * Import the routes
 */
const homeRoute = require("@route/home");
const dataRoute = require("@route/data");

module.exports = (app) => {
  app.use("/data", dataRoute);
  app.use("/", homeRoute);

  // 404
  app.use((req, res) => {
    res.status(404).send({ message: `${req.method} ${req.originalUrl} Not Found` });
  });

  // Error handler (LAST)
  app.use((err, req, res, next) => {
    res.status(500).json({
      error: err.message,
    });
  });
};
