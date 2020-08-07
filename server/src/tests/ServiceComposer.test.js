const db = require('../models');
const ServiceComposer = require('../services/ServiceComposer');
const UserService = require('../services/UserService');

const createdUsers = [];

describe('ServiceComposer', () => {

  afterAll(
    () => Promise.all(createdUsers.map(
      (user) => db.sequelize.models.User.destroy({where: {id: user}}))));

  it('composes a service with a number of methods', () => {
    // setup
    ServiceComposer(UserService, db.sequelize.models.User);
    const userService = new UserService(db.sequelize.models.User);

    // exercising
    expect(userService.isComposed()).toBe(true);
  });

  it('uses the composed findOne method', async () => {
    // setup
    ServiceComposer(UserService, db.sequelize.models.User);
    const userService = new UserService(db.sequelize.models.User);

    const userObj = {
      firstName: "Ernest",
      lastName: "Hemingway",
      email: "eh@eh.com",
    }

    // not sure I like this, may go to factory pattern?
    const aUser = await db.sequelize.models.User.create(userObj);
    createdUsers.push(aUser.id);

    // exercise
    const user = await userService.findOne({firstName: userObj.firstName});

    // assert
    expect(user).not.toBeNull();
    expect(user.firstName).toBe(userObj.firstName);
  });

  it('uses the composed findSome method', async () => {
    // setup
    ServiceComposer(UserService, db.sequelize.models.User);
    const userService = new UserService(db.sequelize.models.User);

    const userObjs = [{
      firstName: 'Charles',
      lastName: 'Darwin',
      email: 'cd@cd.com',
    }, {
      firstName: 'Charles',
      lastName: 'Dickens',
      email: 'cd@cd.com',
    }];

    for ( let i = 0; i < userObjs.length; i++ )  {
      const aUser = await db.sequelize.models.User.create(userObjs[i]);
      createdUsers.push(aUser.id);
    }

    // exercise
    const users = await userService.findSome({firstName: 'Charles'});

    // assert
    expect(users).not.toBeNull();
    expect(users[0].firstName).toBe('Charles');
    expect(users.length >= userObjs.length).toBe(true);
  });

  it('uses the composed findAll method', async () => {
    // setup
    ServiceComposer(UserService, db.sequelize.models.User);
    const userService = new UserService(db.sequelize.models.User);

    const userObjs = [{
      firstName: 'Isaac',
      lastName: 'Newton',
      email: 'in@in.com',
    }, {
      firstName: 'Thomas',
      lastName: 'Edison',
      email: 'te@te.com',
    }, {
      firstName: 'Nicolaus',
      lastName: 'Capernicus',
      email: 'nc@nc.com',
    },];

    for ( let i = 0; i < userObjs.length; i++ )  {
      const aUser = await db.sequelize.models.User.create(userObjs[i]);
      createdUsers.push(aUser.id);
    }

    // exercise
    const users = await userService.findAll();

    // assert
    expect(users).not.toBeNull();
    expect(users.length >= userObjs.length).toBe(true);
  });

  it('uses the composed create method', async () => {
    // setup
    ServiceComposer(UserService, db.sequelize.models.User);
    const userService = new UserService(db.sequelize.models.User);

    const userObj = {
      firstName: "John",
      lastName: "Grisham",
      email: "jg@author.com",
    }

    // exercise
    const aUser = await userService.create(userObj);
    createdUsers.push(aUser.id);

    // assert
    const user = await db.sequelize.models.User.findOne({where: {firstName: userObj.firstName}});
    expect(user).not.toBeNull();
    expect(user.firstName).toBe(userObj.firstName);
  });
});
