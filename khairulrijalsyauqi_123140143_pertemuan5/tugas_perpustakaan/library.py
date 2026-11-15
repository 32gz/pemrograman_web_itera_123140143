from library_item import LibraryItem


class Library:

    def __init__(self, nama):
        self.nama = nama
        self.__koleksi = []   # private: daftar semua item

    def tambah_item(self, item):
        if not isinstance(item, LibraryItem):
            raise TypeError("Item harus turunan LibraryItem")
        if self.cari_by_id(item.item_id):
            print(f"  [X] ID '{item.item_id}' sudah ada.")
            return False
        self.__koleksi.append(item)
        print(f"  [OK] Ditambahkan: {item.judul}")
        return True

    def tampilkan_katalog(self, hanya_tersedia=False):
        judul = "ITEM TERSEDIA" if hanya_tersedia else "SEMUA ITEM"
        print(f"\n=== Katalog {self.nama} ({judul}) ===")
        tampil = [i for i in self.__koleksi if not (hanya_tersedia and i.is_dipinjam)]
        if not tampil:
            print("  (kosong)")
        for item in tampil:
            print(" ", item)   

    def cari_by_id(self, item_id):
        for item in self.__koleksi:
            if item.item_id == item_id:
                return item
        return None

    def cari_by_judul(self, kata_kunci):
        kata_kunci = kata_kunci.lower()
        return [i for i in self.__koleksi if kata_kunci in i.judul.lower()]
