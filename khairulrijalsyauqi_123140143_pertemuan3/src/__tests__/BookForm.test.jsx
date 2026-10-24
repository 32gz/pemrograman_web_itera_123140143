import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import BookForm from '../components/BookForm/BookForm';

describe('BookForm', () => {
  it('menampilkan pesan error saat kolom kosong', () => {
    const onSubmit = vi.fn();
    render(<BookForm onSubmit={onSubmit} />);
    fireEvent.click(screen.getByRole('button', { name: /tambah buku/i }));

    expect(screen.getByText('Judul buku wajib diisi.')).toBeInTheDocument();
    expect(screen.getByText('Nama penulis wajib diisi.')).toBeInTheDocument();
    expect(screen.getByLabelText('Judul')).toHaveClass('invalid');
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('memanggil onSubmit dengan data valid', () => {
    const onSubmit = vi.fn();
    render(<BookForm onSubmit={onSubmit} />);
    fireEvent.change(screen.getByLabelText('Judul'), { target: { value: ' Bumi ' } });
    fireEvent.change(screen.getByLabelText('Penulis'), { target: { value: 'Tere Liye' } });
    fireEvent.change(screen.getByLabelText('Status'), { target: { value: 'baca' } });
    fireEvent.click(screen.getByRole('button', { name: /tambah buku/i }));

    expect(onSubmit).toHaveBeenCalledWith({ title: 'Bumi', author: 'Tere Liye', status: 'baca' });
  });

  it('mengisi form saat mode edit', () => {
    const data = { id: '1', title: 'Laskar Pelangi', author: 'Andrea Hirata', status: 'milik' };
    render(<BookForm onSubmit={() => {}} initialData={data} />);
    expect(screen.getByLabelText('Judul')).toHaveValue('Laskar Pelangi');
    expect(screen.getByRole('button', { name: /simpan perubahan/i })).toBeInTheDocument();
  });
});
