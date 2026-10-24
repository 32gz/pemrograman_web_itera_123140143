import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import BookFilter from '../components/BookFilter/BookFilter';

describe('BookFilter', () => {
  it('memanggil onStatusChange saat tab diklik', () => {
    const onStatusChange = vi.fn();
    render(
      <BookFilter status="semua" onStatusChange={onStatusChange} query="" onQueryChange={() => {}} />
    );
    fireEvent.click(screen.getByRole('button', { name: 'Milik' }));
    expect(onStatusChange).toHaveBeenCalledWith('milik');
  });

  it('memanggil onQueryChange saat mengetik pencarian', () => {
    const onQueryChange = vi.fn();
    render(
      <BookFilter status="semua" onStatusChange={() => {}} query="" onQueryChange={onQueryChange} />
    );
    fireEvent.change(screen.getByLabelText(/cari judul/i), { target: { value: 'bumi' } });
    expect(onQueryChange).toHaveBeenCalledWith('bumi');
  });
});
