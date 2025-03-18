const {default: mongoose} = require("mongoose");

const PagesSchema = new mongoose.Schema({
    brandName: {
        type: String,
        required: true,
    },
    brandDescription: {
        type: String,
        required: true,
    },
    pageImage: {
        type: String,
        required: true,
    },
    pageCoverImage: {
        type: String,
        required: true,
    },

    websiteUrl: {
        type: String,
        required: true,
    },
    mode: {
        type: String,
        default: "light",
        enum: ["light", "dark"],
    },
    componentType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Component",
        required: true
    },
    industry: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Industry",
        required: true
    },
    stacks: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Stack",
        required: true
    },
    style: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Style",
        required: true
    },
    type: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Type",
        required: true
    },
    colorPalette: {
        type: Array,
        required: true
    },
}, { timestamps: true });


module.exports = mongoose.model("Page", PagesSchema);
