import express from 'express';
import {
        getCellules  , 
        addCellule ,
        editCellule ,
        deleteCellule ,
        addArticleToCellule ,
        getCellule , 
        editStatusIsPlainCellule , 
        deleteArticleInCellule , 
        updateArticleInCellule , 
        getCellulesArticlesDetails 
    } from '../controllers/celluleController.js';

import { requireAuth } from '../middleware/requireAuth.js';
const router = express.Router();

router.use(requireAuth)

router.get("/:idEtage", getCellules);

router.post("/add", addCellule);

router.put('/edit/:id', editCellule);

router.delete('/delete/:id', deleteCellule);

router.get("/get/:id", getCellule)

router.post("/addArticle", addArticleToCellule)

router.delete("/deleteArticle", deleteArticleInCellule)

router.put("/updateArticle", updateArticleInCellule)

router.put("/update/status/isplein", editStatusIsPlainCellule)

router.get("/article/recherche", getCellulesArticlesDetails);


export default router;