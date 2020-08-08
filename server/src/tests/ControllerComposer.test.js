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
    expect(user).not.toBeNull();
    expect(user.firstName).toBe(userObj.firstName);
  })

  it('uses the composed get method', async () => {
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

    for ( let i = 0; i < userObjs.length; i++ )  {
      const aUser = await db.sequelize.models.User.create(userObjs[i]);
      createdUsers.push(aUser.id);
    }

    // exercise
    const users = await userController.get();

    // assert
    expect(users).not.toBeNull();
    expect(users.length >= userObjs.length).toBe(true);
  });

  it('uses the composed get method with where', async () => {
    // setup
    ControllerComposer(UserController, services.userService);
    const userController = new UserController( {userService: services.userService} );

    const userObjs = [{
      firstName: 'Gregor',
      lastName: 'Mendel',
      email: 'gm@gm.com',
    },{
      firstName: 'Linus',
      lastName: 'Torvalds',
      email: 'lt@lt.com',
    },{
      firstName: 'Linus',
      lastName: 'Pauling',
      email: 'lp@lp.com',
    },];

    for ( let i = 0; i < userObjs.length; i++ )  {
      const aUser = await db.sequelize.models.User.create(userObjs[i]);
      createdUsers.push(aUser.id);
    }

    // exercise
    const users = await userController.get({firstName: userObjs[1].firstName});
    console.log(users);
    // assert
    expect(users).not.toBeNull();
    expect(users.length >= 2).toBe(true);
  });
});
