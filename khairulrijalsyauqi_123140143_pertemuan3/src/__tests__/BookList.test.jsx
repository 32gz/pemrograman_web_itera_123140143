import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import BookList from '../components/BookList/BookList';

const books = [
  { id: '1', title: 'Bumi', author: 'Tere Liye', status: 'milik' },
  { id: '2', title: 'Hujan', author: 'Tere Liye', status: 'beli' },
];

describe('BookList', () => {
  it('menampilkan pesan kosong bila tidak ada buku', () => {
    render(<BookList books={[]} onEdit={() => {}} onDelete={() => {}} />);
    expect(screen.getByText(/belum ada buku/i)).toBeInTheDocument();
  });

  it('merender semua buku', () => {
    render(<BookList books={books} onEdit={() => {}} onDelete={() => {}} />);
    expect(screen.getByText('Bumi')).toBeInTheDocument();
    expect(screen.getByText('Hujan')).toBeInTheDocument();
  });

  it('memanggil onDelete dengan id buku', () => {
    const onDelete = vi.fn();
    render(<BookList books={books} onEdit={() => {}} onDelete={onDelete} />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Hapus' })[0]);
    expect(onDelete).toHaveBeenCalledWith('1');
  });
});
