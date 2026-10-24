import { NavLink } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <span className="navbar-brand">Rak Bukuku</span>
        <nav aria-label="Navigasi utama">
          <NavLink to="/" end>Rak Buku</NavLink>
          <NavLink to="/stats">Statistik</NavLink>
        </nav>
      </div>
    </header>
  );
}
