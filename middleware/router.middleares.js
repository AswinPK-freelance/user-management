
const API_VERSION = "v1"
function setupRouteHandler(app) {
  app.use(`/api/${API_VERSION}/user`, require("../routes/user.routes"));
}

module.exports = setupRouteHandler;
