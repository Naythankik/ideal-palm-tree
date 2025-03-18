const {default: mongoose} = require("mongoose");
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        required: true,
        default: "admin"
    },
    passwordResetToken: String,
    forgetPasswordExpires: Date,
    verificationToken: String,
}, { timestamps: true });


UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

UserSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

module.exports = mongoose.model("User", UserSchema);
