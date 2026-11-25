from pyramid.view import view_config
from pyramid.httpexceptions import (
    HTTPNotFound,
    HTTPBadRequest,
)
from sqlalchemy.exc import IntegrityError
from ..models import Matakuliah


def _parse_json_body(request):
    """Mem-parsing payload JSON dan memastikan bentuknya berupa dictionary."""
    try:
        data = request.json_body
    except ValueError:
        return None, HTTPBadRequest(json_body={'error': 'Payload JSON tidak valid'})
    if not isinstance(data, dict):
        return None, HTTPBadRequest(json_body={'error': 'Payload JSON harus berupa objek'})
    return data, None


def _get_matakuliah_or_error(request):
    """Mengambil data Matakuliah berdasarkan parameter ID di URL."""
    try:
        matakuliah_id = int(request.matchdict['id'])
    except ValueError:
        return None, HTTPBadRequest(json_body={'error': 'ID matakuliah harus berupa angka'})

    matakuliah = request.dbsession.query(Matakuliah).filter_by(id=matakuliah_id).first()
    if matakuliah is None:
        return None, HTTPNotFound(json_body={'error': f'Matakuliah dengan ID {matakuliah_id} tidak ditemukan'})
    return matakuliah, None


def _validate_non_empty_str(value, field_name):
    """Memvalidasi field string agar tidak kosong."""
    if not isinstance(value, str) or not value.strip():
        return None, HTTPBadRequest(json_body={'error': f'Field {field_name} harus berupa teks dan tidak boleh kosong'})
    return value.strip(), None


def _validate_positive_int(value, field_name):
    """Memvalidasi field bertipe integer positif (lebih besar dari 0)."""
    if not isinstance(value, int) or isinstance(value, bool) or value <= 0:
        return None, HTTPBadRequest(json_body={'error': f'Field {field_name} harus berupa angka bulat positif (> 0)'})
    return value, None


# 1. READ ALL: Menampilkan daftar seluruh mata kuliah
@view_config(route_name='matakuliah_list', request_method='GET', renderer='json')
def matakuliah_list(request):
    """View untuk mengambil semua data mata kuliah"""
    matakuliahs = request.dbsession.query(Matakuliah).order_by(Matakuliah.id.asc()).all()
    return {'matakuliahs': [mk.to_dict() for mk in matakuliahs]}


# 2. READ ONE: Menampilkan detail satu mata kuliah berdasarkan ID
@view_config(route_name='matakuliah_detail', request_method='GET', renderer='json')
def matakuliah_detail(request):
    """View untuk melihat detail satu mata kuliah berdasarkan ID di URL"""
    matakuliah, error = _get_matakuliah_or_error(request)
    if error is not None:
        return error

    return {'matakuliah': matakuliah.to_dict()}


# 3. CREATE: Menambahkan data mata kuliah baru
@view_config(route_name='matakuliah_add', request_method='POST', renderer='json')
def matakuliah_add(request):
    """View untuk menambahkan mata kuliah baru dari payload JSON"""
    json_data, error = _parse_json_body(request)
    if error is not None:
        return error

    required_fields = ['kode_mk', 'nama_mk', 'sks', 'semester']
    for field in required_fields:
        if field not in json_data or json_data[field] is None:
            return HTTPBadRequest(json_body={'error': f'Field {field} wajib diisi!'})

    kode_mk, error = _validate_non_empty_str(json_data['kode_mk'], 'kode_mk')
    if error is not None:
        return error

    nama_mk, error = _validate_non_empty_str(json_data['nama_mk'], 'nama_mk')
    if error is not None:
        return error

    sks, error = _validate_positive_int(json_data['sks'], 'sks')
    if error is not None:
        return error

    semester, error = _validate_positive_int(json_data['semester'], 'semester')
    if error is not None:
        return error

    dbsession = request.dbsession
    if dbsession.query(Matakuliah).filter_by(kode_mk=kode_mk).first() is not None:
        return HTTPBadRequest(json_body={'error': f'Kode mata kuliah {kode_mk} sudah terdaftar'})

    matakuliah = Matakuliah(
        kode_mk=kode_mk,
        nama_mk=nama_mk,
        sks=sks,
        semester=semester,
    )

    try:
        dbsession.add(matakuliah)
        dbsession.flush()
    except IntegrityError as e:
        return HTTPBadRequest(json_body={'error': str(e.orig)})

    return {'success': True, 'matakuliah': matakuliah.to_dict()}


# 4. UPDATE: Memperbarui data mata kuliah yang sudah ada
@view_config(route_name='matakuliah_update', request_method='PUT', renderer='json')
def matakuliah_update(request):
    """View untuk mengupdate data mata kuliah berdasarkan ID"""
    matakuliah, error = _get_matakuliah_or_error(request)
    if error is not None:
        return error

    json_data, error = _parse_json_body(request)
    if error is not None:
        return error

    if 'kode_mk' in json_data:
        kode_mk, error = _validate_non_empty_str(json_data['kode_mk'], 'kode_mk')
        if error is not None:
            return error
        existing = request.dbsession.query(Matakuliah).filter(
            Matakuliah.kode_mk == kode_mk,
            Matakuliah.id != matakuliah.id,
        ).first()
        if existing is not None:
            return HTTPBadRequest(json_body={'error': f'Kode mata kuliah {kode_mk} sudah terdaftar'})
        matakuliah.kode_mk = kode_mk

    if 'nama_mk' in json_data:
        nama_mk, error = _validate_non_empty_str(json_data['nama_mk'], 'nama_mk')
        if error is not None:
            return error
        matakuliah.nama_mk = nama_mk

    if 'sks' in json_data:
        sks, error = _validate_positive_int(json_data['sks'], 'sks')
        if error is not None:
            return error
        matakuliah.sks = sks

    if 'semester' in json_data:
        semester, error = _validate_positive_int(json_data['semester'], 'semester')
        if error is not None:
            return error
        matakuliah.semester = semester

    try:
        request.dbsession.flush()
    except IntegrityError as e:
        return HTTPBadRequest(json_body={'error': str(e.orig)})

    return {'success': True, 'matakuliah': matakuliah.to_dict()}


# 5. DELETE: Menghapus data mata kuliah
@view_config(route_name='matakuliah_delete', request_method='DELETE', renderer='json')
def matakuliah_delete(request):
    """View untuk menghapus mata kuliah berdasarkan ID"""
    matakuliah, error = _get_matakuliah_or_error(request)
    if error is not None:
        return error

    matakuliah_id = matakuliah.id
    request.dbsession.delete(matakuliah)

    return {'success': True, 'message': f'Matakuliah dengan ID {matakuliah_id} berhasil dihapus'}
