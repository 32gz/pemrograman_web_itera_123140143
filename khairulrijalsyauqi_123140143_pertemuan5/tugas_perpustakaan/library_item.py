from abc import ABC, abstractmethod


class LibraryItem(ABC):
  

    def __init__(self, item_id, judul, tahun):
        self._item_id = item_id     
        self._judul = judul          
        self._tahun = tahun          
        self.__dipinjam = False      

    
    @property
    def item_id(self):
        return self._item_id

    @property
    def judul(self):
        return self._judul

    @property
    def is_dipinjam(self):
        return self.__dipinjam

    def pinjam(self):
        if self.__dipinjam:
            return False
        self.__dipinjam = True
        return True

    def kembalikan(self):
        if not self.__dipinjam:
            return False
        self.__dipinjam = False
        return True

    @abstractmethod
    def get_detail(self):
        raise NotImplementedError("Method get_detail harus diimplementasikan subclass")

    @abstractmethod
    def hitung_denda(self, hari_terlambat):
        raise NotImplementedError("Method hitung_denda harus diimplementasikan subclass")

    def __str__(self):
        status = "Dipinjam" if self.__dipinjam else "Tersedia"
        return f"[{self._item_id}] {self.get_detail()} - {status}"


class Book(LibraryItem):
    DENDA_PER_HARI = 1000

    def __init__(self, item_id, judul, tahun, penulis, penerbit):
        super().__init__(item_id, judul, tahun)
        self._penulis = penulis
        self._penerbit = penerbit

    def get_detail(self):
        """Detail buku: judul, penulis, penerbit, tahun."""
        return (f"Buku: {self._judul} | Penulis: {self._penulis} | "
                f"Penerbit: {self._penerbit} | Tahun: {self._tahun}")

    def hitung_denda(self, hari_terlambat):
        return max(0, hari_terlambat) * self.DENDA_PER_HARI


class Magazine(LibraryItem):

    DENDA_PER_HARI = 2000

    def __init__(self, item_id, judul, tahun, edisi, bulan):
        super().__init__(item_id, judul, tahun)
        self._edisi = edisi
        self._bulan = bulan

    def get_detail(self):
        return (f"Majalah: {self._judul} | Edisi: {self._edisi} | "
                f"Bulan: {self._bulan} | Tahun: {self._tahun}")

    def hitung_denda(self, hari_terlambat):
        return max(0, hari_terlambat) * self.DENDA_PER_HARI
