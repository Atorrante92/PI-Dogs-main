const { Router } = require('express');
const { getDogsHandler, getDogHandler, createDogHandler } = require('../handlers/dogsHandlers');
const { validate } = require('../utils');

const dogsRouter = Router();

dogsRouter.get('/', getDogsHandler);

dogsRouter.get('/:id', getDogHandler);

dogsRouter.post('/', validate, createDogHandler);                                       //Valido la info recibida por query antes de crear la reaza de perros

module.exports = dogsRouter;