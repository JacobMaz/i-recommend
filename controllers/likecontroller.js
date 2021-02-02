const express = require('express');
const router = express.Router();
const {Like} = require('../models');

router.get('/test', (req, res)=> res.send('LIKE: THIS IS TEST'));

router.post('/add', async (req, res)=>{
    try {
        const {like, foodId} = req.body;
        let newLike = await Like.create({ like, userId: req.user.id, foodId});
        res.status(200).json({
            like: newLike,
            message: 'Like Added!'
        })
    } catch (error) {
        res.status(500).json({
            message: 'Failed to add Like'
        })
    }
})

router.delete('/:id', async (req, res) => {
    try{
        let like = await Like.findOne({where: {id: req.params.id}})
        if(like.userId === req.user.id){
            await Like.destroy({
                where: {id: req.params.id}
            })
            res.status(200).json({
                message: 'Like Deleted!'
            })
        } else {
            res.status(500).json({
                error: 'You Do Not Have Permission!'
            })
        }
    } catch (error){
        res.status(500).json({
            error: 'Could Not Delete Like'
        })
    }
})

module.exports = router