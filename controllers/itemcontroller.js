const express = require('express');
const router = express.Router();
const {Item, Like} = require('../models');

router.get('/test', (req, res)=> res.send('Item: THIS IS A TEST'))

router.post('/create', async (req, res)=>{
    try {
        const {name, foodId} = req.body;
        let newItem = await Item.create({ name, userId: req.user.id, foodId });
        res.status(200).json({
            item: newItem,
            message: 'Item Added'
        })
    } catch (error) {
        res.status(500).json({
            message: 'Failed to add Item'
        })
    }
})

router.delete('/:id', async (req, res)=>{
    try {
        let item = await Item.findOne({where: {id: req.params.id}})
        if(item.userId === req.user.id){
            await Item.destroy({
                where: {id: req.params.id}
            })
            res.status(200).json({
                message: 'Item Deleted!'
            })
        }else{
            res.status(500).json({
                error: 'You Do Not have Permission!'
            })
        }
    } catch (error) {
        res.status(500).json({
            error: 'Could Not Delete Item'
        })    
    }
})

router.put('/:id', async (req, res)=>{
    try {
        let editItem = await Item.findOne({
            where: {id: req.params.id}
        })
        if(editItem.userId === req.user.id){
            let query = req.params.id
            await Item.update(req.body, {where: {id: query}})
                .then((itemUpdated)=>{
                    Item.findOne({
                        where: {id: query}
                    }).then((updatedItem)=>{
                        res.status(200).json({
                            updatedItem: updatedItem,
                            message: 'Item Updated!',
                            itemUpdated: itemUpdated
                        })
                    })
                })
        } else {
            res.status(500).json({
                error: 'You Do Not Have Permission!'
            })
        }
    } catch (error) {
        res.status(500).json({
            error: 'Nope!'
        })
    }
})

module.exports = router