import argparse
import sys
from datetime import date

from pyramid.paster import bootstrap, setup_logging
from sqlalchemy.exc import OperationalError

from .. import models


def setup_models(dbsession):
    """Menambahkan data awal (seeding) mahasiswa dan matakuliah ke database"""
    initial_mahasiswa = [
        models.Mahasiswa(
            nim='12345',
            nama='Budi Santoso',
            jurusan='Teknik Informatika',
            tanggal_lahir=date(2000, 5, 15),
            alamat='Jl. Merdeka No. 123, Bandung'
        ),
        models.Mahasiswa(
            nim='54321',
            nama='Siti Aminah',
            jurusan='Sistem Informasi',
            tanggal_lahir=date(2001, 8, 22),
            alamat='Jl. Mawar No. 45, Jakarta'
        ),
    ]

    for mhs in initial_mahasiswa:
        if dbsession.query(models.Mahasiswa).filter_by(nim=mhs.nim).first() is None:
            dbsession.add(mhs)

    initial_matakuliah = [
        models.Matakuliah(
            kode_mk='IF2110',
            nama_mk='Pemrograman Web',
            sks=3,
            semester=3
        ),
        models.Matakuliah(
            kode_mk='IF3140',
            nama_mk='Basis Data',
            sks=4,
            semester=5
        ),
        models.Matakuliah(
            kode_mk='IF2130',
            nama_mk='Sistem Operasi',
            sks=3,
            semester=3
        ),
    ]

    for mk in initial_matakuliah:
        if dbsession.query(models.Matakuliah).filter_by(kode_mk=mk.kode_mk).first() is None:
            dbsession.add(mk)


def parse_args(argv):
    parser = argparse.ArgumentParser()
    parser.add_argument(
        'config_uri',
        help='Configuration file, e.g., development.ini',
    )
    return parser.parse_args(argv[1:])


def main(argv=sys.argv):
    args = parse_args(argv)
    setup_logging(args.config_uri)
    env = bootstrap(args.config_uri)

    try:
        with env['request'].tm:
            dbsession = env['request'].dbsession
            setup_models(dbsession)
            print("Berhasil memasukkan data seeding awal mahasiswa dan matakuliah!")
    except OperationalError:
        print("Pyramid gagal terhubung ke database SQL.")
        print("Pastikan service PostgreSQL berjalan dan connection string di development.ini benar.")


if __name__ == '__main__':
    main()