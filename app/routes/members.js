import express from 'express';

// import { isLoggedIn as isAuth } from '../BL/middleware/is-auth';
import * as membersController from '../BL/members';

const router = express.Router();

router.get('/', membersController.getMembers);

router.get('/:id', membersController.getMember);
router.post('/', membersController.createMember);
router.delete('/:id', membersController.deleteMember);
router.put('/:id', membersController.updateMember);

export default router;
