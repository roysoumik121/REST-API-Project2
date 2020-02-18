const express = require('express');
const mongoose = require('mongoose');
const newsdb = require('../database/newsdb.js');
const router = express.Router();



//  Read news categories from the DB
router.get('/categories', (req, res, next)=>{
    var arr = []  
    mongoose.connection.db.listCollections().toArray(function (err, names) {
        for(let i=0;i<names.length;i++){
            arr.push(names[i].name)
        }
        res.send(arr);
    });
})


//  Read news on a specific category from the DB
router.get('/:category', (req, res, next)=>{
    let model = newsdb[req.params.category];
    model.find({}).then((entry)=>{
        res.send(entry);
    }).catch(next);
})


//  Create news on a specific category in the DB
router.post('/:category', (req, res, next)=>{
    let model = newsdb[req.params.category];
    model.create(req.body).then((entry)=>{
        res.send(entry);
    }).catch(next);
})


//  Edit news on a specific category in the DB
router.put('/:category/:id', (req, res, next)=>{
    let model = newsdb[req.params.category];
    model.findByIdAndUpdate({_id:req.params.id}, req.body).then(()=>{
        model.findOne({_id:req.params.id}).then((entry)=>{
            res.send(entry);
        })
    }).catch(next);
})


//  Delete news on a specific category in the DB
router.delete('/:category/:id', (req, res, next)=>{
    let model = newsdb[req.params.category];
    model.findByIdAndRemove({_id:req.params.id}).then((entry)=>{
        res.send(entry);
    }).catch(next);
})


module.exports = router;