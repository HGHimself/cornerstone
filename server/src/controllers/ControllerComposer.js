// ControllerComposer.js
//
// This func will link all of the composed service methods to a given
// controller class. We need to get an instance of the service in order to
// use its methods
//
// Usage:
//   class SomeController {
//     extraMethods() {
//       /* body */
//     }
//   }
//   ControllerComposer(SomeController, someService);
//   const controller = new SomeController()
//
const { emptyObjectPredicate } = require('../utils/comp-utils');

const create = ( service ) => ( obj ) => service.create(obj);

const get = ( service ) => ( where ) => {
  if ( !where || emptyObjectPredicate(where) ) { return service.findAll(); }
  else { return service.findSome(where); }
}

const getOne = ( service ) => ( where ) => {
  if ( !where || emptyObjectPredicate(where) ) { return service.findOne(); }
  else { return service.findOne(where); }
}

const ControllerComposer = ( controller, service ) => {
  if ( !controller ) { throw new Error("ControllerComposer needs a controller class!"); }
  if ( !service ) { throw new Error("ControllerComposer needs a service!"); }
  if ( !service.isComposed() ) { throw new Error("The passed service must be composed!"); }

  controller.prototype.create = create(service);
  controller.prototype.get = get(service);

  // this is so that we can be certain the methods above exist
  controller.prototype.isComposed = () => true;
}

module.exports = ControllerComposer;
