import express from 'express';
import * as authController from '../BL/auth';

const router = express.Router();

router.post(
	'/login',
	[authController.validateUsername, authController.validatePassword],
	authController.postLogin
);

router.get('/logout', authController.getLogout);

module.exports = router;
