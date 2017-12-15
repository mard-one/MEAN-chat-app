const router = require('express').Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('../config');

const User = require('../models/user');

const Verify = require('./middleware/authentication');
const PageInit = require('../controllers/pageInit');

router.get("/pageInit", Verify, PageInit)

module.exports = router
