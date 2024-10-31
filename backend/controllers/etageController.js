import { Etage } from "../models/EtageModel.js";
import { Rayon } from "../models/RayonModel.js";

import { User } from "../models/UserModel.js";

const getEtages = async(req, res) => { 
    try {
        const { idRayon } = req.params;
        
        const rayon = await Rayon.getRayon(idRayon);


        
        if (!rayon) {
            throw new Error("rayon not found");
        }

        const etages = await Etage.getEtagesPerRayon(rayon._id);

        res.status(201).json({ data: etages });
    } catch (error) {
        console.log("Error:", error.message);
        res.status(400).json({ error: error.message });
    }
};


//  ajouter 
const addEtage = async(req , res)=>{
    const newData = req.body; 
 
    try {
       
        const newEtage = await Etage.createEtage(newData)
        res.status(201).json(newEtage);
        } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


//modifier


const editEtage= async(req , res)=>{
    const { id } = req.params;
    const newDate= req.body;  
    try {       
        const updateEtage = await Etage.updateEtage( id, newDate)
        res.status(201).json(updateEtage);
        } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// delete 


const deleteEtage = async(req , res)=>{
    const { id } = req.params;
 
    try {
       
        const result = await Etage.supprimerEtage( id)
        res.status(201).json({id : id});
        } catch (error) {
        res.status(400).json({ error: error.message });
    }
};





export {getEtages , addEtage  , editEtage , deleteEtage}