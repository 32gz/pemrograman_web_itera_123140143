import PropTypes from 'prop-types';
import { STATUS_LABEL } from '../../constants';
import './BookItem.css';

export default function BookItem({ book, onEdit, onDelete }) {
  return (
    <li className={`book-item status-${book.status}`}>
      <div className="book-info">
        <h3>{book.title}</h3>
        <p>{book.author}</p>
        <span className="badge">{STATUS_LABEL[book.status]}</span>
      </div>
      <div className="book-actions">
        <button type="button" className="btn btn-ghost btn-sm" onClick={() => onEdit(book)}>
          Edit
        </button>
        <button type="button" className="btn btn-danger btn-sm" onClick={() => onDelete(book.id)}>
          Hapus
        </button>
      </div>
    </li>
  );
}

BookItem.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    status: PropTypes.oneOf(['milik', 'baca', 'beli']).isRequired,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
