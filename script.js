let dataMahasiswa =
    JSON.parse(localStorage.getItem("dataMahasiswa")) || [];

const form = document.getElementById("formMahasiswa");
const tabel = document.getElementById("tabelData");
const pencarian = document.getElementById("pencarian");

let editIndex = -1;


// ========================================
// SIMPAN DATA
// ========================================
form.addEventListener("submit", function (event) {

    event.preventDefault();

    const data = {
        nim: document.getElementById("nim").value,
        nama: document.getElementById("nama").value,
        nip: document.getElementById("nip").value,
        dosen: document.getElementById("dosen").value,
        kodeMK: document.getElementById("kodeMK").value,
        namaMK: document.getElementById("namaMK").value,
        jadwal: document.getElementById("jadwal").value,
        nilai: document.getElementById("nilai").value
    };

    if (editIndex === -1) {
        dataMahasiswa.push(data);
    } else {
        dataMahasiswa[editIndex] = data;
        editIndex = -1;
    }

    simpanLocalStorage();
    tampilkanData();

    form.reset();

    alert("Data berhasil disimpan.");
});


// ========================================
// LOCAL STORAGE
// ========================================
function simpanLocalStorage() {

    localStorage.setItem(
        "dataMahasiswa",
        JSON.stringify(dataMahasiswa)
    );
}


// ========================================
// TAMPILKAN DATA
// ========================================
function tampilkanData() {

    tabel.innerHTML = "";

    dataMahasiswa.forEach(function (data, index) {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${data.nim}</td>
            <td>${data.nama}</td>
            <td>${data.nip}</td>
            <td>${data.dosen}</td>
            <td>${data.kodeMK}</td>
            <td>${data.namaMK}</td>
            <td>${data.jadwal}</td>
            <td>${data.nilai}</td>
            <td>
                <button onclick="editData(${index})">
                    Edit
                </button>

                <button onclick="hapusData(${index})">
                    Hapus
                </button>
            </td>
        `;

        tabel.appendChild(row);
    });
}


// ========================================
// EDIT DATA
// ========================================
function editData(index) {

    const data = dataMahasiswa[index];

    document.getElementById("nim").value = data.nim;
    document.getElementById("nama").value = data.nama;
    document.getElementById("nip").value = data.nip;
    document.getElementById("dosen").value = data.dosen;
    document.getElementById("kodeMK").value = data.kodeMK;
    document.getElementById("namaMK").value = data.namaMK;
    document.getElementById("jadwal").value = data.jadwal;
    document.getElementById("nilai").value = data.nilai;

    editIndex = index;

    window.location.href = "#input";
}


// ========================================
// HAPUS DATA
// ========================================
function hapusData(index) {

    const konfirmasi =
        confirm("Apakah Anda yakin ingin menghapus data ini?");

    if (konfirmasi) {

        dataMahasiswa.splice(index, 1);

        simpanLocalStorage();
        tampilkanData();
    }
}


// ========================================
// CARI DATA
// ========================================
pencarian.addEventListener("keyup", function () {

    const keyword =
        pencarian.value.toLowerCase();

    const rows =
        document.querySelectorAll("#tabelData tr");

    rows.forEach(function (row) {

        const isi =
            row.innerText.toLowerCase();

        if (isi.includes(keyword)) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });
});


// ========================================
// TAMPILKAN SAAT HALAMAN DIBUKA
// ========================================
tampilkanData();
