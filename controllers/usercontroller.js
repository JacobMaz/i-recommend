const router = require('express').Router();
const {User} = require('../models')

router.get("/test", (req, res) => res.send("THIS IS A TEST!"))

module.exports = router;

router.post('/register', async (req, res)=>{
    try {
        let {username, password} = req.body
        const newUser = await User.create({
            username,
            password
        })
        res.status(201).json({
            message: 'User registered!',
            user: newUser
        })
    } catch (error) {
        res.status(500).json({
            error: 'Failed to register user.'
        })
    }
});

module.exports = router;