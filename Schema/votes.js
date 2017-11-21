const mongoose = require("mongoose");

var voteSchema = mongoose.Schema({
    chatId: String,
    
    chatTiltle: String,
    //type: Number, //0:channel voting , 1:program voting
    date: {
        type: Date,
        default: Date.now
    },
    vote: {
        destinationId: mongoose.SchemaTypes.ObjectId, //channelId or programId
        score: { //0<=score<=5
            type: Number,
            default: 0
        }
    }
})
module.exports = mongoose.model("votes", voteSchema);