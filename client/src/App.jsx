import React from 'react'
import Home from './pages/Home';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Pegawai from './pages/Pegawai/Pegawai';
import TambahPegawai from './pages/Pegawai/TambahPegawai';
import TambahJenjangKarir from './pages/Pegawai/TambahJenjangKarir';
import DetailPegawai from './pages/Pegawai/DetailPegawai';
import Golongan from './pages/Golongan/Golongan';
import Formik from './Formik';


function App() {
  const router = createBrowserRouter([
    { path: '/', element: <Home /> },
    { path: '/pegawai', element: <Pegawai /> },
    { path: '/pegawai/detail/:nip', element: <DetailPegawai /> },
    { path: '/pegawai/tambah', element: <TambahPegawai /> },
    { path: '/pegawai/jenjang/tambah/:nip', element: <TambahJenjangKarir /> },
    { path: '/formik', element: <Formik /> },

    { path: '/golongan', element: <Golongan /> },
  ]);
  
  
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
