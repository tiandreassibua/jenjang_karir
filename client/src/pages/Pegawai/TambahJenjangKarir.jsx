import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios';

import { useFormik } from "formik";
import * as Yup from "yup";

const TambahJenjangKarir = () => {
    const location = useLocation();
    const nip = location.pathname.split('/')[4];

    const navigate = useNavigate();
    const [pegawai, setPegawai] = useState([]);
    const [golongan, setGolongan] = useState([]);

    const formik = useFormik({
        initialValues: {
            nip: nip,
            golongan: '',
            kedisiplinan: '',
            tanggung_jawab: '',
            sikap: '',
            kompetensi: ''
        },
        validationSchema: Yup.object({
            nip: Yup.string()
                .required("NIP harus diisi"),
            golongan: Yup.string()
                .required("Golongan harus diisi"),
            kedisiplinan: Yup.number()
                .required("Kedisiplinan harus diisi")
                .min(0, "Kedisiplinan")
                .max(5, "Kedisiplinan"),
            tanggung_jawab: Yup.number()
                .required("Tanggung Jawab harus diisi")
                .min(0, "Tanggung Jawab")
                .max(5, "Tanggung Jawab"),
            sikap: Yup.number()
                .required("Sikap harus diisi")
                .min(0, "Sikap")
                .max(5, "Sikap"),
            kompetensi: Yup.number()
                .required("Kompetensi harus diisi")
                .min(0, "Kompetensi")
                .max(5, "Kompetensi")
        }),
        onSubmit: async (values) => {
            const response = await axios.get(`http://localhost:5000/api/kinerja/cek/${nip}/${values.golongan}`)
            console.log(response.data);
            if (response.data.status !== 0) {
                alert(response.data.msg);
                return;
            } else {
                console.log(values)
                await axios.post('http://localhost:5000/api/kinerja', {
                    ...values,
                    total_poin: (parseInt(values.kedisiplinan) + parseInt(values.tanggung_jawab) + parseInt(values.sikap) + parseInt(values.kompetensi))
                });
                alert('Data kinerja berhasil disimpan!');
                navigate(`/pegawai/detail/${nip}`);
            }
        },
    });

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

                    <form method="post" onSubmit={formik.handleSubmit} className="row g-3">
                        <div className="col-md-2">
                            <label className="form-label">Kedisiplinan</label>
                            <input type="number" name="kedisiplinan" className="form-control" onChange={formik.handleChange} min="0" max="5"  />
                            {formik.errors.kedisiplinan && formik.touched.kedisiplinan ? (
                                <div className="text-danger">{formik.errors.kedisiplinan}</div>
                            ) : null}
                        </div>
                        <div className="col-md-2">
                            <label className="form-label">Tanggung Jawab</label>
                            <input type="number" name="tanggung_jawab" className="form-control" onChange={formik.handleChange} min="0" max="5"  />
                            {formik.errors.tanggung_jawab && formik.touched.tanggung_jawab ? (
                                <div className="text-danger">{formik.errors.tanggung_jawab}</div>
                            ) : null}
                        </div>
                        <div className="col-md-2">
                            <label className="form-label">Sikap</label>
                            <input type="number" name="sikap" className="form-control" onChange={formik.handleChange} min="0" max="5" />
                            {formik.errors.sikap && formik.touched.sikap ? (
                                <div className="text-danger">{formik.errors.sikap}</div>
                            ) : null}
                        </div>
                        <div className="col-md-2">
                            <label className="form-label">Kompetensi</label>
                            <input type="number" name="kompetensi" className="form-control" onChange={formik.handleChange} min="0" max="5"  />
                            {formik.errors.kompetensi && formik.touched.kompetensi ? (
                                <div className="text-danger">{formik.errors.kompetensi}</div>
                            ) : null}
                        </div>
                        <div className="col-md-2">
                            <label className="form-label">Golongan</label>
                            <select name="golongan" className="form-select" onChange={formik.handleChange} >
                                <option selected>Pilih...</option>
                                {golongan.map((gol, id) => (
                                    <option key={id} value={gol.golongan} className={(gol.golongan === pegawai ? 'fw-semibold' : '')} disabled={!(gol.golongan[0] === pegawai[0])}>
                                        {gol.golongan} - {gol.jabatan} {gol.golongan === pegawai ? '(saat ini)' : ''}
                                    </option>
                                ))}
                            </select>
                            {formik.errors.golongan && formik.touched.golongan ? (
                                <div className="text-danger">{formik.errors.golongan}</div>
                            ) : null}
                        </div>
                        <div className="col-md-2">
                            <label className="form-label">`</label>
                            <button className='form-control btn btn-block btn-success' type="submit">
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