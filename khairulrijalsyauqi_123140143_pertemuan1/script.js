(function(){
  var KEY = 'miniPosKeranjang';
  var keranjang = [];
  var promoAktif = false;
  var MIN_DISKON = 50000;

  var el = function(id){ return document.getElementById(id); };
  var rupiah = function(n){ return 'Rp ' + Math.round(n).toLocaleString('id-ID'); };

 
  function simpan(){
    try { localStorage.setItem(KEY, JSON.stringify({items: keranjang, promo: promoAktif})); } catch(e){}
  }
  function muat(){
    try {
      var raw = localStorage.getItem(KEY);
      if(!raw) return;
      var data = JSON.parse(raw);
      if(data && Array.isArray(data.items)){
        keranjang = data.items.filter(function(b){
          return b && typeof b.nama === 'string' && isFinite(b.harga) && isFinite(b.qty);
        });
        promoAktif = !!data.promo;
      }
    } catch(e){ keranjang = []; }
  }
  function hapusStorage(){
    try { localStorage.removeItem(KEY); } catch(e){}
  }

 
  function setError(inputId, errId, pesan){
    el(errId).textContent = pesan;
    el(inputId).classList.toggle('invalid', !!pesan);
  }
  function validasi(){
    var nama = el('nama').value.trim();
    var hargaStr = el('harga').value.trim();
    var qtyStr = el('qty').value.trim();
    var harga = Number(hargaStr);
    var qty = Number(qtyStr);
    var valid = true;

    if(nama.length === 0){ setError('nama','err-nama','Nama barang wajib diisi.'); valid = false; }
    else if(nama.length < 3){ setError('nama','err-nama','Nama barang minimal 3 karakter.'); valid = false; }
    else setError('nama','err-nama','');

    if(hargaStr === ''){ setError('harga','err-harga','Harga satuan wajib diisi dengan angka.'); valid = false; }
    else if(!isFinite(harga) || harga <= 0){ setError('harga','err-harga','Harga harus berupa angka positif.'); valid = false; }
    else if(harga < 500){ setError('harga','err-harga','Harga minimal Rp 500.'); valid = false; }
    else setError('harga','err-harga','');

    if(qtyStr === ''){ setError('qty','err-qty','Jumlah wajib diisi.'); valid = false; }
    else if(!isFinite(qty) || !Number.isInteger(qty)){ setError('qty','err-qty','Jumlah harus berupa angka bulat.'); valid = false; }
    else if(qty < 1){ setError('qty','err-qty','Jumlah minimal 1.'); valid = false; }
    else setError('qty','err-qty','');

    return valid ? {nama: nama, harga: harga, qty: qty} : null;
  }


  function hitung(){
    var total = keranjang.reduce(function(s,b){ return s + b.harga * b.qty; }, 0);
    var diskonOtomatis = total >= MIN_DISKON;
    var dapatDiskon = diskonOtomatis || (promoAktif && total > 0);
    var diskon = dapatDiskon ? total * 0.10 : 0;
    return {total: total, diskon: diskon, akhir: total - diskon, otomatis: diskonOtomatis};
  }

 
  function render(){
    var tbody = el('isi-keranjang');
    tbody.innerHTML = '';
    if(keranjang.length === 0){
      var tr = document.createElement('tr');
      var td = document.createElement('td');
      td.colSpan = 6; td.className = 'empty';
      td.textContent = 'Keranjang masih kosong. Tambahkan barang lewat form di samping.';
      tr.appendChild(td); tbody.appendChild(tr);
    }
    keranjang.forEach(function(b, i){
      var tr = document.createElement('tr');
      var cells = [
        [String(i+1), ''],
        [b.nama, ''],
        [rupiah(b.harga), 'num'],
        [String(b.qty), 'num'],
        [rupiah(b.harga * b.qty), 'num']
      ];
      cells.forEach(function(c){
        var td = document.createElement('td');
        td.textContent = c[0];
        if(c[1]) td.className = c[1];
        tr.appendChild(td);
      });
      var tdAksi = document.createElement('td');
      var btn = document.createElement('button');
      btn.type = 'button'; btn.className = 'btn-del'; btn.textContent = 'Hapus';
      btn.setAttribute('aria-label', 'Hapus ' + b.nama);
      btn.addEventListener('click', function(){ hapusItem(i); });
      tdAksi.appendChild(btn); tr.appendChild(tdAksi);
      tbody.appendChild(tr);
    });

    var h = hitung();
    el('total-belanja').textContent = rupiah(h.total);
    el('nominal-diskon').textContent = '- ' + rupiah(h.diskon);
    el('total-akhir').textContent = rupiah(h.akhir);

    var label = 'Diskon';
    if(h.diskon > 0) label = h.otomatis ? 'Diskon 10% (belanja ≥ Rp 50.000)' : 'Diskon 10% (kode HEMAT10)';
    el('label-diskon').textContent = label;
    el('kode-promo').value = promoAktif ? 'HEMAT10' : el('kode-promo').value;

    renderBayar();
  }

  function renderBayar(){
    var box = el('status-bayar');
    var h = hitung();
    var str = el('bayar').value.trim();
    box.className = 'status';
    if(str === ''){ box.textContent = ''; return; }
    var bayar = Number(str);
    if(!isFinite(bayar) || bayar < 0){
      box.className = 'status bad'; box.textContent = 'Nominal uang bayar tidak valid.'; return;
    }
    if(h.total === 0){
      box.className = 'status info'; box.textContent = 'Keranjang kosong, belum ada yang perlu dibayar.'; return;
    }
    if(bayar < h.akhir){
      box.className = 'status bad';
      box.textContent = 'Uang belum mencukupi, kurang ' + rupiah(h.akhir - bayar) + '.';
    } else {
      box.className = 'status ok';
      box.textContent = 'Kembalian: ' + rupiah(bayar - h.akhir);
    }
  }

 
  function hapusItem(i){
    keranjang.splice(i, 1);
    simpan(); render();
  }

  el('form-barang').addEventListener('submit', function(e){
    e.preventDefault();
    var data = validasi();
    if(!data) return;
    keranjang.push(data);
    simpan();
    el('form-barang').reset();
    ['nama','harga','qty'].forEach(function(id){ el(id).classList.remove('invalid'); });
    ['err-nama','err-harga','err-qty'].forEach(function(id){ el(id).textContent = ''; });
    el('nama').focus();
    render();
  });

  el('btn-promo').addEventListener('click', function(){
    var kode = el('kode-promo').value.trim().toUpperCase();
    var err = el('err-promo');
    if(kode === ''){ err.textContent = 'Masukkan kode promo terlebih dahulu.'; return; }
    if(kode !== 'HEMAT10'){ err.textContent = 'Kode promo tidak dikenal.'; return; }
    if(keranjang.length === 0){ err.textContent = 'Tambahkan barang sebelum memakai kode promo.'; return; }
    err.textContent = ''; promoAktif = true; simpan(); render();
  });
  el('kode-promo').addEventListener('input', function(){
    el('err-promo').textContent = '';
    if(el('kode-promo').value.trim().toUpperCase() !== 'HEMAT10' && promoAktif){
      promoAktif = false; simpan(); render();
    }
  });

  el('bayar').addEventListener('input', renderBayar);

  el('btn-reset').addEventListener('click', function(){
    if(keranjang.length > 0 && !window.confirm('Kosongkan keranjang dan mulai transaksi baru?')) return;
    keranjang = []; promoAktif = false;
    hapusStorage();
    el('bayar').value = ''; el('kode-promo').value = ''; el('err-promo').textContent = '';
    render();
  });

  muat();
  render();
})();
