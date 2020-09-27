const express = require('express')
const app = require('express')()
const bodyParser = require('body-parser');
const mongoose = require("mongoose")

const username = process.env.USERNAME
const passwordAuth = process.env.PASSWORD

const mongoPass = process.env.MONGO_PASS
const mongoUser = process.env.MONGO_USER

mongoose.connect(`mongodb+srv://${mongoUser}:${mongoPass}@cluster0.i3et1.gcp.mongodb.net/testing?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true });

var db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));

db.once("open", function() {
    console.log("Connection To MongoDB Atlas Successful!");
});

app.use(express.json());
app.use((req, res, next) => {  
    const auth = {login: username, password: passwordAuth}

    // parse login and password from headers
    const b64auth = (req.headers.authorization || '').split(' ')[1] || ''
    const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':')

    // Verify login and password are set and correct
    if (login && password && login === auth.login && password === auth.password) {
        // Access granted...
        return next()
    }

    res.set('WWW-Authenticate', 'Basic realm="401"')
    res.status(401).send('Authentication required.')
})

// Require the API Routes.
require('./API/routes')(app);

// Make the app listen to the port defined below.
const PORT = 3000
app.listen(PORT, () => {
    console.log("> App Listening to", PORT)
})