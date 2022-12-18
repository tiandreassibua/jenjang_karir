import { db } from "../db.js";

export const getKinerjaById = async (req, res) => {
    try {
        const nip = req.params.nip;
        const q = `SELECT k.*, g.jabatan
                    FROM kinerja k
                        INNER JOIN golongan g ON k.golongan = g.golongan
                    WHERE k.nip = '${nip}'
                    ORDER BY k.tanggal_berlaku DESC`;
        db.query(q, (err, result) => {
            if (err) res.status(500).json(err.message);
            res.status(200).json(result);
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const createKinerja = async (req, res) => {
    try {
        const { nip, golongan, kedisiplinan, tanggung_jawab, sikap, kompetensi, total_poin } = req.body;
        const q = `INSERT INTO kinerja(nip, golongan, kedisiplinan, tanggung_jawab, sikap, kompetensi, total_poin)
                    VALUES('${nip}','${golongan}','${kedisiplinan}', '${tanggung_jawab}','${sikap}','${kompetensi}','${total_poin}')`;
        db.query(q, (err, result) => {
            if (err) res.status(500).json({ err: "Golongan tidak boleh sama dengan golongan sebelumnya!" });
            res.status(200).json({ message: "Data kinerja berhasil disimpan" });
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    return
}

export const cekKinerja = async (req, res) => {
    try {
        const nip = req.params.nip;
        const golongan = req.params.golongan;
        const q = `SELECT COUNT(*) as jumlah FROM kinerja WHERE nip = '${nip}' AND golongan = '${golongan}'`;
        db.query(q, (err, result) => {
            if(result.length > 0 && result[0].jumlah > 0) {
                res.status(200).json({ status: 1, msg: "Golongan tidak boleh sama dengan golongan sebelumnya!" });    
            } else {
                res.status(200).json({ status: 0, msg: "Data kinerja belum ada!" });
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}