from library_item import Book, Magazine
from library import Library
from member import Member


def main():
    perpus = Library("Perpustakaan ITERA")

    print("--- Menambahkan item ---")
    perpus.tambah_item(Book("B001", "Pemrograman Python", 2020, "Budi Santoso", "Informatika"))
    perpus.tambah_item(Book("B002", "Algoritma dan Struktur Data", 2019, "Siti Aminah", "Erlangga"))
    perpus.tambah_item(Magazine("M001", "National Geographic", 2024, "No. 12", "Desember"))
    perpus.tambah_item(Magazine("M002", "Tempo", 2024, "No. 45", "November"))
    perpus.tambah_item(Book("B001", "Duplikat", 2021, "-", "-"))  

    perpus.tampilkan_katalog()

    print("\n--- Pencarian ---")
    item = perpus.cari_by_id("M001")
    print("Cari id 'M001'  :", item.judul if item else "tidak ditemukan")
    for hasil in perpus.cari_by_judul("python"):
        print("Cari 'python'   :", hasil.judul)

    print("\n--- Peminjaman ---")
    syauqi = Member("A01", "Khairul Rijal Syauqi")
    syauqi.pinjam_item(perpus.cari_by_id("B001"))
    syauqi.pinjam_item(perpus.cari_by_id("B001"))  
    syauqi.pinjam_item(perpus.cari_by_id("M001"))
    syauqi.tampilkan_pinjaman()

    perpus.tampilkan_katalog(hanya_tersedia=True)

    print("\n--- Pengembalian & denda ---")
    syauqi.kembalikan_item(perpus.cari_by_id("B001"), hari_terlambat=3)
    syauqi.kembalikan_item(perpus.cari_by_id("M001"), hari_terlambat=3)

    perpus.tampilkan_katalog()


if __name__ == "__main__":
    main()
