const RouterComposer = require('./RouterComposer');
const UserRouter = require('./UserRouter');

// generateRoutesFromControllers
module.exports = ( controllers ) => {

  const userRouter = UserRouter({controllers.userController});
  RouterComposer(userRouter, controllers.userController);

  app.use('/users', userRouter);
}
