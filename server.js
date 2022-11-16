const express = require('express');
const cors = require('cors');
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

app.get("/", (req, res) => {
    res.json({ message: "Welcome to bezkoder application." });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});