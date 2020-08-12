const express = require('express');

const RouterComposer = require('./RouterComposer');
const UserRouter = require('./UserRouter');

module.exports = ( controllers ) => {
  const router = express.Router();

  const userRouter = UserRouter({userController: controllers.userController});
  RouterComposer(userRouter, controllers.userController);
  router.use('/users', userRouter);

  return router;
}
