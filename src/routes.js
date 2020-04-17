const express = require('express');
const AuthController = require('./controllers/auth.controller');
const PokeMiddleware = require('./middlewares/auth.middleware');

const PokeControler = require('./controllers/poke.controller');
const routes = express.Router();
routes.post('/auth/singup',AuthController.singup);
routes.post('/auth/singin',AuthController.singin);

routes.use('/poke',PokeMiddleware.authentication);
routes.get('/poke/index',PokeControler.index);
module.exports = routes;