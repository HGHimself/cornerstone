const db = require('../models');
const ControllerComposer = require('../controllers/ControllerComposer');
const UserController = require('../controllers/UserController');
const generateServicesFromModels = require('../services');
const generateControllersFromServices = require('../controllers');

const createdUsers = [];
const services = generateServicesFromModels(db.sequelize.models);
const controllers = generateControllersFromServices(services);

const UserRouter = require('../routes/UserRouter');
const RouterComposer = require('../routes/RouterComposer');

const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');

describe('RouterComposer', () => {

  afterAll(
    () => Promise.all(createdUsers.map(
      (user) => db.sequelize.models.User.destroy({where: {id: user}}))));

  it('composes a router for usage on an app', async (done) => {
    // setup
    const app = express();

    const userRouter = UserRouter({userController: controllers.userController})
    RouterComposer(userRouter, controllers.userController);
    app.use('/user', userRouter);

    // exercise
    const res = await request(app)
      .get('/user?id=1')
      .expect(200);

    done();
  });

  it('composed get endpoint is properly set', async (done) => {
    const app = express();

    // setup
    const userRouter = UserRouter({userController: controllers.userController})
    RouterComposer(userRouter, controllers.userController);
    app.use('/user', userRouter);

    const userObjs = [{
      firstName: 'Louis',
      lastName: 'Pasteur',
      email: 'lp@lp.com',
    }, {
      firstName: 'Louis',
      lastName: 'Armstrong',
      email: 'la@la.com',
    },];

    for ( let i = 0; i < userObjs.length; i++ )  {
      const aUser = await db.sequelize.models.User.create(userObjs[i]);
      createdUsers.push(aUser.id);
    }

    // exercise
    const res = await request(app)
      .get('/user?firstName='+userObjs[0].firstName)
      .expect(200)

    // assert
    const data = JSON.parse(res.text);
    expect(data.length >= userObjs.length).toBe(true);

    done();
  });


  it('composes a route for the create method', async (done) => {
    const app = express();

    // setup
    const userRouter = UserRouter({userController: controllers.userController})
    RouterComposer(userRouter, controllers.userController);
    app.use(bodyParser.json());
    app.use('/user', userRouter);

    const userObj = {
      firstName: 'Richard',
      lastName: 'Feynman',
      email: 'rf@rf.com',
    };

    // exercise
    const res = await request(app)
      .post('/user')
      .send(userObj)
      .expect(200)

    // assert
    const aUser = await db.sequelize.models.User.findOne({where: {firstName: userObj.firstName}});
    expect(aUser).not.toBeNull();
    expect(aUser.firstName).toBe(userObj.firstName);

    createdUsers.push(aUser.id);
    done();
  });

})
