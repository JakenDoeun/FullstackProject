const express = require('express');
const router_user = express.Router();
const usersController = require('../controllers/usersController');

const methodOverride = require('method-override');
const { get, route } = require('./productRoutes');
router_user.use(methodOverride('_method'));


router_user.get('/', usersController.renderCreateFormUser)
router_user.post('/', usersController.createUsers);

router_user.get('/login', usersController.renderloginUser)
router_user.post('/login', usersController.login);

router_user.get('/profile', usersController.getUserProfile)

router_user.get('/logout', usersController.logout);

module.exports = router_user;