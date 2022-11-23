const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser')
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));
app.use(cookieParser());

const db = require("./src/models");
db.sequelize.sync({ force: true })
.then(() => {
console.log("Synced db.");
})
.catch((err) => {
console.log("Failed to sync db: " + err.message);
});

app.get("/", (req, res) => {
    res.json({ message: "Welcome to bezkoder application." });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

const userRoute = require("./src/routes/user");
app.use("/api", userRoute);