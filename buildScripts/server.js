var express = require('express')
var path = require('path')
var mongoose = require('mongoose')


const port = 3000;
const app = express();

mongoose.connect('mongodb://localhost:27017/mern-challenge').catch(error=>{
    console.log('error in connecting', error)
})
const myModel = mongoose.model('packages', new mongoose.Schema({
    _id: String,
    status: String
}))

app.listen(port, function (error) {
    if(error) {
        console.log(error);
    }
    console.log(`listening on port ${port}`)
});

app.get('/', function (req, res) {
    const filePath = path.join(__dirname, '../src/index.html');
    res.sendFile(filePath);
});

app.get('/api/packages', async function (req, res) {
    const data = await myModel.find()
    res.send({success: true, data})
})