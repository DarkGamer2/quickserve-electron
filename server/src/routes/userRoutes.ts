import express from "express";
import userController from "../controllers/userController";
import { Router } from "express";

const router = Router();

router.get('/profile/:id', userController.getUser);
router.get('/users', userController.getUsers);
export default router;