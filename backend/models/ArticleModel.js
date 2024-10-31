import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import validator from "validator";

const Schema = mongoose.Schema;

const articleSchema = new Schema({
    ref: { 
        type : String ,
        required : true ,
        unique : true ,
    },
    designation: {
        type : String ,
        required : true ,        
    },

    positions: [{ type: Schema.Types.ObjectId, ref: 'Cellule' }]

});


articleSchema.statics.getAllArticles = async function() {
    try {
        const articles = await this.find().populate('positions');
        return articles;
    } catch (error) {
        throw new Error("Erreur lors de la récupération des articles: " + error.message);
    }
};

// ajouter arcticle

articleSchema.statics.createArticle = async function(newData) {
    if (!newData.ref || !newData.designation) {  // Corrected from "nemero"
        throw new Error("Il est nécessaire de remplir tous les champs.");
    }

    const existingItem = await this.findOne({ ref : newData.ref});
    if (existingItem) {
        throw new Error("L'element deja existe !");
    }
    const newArticle = new Article({
        ref : newData.ref,
        designation : newData.designation, 
        positions  : newData.positions || []
    });

    const savedArticle = await newArticle.save();
    return savedArticle;

};


// Update 

articleSchema.statics.updateArticle = async function(_id, newData) {
    try {
        const article = await this.findOne({ _id });

        if (!article) {
            throw new Error("article not found");
        }

        

        if (article.ref !== newData.ref){
            const existingItem = await this.findOne({ ref : newData.ref});
            if (existingItem) {
                throw new Error("L'element deja existe !");
            }
            
        }

        if (newData.ref) { 
            article.ref = newData.ref;
        }

        if (newData.designation) { 
            article.designation = newData.designation;
        }
        

        const updatedArticle = await article.save();

       

        return updatedArticle;
    } catch (error) {
        throw new Error( error.message);
    }
};


// Delete 
articleSchema.statics.supprimerArticle = async function(_id) {
    const res = await this.deleteOne({ _id });
    if (res.deletedCount === 0) {
        throw Error("Article n'existe pas");
    }
    return true;
};



// total Articles :
articleSchema.statics.countArticles = async function() {
    try {
        const count = await this.countDocuments();
        return count;
    } catch (error) {
        console.error(error);
        throw new Error(error.message);
    }
};



export const Article = mongoose.model('Article', articleSchema);
