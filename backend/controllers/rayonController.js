
import {Rayon} from "../models/RayonModel.js"

import { User } from "../models/UserModel.js";

const getRayons = async(req, res) => { 
    try {

        const { id } = req.params;

        // const depot_id = user.depot._id;

        const rayons = await Rayon.getRayonsPerDepot(id);

        res.status(201).json({ data: rayons });
    } catch (error) {
        console.log("Error:", error.message);
        res.status(400).json({ error: error.message });
    }
};


//  ajouter 
const addRayon = async(req , res)=>{
    const newData = req.body; 

 
    try {
       
        const newRayon = await Rayon.createRayon(newData)
        res.status(201).json(newRayon);
        } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// modifier
const editRayon= async(req , res)=>{
    const { id } = req.params;
    const newDate= req.body; 
 
    try {
       
        const updateRayon = await Rayon.updateRayon( id, newDate)
        res.status(201).json(updateRayon);
        } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// delete 


const deleteRayon = async(req , res)=>{
    const { id } = req.params;
 
    try {
       
        const result = await Rayon.supprimerRayon( id)
        res.status(201).json({id : id});
        } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


export {getRayons , addRayon , editRayon , deleteRayon}