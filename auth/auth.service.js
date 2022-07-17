const compose = require('composable-middleware');
const { json } = require('express');
const jsonWebToken = require('jsonwebtoken');
const pool = require('../config/database');

function isAuth(){
    return compose().use(async(req, res, next)=>{
        const authHeader = req.headers.authorization;
        if(!authHeader){
            return res.status(401).json({message: 'No token provided'});
        }
        const token = authHeader.slice(7);
        const payload = await verifyToken(token);
        if(!payload){
            return res.status(401).json({message: 'Invalid token'});
        }
        const user = await pool.query('SELECT * FROM public."user" WHERE "email" = $1', [payload.email]);
        if(user.rows.length === 0){
            return res.status(401);
        }
        req.user = user.rows[0];
        req.body.user = req.user.ID;
        next();

    });
}

async function verifyToken(token){
    try{
        return await jsonWebToken.verify(token, process.env.JWT_SECRET);
    }catch(err){
        return null;
    }
}

function signToken(payload){
    const token  = jsonWebToken.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '2h'
    });
    return token;
}

module.exports = {
    isAuth,
    signToken,
    verifyToken
}
