import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import mongoose from 'mongoose';
import { User } from './models/UserModel.js';

// routes 
import authentification from './routes/authentification.js';
import userRoutes from './routes/userRoutes.js'
import depotRoutes from './routes/depotRoute.js';
import rayonRoutes from './routes/rayonRoute.js';
import etageRoutes from './routes/etageRoute.js';
import celluleRoutes from './routes/celluleRoute.js';
import articleRoutes from './routes/articleRoute.js';
import statistiqueRoutes from './routes/statistiqueRoute.js';



config();

const PORT = process.env.PORT;
const mongoDBURL = process.env.mongoDBURL;
const DB_NAME = process.env.DB_NAME;
const SECRET = process.env.SECRET;


const DEFAULT_EMAIL = process.env.DEFAULT_EMAIL;
const DEFAULT_FNAME = process.env.DEFAULT_FNAME;
const DEFAULT_LNAME = process.env.DEFAULT_LNAME;
const DEFAULT_PASSWORD = process.env.DEFAULT_PASSWORD;
const DEFAULT_TYPE = parseInt(process.env.DEFAULT_TYPE, 10);


const app = express();

// Middleware  
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// // Routes
app.use('/', authentification);
app.use('/user', userRoutes);
app.use('/depot', depotRoutes);
app.use('/rayon', rayonRoutes);
app.use('/etage', etageRoutes);
app.use('/cellule', celluleRoutes);
app.use('/article', articleRoutes);
app.use('/statistique', statistiqueRoutes);


// Function to create default user

const createDefaultUser = async () => {
    const user = await User.findOne({ email: DEFAULT_EMAIL });
    if (!user) {
      await User.addUser({
        email: DEFAULT_EMAIL,
        fname: DEFAULT_FNAME,
        lname: DEFAULT_LNAME,
        password: DEFAULT_PASSWORD,
        type: DEFAULT_TYPE,
      });
      console.log('Default user created');
    } else {
      console.log('Default user already exists');
    }
  };


// connecter database  
mongoose
    .connect(mongoDBURL + DB_NAME)
    .then(async ()=>{
        await createDefaultUser()
        app.listen(PORT , ()=>{
            console.log(`App is listening to port : ${PORT}`);
        })
    })
    .catch((error)=>{
        console.log(error);
    })



