import express from 'express';

// import { isLoggedIn as isAuth } from '../BL/middleware/is-auth';
import * as membersController from '../BL/members';

const router = express.Router();

router.get('/', membersController.getMembers);
router.get('/create', membersController.getMember)

router.get('/:id', membersController.getMember);
router.post('/', membersController.postCreateMember);
router.get('/delete/:id', membersController.getDeleteMember);
router.post('/update/:id', membersController.postUpdateMember);

export default router;
