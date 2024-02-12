const express = require("express");
const router = express.Router();
const authRoute = require('./auth.route');
const todoRoute = require('./todo.route');
const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/todo',
    route: todoRoute
  }
];
defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
module.exports = router;