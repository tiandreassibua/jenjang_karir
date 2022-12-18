import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import useSWR from 'swr'

const fetcher = (url) => axios.get(url).then(res => res.data)

const Golongan = () => {
    const { data: golongan } = useSWR('http://localhost:5000/api/golongan', fetcher);

    const [inputs, setInputs] = useState({
        golongan: '',
        jabatan: ''
    });

    const [err, setErr] = useState(null);

    const handleChange = (e) => {
        setInputs((prev) => ({...prev, [e.target.name]: e.target.value}));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/golongan/', inputs);
            alert('Data berhasil ditambahkan');
            window.location.reload();
        } catch (error) {
            setErr(error.response.data);
        }
    }
    
    return (
        <div className="container py-3">
            <header>
                <div className="d-flex flex-column flex-md-row align-items-center pb-3 mb-4 border-bottom">
                    <Link to={"/"} className="d-flex align-items-center text-dark text-decoration-none">
                        <span className="fs-4 fw-bold"><i className="fa fa-newspaper"></i> JENJANG KARIR</span>
                    </Link>

                    <nav className="d-inline-flex mt-2 mt-md-0 ms-md-auto">
                        <Link className="me-3 py-2 text-dark text-decoration-none" to={"/"}>Beranda</Link>
                        <Link className="me-3 py-2 text-dark text-decoration-none" to={"/pegawai"}>Pegawai</Link>
                        <Link className="me-3 py-2 text-dark text-decoration-none" to={"/golongan"}>Golongan</Link>
                    </nav>
                </div>

                <div className="pricing-header p-3 pb-md-4 mx-auto">
                    <h3 className="fw-semibold mb-5 text-center">Data Golongan</h3>
                    <div className="modal fade" id="tambahGolongan" tabIndex="-1" aria-labelledby="tambahGolonganLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="tambahGolonganLabel">Tambah Golongan Baru</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <form method="post">
                                    <div className="modal-body">
                                        <div className="mb-3">
                                            <label htmlFor="recipient-name" className="col-form-label">Golongan</label>
                                            <input type="text" className="form-control" id="recipient-name" name="golongan" onChange={handleChange} required />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="message-text" className="col-form-label">Jabatan</label>
                                            <textarea className="form-control" id="message-text" name="jabatan" onChange={handleChange} required></textarea>
                                        </div>
                                    </div>
                                    {err && <div className="alert alert-danger" role="alert">{err}</div>}
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        <button type="submit" name="submit" className="btn btn-info" onClick={handleSubmit}>Simpan</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center align-items-center">
                        <div className="col-md-8">
                            <button type="button" className="btn btn-success mb-3" data-bs-toggle="modal" data-bs-target="#tambahGolongan">
                                <i className="fa fa-plus"></i> Tambah Golongan
                            </button>
                            <table className="table table-hover text-center">
                                <thead>
                                    <tr>
                                        <th scope="col">Golongan</th>
                                        <th scope="col">Jabatan</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        golongan && golongan.map((golongan, idx) => (
                                            <tr key={idx}>
                                                <td>{golongan.golongan}</td>
                                                <td>{golongan.jabatan}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    )
}

export default Golongan