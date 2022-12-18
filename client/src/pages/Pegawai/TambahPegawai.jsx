import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import useSWR from 'swr'

const fetcher = url => axios.get(url).then(res => res.data)

const TambahPegawai = () => {
    const nip = Math.floor(Math.random() * (99999999 - 10000000) + 1);
    const { data } = useSWR('http://localhost:5000/api/golongan', fetcher);
    const [err, setErr] = useState(null);

    const navigate = useNavigate();

    const [inputs, setInputs] = useState({
        nip: nip,
        nama_lengkap: '',
        telepon: '',
        alamat: '',
        jenis_kelamin: '',
        golongan: ''
    });

    const handleChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/pegawai/', inputs);
            alert('Data berhasil ditambahkan');
            navigate('/pegawai/detail/' + inputs.nip);
        } catch (error) {
            setErr(error.response.data);
        }
    }

    console.log(inputs)

    return (
        <div className="container py-3">
            <header>
                <div className="d-flex flex-column flex-md-row align-items-center pb-3 mb-4 border-bottom">
                    <Link to={"/"} className="d-flex align-items-center text-dark text-decoration-none">
                        <span className="fs-4 fw-bold"><i className="fa fa-newspaper"></i> JENJANG KARIR</span>
                    </Link>

                    <nav className="d-inline-flex mt-2 mt-md-0 ms-md-auto">
                        <Link to={"/pegawai"} className="btn btn-secondary mb-3" title="Kembali">
                            <i className="fa fa-angles-left"></i> Kembali
                        </Link>
                    </nav>
                </div>

                <div className="pricing-header p-3 pb-md-4 mx-auto">
                    <h3 className="fw-semibold text-center">Tambah Pegawai</h3><br />
                    <form method="post" className="row g-3">
                        <div className="col-md-3">
                            <label className="form-label">NIP</label>
                            <input type="number" name="nip" value={inputs.nip} className='form-control' disabled />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Nama Lengkap</label>
                            <input type="text" name="nama_lengkap" className="form-control" placeholder="Masukan nama lengkap" onChange={handleChange} required />
                        </div>
                        <div className="col-md-3">
                            <label className="form-label">Telepon</label>
                            <input type="number" name="telepon" className="form-control" onChange={handleChange} placeholder="08XXXXXXX" />
                        </div>
                        <div className="col-md-12">
                            <label className="form-label">Alamat</label>
                            <textarea name="alamat" className="form-control" cols="20" rows="5" onChange={handleChange}></textarea>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Jenis Kelamin</label>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" onChange={handleChange} name="jenis_kelamin" value="L" />
                                <label className="form-check-label">
                                    Laki-laki
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" onChange={handleChange} name="jenis_kelamin" id="gridRadios2" value="P" />
                                <label className="form-check-label">
                                    Perempuan
                                </label>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Golongan</label>
                            <select name="golongan" className="form-select" onChange={handleChange}>
                                <option selected>Pilih...</option>
                                {data && data.map((golongan, idx) => (
                                    <option value={golongan.golongan} key={idx}>
                                        {golongan.golongan} - {golongan.jabatan}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <input type="submit" name="simpan" className="btn btn-block btn-lg btn-success" value="Simpan" onClick={handleSubmit} />
                        {err && alert(err)}
                    </form>
                </div>
            </header>
        </div>
    )
}

export default TambahPegawai