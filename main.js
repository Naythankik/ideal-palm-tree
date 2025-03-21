require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connection = require('./config/database');
const { authRoutes, userRoutes, adminRoutes} = require("./routes");
const authentication = require('./src/middlewares/authentication');


const PORT = process.env.PORT || 5000;
const app = express();
connection();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/landing-vault/auth', authRoutes);
app.use('/api/v1/landing-vault', userRoutes);
app.use('/api/v1/landing-vault', authentication, adminRoutes);

app.use("/", (req, res) => {

    res.status(200).json({
        success: true,
        message: "Welcome to Landing Vault.",
    });
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})
