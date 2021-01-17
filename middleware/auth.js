const UsuarioModel = require( '../models/Usuario' );
const jwt = require( 'jsonwebtoken' );


const tieneAutorizacion = async ( req, res, next ) => {

    const token = req.headers.authorization;

    try {
        let decoded = jwt.verify( token, "6xFKGz3jMsQuvEAk" ); 
        
        req.usuario = decoded; 
        next();

    } catch ( error ) {
        console.error( error )
        res.status( 401 ).send({ message: 'No estás autorizado.'} )
    }
};

module.exports = tieneAutorizacion;