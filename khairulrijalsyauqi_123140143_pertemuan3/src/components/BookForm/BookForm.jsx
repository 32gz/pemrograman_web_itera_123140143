import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { STATUS_OPTIONS } from '../../constants';
import './BookForm.css';

const EMPTY = { title: '', author: '', status: 'milik' };

export default function BookForm({ onSubmit, initialData, onCancel }) {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const isEditing = Boolean(initialData);

  useEffect(() => {
    setForm(initialData ? { ...EMPTY, ...initialData } : EMPTY);
    setErrors({});
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const next = {};
    if (!form.title.trim()) next.title = 'Judul buku wajib diisi.';
    if (!form.author.trim()) next.author = 'Nama penulis wajib diisi.';
    if (!form.status) next.status = 'Pilih status buku.';
    return next;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validasi dilakukan sebelum data dikirim agar judul dan penulis tidak kosong.
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    onSubmit({
      title: form.title.trim(),
      author: form.author.trim(),
      status: form.status,
    });
    if (!isEditing) setForm(EMPTY);
  };

  return (
    <form className="book-form" onSubmit={handleSubmit} noValidate>
      <h2>{isEditing ? 'Edit buku' : 'Tambah buku'}</h2>

      <div className="field">
        <label htmlFor="title">Judul</label>
        <input
          id="title"
          name="title"
          value={form.title}
          onChange={handleChange}
          className={errors.title ? 'invalid' : ''}
          aria-invalid={Boolean(errors.title)}
          aria-describedby={errors.title ? 'title-error' : undefined}
        />
        {errors.title && <p className="error" id="title-error" role="alert">{errors.title}</p>}
      </div>

      <div className="field">
        <label htmlFor="author">Penulis</label>
        <input
          id="author"
          name="author"
          value={form.author}
          onChange={handleChange}
          className={errors.author ? 'invalid' : ''}
          aria-invalid={Boolean(errors.author)}
          aria-describedby={errors.author ? 'author-error' : undefined}
        />
        {errors.author && <p className="error" id="author-error" role="alert">{errors.author}</p>}
      </div>

      <div className="field">
        <label htmlFor="status">Status</label>
        <select
          id="status"
          name="status"
          value={form.status}
          onChange={handleChange}
          className={errors.status ? 'invalid' : ''}
        >
          {STATUS_OPTIONS.map((s) => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>
        {errors.status && <p className="error" role="alert">{errors.status}</p>}
      </div>

      <div className="form-actions">
        <button type="submit" className="btn">
          {isEditing ? 'Simpan perubahan' : 'Tambah buku'}
        </button>
        {isEditing && (
          <button type="button" className="btn btn-ghost" onClick={onCancel}>
            Batal
          </button>
        )}
      </div>
    </form>
  );
}

BookForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialData: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    author: PropTypes.string,
    status: PropTypes.oneOf(['milik', 'baca', 'beli']),
  }),
  onCancel: PropTypes.func,
};

BookForm.defaultProps = {
  initialData: null,
  onCancel: () => {},
};
