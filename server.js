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
    origin: ['http://localhost:3000', 'https://localhost:3003', process.env.CLIENT_URL],
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

const userRoutes = require("./src/routes/user");
app.use("/api", userRoutes);

const songRoutes = require("./src/routes/song");
app.use("/api", songRoutes);

const subsRoutes = require('./src/routes/subscription');
app.use('/api/subs', subsRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});