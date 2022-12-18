import { db } from '../db.js';

export const getPegawai = async (req, res) => {
    try {
        db.query("SELECT * FROM pegawai ORDER BY createdAt DESC", (err, result) => {
            if (err) res.status(500).json(err);
            res.status(200).json(result);
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getPegawaiByNip = async (req, res) => {
    try {
        const nip = req.params.nip;
        const q = `SELECT p.*, k.golongan, g.jabatan, k.tanggal_berlaku
                    FROM pegawai p
                        INNER JOIN kinerja k ON p.nip = k.nip
                        INNER JOIN golongan g ON k.golongan = g.golongan 
                    WHERE k.nip = '${nip}'
                    ORDER BY k.tanggal_berlaku DESC
                    LIMIT 1`
        db.query(q, (err, result) => {
            if (err) res.status(404).json(err);
            res.status(200).json(result);
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export const createPegawai = async (req, res) => {
    try {
        const { nip, nama_lengkap, telepon, jenis_kelamin, alamat, golongan } = req.body;
        const q = `INSERT INTO pegawai (nip, nama_lengkap, telepon, jenis_kelamin, alamat) VALUES ('${nip}', '${nama_lengkap}', '${telepon}', '${jenis_kelamin}', '${alamat}')`;
        db.query(q, (err, result) => {
            if (err) res.status(500).json(err);
            db.query(`INSERT INTO kinerja (nip, golongan) VALUES('${nip}', '${golongan}')`, (err, result) => {
                if (err) res.status(500).json({ message: "Terjadi kesalahan saat menyimpan data kinerja pegawai!" });
                res.status(200).json({ message: "Data pegawai berhasil disimpan" });
            });
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updatePegawai = async (req, res) => {
    try {
        const nip = req.params.nip;
        const { nama_lengkap, telepon, jenis_kelamin, alamat } = req.body;
        db.query(`UPDATE pegawai SET nama_lengkap = '${nama_lengkap}', telepon = '${telepon}', jenis_kelamin = '${jenis_kelamin}', alamat = '${alamat}' WHERE nip = '${nip}'`, (err, result) => {
            if (err) res.status(500).json(err);
            res.status(200).json({ message: "Data pegawai berhasil diubah" });
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export const deletePegawai = async (req, res) => {
    try {
        const nip = req.params.nip;
        db.query(`DELETE FROM pegawai WHERE nip = ${nip}`, (err, result) => {
            if (err) res.status(500).json(err);
            res.status(200).json({ message: "Data berhasil dihapus" });
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
