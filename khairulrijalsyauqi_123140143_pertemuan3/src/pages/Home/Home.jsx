import { useState } from 'react';
import { useBooks } from '../../context/BookContext';
import BookForm from '../../components/BookForm/BookForm';
import BookFilter from '../../components/BookFilter/BookFilter';
import BookList from '../../components/BookList/BookList';
import './Home.css';

export default function Home() {
  const {
    filteredBooks, statusFilter, searchQuery,
    setStatusFilter, setSearchQuery, addBook, updateBook, deleteBook,
  } = useBooks();
  const [editingBook, setEditingBook] = useState(null);

  const handleSubmit = (data) => {
    // Form yang sama menangani penambahan maupun perubahan buku yang dipilih.
    if (editingBook) {
      updateBook(editingBook.id, data);
      setEditingBook(null);
    } else {
      addBook(data);
    }
  };

  const handleDelete = (id) => {
    // Minta konfirmasi sebelum menghapus dan tutup form jika buku itu sedang diedit.
    if (window.confirm('Hapus buku ini dari rak?')) {
      deleteBook(id);
      if (editingBook?.id === id) setEditingBook(null);
    }
  };

  const handleEdit = (book) => {
    setEditingBook(book);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="home">
      <BookForm
        onSubmit={handleSubmit}
        initialData={editingBook}
        onCancel={() => setEditingBook(null)}
      />
      <h2>Koleksi saya</h2>
      <BookFilter
        status={statusFilter}
        onStatusChange={setStatusFilter}
        query={searchQuery}
        onQueryChange={setSearchQuery}
      />
      <BookList books={filteredBooks} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
}
