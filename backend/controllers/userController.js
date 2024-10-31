
import { User } from "../models/UserModel.js";

import jwt from "jsonwebtoken"
import { config } from "dotenv";
config();



// gestion token  

const createToken = (_id)=>{
    return jwt.sign({_id} , process.env.SECRET , { expiresIn : '3d'})

}


const getID= (req)=>{
    const {authorization} = req.headers 
    const token = authorization.split(' ')[1] 
    const {_id } = jwt.verify(token , process.env.SECRET)
    return _id
}







// add user 
const registerUser = async (req, res) => {

    const newData = req.body
    try {
       const newUser = await User.addUser(newData)    
    
    res.status(201).json({data : newUser});
    } catch (error) {
    res.status(400).json({ error: error.message });
    }

};

// delete user 

const deleteUser = async (req , res)=>{
    const id = req.params.id;
 
    try {
       
        const result = await User.supprimerUser( id)
        res.status(201).json({id : id});
        } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


// update user 

const updateUser =async (req , res)=>{
    const newData = req.body
    const id = req.params.id;

    try {
        const user = await User.updateUser(id , newData )    
     
     res.status(201).json({data : user});
     } catch (error) {
     res.status(400).json({ error: error.message });
     }


}

// all user 

const allEmployee = async (req, res) => {

    try{
        const users = await User.getUsers()

        res.status(201).json({ data : users})

    }catch(error){
        res.status(400).json({ error: error.message })
    }

};



// login  

const loginUser = async (req , res) =>{
    const {email , password} = req.body
    

    try{
        const user = await User.login(email , password)
        
        // create a token 
        
        const token = createToken(user._id);



        if(user.type === 1 ){
            res.status(200).json({token , role : user.type , depot : user.depot, fname : user.fname , lname : user.lname})
        }else{
            res.status(200).json({token , role : user.type , fname : user.fname , lname : user.lname })
        }

      

    }catch (error){
        res.status(400).json({error : error.message})

    }

}


export {loginUser ,allEmployee   , registerUser , deleteUser , updateUser}