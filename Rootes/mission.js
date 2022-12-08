const express = require('express');

const router = express.Router();

const  { 
    RecupererMission,
    AjouterMission,
    ModifierMission,
    SupprimerMission,
    RecupererIdMission ,
   
} = require('../controllers/mission.js')

router.get('/mission',RecupererMission);

router.post('/mission',AjouterMission);

router.put('/mission/:idmission',ModifierMission);

router.delete('/mission/:idmission',SupprimerMission) ;

router.get('/mission/:idmission' , RecupererIdMission);


  
module.exports= router