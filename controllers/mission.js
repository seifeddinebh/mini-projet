const Mission = require('../Models/modelmission');

/*
Fonction Recuperer recuperer les Donnees de la base de donnee
*/ 

exports.RecupererMission = async (req, res, next) => {
    try {

        const mission = await Mission.find()

        if (mission.length > 0) {
            res.status(200).send(mission)
        } else {
            res.status(400).send(' pas de User ')
        }

    } catch (error) {
        res.status(500).send(' error serveur ')
    }

   
};

// Add 

/*
Fonction Ajouter Ajouter des elements de la base de donnee
*/ 

exports.AjouterMission = async (req, res) => {
    try { 
         const mission = await Mission.create(req.body)
            res.status(201).send(mission)
        
    } catch (error) {
        res.status(500).send(' error serveur ')
    }

    
}

// UpDate 

/* Fonction Modifier pour modifier un element de la base de donnee suivant son ID */ 

exports.ModifierMission = async (req, res, next) => {
    try {
        await Mission.findByIdAndUpdate(req.params.idmission, req.body).then(async function () {
            await Mission.findOne({ _id: req.params.idmission }).then(function (mission) {

                res.status(200).send(mission);
            })
        });
    } catch (error) {
        res.status(500).send(' error serveur ')
   }
}

// Delete

/* Fonction Supprimer pour supprimer un element de la base de donnee suivant son ID */ 


exports.SupprimerMission = async (req, res, next) => {
    try {
        const result = await Mission.findByIdAndRemove(req.params.idmission).then(function (mission) {
            res.status(200).send(' deleted User done ');
        })
    }
    catch (error) {
        res.status(500).send({message:'error serveur '})
    }

}


/* Fonction RecupererId pour recuperer un element de la base de donnee suivant son ID */ 

exports.RecupererIdMission = async (req, res) => {
    try {
        const result = await Mission.findById(req.params.idmission)
        if(result){
            res.status(200).send(result)
        }else
        {
            res.status(400).send('introuvable')
        } 
    }
    catch (error) {
        res.status(500).send('error serveur ')
    }
}

