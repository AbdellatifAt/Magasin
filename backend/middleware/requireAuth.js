import {User} from '../models/UserModel.js';
import { config } from 'dotenv';
import jwt from "jsonwebtoken"

config();



const requireAuth = async(req , res , next )=>{

    // verification authentification 

    const {authorization} = req.headers 

    if(!authorization){
        return res.status(401).json({error : 'Authorization token required'}) 
    }

    const token = authorization.split(' ')[1] 

    try{
        const {_id } = jwt.verify(token , process.env.SECRET)
        req.user = await User.findOne({_id}).select('_id') 
        next()
    }catch(error){

        console.log(error);
        return res.status(401).json({error : 'Request is not authorized'}) 


    }
}

export { requireAuth };
