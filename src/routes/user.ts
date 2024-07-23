import express from 'express';

const router = express.Router();

// import controllers
import { getUsers, getUserByAddress, getUserWithAssets, createUser } from '../controllers/userController';

router.route('/users').get(getUsers);
router.route('/users').post(createUser);
router.route('/user/:address').get(getUserByAddress);
router.route('/user/:address/assets').get(getUserWithAssets);


export { router as userRouter };