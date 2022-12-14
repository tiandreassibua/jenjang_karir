import express from "express";
import { createKinerja, getKinerjaById } from "../controllers/Kinerja.js";

const router = express.Router();

router.get("/nip/:nip", getKinerjaById);
router.post("/", createKinerja);

export default router;