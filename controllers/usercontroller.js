const router = require('express').Router();

router.get("/test", (req, res) => res.send("THIS IS A TEST!"))

module.exports = router;