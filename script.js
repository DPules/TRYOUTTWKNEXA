const API_URL =
  "https://script.google.com/macros/s/AKfycbw47sIBVyysFCVVJ5dfBWkOfss3_EeFz1mYDJgA2OXODSwpELFeajodblXDC7DH6ODoIw/exec";
const perHalaman = 3;
let waktu = 3600;
// AMBIL ELEMENT DOM
const nama = document.getElementById("nama");
const sekolah = document.getElementById("sekolah");
const gender = document.getElementById("gender");
const tinggibadan = document.getElementById("tinggibadan");
const beratbadan = document.getElementById("beratbadan");
const daerah = document.getElementById("daerah");

const time = document.getElementById("time");
const soalContainer = document.getElementById("soalContainer");
const navSoal = document.getElementById("navSoal");
const quizForm = document.getElementById("quizForm");
const nextBtn = document.getElementById("nextBtn");
const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");
let halaman = 0;
let timer;
let waktuHabis = false;
let sudahSubmit = false;
let jawaban = {};

const soal = [
  // 🔴 HARD LEVEL (UPGRADE CAT STYLE)

  {
    t: "Dalam latihan Paskibraka, seorang anggota melihat rekannya sering melanggar aturan namun memiliki kemampuan fisik sangat baik. Jika kamu menjadi ketua tim, keputusan terbaik adalah…",
    p: [
      "Membiarkan karena kemampuan fisiknya bagus",
      "Menegur dan membina agar disiplin tanpa mengabaikan potensinya",
      "Melaporkan dan mengeluarkan dari tim",
      "Mengabaikan agar tidak menimbulkan konflik",
    ],
    j: 1,
    e: "Pemimpin harus tegas namun tetap membina. Disiplin adalah nilai utama, tapi potensi tetap harus dikembangkan.",
    lvl: "hard",
  },

  {
    t: "Saat seleksi berlangsung, kamu melihat peserta lain mendapat bantuan jawaban dari luar. Sikap paling tepat adalah…",
    p: [
      "Ikut memanfaatkan situasi",
      "Diam agar tidak terlibat",
      "Melaporkan dengan cara yang bijak",
      "Menegur langsung di depan umum",
    ],
    j: 2,
    e: "Integritas lebih penting dari hasil. Melaporkan dengan bijak menjaga keadilan tanpa menciptakan konflik berlebihan.",
    lvl: "hard",
  },

  {
    t: "Seorang anggota tim merasa tidak percaya diri karena sering gagal dalam latihan. Sebagai rekan tim, tindakan terbaik adalah…",
    p: [
      "Membiarkannya agar belajar sendiri",
      "Menggantinya dengan anggota lain",
      "Memberikan dukungan dan membantu latihan",
      "Menyuruhnya keluar dari tim",
    ],
    j: 2,
    e: "Paskibraka menjunjung kebersamaan dan saling mendukung. Mental kuat dibangun bersama.",
    lvl: "hard",
  },

  {
    t: "Dalam kondisi tekanan tinggi saat seleksi, kamu merasa gugup dan hampir menyerah. Sikap terbaik adalah…",
    p: [
      "Menghentikan usaha",
      "Mengikuti perasaan",
      "Mengendalikan diri dan tetap fokus",
      "Menyalahkan keadaan",
    ],
    j: 2,
    e: "Mental resilience adalah kunci. Peserta terbaik adalah yang mampu mengendalikan diri dalam tekanan.",
    lvl: "hard",
  },

  {
    t: "Seorang pemimpin tim hanya fokus pada hasil tanpa memperhatikan kondisi anggotanya. Dampak jangka panjang yang paling mungkin adalah…",
    p: [
      "Tim semakin kuat",
      "Anggota menjadi lebih disiplin",
      "Turunnya moral dan kekompakan tim",
      "Tidak ada dampak",
    ],
    j: 2,
    e: "Kepemimpinan tanpa empati akan merusak solidaritas tim.",
    lvl: "hard",
  },

  {
    t: "Dalam upacara, terjadi kesalahan kecil dari anggota tim. Sebagai pemimpin, langkah terbaik adalah…",
    p: [
      "Langsung memarahi di depan umum",
      "Mengabaikan kesalahan",
      "Mengevaluasi setelah kegiatan selesai",
      "Mengganti anggota tersebut",
    ],
    j: 2,
    e: "Evaluasi dilakukan secara profesional, bukan emosional.",
    lvl: "hard",
  },

  {
    t: "Jika kamu harus memilih antara kepentingan pribadi dan kepentingan tim dalam seleksi, maka…",
    p: [
      "Memilih kepentingan pribadi",
      "Memilih kepentingan tim",
      "Mencari keuntungan pribadi",
      "Menunda keputusan",
    ],
    j: 1,
    e: "Paskibraka mengutamakan kepentingan bersama di atas individu.",
    lvl: "hard",
  },

  {
    t: "Seorang peserta memiliki nilai tinggi namun sikap kurang baik. Dalam seleksi Paskibraka, keputusan terbaik adalah…",
    p: [
      "Tetap meloloskan karena nilai tinggi",
      "Meloloskan dengan syarat",
      "Tidak meloloskan karena sikap adalah prioritas",
      "Menunda keputusan",
    ],
    j: 2,
    e: "Paskibraka menekankan karakter, bukan hanya kemampuan akademik.",
    lvl: "hard",
  },

  {
    t: "Dalam situasi konflik antar anggota tim, peran kamu sebagai anggota adalah…",
    p: [
      "Memihak salah satu",
      "Menghindar",
      "Menjadi penengah",
      "Memperkeruh situasi",
    ],
    j: 2,
    e: "Menjadi penengah menunjukkan kedewasaan dan jiwa kepemimpinan.",
    lvl: "hard",
  },

  {
    t: "Nilai utama yang harus dipegang seorang Paskibraka dalam setiap situasi sulit adalah…",
    p: ["Keuntungan", "Popularitas", "Integritas", "Kekuasaan"],
    j: 2,
    e: "Integritas adalah fondasi utama seorang Paskibraka sejati.",
    lvl: "hard",
  },
  // 🔴 SOAL PANCASILA (10 SOAL - HOTS & KONTEKSTUAL)

  {
    t: "Seorang siswa menolak bekerja sama dengan teman berbeda agama dalam tugas kelompok. Sikap tersebut bertentangan dengan nilai Pancasila terutama sila…",
    p: ["Pertama", "Kedua", "Ketiga", "Keempat"],
    j: 0,
    e: "Sila pertama menekankan toleransi antar umat beragama.",
    lvl: "medium",
  },

  {
    t: "Dalam kehidupan sehari-hari, tindakan membantu teman tanpa membedakan latar belakang mencerminkan sila…",
    p: ["Pertama", "Kedua", "Ketiga", "Kelima"],
    j: 1,
    e: "Sila kedua menekankan kemanusiaan yang adil dan beradab.",
    lvl: "easy",
  },

  {
    t: "Ketika terjadi konflik antar kelompok di sekolah, sikap yang mencerminkan Pancasila adalah…",
    p: [
      "Membela kelompok sendiri",
      "Menghindari masalah",
      "Mencari solusi bersama",
      "Menyalahkan pihak lain",
    ],
    j: 2,
    e: "Musyawarah dan persatuan menjadi solusi sesuai nilai Pancasila.",
    lvl: "medium",
  },

  {
    t: "Sikap mengutamakan kepentingan bangsa di atas kepentingan pribadi mencerminkan nilai sila…",
    p: ["Kedua", "Ketiga", "Keempat", "Kelima"],
    j: 1,
    e: "Sila ketiga menekankan persatuan Indonesia.",
    lvl: "easy",
  },

  {
    t: "Dalam musyawarah, keputusan diambil berdasarkan kesepakatan bersama. Hal ini merupakan implementasi sila…",
    p: ["Kedua", "Ketiga", "Keempat", "Kelima"],
    j: 2,
    e: "Sila keempat menekankan musyawarah mufakat.",
    lvl: "easy",
  },

  {
    t: "Seorang pemimpin yang adil dan tidak memihak mencerminkan nilai utama dari sila…",
    p: ["Pertama", "Ketiga", "Keempat", "Kelima"],
    j: 3,
    e: "Sila kelima menekankan keadilan sosial bagi seluruh rakyat.",
    lvl: "medium",
  },

  {
    t: "Tindakan menyebarkan hoaks yang dapat memecah belah bangsa bertentangan dengan nilai sila…",
    p: [
      "Pertama dan kedua",
      "Kedua dan ketiga",
      "Ketiga dan keempat",
      "Keempat dan kelima",
    ],
    j: 1,
    e: "Hoaks merusak kemanusiaan dan persatuan.",
    lvl: "hard",
  },

  {
    t: "Menghargai hasil keputusan bersama meskipun berbeda dengan pendapat pribadi menunjukkan sikap…",
    p: ["Individualisme", "Egoisme", "Demokratis", "Dominasi"],
    j: 2,
    e: "Sikap demokratis adalah inti sila keempat.",
    lvl: "medium",
  },

  {
    t: "Ketimpangan sosial dalam masyarakat menunjukkan belum optimalnya penerapan sila…",
    p: ["Pertama", "Kedua", "Ketiga", "Kelima"],
    j: 3,
    e: "Sila kelima menekankan keadilan sosial.",
    lvl: "medium",
  },

  {
    t: "Menjaga kerukunan antar suku dan budaya merupakan implementasi utama dari sila…",
    p: ["Pertama", "Kedua", "Ketiga", "Keempat"],
    j: 2,
    e: "Sila ketiga menekankan persatuan dalam keberagaman.",
    lvl: "easy",
  },
  // 🔴 SOAL PENGETAHUAN PASKIBRAKA (10 SOAL)

  {
    t: "Pasukan Pengibar Bendera Pusaka (Paskibraka) pertama kali dibentuk pada tahun…",
    p: ["1945", "1946", "1947", "1950"],
    j: 1,
    e: "Paskibraka pertama kali dibentuk tahun 1946 atas gagasan Husein Mutahar.",
    lvl: "medium",
  },

  {
    t: "Tokoh yang dikenal sebagai penggagas pembentukan Paskibraka adalah…",
    p: ["Soekarno", "Husein Mutahar", "Soeharto", "Ahmad Yani"],
    j: 1,
    e: "Husein Mutahar adalah tokoh utama di balik lahirnya Paskibraka.",
    lvl: "easy",
  },

  {
    t: "Tugas utama Paskibraka adalah…",
    p: [
      "Mengamankan upacara",
      "Mengibarkan dan menurunkan bendera pusaka",
      "Memimpin upacara",
      "Mengatur peserta upacara",
    ],
    j: 1,
    e: "Tugas utama Paskibraka adalah mengibarkan dan menurunkan bendera.",
    lvl: "easy",
  },

  {
    t: "Jumlah anggota Paskibraka dalam satu tim formasi nasional adalah…",
    p: ["17 orang", "8 orang", "45 orang", "70 orang"],
    j: 2,
    e: "Formasi lengkap terdiri dari 70 orang (17-8-45).",
    lvl: "medium",
  },

  {
    t: "Makna angka 17-8-45 dalam Paskibraka adalah…",
    p: [
      "Jumlah anggota tim",
      "Tanggal kemerdekaan Indonesia",
      "Jumlah provinsi",
      "Kode latihan",
    ],
    j: 1,
    e: "17-8-45 melambangkan tanggal kemerdekaan Indonesia.",
    lvl: "easy",
  },

  {
    t: "Peran Paskibraka tidak hanya saat upacara, tetapi juga sebagai…",
    p: [
      "Panitia kegiatan",
      "Duta Pancasila",
      "Petugas keamanan",
      "Pengatur acara",
    ],
    j: 1,
    e: "Paskibraka berperan sebagai Duta Pancasila dalam kehidupan sehari-hari.",
    lvl: "medium",
  },

  {
    t: "Sikap utama yang harus dimiliki oleh anggota Paskibraka adalah…",
    p: ["Santai", "Disiplin", "Bebas", "Santai tapi tegas"],
    j: 1,
    e: "Disiplin adalah nilai utama dalam Paskibraka.",
    lvl: "easy",
  },

  {
    t: "Latihan baris-berbaris (PBB) dalam Paskibraka bertujuan untuk…",
    p: [
      "Menambah kekuatan fisik saja",
      "Melatih kekompakan dan kedisiplinan",
      "Meningkatkan kecepatan",
      "Melatih individu",
    ],
    j: 1,
    e: "PBB melatih disiplin, kekompakan, dan kerja sama tim.",
    lvl: "medium",
  },

  {
    t: "Upacara pengibaran bendera memiliki makna utama sebagai…",
    p: [
      "Kegiatan rutin",
      "Simbol penghormatan kepada bangsa",
      "Acara formal",
      "Kegiatan sekolah",
    ],
    j: 1,
    e: "Upacara adalah bentuk penghormatan kepada negara dan perjuangan.",
    lvl: "medium",
  },

  {
    t: "Sikap hormat kepada bendera saat upacara mencerminkan…",
    p: ["Kebiasaan", "Formalitas", "Nasionalisme", "Rutinitas"],
    j: 2,
    e: "Menghormati bendera adalah bentuk nasionalisme.",
    lvl: "easy",
  },
  // 🔴 SOAL SEJARAH INDONESIA (10 SOAL)

  {
    t: "Peristiwa Proklamasi Kemerdekaan Indonesia pada 17 Agustus 1945 dilatarbelakangi oleh…",
    p: [
      "Tekanan Belanda",
      "Kekalahan Jepang dalam Perang Dunia II",
      "Keinginan Sekutu",
      "Perundingan internasional",
    ],
    j: 1,
    e: "Kekalahan Jepang membuka peluang bagi Indonesia untuk memproklamasikan kemerdekaan.",
    lvl: "medium",
  },

  {
    t: "Tokoh yang berperan dalam perumusan teks Proklamasi adalah…",
    p: [
      "Soekarno, Hatta, dan Ahmad Soebardjo",
      "Soekarno, Sudirman, dan Sjahrir",
      "Hatta, Tan Malaka, dan Soedirman",
      "Soekarno, Soeharto, dan Hatta",
    ],
    j: 0,
    e: "Teks proklamasi dirumuskan oleh Soekarno, Hatta, dan Ahmad Soebardjo.",
    lvl: "easy",
  },

  {
    t: "Peristiwa Rengasdengklok memiliki makna penting karena…",
    p: [
      "Tempat penyusunan UUD",
      "Mendesak Soekarno-Hatta untuk segera memproklamasikan kemerdekaan",
      "Tempat pertempuran",
      "Awal penjajahan Jepang",
    ],
    j: 1,
    e: "Golongan muda mendesak proklamasi tanpa campur tangan Jepang.",
    lvl: "medium",
  },

  {
    t: "Tujuan utama dibentuknya BPUPKI adalah…",
    p: [
      "Mempersiapkan kemerdekaan Indonesia",
      "Mengatur pemerintahan Jepang",
      "Membentuk tentara",
      "Mengawasi rakyat",
    ],
    j: 0,
    e: "BPUPKI dibentuk untuk mempersiapkan kemerdekaan Indonesia.",
    lvl: "easy",
  },

  {
    t: "Sidang pertama BPUPKI menghasilkan…",
    p: ["UUD 1945", "Pancasila", "Proklamasi", "Kabinet"],
    j: 1,
    e: "Sidang pertama membahas dasar negara yang melahirkan Pancasila.",
    lvl: "medium",
  },

  {
    t: "Perang Diponegoro terjadi karena…",
    p: [
      "Perebutan kekuasaan",
      "Penolakan terhadap kebijakan kolonial Belanda",
      "Masalah ekonomi saja",
      "Persaingan antar kerajaan",
    ],
    j: 1,
    e: "Perang Diponegoro dipicu oleh penindasan dan kebijakan Belanda.",
    lvl: "medium",
  },

  {
    t: "Sumpah Pemuda tahun 1928 memiliki makna penting yaitu…",
    p: [
      "Awal penjajahan",
      "Persatuan bangsa Indonesia",
      "Perlawanan fisik",
      "Pembentukan pemerintah",
    ],
    j: 1,
    e: "Sumpah Pemuda menegaskan satu tanah air, bangsa, dan bahasa.",
    lvl: "easy",
  },

  {
    t: "Peristiwa Bandung Lautan Api menunjukkan…",
    p: [
      "Kekalahan Indonesia",
      "Perlawanan tanpa strategi",
      "Semangat rela berkorban demi bangsa",
      "Kemenangan besar",
    ],
    j: 2,
    e: "Rakyat Bandung membakar kota demi mengusir penjajah.",
    lvl: "medium",
  },

  {
    t: "Konferensi Meja Bundar (KMB) menghasilkan…",
    p: [
      "Kemerdekaan Indonesia",
      "Pengakuan kedaulatan Indonesia oleh Belanda",
      "Pembentukan UUD",
      "Perang baru",
    ],
    j: 1,
    e: "Belanda mengakui kedaulatan Indonesia pada tahun 1949.",
    lvl: "medium",
  },

  {
    t: "Tujuan utama perjuangan bangsa Indonesia melawan penjajah adalah…",
    p: ["Kekuasaan", "Kemerdekaan", "Kekayaan", "Pengaruh"],
    j: 1,
    e: "Perjuangan bertujuan untuk mencapai kemerdekaan.",
    lvl: "easy",
  },
  // 🔴 SOAL PENGETAHUAN UMUM PANCASILA (10 SOAL)

  {
    t: "Pancasila sebagai dasar negara memiliki fungsi utama sebagai…",
    p: [
      "Ideologi sementara",
      "Dasar dalam penyelenggaraan negara",
      "Simbol negara",
      "Alat politik",
    ],
    j: 1,
    e: "Pancasila menjadi dasar dalam setiap penyelenggaraan negara.",
    lvl: "easy",
  },

  {
    t: "Nilai Pancasila yang bersifat fleksibel dan dapat diterapkan sesuai perkembangan zaman disebut…",
    p: ["Nilai dasar", "Nilai instrumental", "Nilai praksis", "Nilai mutlak"],
    j: 2,
    e: "Nilai praksis adalah penerapan nyata dalam kehidupan sehari-hari.",
    lvl: "medium",
  },

  {
    t: "Sikap menghormati keputusan bersama meskipun berbeda pendapat merupakan implementasi dari sila…",
    p: ["Kedua", "Ketiga", "Keempat", "Kelima"],
    j: 2,
    e: "Sila keempat menekankan musyawarah dan menghormati hasil keputusan.",
    lvl: "easy",
  },

  {
    t: "Pancasila sebagai ideologi terbuka berarti…",
    p: [
      "Dapat diubah kapan saja",
      "Menerima pengaruh asing tanpa batas",
      "Bersifat dinamis tanpa mengubah nilai dasar",
      "Tidak memiliki nilai tetap",
    ],
    j: 2,
    e: "Ideologi terbuka berarti fleksibel dalam penerapan, tetapi nilai dasar tetap.",
    lvl: "medium",
  },

  {
    t: "Perilaku diskriminasi terhadap orang lain bertentangan dengan sila…",
    p: ["Pertama", "Kedua", "Ketiga", "Keempat"],
    j: 1,
    e: "Sila kedua menekankan persamaan derajat manusia.",
    lvl: "easy",
  },

  {
    t: "Contoh penerapan sila ketiga dalam kehidupan sehari-hari adalah…",
    p: ["Beribadah", "Menolong sesama", "Menjaga persatuan", "Musyawarah"],
    j: 2,
    e: "Sila ketiga menekankan persatuan Indonesia.",
    lvl: "easy",
  },

  {
    t: "Jika seseorang lebih mementingkan kepentingan pribadi dibanding kepentingan bersama, maka ia melanggar nilai…",
    p: ["Persatuan", "Keadilan sosial", "Kemanusiaan", "Musyawarah"],
    j: 0,
    e: "Mementingkan diri sendiri bertentangan dengan nilai persatuan.",
    lvl: "medium",
  },

  {
    t: "Salah satu bentuk implementasi sila kelima adalah…",
    p: [
      "Beribadah sesuai agama",
      "Menghargai perbedaan",
      "Bersikap adil kepada semua orang",
      "Mengutamakan musyawarah",
    ],
    j: 2,
    e: "Sila kelima berkaitan dengan keadilan sosial.",
    lvl: "easy",
  },

  {
    t: "Pancasila digali dari nilai-nilai yang hidup dalam…",
    p: [
      "Budaya asing",
      "Masyarakat Indonesia",
      "Pemerintah",
      "Organisasi internasional",
    ],
    j: 1,
    e: "Pancasila berasal dari nilai budaya bangsa Indonesia.",
    lvl: "medium",
  },

  {
    t: "Jika terjadi perbedaan pendapat dalam masyarakat, maka penyelesaian yang sesuai Pancasila adalah…",
    p: [
      "Voting cepat",
      "Musyawarah mufakat",
      "Menghindari konflik",
      "Keputusan sepihak",
    ],
    j: 1,
    e: "Musyawarah mufakat adalah ciri khas demokrasi Pancasila.",
    lvl: "easy",
  },
];

function mulaiUjian() {
  if (
    !nama.value ||
    !sekolah.value ||
    !gender.value ||
    !tinggibadan.value ||
    !beratbadan.value ||
    !daerah.value
  ) {
    alert("Harap lengkapi semua data terlebih dahulu!");
    return;
  }

  if (tinggibadan.value < 140 || beratbadan.value < 30) {
    alert("Data fisik tidak masuk akal, cek kembali!");
    return;
  }

  localStorage.setItem("nama", nama.value);
  localStorage.setItem("gender", gender.value);
  localStorage.setItem("sekolah", sekolah.value);
  localStorage.setItem("tinggibadan", tinggibadan.value);
  localStorage.setItem("beratbadan", beratbadan.value);
  localStorage.setItem("daerah", daerah.value);

  document.querySelector(".info").classList.add("hidden");
  document.querySelector(".timer").classList.remove("hidden");
  document.querySelector(".progress-box").classList.remove("hidden");
  navSoal.classList.remove("hidden");
  quizForm.classList.remove("hidden");

  mulaiTimer();
  tampilkan();
}

function mulaiTimer() {
  timer = setInterval(() => {
    waktu--;
    time.textContent = `${Math.floor(waktu / 60)}:${String(waktu % 60).padStart(2, "0")}`;
    if (waktu <= 0) {
      waktuHabis = true;
      clearInterval(timer);
      alert("Waktu habis, jawaban dikirim otomatis.");
      kirim();
    }
  }, 1000);
}

function tampilkan() {
  window.scrollTo(0, 0);
  soalContainer.innerHTML = "";
  const start = halaman * perHalaman;

  soal.slice(start, start + perHalaman).forEach((x, i) => {
    const idx = start + i;
    soalContainer.innerHTML += `
    <div class="question">
      <p>${idx + 1}. ${x.t}</p>
      ${x.p
        .map(
          (a, j) => `
        <label>
          <input type="radio" name="q${idx}" value="${j}"
            ${jawaban[idx] === j ? "checked" : ""}>
          ${a}
        </label>`,
        )
        .join("")}
    </div>`;
  });

  nextBtn.textContent =
    start + perHalaman >= soal.length ? "Selesai" : "Berikutnya ➡";

  autoSave();
  updateProgress();
  buatNavigasi();
}

function autoSave() {
  document.querySelectorAll("input[type=radio]").forEach((r) => {
    r.onchange = () => {
      jawaban[+r.name.replace("q", "")] = +r.value;

      // highlight pilihan
      r.parentElement.style.background = "#ffe0e0";
    };
  });
}

function berikutnya() {
  if ((halaman + 1) * perHalaman >= soal.length) kirim();
  else {
    halaman++;
    tampilkan();
  }
}

function sebelumnya() {
  if (halaman > 0) {
    halaman--;
    tampilkan();
  }
}

function semuaTerjawab() {
  for (let i = 0; i < soal.length; i++) if (jawaban[i] === undefined) return i;
  return -1;
}

function kirim() {
  if (sudahSubmit) return;

  if (!waktuHabis) {
    const kosong = semuaTerjawab();
    if (kosong !== -1) {
      alert(`Soal ${kosong + 1} belum dijawab`);
      halaman = Math.floor(kosong / perHalaman);
      tampilkan();
      return;
    }

    if (!confirm("Yakin ingin mengakhiri ujian dan mengirim jawaban?")) return;
  }

  sudahSubmit = true;
  clearInterval(timer);
  nextBtn.disabled = true;
  nextBtn.textContent = "Mengirim...";

  let benar = 0;
  soal.forEach((s, i) => jawaban[i] === s.j && benar++);
  const nilai = Math.round((benar / soal.length) * 100);

  localStorage.setItem("nilai", nilai);
  localStorage.setItem("jawabanUser", JSON.stringify(jawaban));
  localStorage.setItem("bankSoal", JSON.stringify(soal));

  const fd = new FormData();
  fd.append("nama", localStorage.getItem("nama"));
  fd.append("gender", localStorage.getItem("gender"));
  fd.append("sekolah", localStorage.getItem("sekolah"));
  fd.append("tinggibadan", localStorage.getItem("tinggibadan"));
  fd.append("beratbadan", localStorage.getItem("beratbadan"));
  fd.append("daerah", localStorage.getItem("daerah"));
  fd.append("nilai", nilai);

  fetch(API_URL, { method: "POST", body: fd }).finally(
    () => (location.href = "hasil.html"),
  );
}

function updateProgress() {
  const j = Object.keys(jawaban).length;
  progressBar.style.width = `${(j / soal.length) * 100}%`;
  progressText.textContent = `${j} / ${soal.length}`;
}

function buatNavigasi() {
  navSoal.innerHTML = "";
  soal.forEach((_, i) => {
    const b = document.createElement("button");
    b.textContent = i + 1;
    if (jawaban[i] !== undefined) b.classList.add("answered");
    if (Math.floor(i / perHalaman) === halaman) b.classList.add("active");
    b.onclick = () => {
      halaman = Math.floor(i / perHalaman);
      tampilkan();
    };
    navSoal.appendChild(b);
  });
}
