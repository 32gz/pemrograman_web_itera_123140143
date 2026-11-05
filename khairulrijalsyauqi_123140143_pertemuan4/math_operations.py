PI = 3.14159
KELVIN_OFFSET = 273.15


def luas_persegi(sisi):
    """Luas persegi = sisi * sisi"""
    return sisi * sisi


def keliling_persegi(sisi):
    """Keliling persegi = 4 * sisi"""
    return 4 * sisi


def luas_persegi_panjang(panjang, lebar):
    """Luas persegi panjang = panjang * lebar"""
    return panjang * lebar


def keliling_persegi_panjang(panjang, lebar):
    """Keliling persegi panjang = 2 * (panjang + lebar)"""
    return 2 * (panjang + lebar)


def luas_lingkaran(jari_jari):
    """Luas lingkaran = PI * r^2"""
    return PI * jari_jari ** 2


def keliling_lingkaran(jari_jari):
    """Keliling lingkaran = 2 * PI * r"""
    return 2 * PI * jari_jari


def celsius_ke_fahrenheit(celsius):
    """F = (C * 9/5) + 32"""
    return (celsius * 9 / 5) + 32


def celsius_ke_kelvin(celsius):
    """K = C + 273.15"""
    return celsius + KELVIN_OFFSET