import math_operations
from math_operations import luas_lingkaran, keliling_lingkaran
import math_operations as mo


def judul(teks):
    print("\n" + "=" * 50)
    print(teks.center(50))
    print("=" * 50)


judul("KONSTANTA")
print(f"Nilai PI : {math_operations.PI}")

judul("PERSEGI")
print(f"{'Sisi':<10}{'Luas':>15}{'Keliling':>15}")
print("-" * 40)
for sisi in [2, 5, 7.5]:
    luas = math_operations.luas_persegi(sisi)
    keliling = math_operations.keliling_persegi(sisi)
    print(f"{sisi:<10}{luas:>15.2f}{keliling:>15.2f}")

judul("PERSEGI PANJANG")
print(f"{'Panjang':<10}{'Lebar':<10}{'Luas':>10}{'Keliling':>10}")
print("-" * 40)
for p, l in [(4, 3), (10, 6), (8.5, 2.5)]:
    luas = mo.luas_persegi_panjang(p, l)
    keliling = mo.keliling_persegi_panjang(p, l)
    print(f"{p:<10}{l:<10}{luas:>10.2f}{keliling:>10.2f}")

judul("LINGKARAN")
print(f"{'Jari-jari':<12}{'Luas':>14}{'Keliling':>14}")
print("-" * 40)
for r in [1, 7, 10.5]:
    luas = luas_lingkaran(r)
    keliling = keliling_lingkaran(r)
    print(f"{r:<12}{luas:>14.2f}{keliling:>14.2f}")

judul("KONVERSI SUHU")
print(f"{'Celsius':<12}{'Fahrenheit':>14}{'Kelvin':>14}")
print("-" * 40)
for c in [-40, 0, 25, 37, 100]:
    f = math_operations.celsius_ke_fahrenheit(c)
    k = math_operations.celsius_ke_kelvin(c)
    print(f"{c:<12}{f:>14.2f}{k:>14.2f}")

print()