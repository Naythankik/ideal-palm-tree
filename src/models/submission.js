const {default: mongoose} = require("mongoose");

const SubmissionSchema = new mongoose.Schema({
    websiteName: String,
    websiteUrl: String,
    aboutWebsite: String
}, { timestamps: true });


module.exports = mongoose.model("Submission", SubmissionSchema);
