import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import validator from "validator";

import {Cellule} from "../models/CelluleModel.js"

const Schema = mongoose.Schema;

const etageSchema = new Schema({
    numero: {  // Corrected from "nemero"
        type: Number,
        required: true,
    },
    rayon: {
        type: Schema.Types.ObjectId,
        ref: 'Rayon',
        required: true
    }
});

// Get all etages per rayon
etageSchema.statics.getEtagesPerRayon = async function(rayonId) {
    try {
        const etages = await this.find({ rayon: rayonId })
            .populate({
                path: "rayon",
                select: "name"
            })
            .sort({ _id: 1 });

        return etages;
    } catch (error) {
        console.log(error.message);
        throw new Error('Erreur lors de la récupération des étages: ' + error.message);
    }
};

// Add a new etage
etageSchema.statics.createEtage = async function(newData) {
    if (!newData.numero || !newData.rayon) {  // Corrected from "nemero"
        throw new Error("All fields must be filled");
    }

    const existingItem = await this.findOne({ numero : newData.numero  , rayon : newData.rayon });
    if (existingItem) {
        throw new Error("L'element deja existe !");
    }

    const etage = await this.create({
        numero: newData.numero,  // Corrected from "nemero"
        rayon: newData.rayon
    });

    const newEtage = await this.findOne({ _id: etage._id })
        .populate({
            path: "rayon",
            select: "name"
        });

    return newEtage;
};

etageSchema.statics.supprimerEtage = async function (_id) {
   
    
    const celluleExists = await Cellule.exists({ etage: _id });

    if (celluleExists) {
        throw new Error("Impossible de supprimer un etage contenant des cellules");
    }

    // Proceed with deletion if no associated cellules are found
    const res = await this.deleteOne({ _id });
    if (res.deletedCount === 0) {
        throw new Error("Etage n'existe pas");
    }

    return true;
};


// Update an etage
etageSchema.statics.updateEtage = async function(_id, newData) {
    try {
        const etage = await this.findOne({ _id });

        if (!etage) {
            throw new Error("Etage not found");
        }

        if (etage.numero !==newData.numero){
            const existingItem = await this.findOne({ numero : newData.numero  , rayon : etage.rayon });
            if (existingItem) {
                throw new Error("L'element deja existe !");
            }
            
        }

        if (newData.numero) { 
            etage.numero = newData.numero;
        }
        

        const updatedEtage = await etage.save();

        const newEtage = await this.findOne({ _id: updatedEtage._id })
            .populate({
                path: "rayon",
                select: "name"
            });

        return newEtage;
    } catch (error) {
        throw new Error(error.message);
    }
};


// get etage 

etageSchema.statics.getEtage = async function(_id) {
    try {
        const etage = await this.findById(_id).populate({
            path: "rayon",
            select: "name"
        });        

        if (!etage) {
            throw new Error('etage not found');
        }

        return etage;
    } catch (error) {
        console.log(error.message);
        throw new Error('Erreur lors de la récupération de etage: ' + error.message);
    }
};




export const Etage = mongoose.model('Etage', etageSchema);
