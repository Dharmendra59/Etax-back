import { ensureAuth } from '../../middlewares/Auth';

import express from 'express'

const router = express.Router();

router.get('/',ensureAuth, (req, res) => {
      res.status(200).json([
            {
                  name: 'Product 1',
                  price: 100
            }
      ])
});
 
export default router
