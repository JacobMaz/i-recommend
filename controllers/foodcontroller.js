const express = require('express');
const router = express.Router();
const {Food} = require('../models');

router.get('/test', (req, res)=> res.send('LOG: THIS IS TEST'));

module.exports = router;