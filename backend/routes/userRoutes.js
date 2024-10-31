import express from 'express';


import {registerUser , allEmployee  , deleteUser , updateUser} from '../controllers/userController.js';
import { requireAuth } from '../middleware/requireAuth.js';
const router = express.Router();

router.use(requireAuth)

router.get("/", allEmployee);
router.post("/add", registerUser);
router.delete("/delete/:id", deleteUser);

router.put("/:id", updateUser);





export default router;