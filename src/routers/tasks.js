const express = require('express');
const Task = require('../models/tasks');
const auth = require('../middleware/auth');
const router = new express.Router();


router.post('/tasks', auth,async (req,res) => {
    // const task = new Task(req.body);
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })
    try {
        await task.save()
        res.status(201).send(task);
    } catch (error) {
        res.status(400).send(error);
    }

})


router.get('/tasks', auth,async (req,res)=>{
    
    try {
        // const tasks = await Task.find({owner: req.body._id})
        await req.user.populate('tasks').execPopulate()
        res.send(req.user.tasks)
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
    
})


router.get('/tasks/:id',auth, async (req,res)=>{
    const _id =  req.params.id

    try {
        // const task = await Task.findById(_id)
        const task = await Task.findOne({_id,owner: req.user._id})
        if(!task){
            res.status(404).send()
        }
        res.send(task)
    } catch (error) {
        res.status(500).send()
    }

})


router.patch('/tasks/:id', async (req,res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description','completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({"error":"Invalid Updates!"})
    }

    try {
        // const task  = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})

        const task = await Task.findById(req.params.id)

        updates.forEach((update) => task[update] = req.body[update])
        await task.save()


        if(!task){
            return res.status(404).send()
        }

        res.send(task)
        
    } catch (error) {
        res.status(400).send(error)
    }

})

router.delete('/tasks/:id', async (req,res) =>{
    try {
        const task = await Task.findByIdAndDelete(req.params.id)

        if(!task){
            return res.status(404).send({"error":"Task does not exists!"})
        }

        res.send(`${task}\nTask removed`)
    } catch (error) {
        res.status(500).send()
    }
})


module.exports = router