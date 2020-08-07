const ControllerComposer = require('./ControllerComposer');
const UserController = require('./UserController');

module.exports = ( services ) => {

  ControllerComposer(UserController, services.userService);

  return {
    UserController: UserController,
    userController: new UserController({userService: services.userService}),
  }
}
