const express = require('express');
const app = express();
const route = require('./routes/battle.routes');
const createError = require('http-errors')
const cors = require('cors');
app.use(cors())
app.use('/battle', route);

//Database Connection
require('../battle-backend/configuration/database.configuration')

app.use((req, res, next) => {
    next(createError(404));
})


app.use((error, req, res, next) => {
    let response = {
        success: false,
        status: 500,
        message: error.message
    };
    res.json(response);
})

app.listen(3001, (() => {
    console.log("Server is Listening to Port 3001");
}))