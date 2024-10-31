import {mongoose} from "mongoose";
import bcrypt from 'bcrypt';
import validator from "validator";
const Schema = mongoose.Schema

import { Rayon } from "../models/RayonModel.js";
import { Etage } from "./EtageModel.js";
import { Cellule } from "./CelluleModel.js";


const depotSchema = new Schema({
 
    name : {
        type : String ,
        required : true ,
        unique : true ,
    },

})


// all depots : 

depotSchema.statics.getDepots = async function( ){

    const depots = await this.find()
   
   return depots

}



// ajouter depot 

depotSchema.statics.createDepot = async function(newData) {

    
    // Validation email, prénom, nom de famille, password, and type
    if (!newData.name ) {
        throw new Error("All fields must be filled");
    }

    const name = newData.name.trim();
  
    // Vérifier si l'email existe déjà
    const exists = await this.findOne({ name });
    if (exists) {
        throw new Error("Depot already exist");
    }



    const depot = await this.create({
        name
    });

    return depot;
};


// suprimer depot

depotSchema.statics.supprimerDepot = async function( _id ){

    
    const rayonsExists = await Rayon.exists({ depot: _id });

    if (rayonsExists) {
        throw new Error("Impossible de supprimer un depot contenant des rayons");
    }

    const res = await this.deleteOne({ _id })
    if (res.deletedCount === 0){
        throw Error("depot n'existe pas");
    }
   return true

}


// update user  

depotSchema.statics.updateDepot = async function(_id, newData) {
    try {
        const depot = await this.findOne({ _id })

        if (!newData.name ) {
            throw new Error("All fields must be filled");
        }

        if(newData.name.trim() !== depot.name){
            const existe = await this.findOne({name : newData.name.trim()})

            if(existe){
                throw new Error("L'element deja existe !");
            }
    
        }

     
       

        if (newData.name) {
            depot.name = newData.name.trim();
        }


        // Enregistrement des modifications dans la base de données
        const updatedDepot = await depot.save();

        return updatedDepot;

    } catch (error) {
        throw new Error( error.message);
    }
};

// count Depots

depotSchema.statics.countDepots = async function() {
    try {
        const count = await this.countDocuments();
        return count;
    } catch (error) {
        console.error(error);
        throw new Error(error.message);
    }
};


// nombre des cellules dans depot 

depotSchema.statics.countCellulesInDepot = async function(depotId) {
    try {
        // Trouver tous les rayons associés au dépôt
        const rayons = await Rayon.find({ depot: depotId });

        // Trouver tous les étages associés aux rayons
        const etages = await Etage.find({ rayon: { $in: rayons.map(rayon => rayon._id) } });

        // Compter toutes les cellules associées aux étages
        const celluleVide = await Cellule.countDocuments({
            etage: { $in: etages.map(etage => etage._id) },
            estPlain: false ,
            articles: { $size: 0 }
        });

        const celluleSemiVide = await Cellule.countDocuments({
            etage: { $in: etages.map(etage => etage._id) },
            estPlain: false ,
            articles: { $elemMatch: { qte: { $gt: 0 } } }
        });

        const cellulePlein = await Cellule.countDocuments({
            etage: { $in: etages.map(etage => etage._id) },
            estPlain: true
        });

        

        

        return {cellulePlein ,celluleVide , celluleSemiVide }
    } catch (error) {
        console.error("Erreur lors du comptage des cellules vide:", error.message);
        throw new Error('Erreur lors du comptage des cellules vide: ' + error.message);
    }
}

// nombre article par dépot : 

depotSchema.statics.countArticlesInDepot = async function(depotId) {
    try {
        // Trouver tous les rayons associés au dépôt
        const rayons = await Rayon.find({ depot: depotId });

        // Trouver tous les étages associés aux rayons
        const etages = await Etage.find({ rayon: { $in: rayons.map(rayon => rayon._id) } });

        // Compter toutes les cellules associées aux étages
        const cellules = await Cellule.find({
            etage: { $in: etages.map(etage => etage._id) },
        }).populate({
            path: "articles.article",
            select: "ref designation"
        });

        // Utiliser un ensemble pour stocker les références d'articles uniques
        const uniqueArticles = new Set();

        cellules.forEach(cellule => {
            if (cellule.articles && cellule.articles.length > 0) {
                cellule.articles.forEach(articleObj => {
                    // Ajouter l'identifiant unique de l'article à l'ensemble
                    uniqueArticles.add(articleObj.article.ref); // Supposant que 'ref' est l'identifiant unique
                });
            }
        });

        // Compter le nombre d'articles uniques
        const totalUniqueArticles = uniqueArticles.size;
        

        return totalUniqueArticles;
    } catch (error) {
        console.error("Erreur lors du comptage des articles dans le dépôt:", error.message);
        throw new Error('Erreur lors du comptage des articles dans le dépôt: ' + error.message);
    }
}





export const Depot = mongoose.model('Depot' , depotSchema);








