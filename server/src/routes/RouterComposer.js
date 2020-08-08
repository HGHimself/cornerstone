const create = ( controller ) => async ( req, res, next ) => {
  try {
    const result = await controller.create(req.body);
    res.send(JSON.stringify(result));
  }
  catch ( e ) { handleErr(e, next); }
}

const get = ( controller ) => async ( req, res, next ) => {
  try {
    const results = await controller.get(req.query);
    res.send(JSON.stringify(results));
  }
  catch ( e ) { handleErr(e, next); }
}

const RouterComposer = ( router, controller ) => {
  if ( !controller ) { throw new Error("The RouterComposer needs a controller!"); }
  if ( !controller.isComposed() ) { throw new Error("The RouterComposer needs a composed controller!"); }

  router.get('/', get(controller));
  router.post('/', create(controller));
}

module.exports = RouterComposer;
