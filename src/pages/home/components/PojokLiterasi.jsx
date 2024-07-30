import { BsFileEarmarkPdf } from 'react-icons/bs';

const presentasi = [
  {
    nama: 'Pemanfaatan TOGA untuk mencegah stunting',
    link: 'https://drive.google.com/uc?export=download&id=1SunG_--wL1krRAn1SNgKKrgliMwbPAbR',
  },
  {
    nama: 'Panduan MPASI dari bahan lokal',
    link: 'https://drive.google.com/uc?export=download&id=1SzIjB60E0ZuPiB8yDq69G2oyKMmoryTs',
  },
  {
    nama: 'Seputar Stunting',
    link: 'https://drive.google.com/uc?export=download&id=1SzdIoLX9iYXbvUdTq4p3V3hvxJVyI31O',
  },
  {
    nama: 'Buku KIA',
    link: 'https://drive.google.com/uc?export=download&id=1T2LMkIotFe3GiGJhIUHGBFQFV43N9XPm',
  },
];

export default function PojokLiterasi() {
  return (
    <div id="pojok-literasi">
      <div className="flex justify-between mb-3">
        <h2 className="text-[#4A5568] font-semibold text-lg">Pojok Literasi</h2>
      </div>
      <div className="grid gap-y-3">
        {presentasi.map((item, index) => (
          <a
            key={index}
            href={item.link}
            className="bg-white pl-3 pr-2 py-2 min-h-[44px] flex items-center gap-x-2 shadow-sm rounded-md border border-[#E5E9F0]"
          >
            <BsFileEarmarkPdf color="#4A90E2" size={24} />
            <p className="text-xs text-[#4A5568] line-clamp-2">{item.nama}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
