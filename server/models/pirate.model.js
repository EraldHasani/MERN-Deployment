const mongoose = require('mongoose');

const PirateSchema = new mongoose.Schema({

pirateName: {
    type: String,
    required: [true, "Pirate Name is required"],
    minlength: [5, "Pirate Name must be at least 5 characters long"],
    maxlength: [30, "Pirate Name must be no longer than 30 characters"]

},
imageUrl: {
    type: String,
    required: [true, "ImageUrl is required"],
},
treasureChests: {
    type: Number,
},
catchPhrase: {
    type: String,
    required: [true, "Catch Phrase is required"],
    minlength: [5, "Catch Phrase must be at least 5 characters long"],
},
crewPosition: {
    type: String,
    default: "Sailer",
    
},
pegLeg: {
    type: Boolean,
    default: false,
},
eyePatch: {
    type: Boolean,
    default: false,
},
hookHand: {
    type: Boolean,
    default: false,
},
UserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
}

}, {timestamps: true});


module.exports = mongoose.model("Pirate", PirateSchema);