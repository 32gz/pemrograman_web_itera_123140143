import PropTypes from 'prop-types';
import { STATUS_OPTIONS } from '../../constants';
import './BookFilter.css';

export default function BookFilter({ status, onStatusChange, query, onQueryChange }) {
  const options = [{ value: 'semua', label: 'Semua' }, ...STATUS_OPTIONS];

  return (
    <div className="book-filter">
      <div className="field">
        <label htmlFor="search">Cari judul atau penulis</label>
        <input
          id="search"
          type="search"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Contoh: Laskar Pelangi"
        />
      </div>
      <div className="filter-tabs" role="group" aria-label="Filter status">
        {options.map((o) => (
          <button
            key={o.value}
            type="button"
            className={`tab ${status === o.value ? 'active' : ''}`}
            aria-pressed={status === o.value}
            onClick={() => onStatusChange(o.value)}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}

BookFilter.propTypes = {
  status: PropTypes.string.isRequired,
  onStatusChange: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired,
  onQueryChange: PropTypes.func.isRequired,
};
