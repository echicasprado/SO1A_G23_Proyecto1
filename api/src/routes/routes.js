const express = require('express')
const { json } = require('body-parser')
const mongoose = require('mongoose')
const Case = require('../models/case')

let router = express.Router()

router.route('/api/data').post((req,res)=>{
    const data = req.body
    //Simulate traffic type
    data.type = 'msqRabbit'
    data._id = mongoose.Types.ObjectId()

    console.log(data)
    let cases = new Case(data)
    cases.save(function(err,cases){
        if(err) return console.log("ERORR")
        console.log("Data Saved")
    })

    res.send('OK')
})

router.route('/api/cases/departments/top5').get(async(req,res)=>{
    const docs = await Case.aggregate([
        {$group:{
            _id:"$location",
            count:{$sum:1}
        }},
        {$sort:{"count":-1}},
        {"$limit":5}
    ])
    res.json(docs)
})

module.exports = router