import { MdArrowForwardIos } from 'react-icons/md';
import { Link } from 'react-router-dom';

const articles = [
  {
    id: 1,
    title: 'Penggunaan Susu Formula pada Bayi 0-6 Bulan',
    slug: 'Salah satu usaha untuk menjaga agar tumbuh kembang anak berjalan dengan baik, adalah dengan pemberian asi...',
    src: '/susu-formula.jpg',
    link: 'https://yankes.kemkes.go.id/view_artikel/3498/penggunaan-susu-formula-pada-bayi-0-6-bulan',
  },
  {
    id: 2,
    title: 'Pentingnya Seribu Hari Pertama Kehidupan',
    slug: 'Seribu hari pertama kehidupan (1000 HPK) dimulai sejak janin terbentuk di dalam kandungan hingga dua tahun pertama kehidupan yang merupakan…',
    src: '/seribu-hari.jpg',
    link: 'https://yankes.kemkes.go.id/view_artikel/3486/pentingnya-seribu-hari-pertama-kehidupan',
  },
  {
    id: 3,
    title: 'Perawatan Metode Kanguru (PMK) dan Skin to Skin Contact',
    slug: 'Neonatus merupakan masa peralihan dari kehidupan intra uterine ke ekstra uterine. Masalah yang sering dihadapi oleh neonatus adalah Bayi Berat…',
    src: '/perawatan-kanguru.png',
    link: 'https://yankes.kemkes.go.id/view_artikel/3479/perawatan-metode-kanguru-pmk',
  },
];

export default function Artikel() {
  return (
    <div id="artikel">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-[#4A5568] font-semibold text-lg">Artikel</h2>
        <Link
          to="/artikel"
          className="flex items-center gap-x-1 bg-[#4A90E2] text-white px-2 py-1 rounded-md text-xs hover:bg-[#3A7BC8]"
        >
          Selengkapnya <MdArrowForwardIos size={12} />
        </Link>
      </div>
      <div id="gallery" className="grid gap-y-4">
        {articles.map((item) => (
          <Link
            key={item.id}
            to={item.link}
            className="bg-white grid grid-cols-3 gap-x-3 p-2 rounded-md shadow-sm border border-[#E5E9F0]"
          >
            <div className="col-span-1 min-h-20 bg-[#EBF4FF] rounded-md overflow-hidden">
              <img src={item.src} alt={item.title} className="w-full h-full object-cover" />
            </div>
            <div className="col-span-2 flex flex-col justify-between">
              <p className="text-xs max-w-[180px] font-medium mb-1">{item.title}</p>
              <p className="text-[#4A5568] text-[12px] line-clamp-2">{item.slug}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
