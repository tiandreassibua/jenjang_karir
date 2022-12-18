import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Moment from 'moment';


const DetailPegawai = () => {
    const [pegawai, setPegawai] = useState([]);
    const [jenjang, setJenjang] = useState([]);

    const navigate = useNavigate();
    const location = useLocation();
    const nip = location.pathname.split("/")[3];

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:5000/api/pegawai/nip/${nip}`);
            alert('Data pegawai berhasil dihapus!');
            navigate('/pegawai');
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        const getDetailPegawai = async () => {
            try {
                const detailPegawai = await axios.get(`http://localhost:5000/api/pegawai/nip/${nip}`);
                const dataKinerja = await axios.get(`http://localhost:5000/api/kinerja/nip/${nip}`);
                setPegawai(detailPegawai.data[0]);
                setJenjang(dataKinerja.data);
                console.log(dataKinerja.data);
            } catch (err) {
                console.error(err.message);
            }
        }

        getDetailPegawai();
    }, [nip]);

    return (
        <div className="container py-3">
            <header>
                <div className="d-flex flex-column flex-md-row align-items-center pb-3 mb-4 border-bottom">
                    <a href="index.php" className="d-flex align-items-center text-dark text-decoration-none">
                        <span className="fs-4 fw-bold"><i className="fa fa-newspaper"></i> JENJANG KARIR</span>
                    </a>

                    <nav className="d-inline-flex mt-2 mt-md-0 ms-md-auto">
                        <Link to={'/pegawai'} className="btn btn-secondary mb-3" title="Kembali">
                            <i className="fa fa-angles-left"></i> Kembali
                        </Link>
                    </nav>
                </div>
                <div className="pricing-header p-3 pb-md-4 mx-auto">
                    <h3 className="fw-semibold text-center">Detail Pegawai</h3><br />

                    <a href="edit_pegawai.php?nip=<?= $nip ?>" className="btn btn-info mb-3" title="Edit Pegawai">
                        <i className="fa fa-pen-to-square"></i>
                    </a>
                    <button className="btn btn-danger mb-3" title="Hapus Pegawai" onClick={handleDelete}>
                        <i className="fa fa-trash"></i>
                    </button>
                    <table className="table table-hover table-responsive justify-content-center align-items-center text-center">
                        <tbody>
                            <tr>
                                <th>NIP</th>
                                <td>{pegawai.nip}</td>
                            </tr>
                            <tr>
                                <th>Nama</th>
                                <td>{pegawai.nama_lengkap}</td>
                            </tr>
                            <tr>
                                <th>Telepon</th>
                                <td>{pegawai.telepon}</td>
                            </tr>
                            <tr>
                                <th>Jenis Kelamin</th>
                                <td>{pegawai.jenis_kelamin === 'L' ? 'Laki-laki' : 'Perempuan'}</td>
                            </tr>
                            <tr>
                                <th>Alamat</th>
                                <td>{pegawai.alamat}</td>
                            </tr>
                            <tr>
                                <th>Golongan/Jabatan</th>
                                <td>
                                    <b>{pegawai.golongan}</b> / {pegawai.jabatan}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <br />
                    <br />
                    <h3 className="fw-semibold text-center">Jenjang Karir</h3><br />
                    <Link to={`/pegawai/jenjang/tambah/${pegawai.nip}`} className="btn btn-success mb-3" title="Tambah Jenjang Karir">
                        <i className="fa fa-circle-plus"></i>
                    </Link>
                    <div className="table-responsive">
                        <table className="table table-hover text-center">
                            <thead>
                                <tr>
                                    <th scope="col">NIP</th>
                                    <th scope="col">Golongan</th>
                                    <th scope="col">Jabatan</th>
                                    <th scope="col">Kedisiplinan</th>
                                    <th scope="col">Tanggung Jawab</th>
                                    <th scope="col">Sikap</th>
                                    <th scope="col">Kompetensi</th>
                                    <th scope="col">Total Poin</th>
                                    <th scope="col">Tanggal Berlaku</th>
                                </tr>
                            </thead>
                            <tbody>
                                {jenjang.map((data, idx) => (

                                    <tr key={idx}>
                                        <th scope="row">{data.nip}</th>
                                        <td>{data.golongan}</td>
                                        <td>{data.jabatan}</td>
                                        <td>{data.kedisiplinan}{!data.kedisiplinan && '-'}</td>
                                        <td>{data.tanggung_jawab}{!data.tanggung_jawab && '-'}</td>
                                        <td>{data.sikap}{!data.sikap && '-'}</td>
                                        <td>{data.kompetensi}{!data.kompetensi && '-'}</td>
                                        <td>{data.total_poin}{!data.total_poin && '-'}</td>
                                        <td>{Moment(data.tanggal_berlaku).format('DD MMM YYYY')}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </header>
        </div>
    )
}

export default DetailPegawai