const User = require('../Models/user');

/*
Fonction Recuperer recuperer les Donnees de la base de donnee
*/ 
exports.AjouterUser = async (req, res ) => {
    try { 
        const trouve = await User.findOne({ email: req.body.email })
        if (trouve) {
            res.status(200).send('email existe deja')
        } else {

            const user = await User.create(req.body)
            res.status(201).send(user)
        }
    } catch (error) {
        res.status(500).send(error)
    }

    
}
//////

exports.RecupererUser = async (req, res, next) => {
    try {

        const user = await User.find()
        console.log(req.user);

        if (user.length > 0) {
            res.status(200).send(user)
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


// UpDate 

/* Fonction Modifier pour modifier un element de la base de donnee suivant son ID */ 

 exports.ModifierUser = async (req, res, next) => {
     try {
         await User.findByIdAndUpdate(req.params.iduser, req.body).then(async function () {
            await User.findOne({ _id: req.params.iduser }).then(function (user) {

                res.status(200).send(user);
             })
         });
     } catch (error) {
         res.status(500).send(' error serveur ')
    }
 }

// // // Delete

// // /* Fonction Supprimer pour supprimer un element de la base de donnee suivant son ID */ 


 exports.SupprimerUser = async (req, res, next) => {
     try {
         const result = await User.findByIdAndRemove(req.params.iduser).then(function (user) {
             res.status(200).send(' deleted User done ');
         })
     }
     catch (error) {
         res.status(500).send('error serveur ')
     }

}


// // /* Fonction RecupererId pour recuperer un element de la base de donnee suivant son ID */ 

 exports.RecupererIdUser = async (req, res) => {
     try {
         const result = await User.findById(req.params.iduser).populate('modelmission')
        if(result){
             res.status(200).send(result)
         }else
         {
             res.status(400).send('introuvable')
         } 
     }
     catch (error) {
         res.status(500).send(error)
    }
 }


 exports.effecte = async (req, res) => {
 try {
         await User.findByIdAndUpdate(req.params.iduser, { $push: { modelmission: req.params.idmission } }) //.then(async function () {
             const user = await User.findById( req.params.iduser )
             res.status(200).send(user);
         
     } catch (error) {
        res.status(500).send('error serveur ')
    }
 }


// // /* Fonction .dessaffecte supprimer un ID avec la fonction push a la base */ 

 exports.dessaffecte = async (req, res) => {
   try {
     await User.findByIdAndUpdate(req.params.iduser, { $pull: { modelmission: req.params.idmission } })
             const user = await User.findById( req.params.iduser )
             res.status(200).send(user)
   } catch (error) {
        res.status(500).send(error)
   }
}

