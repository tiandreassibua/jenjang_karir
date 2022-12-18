import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios';

const TambahJenjangKarir = () => {
    const location = useLocation();
    const nip = location.pathname.split('/')[4];

    const navigate = useNavigate();
    const [pegawai, setPegawai] = useState([]);
    const [golongan, setGolongan] = useState([]);
    const [inputs, setInputs] = useState({
        nip: nip,
        golongan: '',
        kedisiplinan: '',
        tanggung_jawab: '',
        sikap: '',
        kompetensi: ''
    });

    const handleChange = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        });
    }

    // jika belum ada, maka tambahkan
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.get(`http://localhost:5000/api/kinerja/cek/${nip}/${inputs.golongan}`)
        if (response.data.status > 1) {
            alert(response.data.msg);
            return;
        } else {

            await axios.post('http://localhost:5000/api/kinerja', {
                ...inputs,
                total_poin: (parseInt(inputs.kedisiplinan) + parseInt(inputs.tanggung_jawab) + parseInt(inputs.sikap) + parseInt(inputs.kompetensi))
            });
            alert('Data kinerja berhasil disimpan!');
            navigate(`/pegawai/detail/${nip}`);
        }
    }

    useEffect(() => {
        const getPegawai = async () => {
            const peg = await axios.get(`http://localhost:5000/api/pegawai/nip/${nip}`);
            setPegawai(peg.data[0].golongan);
            const golo = await axios.get(`http://localhost:5000/api/golongan`);
            setGolongan(golo.data);
        }

        getPegawai();

    }, [nip]);

    return (
        <div className="container py-3">
            <header>
                <div className="d-flex flex-column flex-md-row align-items-center pb-3 mb-4 border-bottom">
                    <Link to={"/"} className="d-flex align-items-center text-dark text-decoration-none">
                        <span className="fs-4 fw-bold"><i className="fa fa-newspaper"></i> JENJANG KARIR</span>
                    </Link>

                    <nav className="d-inline-flex mt-2 mt-md-0 ms-md-auto">
                        <Link to={`/pegawai/detail/${nip}`} className="btn btn-secondary mb-3" title="Kembali">
                            <i className="fa fa-angles-left"></i> Kembali
                        </Link>
                    </nav>
                </div>

                <div className="pricing-header p-3 pb-md-4 mx-auto">
                    <h3 className="fw-semibold text-center">Tambah Jenjang Karir</h3><br />

                    <form method="post" className="row g-3">
                        <div className="col-md-2">
                            <label className="form-label">Kedisiplinan</label>
                            <input type="number" name="kedisiplinan" className="form-control" onChange={handleChange} min="0" max="5" required />
                        </div>
                        <div className="col-md-2">
                            <label className="form-label">Tanggung Jawab</label>
                            <input type="number" name="tanggung_jawab" className="form-control" onChange={handleChange} min="0" max="5" required />
                        </div>
                        <div className="col-md-2">
                            <label className="form-label">Sikap</label>
                            <input type="number" name="sikap" className="form-control" onChange={handleChange} min="0" max="5" required />
                        </div>
                        <div className="col-md-2">
                            <label className="form-label">Kompetensi</label>
                            <input type="number" name="kompetensi" className="form-control" onChange={handleChange} min="0" max="5" required />
                        </div>
                        <div className="col-md-2">
                            <label className="form-label">Golongan</label>
                            <select name="golongan" className="form-select" onChange={handleChange} required>
                                <option selected>Pilih...</option>
                                {golongan.map((gol, id) => (
                                    <option key={id} value={gol.golongan} className={(gol.golongan === pegawai ? 'fw-semibold' : '')} disabled={!(gol.golongan[0] === pegawai[0])}>
                                        {gol.golongan} - {gol.jabatan} {gol.golongan === pegawai ? '(saat ini)' : ''}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-2">
                            <label className="form-label">`</label>
                            <button className='form-control btn btn-block btn-success' onClick={handleSubmit}>
                                <i className="fa fa-save"></i> Simpan
                            </button>
                        </div>
                    </form>
                </div>
            </header>
        </div>
    )
}

export default TambahJenjangKarir;