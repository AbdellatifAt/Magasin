import express from 'express';
import {getArticles ,addArticle , editArticle , deleteArticle , ajoterDataFromExel} from '../controllers/articleController.js';
import { requireAuth } from '../middleware/requireAuth.js';

const router = express.Router();

//router.use(requireAuth)

router.get("/", getArticles);

router.post("/add", addArticle);

router.put('/edit/:id', editArticle);

router.delete('/delete/:id', deleteArticle);


router.get("/test" , ajoterDataFromExel)






export default router;