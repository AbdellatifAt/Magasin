import { Etage } from "../models/EtageModel.js";
import {Cellule} from "../models/CelluleModel.js"


const getCellules = async(req, res) => { 
    try {
        const { idEtage } = req.params;
        
        const etage = await Etage.getEtage(idEtage);


        
        if (!etage) {
            throw new Error("etage not found");
        }

        const cellules = await Cellule.getCellulesPerEtage(etage._id);

        res.status(201).json({ data: cellules });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


//  ajouter 
const addCellule = async(req , res)=>{
    const newData = req.body; 
 
    try {
       
        const newCellule = await Cellule.createCellule(newData)
        res.status(201).json(newCellule);
        } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


//modifier


const editCellule= async(req , res)=>{
    const { id } = req.params;
    const newDate= req.body;  
    try {       
        const updateCellule = await Cellule.updateCellule( id, newDate)
        res.status(201).json(updateCellule);
        } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// edit status palin Cellule 

const editStatusIsPlainCellule= async(req , res)=>{
    const newDate= req.body;  

    
    try {       
        const updateCellule = await Cellule.updateStatusIsPlain(newDate)
        res.status(201).json({data : updateCellule});
        } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// delete 


const deleteCellule = async(req , res)=>{
    const { id } = req.params;
 
    try {
       
        const result = await Cellule.supprimerCellule( id)
        res.status(201).json({id : id});
        } catch (error) {
        res.status(400).json({ error: error.message });
    }
};



const getCellule = async (req , res) =>{
    const { id } = req.params;
    
 
    try {
       
        const result = await Cellule.getCellule( id)
       
        
        res.status(201).json({data : result});
        } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


//   gestions des articles in cellule 

const addArticleToCellule = async(req , res) =>{ 

    const newData = req.body; 
 
    try {
       
        const newCellule = await Cellule.addArticleToCellule(newData)
        res.status(201).json({data : newCellule});
        } catch (error) {
        res.status(400).json({ error: error.message });
    }

} 


const deleteArticleInCellule = async(req , res) =>{ 

    const newData = req.body; 
 
    try {
       
        const updateCellule = await Cellule.removeArticleFromCellule(newData)
        res.status(201).json({data : updateCellule});
        } catch (error) {
        res.status(400).json({ error: error.message });
    }


} 


const updateArticleInCellule = async(req , res) =>{ 

    const newData = req.body; 
 
    try {
       
        const updateCellule = await Cellule.updateArticleQuantityInCellule(newData)
        res.status(201).json({data : updateCellule});
        } catch (error) {
        res.status(400).json({ error: error.message });
    }


} 


const getCellulesArticlesDetails = async(req, res) =>{
 
    try {
       
        const detialsCellules = await Cellule.getCellulesArticlesDetails()

        console.log(detialsCellules);
        
        res.status(201).json({data : detialsCellules});
        } catch (error) {
        res.status(400).json({ error: error.message });
    }
}




export{
        getCellules , 
        addCellule  , 
        editCellule , 
        deleteCellule , 
        addArticleToCellule ,
        getCellule ,
        editStatusIsPlainCellule ,
        deleteArticleInCellule ,
        updateArticleInCellule ,
        getCellulesArticlesDetails
    }