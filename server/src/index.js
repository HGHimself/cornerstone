// index.js
//
// The entrypoint of the app
// Here we have the main try catch block so that we can catch and clean up
//
// The point of this file is to load everything into memory, connect to DB
// and setup the server to listen for certain endpoints
let exitCode = 0;
const express = require('express');

try {
  // announce the app startup
  console.log("App is starting up...");

  const db = require('./models');
  const app = express();
  const configuration = require('./config/application.json');

  // We compose our services with a base class that will add basic methods
  // like create, find, and update
  // We want to hide the database and the models behind these service classes
  const generateServicesFromModels = require('./services');
  const services = generateServicesFromModels(db.sequelize.models);

  // Controllers are made of many service methods
  // This is where the business logics starts to come into play
  const generateControllersFromServices = require('./controllers');
  const controllers = generateControllersFromServices(services);

  // Routes connect the controllers to the outside world
  // const generateRoutesFromControllers = require('./routes');
  // const routes =  generateRoutesFromControllers(controllers);

  app.get('/', function(req, res){
    res.send('Hello World');
  });

  app.listen(configuration.PORT, configuration.HOST);
  console.log(`Listening at http://${configuration.HOST}:${configuration.PORT}`);

} catch(e) {
  // something bad has happened
  console.log("App has errored -> ", e, e.message);

  exitCode = 1;

}
// finally {
//   // clean up
//   console.log(`Exiting with code: ${exitCode}`);
//   process.exit(exitCode);
// }
