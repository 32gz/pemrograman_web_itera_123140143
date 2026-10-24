import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import useLocalStorage from '../hooks/useLocalStorage';

describe('useLocalStorage', () => {
  it('memakai nilai awal bila localStorage kosong', () => {
    const { result } = renderHook(() => useLocalStorage('k', ['a']));
    expect(result.current[0]).toEqual(['a']);
  });

  it('membaca nilai yang sudah tersimpan', () => {
    localStorage.setItem('k', JSON.stringify(['tersimpan']));
    const { result } = renderHook(() => useLocalStorage('k', []));
    expect(result.current[0]).toEqual(['tersimpan']);
  });

  it('menyimpan perubahan ke localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('k', []));
    act(() => result.current[1](['baru']));
    expect(JSON.parse(localStorage.getItem('k'))).toEqual(['baru']);
  });
});
