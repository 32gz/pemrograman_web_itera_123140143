import { createContext, useContext, useMemo, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import useLocalStorage from '../hooks/useLocalStorage';

const BookContext = createContext(null);

export function BookProvider({ children }) {
  // Data buku bertahan setelah halaman dimuat ulang; filter hanya berlaku selama sesi.
  const [books, setBooks] = useLocalStorage('books', []);
  const [statusFilter, setStatusFilter] = useState('semua');
  const [searchQuery, setSearchQuery] = useState('');

  // Operasi CRUD menggunakan updater agar perubahan selalu berdasarkan state terbaru.
  const addBook = useCallback(
    (data) => {
      setBooks((prev) => [...prev, { id: crypto.randomUUID(), ...data }]);
    },
    [setBooks]
  );

  const updateBook = useCallback(
    (id, data) => {
      setBooks((prev) => prev.map((b) => (b.id === id ? { ...b, ...data } : b)));
    },
    [setBooks]
  );

  const deleteBook = useCallback(
    (id) => {
      setBooks((prev) => prev.filter((b) => b.id !== id));
    },
    [setBooks]
  );

  const filteredBooks = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    // Buku harus cocok dengan filter status sekaligus kata pencarian.
    return books.filter((b) => {
      const matchStatus = statusFilter === 'semua' || b.status === statusFilter;
      const matchSearch =
        q === '' || b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q);
      return matchStatus && matchSearch;
    });
  }, [books, statusFilter, searchQuery]);

  const value = {
    books,
    filteredBooks,
    statusFilter,
    searchQuery,
    setStatusFilter,
    setSearchQuery,
    addBook,
    updateBook,
    deleteBook,
  };

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
}

BookProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// eslint-disable-next-line react-refresh/only-export-components
export function useBooks() {
  const ctx = useContext(BookContext);
  // Beri pesan jelas jika hook dipakai di luar provider yang menyuplai datanya.
  if (!ctx) throw new Error('useBooks harus dipakai di dalam <BookProvider>');
  return ctx;
}
