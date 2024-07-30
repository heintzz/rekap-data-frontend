import { Link } from 'react-router-dom';
import MainLayout from 'components/MainLayout';
import { MdArrowBack } from 'react-icons/md';

const articles = [
  {
    id: 1,
    title: 'Penggunaan Susu Formula pada Bayi 0-6 Bulan',
    slug: 'Salah satu usaha untuk menjaga agar tumbuh kembang anak berjalan dengan baik, adalah dengan pemberian asi...',
    imgSrc: '/susu-formula.jpg',
    src: 'https://yankes.kemkes.go.id/view_artikel/3498/penggunaan-susu-formula-pada-bayi-0-6-bulan',
  },
  {
    id: 2,
    title: 'Pentingnya Seribu Hari Pertama Kehidupan',
    slug: 'Seribu hari pertama kehidupan (1000 HPK) dimulai sejak janin terbentuk di dalam kandungan hingga dua tahun pertama kehidupan yang merupakan…',
    imgSrc: '/seribu-hari.jpg',
    src: 'https://yankes.kemkes.go.id/view_artikel/3486/pentingnya-seribu-hari-pertama-kehidupan',
  },
  {
    id: 3,
    title: 'Perawatan Metode Kanguru (PMK) dan Skin to Skin Contact',
    slug: 'Neonatus merupakan masa peralihan dari kehidupan intra uterine ke ekstra uterine. Masalah yang sering dihadapi oleh neonatus adalah Bayi Berat…',
    imgSrc: '/perawatan-kanguru.png',
    src: 'https://yankes.kemkes.go.id/view_artikel/3479/perawatan-metode-kanguru-pmk',
  },
  {
    id: 4,
    title: 'Manfaat ASI bagi Ibu dan Bayi',
    slug: 'Pekan menyusui sedunia merupakan momen yang penting untuk membangkitkan kesadaran dan pengetahuan seluruh orang tua mengenai manfaat pemberian ASI',
    imgSrc: '/manfaat-asi.png',
    src: 'https://yankes.kemkes.go.id/view_artikel/3478/manfaat-asi-bagi-ibu-dan-bayi',
  },
  {
    id: 5,
    title: 'Pengaruh Makanan Cepat Saji Terhadap Kesehatan Remaja',
    slug: 'Siapa yang tidak mengenal makanan cepat saji atau fast food, seperti pizza, hamburger, donat, atau keripik kentang, memang selalu menggoda…',
    imgSrc: '/makanan-cepat-saji.jpg',
    src: 'https://yankes.kemkes.go.id/view_artikel/2182/pengaruh-makanan-cepat-saji-terhadap-kesehatan-remaja',
  },
  {
    id: 6,
    title: 'Pencegahan Agar Tidak Terjadinya Cacingan Pada Anak Usia Sekolah',
    slug: 'Salah satu cara untuk meningkatkan kesehatan masyarakat adalah dengan mengadakan berbagai kegiatan, termasuk yang berkaitan dengan kesehatan anak. Kesehatan anak…',
    imgSrc: '/cacingan-anak.jpg',
    src: 'https://yankes.kemkes.go.id/view_artikel/3469/pencegahan-agar-tidak-terjadi-cacingan-pada-anak-usia-sekolah',
  },
  {
    id: 7,
    title: 'Pola Makan Sehat dengan Gizi Seimbang',
    slug: 'Pola makan sehat adalah perilaku mengonsumsi makan dengan gizi seimbang guna menjaga kesehatan tubuh. Seperti yang diketahui, pola makan seseorang sangat berpengaruh pada kondisi tubuhnya.',
    imgSrc: '/pola-makan.png',
    src: 'https://yankes.kemkes.go.id/view_artikel/3467/pola-makan-yang-sehat',
  },
  {
    id: 8,
    title: 'Kehamilan dan Hubungannya dengan Tekanan Darah Tinggi ',
    slug: 'Tekanan darah tinggi menjadi masalah selama kehamilan, efek buruk dari perkembangan menjadi pre-eklampsia atau eklampsia merupakan masalah utama. Penyebab tekanan darah menjadi tinggi selama kehamilan disebabkan oleh keadaan yang mengurangi aliran darah ke uteroplasenta',
    imgSrc: '/tekanan-darah-hamil.jpg',
    src: 'https://yankes.kemkes.go.id/view_artikel/3442/kehamilan-dan-hubungannya-dengan-tekanan-darah-tinggi',
  },
];

export default function HalamanArtikel() {
  return (
    <MainLayout>
      <div className="px-4">
        <div className="flex items-center mb-4">
          <Link to="/" className="mr-2">
            <MdArrowBack size={24} className="text-[#4A90E2]" />
          </Link>
          <h1 className="text-[#4A5568] font-semibold text-lg">Artikel</h1>
        </div>
        <div className="grid gap-y-4">
          {articles.map((artikel) => (
            <a
              key={artikel.id}
              href={artikel.src}
              className="bg-white grid grid-cols-3 gap-x-3 p-3 rounded-md shadow-sm border border-[#E5E9F0]"
            >
              <div className="col-span-1 min-h-20 bg-[#EBF4FF] rounded-md overflow-hidden">
                <img
                  src={artikel.imgSrc}
                  alt={artikel.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="col-span-2 flex flex-col justify-between">
                <h3 className="text-sm font-medium text-[#4A5568] line-clamp-2 mb-1">
                  {artikel.title}
                </h3>
                <p className="text-xs text-[#718096] line-clamp-2">{artikel.slug}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
