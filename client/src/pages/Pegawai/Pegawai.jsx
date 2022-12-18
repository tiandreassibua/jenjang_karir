import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import useSWR from 'swr';

const fetcher = (url) => axios.get(url).then((res) => res.data);

const Pegawai = () => {
    // fetch api pegawai
    const { data: pegawai } = useSWR('http://localhost:5000/api/pegawai', fetcher);

    // const [pegawai, setPegawai] = useState([]);

    // const getPegawai = async () => {
    //     try {
    //         const response = await axios.get('http://localhost:5000/api/pegawai/');
    //         console.log(response.data);

    //         setPegawai(response.data);
    //     } catch (err) {
    //         console.error(err.message);
    //     }
    // }

    // useEffect(() => {
    //     getPegawai();
    // }, []);
    return (
        <div className="container py-3">
            <header>
                <div className="d-flex flex-column flex-md-row align-items-center pb-3 mb-4 border-bottom">
                    <Link to={'/pegawai'} className="d-flex align-items-center text-dark text-decoration-none">
                        <span className="fs-4 fw-bold"><i className="fa fa-newspaper"></i> JENJANG KARIR</span>
                    </Link>

                    <nav className="d-inline-flex mt-2 mt-md-0 ms-md-auto">
                        <Link className="me-3 py-2 text-dark text-decoration-none" to={"/"}>Beranda</Link>
                        <Link className="me-3 py-2 text-dark text-decoration-none" to={"/pegawai"}>Pegawai</Link>
                        <Link className="me-3 py-2 text-dark text-decoration-none" to={"/golongan"}>Golongan</Link>
                    </nav>
                </div>

                <div className="pricing-header p-3 pb-md-4 mx-auto">
                    <h3 className="fw-semibold text-center">Data Pegawai</h3><br />
                    <Link to={'/pegawai/tambah'} className="btn btn-success mb-3"><i className="fa fa-plus"></i> Tambah Pegawai</Link>
                    <div className="table-responsive">
                        <table className="table table-hover text-center">
                            <thead>
                                <tr>
                                    <th scope="col">NIP</th>
                                    <th scope="col">Nama Lengkap</th>
                                    <th scope="col">Telepon</th>
                                    <th scope="col">Jenis Kelamin</th>
                                    <th scope="col">Alamat</th>
                                    <th scope="col">Opsi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pegawai && pegawai.map((data, idx) => (
                                    <tr key={idx}>
                                        <th scope="row">{data.nip}</th>
                                        <td>{data.nama_lengkap}</td>
                                        <td>{data.telepon}</td>
                                        <td>{data.jenis_kelamin}</td>
                                        <td className="text-start">{data.alamat}</td>
                                        <td>
                                            <Link to={`/pegawai/detail/${data.nip}`} className="btn btn-outline-success" title="Detail"><i className="fa fa-eye"></i></Link>
                                        </td>
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

export default Pegawai