import { Article } from "../models/ArticleModel.js";
import xlsx from "xlsx"
import path from 'path';

// get all articles 

const getArticles = async(req, res) => { 
    try {
        const articles = await Article.getAllArticles();

        res.status(201).json({ data: articles });
    } catch (error) {
        console.log("Error:", error.message);
        res.status(400).json({ error: error.message });
    }
};

//  ajouter 
const addArticle = async(req , res)=>{
    const newData = req.body; 
 
    try {
       
        const newarticle = await Article.createArticle(newData)
        res.status(201).json({data : newarticle});
        } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

//modifier


const editArticle= async(req , res)=>{
    const { id } = req.params;
    const newDate= req.body;  
    try {       
        const updateItem = await Article.updateArticle( id, newDate)
        res.status(201).json({data : updateItem});
        } catch (error) {
        res.status(400).json({ error: error.message });
    }
};



// delete 


const deleteArticle = async(req , res)=>{
    const { id } = req.params;
 
    try {
       
        const result = await Article.supprimerArticle( id)
        res.status(201).json({id : id});
        } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


const ajoterDataFromExel = async (req, res) => {
    try {
        // Chemin vers le fichier Excel
        const filePath = path.resolve('test', 'les articles mpi.xlsx');
        
        // Charger le fichier Excel
        const workbook = xlsx.readFile(filePath);
        
        // Obtenir le nom de la première feuille de calcul
        const sheetName = workbook.SheetNames[0];
        
        // Lire la première feuille de calcul
        const worksheet = workbook.Sheets[sheetName];
        
        // Convertir la feuille de calcul en format JSON
        const data = xlsx.utils.sheet_to_json(worksheet);
        
        // Utiliser une boucle for...of pour traiter chaque ligne
        for (const row of data) {
            const newData = {
                ref: row.Référence,  
                designation: row.Désignation
            };
            console.log(newData);
            try{
                const newArticle = await Article.createArticle(newData);
                console.log("Article ajouté:", newArticle);
            }catch(error){
                console.log("article deja existe");
                
            }
        }
        
        res.status(201).json({ "message": "Les données ont été ajoutées avec succès." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ "error": "Erreur lors de l'ajout des données à partir du fichier Excel." });
    }
};




export {getArticles , addArticle , editArticle , deleteArticle  , ajoterDataFromExel}