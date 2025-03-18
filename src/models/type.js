const {default: mongoose} = require("mongoose");


module.exports = mongoose.model("Type",
    new mongoose.Schema({
        title: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        }
    }, { timestamps: true })
);
