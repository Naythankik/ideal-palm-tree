const {default: mongoose} = require("mongoose");

const IndustrySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
}, { timestamps: true });


module.exports = mongoose.model("Industry", IndustrySchema);
