mahasiswa = [
    {"nama": "Khairul",   "nim": "123140143", "nilai_uts": 85, "nilai_uas": 90, "nilai_tugas": 88},
    {"nama": "Budi",   "nim": "123140067", "nilai_uts": 70, "nilai_uas": 75, "nilai_tugas": 80},
    {"nama": "Citra",  "nim": "123140069", "nilai_uts": 60, "nilai_uas": 65, "nilai_tugas": 70},
    {"nama": "Dewi", "nim": "123140666", "nilai_uts": 55, "nilai_uas": 50, "nilai_tugas": 60},
    {"nama": "Eko",     "nim": "123140969", "nilai_uts": 40, "nilai_uas": 45, "nilai_tugas": 50},
    {"nama": "Fitri", "nim": "123140041", "nilai_uts": 78, "nilai_uas": 82, "nilai_tugas": 75},
]


def hitung_nilai_akhir(uts, uas, tugas):
    """Nilai Akhir = 30% UTS + 40% UAS + 30% Tugas"""
    return (0.30 * uts) + (0.40 * uas) + (0.30 * tugas)


def tentukan_grade(nilai):
    if nilai >= 80:
        return "A"
    elif nilai >= 70:
        return "B"
    elif nilai >= 60:
        return "C"
    elif nilai >= 50:
        return "D"
    else:
        return "E"


for mhs in mahasiswa:
    mhs["nilai_akhir"] = hitung_nilai_akhir(
        mhs["nilai_uts"], mhs["nilai_uas"], mhs["nilai_tugas"]
    )
    mhs["grade"] = tentukan_grade(mhs["nilai_akhir"])
    
garis = "=" * 56
print(garis)
print("DAFTAR NILAI MAHASISWA".center(56))
print(garis)
print(f"{'No':<4}{'Nama':<20}{'NIM':<12}{'Nilai Akhir':>12}{'Grade':>8}")
print("-" * 56)

for i, mhs in enumerate(mahasiswa, start=1):
    print(
        f"{i:<4}{mhs['nama']:<20}{mhs['nim']:<12}"
        f"{mhs['nilai_akhir']:>12.2f}{mhs['grade']:>8}"
    )
print(garis)

tertinggi = max(mahasiswa, key=lambda m: m["nilai_akhir"])
terendah = min(mahasiswa, key=lambda m: m["nilai_akhir"])

print("\nMahasiswa dengan nilai akhir TERTINGGI:")
print(f"  Nama        : {tertinggi['nama']}")
print(f"  NIM         : {tertinggi['nim']}")
print(f"  Nilai Akhir : {tertinggi['nilai_akhir']:.2f}")
print(f"  Grade       : {tertinggi['grade']}")

print("\nMahasiswa dengan nilai akhir TERENDAH:")
print(f"  Nama        : {terendah['nama']}")
print(f"  NIM         : {terendah['nim']}")
print(f"  Nilai Akhir : {terendah['nilai_akhir']:.2f}")
print(f"  Grade       : {terendah['grade']}")