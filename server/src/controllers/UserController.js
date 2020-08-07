// UserController.js

class UserController {
  constructor( services )  {
    if ( !services )  { throw new Error("We expect a service param in the User Controller!"); }
    if ( !services.userService )  { throw new Error("UserController expects a UserService!"); }
  }
}

module.exports = UserController;
