const express = require('express');
const router = express.Router();

router.get('/test', (req, res)=> res.send('LOG: THIS IS TEST'));

module.exports = router;