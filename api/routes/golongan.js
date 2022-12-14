import express from 'express';
import { createGolongan, getGolongan } from '../controllers/Golongan.js';

const router = express.Router();

router.get('/', getGolongan);
router.post('/', createGolongan);

export default router;