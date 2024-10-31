import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import validator from "validator";

const Schema = mongoose.Schema;

const celluleSchema = new Schema({
    numero: {  
        type: Number,
        required: true,
    },
    etage: {
        type: Schema.Types.ObjectId,
        ref: 'Etage',
        required: true
    },

    estPlain: {
        type: Boolean,
        default: false, 
        required: true
    },

    articles: [{  // Modification pour inclure l'article et la quantité
        article: {
            type: Schema.Types.ObjectId,
            ref: 'Article',
            required: true
        },
        qte: {
            type: Number,
            required: true,
            default: 0
        }
    }]
});

// Récupérer toutes les cellules pour un étage spécifique avec les articles et quantités associés
celluleSchema.statics.getCellulesPerEtage = async function(celluleId) {
    try {
        const etages = await this.find({ etage: celluleId })
            .populate({
                path: "etage",
                select: "numero"
            })
            .populate({
                path: "articles.article", // Populate l'article
                select: "ref designation"
            })
            .sort({ _id: 1 });

        return etages;
    } catch (error) {
        console.log(error.message);
        throw new Error('Erreur lors de la récupération des Cellules: ' + error.message);
    }
};

// Ajouter une cellule avec des articles et quantités
celluleSchema.statics.createCellule = async function(newData) {
    if (!newData.numero || !newData.etage) {
        throw new Error("Il est nécessaire de remplir tous les champs.");
    }

    const existingItem = await this.findOne({ numero: newData.numero, etage: newData.etage });
    if (existingItem) {
        throw new Error("L'element deja existe !");
    }

    const cellule = await this.create({
        numero: newData.numero,
        etage: newData.etage,
        articles: newData.articles || []  // Ajout des articles avec quantités si fournie
    });

    const newCellule = await this.findOne({ _id: cellule._id })
        .populate({
            path: "etage",
            select: "numero"
        })
        .populate({
            path: "articles.article", // Populate l'article
            select: "ref designation"
        });

    return newCellule;
};

// Mettre à jour une cellule avec des articles et quantités
celluleSchema.statics.updateCellule = async function(_id, newData) {
    try {
        const cellule = await this.findOne({ _id });

        if (!cellule) {
            throw new Error("Cellule not found");
        }

        if (cellule.numero !== Number(newData.numero)) {
            const existingItem = await this.findOne({ numero: newData.numero, etage: cellule.etage });
            if (existingItem) {
                throw new Error("L'element deja existe !");
            }
        }

        if (newData.numero) { 
            cellule.numero = newData.numero;
        }

        const updatedCellule = await cellule.save();

        const updatedCellulePopulated = await this.findOne({ _id: updatedCellule._id })
            .populate({
                path: "etage",
                select: "numero"
            })
            .populate({
                path: "articles.article", // Populate l'article
                select: "ref designation"
            });

        return updatedCellulePopulated;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Supprimer une cellule
celluleSchema.statics.supprimerCellule = async function(_id) {
     // Find the cellule by ID to check for articles
     const cellule = await this.findOne({ _id });

     if (!cellule) {
         throw new Error("Cellule n'existe pas");
     }
 
     // Check if the cellule has any articles
     if (cellule.articles && cellule.articles.length > 0) {
         throw new Error("Impossible de supprimer une cellule contenant des articles");
     }
     
    const res = await this.deleteOne({ _id });
    if (res.deletedCount === 0) {
        throw Error("Cellule n'existe pas");
    }
    return true;
};



//  ajouter article to cellule  

celluleSchema.statics.addArticleToCellule = async function(newData) {
    try {
        // Trouver la cellule par son ID
        const cellule = await this.findById(newData.celluleId);

        if (!cellule) {
            throw new Error("Cellule not found");
        }

        // Vérifier si l'article existe déjà dans la cellule
        const existingArticle = cellule.articles.find(item => item.article.toString() === newData.articleId);

        if (existingArticle) {
            // Si l'article existe déjà, augmenter la quantité
            existingArticle.qte += Number(newData.qte);
        } else {
            // Sinon, ajouter un nouvel article avec la quantité spécifiée
            cellule.articles.push({ article: newData.articleId, qte: newData.qte });
        }

        // Sauvegarder les modifications
        const updatedCellule = await cellule.save();

        // Peupler les articles pour retourner les détails complets
        const populatedCellule = await this.findById(updatedCellule._id)
            .populate({
                path: "etage",
                select: "numero"
            })
            .populate({
                path: "articles.article",
                select: "ref designation"
            });

        return populatedCellule;
    } catch (error) {
        throw new Error(error.message);
    }
};


// get cellule par Id 
celluleSchema.statics.getCellule = async function(_id) {

    const cellule = await this.findById(_id)
    .populate({
        path: "etage",
        select: "numero"
    })
    .populate({
        path: "articles.article",
        select: "ref designation"
    });

return cellule;


}

// update status de cellule is plein 

celluleSchema.statics.updateStatusIsPlain = async function(newData) {
    try {

        const cellule = await this.findOne({ _id: newData._id });

        if (!cellule) {
            throw new Error("Cellule not found");
        }


        // Directly set the estPlain field regardless of its value
        cellule.estPlain = newData.estPlain;

        // Save the updated document
        const updatedCellule = await cellule.save();

        // Fetch the updated document with populated fields
        const updatedCellulePopulated = await this.findOne({ _id: updatedCellule._id })
            .populate({
                path: "etage",
                select: "numero"
            })
            .populate({
                path: "articles.article",
                select: "ref designation"
            });


        return updatedCellulePopulated;
    } catch (error) {
        console.error("Error updating estPlain:", error.message);
        throw new Error(error.message);
    }
};



//  ajouter article to cellule  

celluleSchema.statics.addArticleToCellule = async function(newData) {
    try {
        // Trouver la cellule par son ID
        const cellule = await this.findById(newData.celluleId);

        if (!cellule) {
            throw new Error("Cellule not found");
        }

        // Vérifier si l'article existe déjà dans la cellule
        const existingArticle = cellule.articles.find(item => item.article.toString() === newData.articleId);

        if (existingArticle) {
            // Si l'article existe déjà, augmenter la quantité
            existingArticle.qte += Number(newData.qte);
        } else {
            // Sinon, ajouter un nouvel article avec la quantité spécifiée
            cellule.articles.push({ article: newData.articleId, qte: newData.qte });
        }

        // Sauvegarder les modifications
        const updatedCellule = await cellule.save();

        // Peupler les articles pour retourner les détails complets
        const populatedCellule = await this.findById(updatedCellule._id)
            .populate({
                path: "etage",
                select: "numero"
            })
            .populate({
                path: "articles.article",
                select: "ref designation"
            });

        return populatedCellule;
    } catch (error) {
        throw new Error(error.message);
    }
};


// supprimer article from  cellule 

celluleSchema.statics.removeArticleFromCellule = async function(newData) {
    try {
        // Find the cellule by its ID
        const cellule = await this.findById(newData.celluleId);

        if (!cellule) {
            throw new Error("Cellule not found");

        }        

        // Find the article in the cellule's articles array
        const articleIndex = cellule.articles.findIndex(item =>  item._id.toString() === newData.articleId);     

        if (articleIndex === -1) {
            throw new Error("Article not found in the cellule");
        }

        // Remove the article from the array
        cellule.articles.splice(articleIndex, 1);

        // Save the updated cellule
        const updatedCellule = await cellule.save();

        //Populate the articles to return complete details
        const populatedCellule = await this.findById(updatedCellule._id)
            .populate({
                path: "etage",
                select: "numero"
            })
            .populate({
                path: "articles.article",
                select: "ref designation"
            });

        return populatedCellule;

        
    } catch (error) {
        throw new Error(error.message);
    }
};


// modifier qte de produits dans cellule  
celluleSchema.statics.updateArticleQuantityInCellule = async function (newData) {
    try {
        // Find the cellule by its ID
        const cellule = await this.findById(newData.celluleId);

        if (!cellule) {
            throw new Error("Cellule not found");
        }

        // Find the article in the cellule's articles array using the article ID
        const articleToUpdate = cellule.articles.find(item => item._id.toString() === newData.articleId);

        if (!articleToUpdate) {
            throw new Error("Article not found in the cellule");
        }

        // Debugging: Check before the update
        console.log("Before update:", cellule.articles);

        // Update the quantity of the found article
        articleToUpdate.qte = newData.qte;


        console.log(articleToUpdate);
        

        // Mark the articles array as modified
        cellule.markModified('articles');

        // Save the updated cellule
        await cellule.save(); // Save directly to ensure changes are persisted

        // Debugging: Check after the update
        console.log("After update:", cellule.articles);

        // Populate the articles to return complete details
        const populatedCellule = await this.findById(cellule._id)
            .populate({
                path: "etage",
                select: "numero"
            })
            .populate({
                path: "articles.article",
                select: "ref designation"
            });

        return populatedCellule;

    } catch (error) {
        throw new Error(error.message);
    }
};



// total cellules 

celluleSchema.statics.countCellules = async function() {
    try {
        const count = await this.countDocuments();
        return count;
    } catch (error) {
        console.error(error);
        throw new Error(error.message);
    }
};


celluleSchema.statics.statCellules = async function() {
    try {
        const plein = await this.countDocuments({ estPlain : true });
        const vide = await this.countDocuments({ estPlain : false ,  articles: { $size: 0 } });
        const semi_plein = await this.countDocuments({ estPlain : false ,    articles: { $elemMatch: { qte: { $gt: 0 } } } });
        return {plein , vide , semi_plein };
    } catch (error) {
        console.error(error);
        throw new Error(error.message);
    }
};



// celluleSchema.statics.countEmptyCellulesByDepot = async function() {
//     try {
//         // Rechercher les rayons associés à ce dépôt
//         const rayons = await this.find() .populate({
//             path: 'etage',  // Populate `etage` field in `Cellule`
           
//         }).populate({
//             path: "etage.rayon",
//             select: "numero"
//         }).populate({
//             path: "etage.rayon.depot",
//             select: "numero"
//         });;
        
    

//         return rayons;
//     } catch (error) {
//         console.error(error);
//         throw new Error("Erreur lors du comptage des cellules vides");
//     }
// };

celluleSchema.statics.getCellulesArticlesDetails = async function () {
    try {
        const cellules = await this.find({})
            .populate({
                path: 'etage',  // Populate the Etage details
                select: 'numero rayon',  // Include fields you need from Etage
                populate: {
                    path: 'rayon',  // Populate the Rayon details within Etage
                    select: 'name',  // Include fields you need from Rayon
                    populate: {
                        path: 'depot',  // Optionally, if you want to include Depot details in Rayon
                        select: 'name'
                    }
                }
            })
            .populate({
                path: 'articles.article',  // Populate the Article details
                select: 'ref designation'
            })
            .sort({ _id: 1 });  // Optional: sort by _id in ascending order

            const articlesWithDetails = cellules.flatMap(cellule => 
                cellule.articles.map(article => ({
                    article: {
                        ref: article.article.ref,
                        designation: article.article.designation, 
                        qte : article.qte
                    },
                    cellule: {
                        numero: cellule.numero,
                        estPlain: cellule.estPlain
                    },
                    etage: {
                        numero: cellule.etage.numero,
                    }, 
                    rayon : {
                        name: cellule.etage.rayon.name,
                    },
                    depot : {
                        name: cellule.etage.rayon.depot ? cellule.etage.rayon.depot.name : null // Depot name (if populated)
                    }

                }))
            );
    
            return articlesWithDetails;

    } catch (error) {
        console.error('Error retrieving cellules:', error);
        throw new Error('Failed to retrieve cellules with article and rayon details');
    }
};


export const Cellule = mongoose.model('Cellule', celluleSchema);
