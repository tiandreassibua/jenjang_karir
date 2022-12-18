import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div className="container py-3">
            <header>
                <div className="d-flex flex-column flex-md-row align-items-center pb-3 mb-4 border-bottom">
                    <Link to={"/"} className="d-flex align-items-center text-dark text-decoration-none">
                        <span className="fs-4 fw-bold"><i className="fa fa-newspaper"></i> JENJANG KARIR</span  >
                    </Link>

                    <nav className="d-inline-flex mt-2 mt-md-0 ms-md-auto">
                        <Link className="me-3 py-2 text-dark text-decoration-none" to={"/"}>Beranda</Link>
                        <Link className="me-3 py-2 text-dark text-decoration-none" to={"/pegawai"}>Pegawai</Link>
                        <Link className="me-3 py-2 text-dark text-decoration-none" to={"/golongan"}>Golongan</Link>
                    </nav>
                </div>

                <div className="pricing-header p-3 pb-md-4 mx-auto text-center">
                    <h1 className="display-4 fw-semibold">Selamat Datang</h1>
                    <p className="fs-5 text-muted">
                        Universitas Kristen Duta Wacana didirikan pada tahun 1985 sebagai pengembangan dari Sekolah Tinggi Theologia Duta Wacana. Sekolah Tinggi Theologia Duta Wacana didirikan pada tahun 1962 sebagai penggabungan
                        dari Akademi Theologia Jogjakarta dan Sekolah Theologia
                        <br /><b>Alamat: </b>Jl. Dr. Wahidin Sudirohusodo No.5-25, Kotabaru, Kec. Gondokusuman, Kota Yogyakarta, Daerah Istimewa Yogyakarta 55224
                    </p>
                </div>
            </header>
        </div>
    )
}

export default Home