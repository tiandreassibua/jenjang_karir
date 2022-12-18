import express from "express";
import { cekKinerja, createKinerja, getKinerjaById } from "../controllers/Kinerja.js";

const router = express.Router();

router.get("/nip/:nip", getKinerjaById);
router.post("/", createKinerja);
router.get("/cek/:nip/:golongan", cekKinerja);

export default router;