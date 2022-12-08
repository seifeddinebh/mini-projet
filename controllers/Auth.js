const User = require('../Models/user')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");


exports.register = async (req, res) => {
    try {
        // Recherche d email
        const trouve = await User.findOne({ email: req.body.email })
        if (trouve) {
            res.send('email de existe')
        } else {
            // Cryptage de mot de passe     
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(req.body.password, salt);
            req.body.password = hash

            // Create  Register    
            
            let transporter = nodemailer.createTransport({
                service: "gmail",

                auth: {
                    user: 'houidiseifeddine854@gmail.com', // generated ethereal user
                    pass: 'xbksitgynpobeytm', // generated ethereal password
                },
            });

            // send mail with defined transport object
            let info = await transporter.sendMail({
                from: 'houidiseifeddine854@gmail.com', // sender address
                to: req.body.email, // list of receivers
                subject: "Hello ✔", // Subject line
                html: `
                <h1>Email de Confirmation</h1>
                <h2>Salut ${req.body.firstname}</h2>
                <p> 
                
                Merci pour votre inscription <br></br>
                Vous etes inscrits dans notre site <br></br>
                Bienvenue dans notre plateform <br></br>
                Merci   
                
                </p>
                `,
                attachments: [{
                    // file on disk as an attachment
                    filename: 'cleancodenodejsfullstack.pdf',
                    //: './common/text.txt' // stream this file
                    path: './TutorialsPointnode.js.pdf'
                }]
            });
            const user = await User.create(req.body)
            res.status(201).json(user)
        }

        // Erreur Serveur
    } catch (err) {
        console.log(err);
        res.status(500).json('erreur serveur')
    }

};







exports.login = async (req, res, next) => {
    try {
        const connecteduser = await User.findOne({ email: req.body.email })
        console.log(connecteduser)

        // Si l objet est vide 
        if (connecteduser === null) {
            return res.status(401).json({ message: 'Paire login/mot de passe incorrecte' });
        }
        // Decryptage de mot de passe et comparaison     
        bcrypt.compare(req.body.password, connecteduser.password)
            .then(valid => {
                if (!valid) {
                    return res.status(401).json({ message: 'Paire login/mot de passe incorrecte' });
                }
                // Construction du Token

                // Data envoyé par le Token
                const data = {
                    UserId: connecteduser._id,
                    useremail: connecteduser.email
                }
                const token = jwt.sign(data, 'shhhhh', { expiresIn: '1h' });// Duree du Token
                res.status(200).json(token);

            })
            .catch(error => res.status(401));

    }

    catch (err) {
        res.status(500).json('erreur serveur')

    }

}