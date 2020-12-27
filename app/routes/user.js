import express from 'express';
import * as userController from '../BL/user';

const router = express.Router();

router.get('/', userController.getUsers);
router.get('/create', userController.getCreateUser);
router.get('/update:id', userController.getUpdateUser);
router.get('/:id', userController.getUser);
router.get('/delete/:id', userController.deleteUser);

router.post('/create', userController.postCreateUser);
router.post('/update/:id', userController.postUpdateUser);

module.exports = router;
