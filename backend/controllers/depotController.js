import {Depot} from "../models/DepotModel.js";
import { User } from "../models/UserModel.js";

const getDepots = async(req , res)=>{ 

    try{
        const depots = await Depot.getDepots()

        res.status(201).json({ data : depots})

    }catch(error){
        res.status(400).json({ error: error.message })
    }
};


//  ajouter 
const addDepot = async(req , res)=>{
    const newData = req.body; 
 
    try {
       
        const newDepot = await Depot.createDepot(newData)
        res.status(201).json(newDepot);
        } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// modifier
const editDepot = async(req , res)=>{
    const { id } = req.params;
    const newDate= req.body; 
 
    try {
       
        const updateDepot = await Depot.updateDepot( id, newDate)
        res.status(201).json(updateDepot);
        } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// delete 


const deleteDepot = async(req , res)=>{
    const { id } = req.params;
 
    try {
       
        const result = await Depot.supprimerDepot( id)
        res.status(201).json({id : id});
        } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


export {getDepots , addDepot , editDepot , deleteDepot}