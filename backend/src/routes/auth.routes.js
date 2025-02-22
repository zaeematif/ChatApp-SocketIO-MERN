import express from 'express'
import { login, logout, signup, updateProfile, checkAuth } from '../controllers/auth.controller.js';
import { protectRoute } from '../middlewares/auth.middleware.js';


const router = express.Router();

//SIGNUP - LOGIN - LOGOUT
router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);

//UPDATE - (profilePic only)
router.put('/update-profile', protectRoute, updateProfile);

//WHEN USER REFRESH - Check if authenticated or not
router.get('/check', protectRoute, checkAuth);

export default router;