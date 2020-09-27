const mongoose = require("mongoose")

require('../../models/Data')
const dataModel = mongoose.model('Data')

module.exports = function(app){
    app.get('/get-data/:key', async function(req, res){
        const data = await dataModel.findOne({ Key: `${req.params.key}` })
        let responseData

        if (data) {
            responseData = data
            res.json({ Data: responseData.Data[0] });
        } else {
            const newDataRecord = new dataModel({
                Key: `${req.params.key}`,
                Data: "",
                DataType: "string"
            })

            await newDataRecord.save()
            res.json({ Data: null });
        }
    });
}