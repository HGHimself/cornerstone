const db = require('../models');
const ControllerComposer = require('../controllers/ControllerComposer');
const UserController = require('../controllers/UserController');
const generateServicesFromModels = require('../services');
const generateControllersFromServices = require('../controllers');

const createdUsers = [];
const services = generateServicesFromModels(db.sequelize.models);
const controllers = generateControllersFromServices(services);

const RouterComposer = require('../routes/RouterComposer');

const request = require('supertest');
const express = require('express');

describe('RouterComposer', () => {

  afterAll(
    () => Promise.all(createdUsers.map(
      (user) => db.sequelize.models.User.destroy({where: {id: user}}))));

  it('composes a router for usage on an app', async (done) => {
    // setup
    const app = express();

    const router = RouterComposer(controllers.userController);
    app.use('/user', router);

    // exercise
    const res = await request(app)
      .get('/user?id=1')
      .expect(200);

    done();
  });

  it('composed get endpoint is properly set', async (done) => {
    const app = express();

    // setup
    const router = RouterComposer(controllers.userController);
    app.use('/user', router);

    const userObjs = [{
      firstName: 'Louis',
      lastName: 'Pasteur',
      email: 'lp@lp.com',
    }, {
      firstName: 'Louis',
      lastName: 'Armstrong',
      email: 'la@la.com',
    },];

    // exercise
    for ( let i = 0; i < userObjs.length; i++ )  {
      const aUser = await db.sequelize.models.User.create(userObjs[i]);
      createdUsers.push(aUser.id);
    }

    // exercise
    const res = await request(app)
      .get('/user?firstName='+userObjs[0].firstName)
      .expect(200)

    const data = JSON.parse(res.text);
    expect(data.length >= userObjs.length).toBe(true);

    done();
  });


  it('composes a route for the create method', () => {

  });

})
