// ServiceComposer.js
//
// This func will add a bunch of method wrappers onto the given service class
// The methods below will abstract away the details of the ORM from the service
//
// Usage:
//   const models = require('your-fav-orm')
//   class SomeService {
//     extraMethods() {
//       /* body */
//     }
//   }
//   ServiceComposer(SomeService, models.SomeService);
//   const service = new SomeService()

const create = ( model ) => ( obj ) => model.create(obj);

const findOne = ( model ) => ( obj ) => model.findOne({where: obj});

const findAll = ( model ) => ( ) => model.findAll();

const findSome = ( model ) => ( obj ) => model.findAll({where: obj});

const ServiceComposer = ( service, model ) => {
  if( !service ) { throw new Error("ServiceComposer needs a service class!"); }
  if( !model ) { throw new Error("ServiceComposer needs a model!"); }

  service.prototype.create = create(model);
  service.prototype.findOne = findOne(model);
  service.prototype.findAll = findAll(model);
  service.prototype.findSome = findSome(model);

  // this is so that we can be certain the methods above exist
  service.prototype.isComposed = () => true;
}

module.exports = ServiceComposer;
