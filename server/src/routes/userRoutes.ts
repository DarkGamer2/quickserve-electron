import { Router } from 'express';
import userController from '../controllers/userController';

const router = Router();

router.get('/profile/:id', async (req, res, next) => {
  try {
	await userController.getUser(req, res);
  } catch (error) {
	next(error);
  }
});
router.get('/users', (req, res, next) => userController.getUsers(req, res).catch(next));

export default router;
