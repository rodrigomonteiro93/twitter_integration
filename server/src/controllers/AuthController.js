const User = require('../models/User');
var crypto = require('crypto');

require("dotenv-safe").config();
const jwt = require('jsonwebtoken');

module.exports = {
    async authentication(req, res) {
        let passwordMd5 = crypto.createHash('md5').update(req.body.password).digest("hex");

        const user = await User.findAll({
            where : {
                email : req.body.email,
                password : passwordMd5,
            }
        });

        if (user.length) {
            const id = user[0].id;
            const token = jwt.sign({ id }, process.env.SECRET, {
                expiresIn: 10000 
            });
            return res.json({ auth: true, token: token });
        }
          
        res.status(500).json({message: 'Login inválido!'});
    },

    async middleware(req, res, next) {
        const token = req.headers['x-auth-token'];

        if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });
        
        jwt.verify(token, process.env.SECRET, function(err, decoded) {
            console.log(err, decoded);
          if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
          
          req.userId = decoded.id;
          next();
        });
    },

    async check(req, res) {
        res.status(200).json('authenticated true');
    },
}