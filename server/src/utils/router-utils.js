const handleErrorResponse = (e, next) => {
  console.log({error: e, message: e.message});
  next(e);
}
