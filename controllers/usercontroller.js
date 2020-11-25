const router = require('express').Router();
const {User} = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.get("/test", (req, res) => res.send("THIS IS A TEST!"))

router.post('/register', async (req, res)=>{
    try {
        let {username, password} = req.body
        const newUser = await User.create({
            username,
            password: bcrypt.hashSync(password, 13)
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

router.post('/login', async (req, res) =>{
    let {username, password} = req.body;
    try {
        let loginUser = await User.findOne({
            where: {username}
        })
        if(loginUser && await bcrypt.compare(password, loginUser.password)){
            const token = jwt.sign({id: loginUser.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24})
            res.status(200).json({
                message: 'Login Succeeded',
                user: loginUser,
                sessionToken: token
            })
        } else {
            res.status(401).json({
                message: 'Login Failed: Userinformation incorrect.'
            })
        }
    } catch (error) {
        res.status(500).json({error: 'Error Logging In.'})
    }
})

module.exports = router;