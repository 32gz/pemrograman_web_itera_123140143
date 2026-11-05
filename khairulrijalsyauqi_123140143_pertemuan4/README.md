## Nama : Khairul Rijal Syauqi
## NIM  : 123140143

## Struktur Folder

```
.
├── tugas1_bmi.py
├── tugas2_nilai_mahasiswa.py
├── math_operations.py
├── main.py
└── README.md
```

## Prasyarat

- Python 3.6 atau lebih baru (menggunakan f-string)
- Tidak memerlukan library tambahan

Cek versi Python dengan perintah:

```bash
python --version
```

> Pada sebagian sistem (Linux/macOS), gunakan `python3` sebagai pengganti `python`.

---

## Program 1: Penghitung BMI

**Berkas:** `tugas1_bmi.py`

Menghitung Body Mass Index (BMI) dari berat dan tinggi badan yang dimasukkan pengguna, lalu menampilkan kategori status berat badan.

### Rumus

```
BMI = berat / (tinggi * tinggi)
```

### Kategori

| Nilai BMI            | Kategori             |
|----------------------|----------------------|
| BMI < 18.5           | Berat badan kurang   |
| 18.5 ≤ BMI < 25      | Berat badan normal   |
| 25 ≤ BMI < 30        | Berat badan berlebih |
| BMI ≥ 30             | Obesitas             |

### Cara Menjalankan

```bash
python tugas1_bmi.py
```

### Contoh Penggunaan

```
=== Penghitung BMI ===
Masukkan berat badan (kg): 65
Masukkan tinggi badan (m): 1.70
Nilai BMI Anda : 22.49
Kategori       : Berat badan normal
```

> **Catatan:** Tulis tinggi badan dalam satuan meter dengan titik sebagai pemisah desimal (contoh: `1.70`, bukan `1,70`).

---

## Program 2: Pengelolaan Data Nilai Mahasiswa

**Berkas:** `tugas2_nilai_mahasiswa.py`

Mengelola data nilai mahasiswa yang disimpan dalam list berisi dictionary. Program menghitung nilai akhir, menentukan grade, menampilkan tabel, serta mencari mahasiswa dengan nilai tertinggi dan terendah.

### Struktur Data

Setiap mahasiswa disimpan sebagai dictionary dengan kunci:

| Kunci         | Keterangan                     |
|---------------|--------------------------------|
| `nama`        | Nama mahasiswa                 |
| `nim`         | Nomor induk mahasiswa          |
| `nilai_uts`   | Nilai Ujian Tengah Semester    |
| `nilai_uas`   | Nilai Ujian Akhir Semester     |
| `nilai_tugas` | Nilai tugas                    |

Program menambahkan dua kunci hasil perhitungan: `nilai_akhir` dan `grade`.

### Rumus Nilai Akhir

```
Nilai Akhir = (30% × UTS) + (40% × UAS) + (30% × Tugas)
```

### Kriteria Grade

| Nilai Akhir  | Grade |
|--------------|-------|
| ≥ 80         | A     |
| 70 – 79      | B     |
| 60 – 69      | C     |
| 50 – 59      | D     |
| < 50         | E     |

### Fitur

- Menghitung nilai akhir dan grade setiap mahasiswa
- Menampilkan tabel rapi berisi Nama, NIM, Nilai Akhir, dan Grade
- Menampilkan mahasiswa dengan nilai akhir tertinggi dan terendah

### Cara Menjalankan

```bash
python tugas2_nilai_mahasiswa.py
```

### Contoh Hasil

Dengan data contoh bawaan, mahasiswa dengan nilai tertinggi adalah **Andi Pratama** (87.90, grade A) dan yang terendah adalah **Eko Wijaya** (45.00, grade E).

### Mengubah Data

Edit list `mahasiswa` di bagian atas berkas untuk menambah atau mengganti data. Tambahkan dictionary baru dengan format:

```python
{"nama": "Nama Baru", "nim": "123140143", "nilai_uts": 80, "nilai_uas": 75, "nilai_tugas": 90},
```

---

## Program 3: Modul Matematika

**Berkas:** `math_operations.py` (modul) dan `main.py` (program utama)

Terdiri dari modul berisi fungsi-fungsi matematika dan skrip utama yang mengimpor serta menguji seluruh fungsi tersebut.

> Kedua berkas harus berada di **folder yang sama** agar impor berhasil.

### Isi Modul `math_operations.py`

**Konstanta**

| Nama            | Nilai    | Keterangan                       |
|-----------------|----------|----------------------------------|
| `PI`            | 3.14159  | Nilai pi untuk perhitungan lingkaran |
| `KELVIN_OFFSET` | 273.15   | Selisih Celsius ke Kelvin        |

**Fungsi Geometri**

| Fungsi                                      | Rumus                    |
|---------------------------------------------|--------------------------|
| `luas_persegi(sisi)`                        | sisi × sisi              |
| `keliling_persegi(sisi)`                    | 4 × sisi                 |
| `luas_persegi_panjang(panjang, lebar)`      | panjang × lebar          |
| `keliling_persegi_panjang(panjang, lebar)`  | 2 × (panjang + lebar)    |
| `luas_lingkaran(jari_jari)`                 | PI × r²                  |
| `keliling_lingkaran(jari_jari)`             | 2 × PI × r               |

**Fungsi Konversi Suhu**

| Fungsi                         | Rumus            |
|--------------------------------|------------------|
| `celsius_ke_fahrenheit(c)`     | (C × 9/5) + 32   |
| `celsius_ke_kelvin(c)`         | C + 273.15       |

### Cara Impor yang Digunakan di `main.py`

```python
# 1. Impor seluruh modul
import math_operations

# 2. Impor fungsi tertentu saja
from math_operations import luas_lingkaran, keliling_lingkaran

# 3. Impor modul dengan alias
import math_operations as mo
```

### Cara Menjalankan

```bash
python main.py
```

### Contoh Penggunaan Langsung

```python
import math_operations

print(math_operations.luas_lingkaran(7))            # 153.93791
print(math_operations.celsius_ke_fahrenheit(37))    # 98.6
```

### Contoh Hasil `main.py`

```
==================================================
                    LINGKARAN
==================================================
Jari-jari             Luas      Keliling
----------------------------------------
1                     3.14          6.28
7                   153.94         43.98
10.5                346.36         65.97
```

Output lengkap `main.py` mencakup konstanta, persegi, persegi panjang, lingkaran, dan konversi suhu dalam tabel terpisah.