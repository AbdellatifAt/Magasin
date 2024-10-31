import express from 'express';
import {getEtages  , addEtage , editEtage ,deleteEtage} from '../controllers/etageController.js';
import { requireAuth } from '../middleware/requireAuth.js';
const router = express.Router();

router.use(requireAuth)

router.get("/:idRayon", getEtages);

router.post("/add", addEtage);

router.put('/edit/:id', editEtage);

 router.delete('/delete/:id', deleteEtage);




export default router;