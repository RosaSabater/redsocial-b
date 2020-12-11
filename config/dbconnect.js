const dbconnect = () => {

    const mongoose = require("mongoose");
    require('dotenv').config();
    const uri = process.env.uri;

    mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: true
        }).then(() => {
            console.log('Conexión con db establecida.');
        })
        .catch(error => console.log('Error conectando con db' + error));
    
}
module.exports = dbconnect;