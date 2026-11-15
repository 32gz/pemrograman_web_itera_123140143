class Member:
    MAKS_PINJAM = 3

    def __init__(self, member_id, nama):
        self.__member_id = member_id
        self.__nama = nama
        self.__daftar_pinjam = []  

    @property
    def nama(self):
        return self.__nama

    @property
    def member_id(self):
        return self.__member_id

    def pinjam_item(self, item):
        if len(self.__daftar_pinjam) >= self.MAKS_PINJAM:
            print(f"  [X] {self.__nama} sudah mencapai batas {self.MAKS_PINJAM} pinjaman.")
            return False
        if item.pinjam():
            self.__daftar_pinjam.append(item)
            print(f"  [OK] {self.__nama} meminjam '{item.judul}'.")
            return True
        print(f"  [X] '{item.judul}' sedang dipinjam.")
        return False

    def kembalikan_item(self, item, hari_terlambat=0):
        if item in self.__daftar_pinjam and item.kembalikan():
            self.__daftar_pinjam.remove(item)
            denda = item.hitung_denda(hari_terlambat)
            print(f"  [OK] {self.__nama} mengembalikan '{item.judul}'. Denda: Rp{denda:,}")
            return True
        print(f"  [X] {self.__nama} tidak meminjam '{item.judul}'.")
        return False

    def tampilkan_pinjaman(self):
        print(f"Pinjaman {self.__nama}:")
        if not self.__daftar_pinjam:
            print("  (kosong)")
        for item in self.__daftar_pinjam:
            print(f"  - {item.judul}")
