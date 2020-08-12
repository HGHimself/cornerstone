const express = require('express');

module.exports = ( controllers ) => {
  if ( !controllers ) { throw new Error('The UserRouter needs controllers injected!'); }
  if ( !controllers.userController ) { throw new Error('The UserRouter needs a userController passed in!'); }

  const router = express.Router();

  return router;
}
