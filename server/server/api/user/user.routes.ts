import { Router } from 'express';
import { auth } from '../../middlewares/jwt.auth';
import { 
    createAccount,
    login,
    logout,
    changeUsername,
    verifyToken,
    revokeAccount 
} from './user.controller';

const router = Router();

router.post('/register', createAccount);
router.post('/login', login);
router.post('/logout', auth, logout);
router.patch('/username', auth, changeUsername);
router.post('/verify', auth, verifyToken);
router.post('/revoke', auth, revokeAccount);

export default router;
