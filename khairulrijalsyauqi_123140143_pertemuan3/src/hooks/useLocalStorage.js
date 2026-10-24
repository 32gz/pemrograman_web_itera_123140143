import { useState, useEffect } from 'react';

/**
 * State yang otomatis tersinkron dengan localStorage.
 * Mendukung functional update: setValue((prev) => ...).
 */
export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key);
      return stored !== null ? JSON.parse(stored) : initialValue;
    } catch (error) {
      console.error(`Gagal membaca localStorage "${key}":`, error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Gagal menyimpan localStorage "${key}":`, error);
    }
  }, [key, value]);

  return [value, setValue];
}
