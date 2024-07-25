const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8080;


//schema 
const schemaData = mongoose.Schema({
    name : String, 
    email : String,
    mobile : String,
    city : String,
    state : String

}, {timestamp: true});


//model
const userModel = mongoose.model("user", schemaData);


// Create or Save Data in MongoDB
// ​http://localhost:8080/create
app.post("/create", async(req, res) => {
    console.log(req.body);
    const data = new userModel(req.body);
    await data.save();
    res.send({ success: true, message : 'Data Saved Successfully..'})

});


// Update Data in MongoDB
// ​http://localhost:8080/update
app.put("/update", async(req, res) => {
    console.log(req.body);
    const {id, ...rest}= req.body;
    const data = await userModel.updateOne({_id : id}, rest);
    res.send({ success: true, message : 'Data Saved Successfully..', data : data})

});


// Read Data From Database -> MongoDB
// ​http://localhost:8080
app.get("/", async(req, res) => {
    const data = await userModel.find({});
    res.json({ success: true, data : data });

});

 

// Delete Data From Database -> MongoDB
// ​http://localhost:8080/delete/<id>
app.delete("/delete/:id", async(req, res) => {
    const id = req.params.id;
    console.log(id);
    const data = await userModel.deleteOne({_id : id});
    res.send({ success: true, message : 'Data Deleted Successfully..', data : data})

});



mongoose.connect("mongodb://localhost:27017/reactcrud")
.then(() => {
    console.log('Connect to DB');
    app.listen(PORT, () => console.log('Server is Running'));
})  
.catch ((err => console.log(err)));

