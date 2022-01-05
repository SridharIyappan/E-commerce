import express from 'express';

import {newOrder, getSingleOrder, getUserOrder } from '../Controllers/orderController.js';
import authentication from "../Middleware/authentication.js";
import authorization from "../Middleware/authorization.js";

const router = express.Router();

router.post('/order/new', authentication, newOrder);
router.get('/order/:id', authentication, getSingleOrder);
router.get('/order/user', authentication, getUserOrder);

export default router;