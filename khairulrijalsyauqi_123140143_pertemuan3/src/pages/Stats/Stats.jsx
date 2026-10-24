import { useBooks } from '../../context/BookContext';
import useBookStats from '../../hooks/useBookStats';
import { STATUS_OPTIONS } from '../../constants';
import './Stats.css';

export default function Stats() {
  const { books } = useBooks();
  const stats = useBookStats(books);

  return (
    <div className="stats">
      <h2>Statistik koleksi</h2>
      <p className="stats-total">
        Total buku: <strong>{stats.total}</strong>
      </p>

      {stats.total === 0 ? (
        <div className="empty"><p>Belum ada data. Tambahkan buku di halaman Rak Buku.</p></div>
      ) : (
        // Persentase tiap status divisualisasikan sebagai lebar batang progres.
        <ul className="stats-list">
          {STATUS_OPTIONS.map((s) => (
            <li key={s.value}>
              <div className="stats-row">
                <span>{s.label}</span>
                <span>{stats[s.value]} buku ({stats.percent[s.value]}%)</span>
              </div>
              <div className="bar">
                <div className={`bar-fill fill-${s.value}`} style={{ width: `${stats.percent[s.value]}%` }} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
