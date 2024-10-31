import express from 'express';
import {getDepots  , addDepot , editDepot , deleteDepot} from '../controllers/depotController.js';
import { requireAuth } from '../middleware/requireAuth.js';
const router = express.Router();

router.use(requireAuth)

router.get("/", getDepots);

router.post("/add", addDepot);

router.put('/edit/:id', editDepot);

router.delete('/delete/:id', deleteDepot);




export default router;