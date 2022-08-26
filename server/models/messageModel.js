const mongoose = require("mongoose")
const Schema = mongoose.Schema;


var messageSchema = new Schema({
        username: String,
        room: String,
        message: String,
        date: String,
        time: String
});

var messageModel = mongoose.model("messages", messageSchema);

module.exports = messageModel