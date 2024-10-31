import {mongoose} from "mongoose";
import bcrypt from 'bcrypt';
import validator from "validator";
const Schema = mongoose.Schema



const userSchema = new Schema({
 
    email : {
        type : String ,
        required : true ,
        unique : true ,
    },
    fname : {
        type : String ,
        required : true ,
    },
    lname : {
        type : String ,
        required : true ,
    },

    password : {
        type : String ,
        required : true ,
    },

    type : {
        type : Number,
        required : true ,
    },

    depot: {
        type: Schema.Types.ObjectId,
        ref: 'Depot'
    }

})

// get user 

userSchema.statics.getUser = async function(_id) {
    try {
        const user = await this.findById(_id).populate({
            path: "depot",
            select: "name"
        });

        if (!user) {
            throw new Error('User not found');
        }

        return user;
    } catch (error) {
        console.log(error.message);
        throw new Error( error.message);
    }
};



// all users : 

userSchema.statics.getUsers = async function() {
    try {
        const users = await this.find({ type: { $gt: 0 } }) // type > 0
            .populate({
                path: "depot",
                select: "name" // Select only the name of the depot
            })
            .sort({ _id: -1 });

        return users;
    } catch (error) {
        console.log(error.message);
        
        throw new Error( error.message);
    }
};


// ajouter user 

userSchema.statics.addUser = async function(newData) {

    

    
    // Validation email, prénom, nom de famille, password, and type
    if (!newData.email || !newData.fname || !newData.lname || !newData.password || newData.type === undefined) {
        throw new Error("Il est nécessaire de remplir tous les champs.");
    }

    if (!validator.isEmail(newData.email)) {
        throw new Error('E-mail invalide');
    }

    if (!validator.isStrongPassword(newData.password)) {
        throw new Error('Mot de passe trop faible');
    }

    const email = newData.email;
    const fname = newData.fname;
    const lname = newData.lname;
    const password = newData.password;
    const type = newData.type;
    const depot = newData.depot

    // Vérifier si l'email existe déjà
    const exists = await this.findOne({ email });
    if (exists) {
        throw new Error("L'email existe déjà");
    }


     // hash password  

     const salt = await bcrypt.genSalt(10);
     const hash = await bcrypt.hash(password , salt); 

    const user = await this.create({
        email,
        fname,
        lname,
        password : hash,
        type, 
        depot
    });

    const newUser = await this.findOne({ email }).populate({
        path: "depot",
        select: "name" // Sélectionne uniquement le nom du dépôt
    })


    

    return newUser;
};


// supprimer user 


userSchema.statics.supprimerUser = async function( _id ){

    const res = await this.deleteOne({ _id })
    if (res.deletedCount === 0){
        throw Error("Employee n'existe pas");
    }
   return true

}


// update user  
userSchema.statics.updateUser = async function(_id, newData) {
    try {
        // Find the user by ID
        const user = await this.findOne({ _id });
        if (!user) {
            throw new Error("Utilisateur non trouvé");
        }

        // Check and update email
        if (user.email !== newData.email) {
            const existe = await this.findOne({ email: newData.email });
            if (existe) {
                throw new Error("L'email existe déjà");
            }
        }

        if (newData.email) {
            if (!validator.isEmail(newData.email)) {
                throw new Error('E-mail invalide');
            }
            user.email = newData.email;
        }

        // Check and update password
        if (newData.password && newData.password.trim() !== "") {
            if (!validator.isStrongPassword(newData.password)) {
                throw new Error('Mot de passe trop faible');
            }
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(newData.password, salt);
            user.password = hash;
        }

        // Update first and last name
        if (newData.fname) {
            user.fname = newData.fname;
        }
        if (newData.lname) {
            user.lname = newData.lname;
        }

        // Update type and handle depot based on type
        if (newData.type) {
            user.type = newData.type;
            
            // If type is 2, remove the depot attribute
            if (newData.type === 2) {
                user.depot = undefined;
            }
        }

        // If type is 1 and the depot has changed, update the depot
        if (newData.type === 1 && newData.depot) {
            const depotId = newData.depot;
            if (mongoose.Types.ObjectId.isValid(depotId)) {
                if (!user.depot || user.depot.toString() !== depotId) {
                    user.depot = new mongoose.Types.ObjectId(depotId);
                }
            } else {
                throw new Error('Depot ID invalide');
            }
        }
        // Save changes to the database
        const updatedUser = await user.save();

        // Retrieve the updated user with depot details
        const newUser = await this.findOne({ email: updatedUser.email }).populate({
            path: "depot",
            select: "name" // Select only the depot name
        });

        return newUser;

    } catch (error) {
        console.error(error);
        throw new Error(error.message);
    }
};


// static login methode  

userSchema.statics.login = async function(email , password){
    // validation emial password 
    if (!email , !password){
        throw Error("All fields must be filled")
    }

    const user = await this.findOne({ email }).populate({
        path: "depot",
        select: "name" 
    });
    

    if (!user){
        throw Error("Incorrect Email"); 
    }

    const match = await bcrypt.compare(password , user.password)

    if (!match){
       throw Error('Incorrect password')
    }

    return user

}


userSchema.statics.countUsers = async function() {
    try {
        // Utiliser countDocuments avec un filtre pour type > 0
        const count = await this.countDocuments({ type: { $gt: 0 } });
        return count;
    } catch (error) {
        console.error(error);
        throw new Error(error.message);
    }
};




export const User = mongoose.model('user' , userSchema);


