// UserService.js

class UserService {
  constructor( model ) {
    if ( !model ) { throw new Error("UserService requires a model!"); }
    
    this.model = model;
  }
}

module.exports = UserService;
