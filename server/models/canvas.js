const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const canvasSchema = new Schema({
    image:  String,
    user:  String 
});

const Canvas = mongoose.model("canvas", canvasSchema);
module.exports = { Canvas }