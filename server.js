const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser')
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
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

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

const userRoutes = require("./src/routes/user");
app.use("/api", userRoutes);

const songRoutes = require("./src/routes/song");
app.use("/api", songRoutes);