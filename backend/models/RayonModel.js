import {mongoose} from "mongoose";
import bcrypt from 'bcrypt';
import validator from "validator";
import { Etage } from "../models/EtageModel.js";
const Schema = mongoose.Schema



const rayonSchema = new Schema({
 
    name : {
        type : String ,
        required : true ,
        //unique : true ,
    },

    depot: {
        type: Schema.Types.ObjectId,
        ref: 'Depot'
    }
    
})


// all rayon par depot  (il faut modifier) : 

rayonSchema.statics.getRayonsPerDepot = async function(depotId) {
    try {
        const rayons = await this.find({ depot: depotId }).populate({
            path: "depot",
            select: "name" 
        }).sort({ _id: 1 });

        return rayons;
    } catch (error) {
        console.log(error.message);
        throw new Error('Erreur lors de la récupération des rayons: ' + error.message);
    }
};


// ajouter Rayon 

rayonSchema.statics.createRayon = async function(newData) {

    if (!newData.name || !newData.depot ) {
        throw new Error("Il est nécessaire de remplir tous les champs.");
    }

    const name = newData.name.trim();
    const depot = newData.depot;

    const existingRayon = await this.findOne({ name, depot });
    if (existingRayon) {
        throw new Error("L'element deja existe !");
    }
     

    const rayon = await this.create({
        name,    
        depot , 
    });

    const newRayon = await this.findOne({ name }).populate({
        path: "depot",
        select: "name" // Sélectionne uniquement le nom du dépôt
    })

    return newRayon;
};


rayonSchema.statics.supprimerRayon = async function( _id ){

    const etagesExists = await Etage.exists({ rayon: _id });

    if (etagesExists) {
        throw new Error("Impossible de supprimer un rayon contenant des etages");
    }


    const res = await this.deleteOne({ _id })
    if (res.deletedCount === 0){
        throw Error("Rayon n'existe pas");
    }
   return true

}


// update Rayon 

rayonSchema.statics.updateRayon = async function(_id, newData) {
    try {

        const rayon = await this.findOne({ _id });

        if (rayon.name !==newData.name.trim()){
            const existingRayon = await this.findOne({ name : newData.name.trim()  , depot : rayon.depot });
            if (existingRayon) {
                throw new Error("L'element deja existe !");
            }
            
        }

        if (newData.name) {
            rayon.name = newData.name.trim();
        }

        // Enregistrement des modifications dans la base de données
        const updatedrayon = await rayon.save();

        const newRayon = await this.findOne({ _id: updatedrayon._id }).populate({
            path: "depot",
            select: "name" 
        });

        return newRayon;
        
    } catch (error) {
        throw new Error(error.message);
    }
};

// get Rayon 

rayonSchema.statics.getRayon = async function(_id) {
    try {
        const rayon = await this.findById(_id).populate({
            path: "depot",
            select: "name"
        });        

        if (!rayon) {
            throw new Error('rayon not found');
        }

        return rayon;
    } catch (error) {
        console.log(error.message);
        throw new Error('Erreur lors de la récupération de l\'utilisateur: ' + error.message);
    }
};




export const Rayon = mongoose.model('Rayon' , rayonSchema);