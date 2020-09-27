const mongoose = require("mongoose")

require('../../models/Data')
const dataModel = mongoose.model('Data')

module.exports = function(app){
    app.post('/save-data/:key', async function(req, res){ 
        const updatedData = await dataModel.findOneAndUpdate({ Key: `${req.params.key}` }, {$set:{ Data: [ req.body.SaveData ] , DataType: req.body.DataType }}, function(err, doc){
            if(err){
                console.log("Something wrong when updating data!");
                res.status(400)
                res.json(err)
            }
        
            res.status(200)
            res.json(doc.Data[0])
        })
    });
}