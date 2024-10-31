import express from 'express';
import { requireAuth } from '../middleware/requireAuth.js';

import {getStatistique} from '../controllers/statistiqueController.js';
const router = express.Router();

router.use(requireAuth)

router.get("/", getStatistique);





export default router;