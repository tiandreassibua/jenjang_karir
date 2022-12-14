import express from "express";
import { createPegawai, deletePegawai, getPegawai, getPegawaiByNip, updatePegawai } from "../controllers/pegawai.js";

const router = express.Router();

router.get("/", getPegawai);
router.get("/nip/:nip", getPegawaiByNip);
router.patch("/nip/:nip", updatePegawai);
router.post("/", createPegawai);
router.delete("/nip/:nip", deletePegawai);

export default router;