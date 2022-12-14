import { db } from "../db.js";

export const getGolongan = async (req, res) => {
    try {
        db.query("SELECT * FROM golongan ORDER BY golongan ASC", (err, result) => {
            if (err) res.status(500).json(err);
            res.status(200).json(result);
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const createGolongan = async (req, res) => {
    try {
        const { golongan, jabatan } = req.body;
        const q = `INSERT INTO golongan VALUES('${golongan}', '${jabatan}')`;
        db.query(q, (err, result) => {
            if (err) res.status(500).json(err);
            res.status(200).json({ message: "Data golongan berhasil disimpan" });
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}