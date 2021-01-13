const dbconnect = () => {

    const mongoose = require("mongoose");
    //const uri = process.env.uri;
    const uri = "mongodb+srv://AdminRedSocial:BrPkfhntv4Ll2wFy@cluster0.x3nrp.mongodb.net/redSocial";

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