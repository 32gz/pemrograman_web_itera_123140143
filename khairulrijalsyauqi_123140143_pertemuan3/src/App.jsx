import { Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Stats from './pages/Stats/Stats';
import './App.css';

function NotFound() {
  return (
    <div className="empty">
      <h2>Halaman tidak ditemukan</h2>
      <p>
        Alamat yang kamu buka tidak ada. <Link to="/">Kembali ke rak buku</Link>
      </p>
    </div>
  );
}

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="container">
        {/* Rute utama aplikasi; rute wildcard menampilkan halaman untuk URL tak dikenal. */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}
