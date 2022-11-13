const express = require('express');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));