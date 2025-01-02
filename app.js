const fs = require('fs');
const morgan = require('morgan');
const express = require('express');
const playerRouter = require('./Routers/playerRoute')
const app = express();



app.use(express.json());
app.use(morgan('combined'));



app.use("/api/app/players", playerRouter);








module.exports = app;
