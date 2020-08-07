// services/index.js
//
// Here we are doing all our service setup
// First we do our composition to get basic CRUD methods going
// Then we do our dependency injection

const ServiceComposer = require('./ServiceComposer');
const UserService = require('./UserService');

module.exports = ( models ) => {
  // using composition, we are putting a lot of basic methods onto this class
  ServiceComposer(UserService, models.User);

  return {
    userService: new UserService(models.User),
    UserService: UserService,
  }
}
