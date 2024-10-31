import express from 'express';
import {getRayons  , addRayon , editRayon , deleteRayon} from '../controllers/rayonController.js';
import { requireAuth } from '../middleware/requireAuth.js';
const router = express.Router();

router.use(requireAuth)

router.get("/:id", getRayons);

router.post("/add", addRayon);

router.put('/edit/:id', editRayon);

router.delete('/delete/:id', deleteRayon);




export default router;