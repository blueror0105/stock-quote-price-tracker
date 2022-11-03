/**
 * Stock management route
 * 
 * @since 1.0.0
 * @version 1.0.0
 */

import { Router } from 'express';
import StockCtrl from '../controllers/stockCtrl';

const router = Router();

router.get('/getQuote', StockCtrl.getQuote);

export default router;