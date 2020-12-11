const express = require('express');
const app = express();
require('dotenv').config();
const {validameConfig} = require("validame");
validameConfig.language = "es";


// CORS
app.use(express.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Content-Disposition");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    next();
});
app.use(express.json());


//conexión db
const dbconnect = require('./config/dbconnect');
dbconnect();


//port listen
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('servidor arrancado en ' + PORT));

app.options('/*', (req, res) => res.send());


// Routes
app.use(require("./routes/usuariorouter"));
// app.use(require("./routes/usuariorouter"));
// app.use(require("./routes/usuariorouter"));


