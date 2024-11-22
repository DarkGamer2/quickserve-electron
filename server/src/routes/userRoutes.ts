import { Router } from 'express';
import userController from '../controllers/userController';
import { Request,Response,NextFunction } from 'express';
const router = Router();

router.get('/profile/:id', async (req:Request, res:Response, next:NextFunction) => {
  try {
	await userController.getUser(req, res);
  } catch (error:any) {
	next(error);
  }
});
router.get('/users', (req:Request, res:Response, next:NextFunction) => userController.getUsers(req, res).catch(next));

export default router;
