const db = require('../models');
const ControllerComposer = require('../controllers/ControllerComposer');
const UserController = require('../controllers/UserController');
const generateServicesFromModels = require('../services');

const createdUsers = [];
const services = generateServicesFromModels(db.sequelize.models);

describe('ControllerComposer', () => {

  afterAll(
    () => Promise.all(createdUsers.map(
      (user) => db.sequelize.models.User.destroy({where: {id: user}}))));

  it('composes a controller class', () => {
    // setup
    ControllerComposer(UserController, services.userService);
    const userController = new UserController( {userService: services.userService} );

    // assert
    expect(userController.isComposed()).toBe(true);
  })

  it('uses the composed create method', async () => {
    // setup
    ControllerComposer(UserController, services.userService);
    const userController = new UserController( {userService: services.userService} );

    const userObj = {
      firstName: 'Agatha',
      lastName: 'Christie',
      email: 'ac@ac.com',
    };

    // exercise
    const aUser = await userController.create(userObj);
    createdUsers.push(aUser.id);

    // assert
    const user = await db.sequelize.models.User.findOne({where: {firstName: userObj.firstName}});
  })

  it('uses the composed findAll method', async () => {
    // setup
    ControllerComposer(UserController, services.userService);
    const userController = new UserController( {userService: services.userService} );

    const userObjs = [{
      firstName: 'Jane',
      lastName: 'Austin',
      email: 'ja@ja.com',
    }, {
      firstName: 'Nicola',
      lastName: 'Tesla',
      email: 'nt@nt.com',
    }, {
      firstName: 'Albert',
      lastName: 'Einstein',
      email: 'ae@ae.com',
    }, ];

    // exercise
    for ( let i = 0; i < userObjs.length; i++ )  {
      const aUser = await db.sequelize.models.User.create(userObjs[i]);
      createdUsers.push(aUser.id);
    }

    // assert
    const users = await userController.get();
    expect(users).not.toBeNull();
    expect(users.length >= userObjs.length).toBe(true);
  });

  it('uses the composed findAll method', async () => {
    // setup
    ControllerComposer(UserController, services.userService);
    const userController = new UserController( {userService: services.userService} );

    const userObj = {
      firstName: 'Albert',
      lastName: 'Einstein',
      email: 'ae@ae.com',
    };

    // exercise
    const aUser = await db.sequelize.models.User.create(userObj);
    createdUsers.push(aUser.id);

    // assert
    const user = await userController.get({firstName: aUser.firstName});
    expect(user).not.toBeNull();
    expect(user.firstName).toBe(aUser.firstName);
  });
});
