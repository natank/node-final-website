import express from 'express';
import * as userController from '../BL/user';

const router = express.Router();

router.get('/', userController.getUsers);
router.get('/create', userController.getCreateUser);
router.get('/update/:id', userController.getUpdateUser);

router.get('/:id', userController.getUser);
router.delete('/:id', userController.deleteUser);
router.post('/', userController.postCreateUser);
router.put('/:id', userController.postUpdateUser);

module.exports = router;
