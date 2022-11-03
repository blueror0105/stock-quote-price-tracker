/**
 * Route mananger
 * 
 * @since 1.0.0
 * @version 1.0.0
 */

 import { Router } from 'express';
 import stock from './stock';
 
 const routes = Router();
 
 routes.use('/stock', stock);
 
 export default routes;