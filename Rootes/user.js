const express = require('express');
const passport = require('passport');
const router = express.Router();

const  { 
    RecupererUser,
    AjouterUser,
    ModifierUser,
    SupprimerUser,
    RecupererIdUser ,
    effecte,
    dessaffecte
   
} = require('../controllers/user.js')

router.get('/user' ,passport.authenticate('bearer', { session: false }) ,RecupererUser);

router.post('/user',AjouterUser);

router.put('/user/:iduser',ModifierUser);

router.delete('/user/:iduser',SupprimerUser) ;

router.get('/user/:iduser' , RecupererIdUser);

router.put('/user/effecte/:iduser/:idmission',effecte) ;

router.put('/user/dessaffecte/:iduser/:idmission' , dessaffecte);


  
module.exports= router