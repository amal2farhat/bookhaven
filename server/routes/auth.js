
import { Router } from 'express';

import { createUser, loginUser,getuserinfo,updateProfile } from '../controllers/authController.js';

const router = Router();

router.post('/signup', createUser);
router.post('/login', loginUser);
router.get('/myprofile/:userId',getuserinfo);
router.put('/updatemyprofile/:userId', updateProfile);


export default router;
