print("=== Penghitung BMI === ")

berat = float (input("Masukkan berat badan (kg) : "))
tinggi = float (input("Masukkan tinggi badan (m) : "))

bmi = berat / (tinggi * tinggi)

if bmi < 18.5:
    kategori = "Berat badan kurang"
elif bmi < 25:
    kategori = "Berat badan normal"
elif bmi < 30:
    kategori = "Berat badan berlebih"
else:
    kategori = "Obesitas"

print(f"Nilai BMI : {bmi:.2f}")
print(f"Kategori      : {kategori}")