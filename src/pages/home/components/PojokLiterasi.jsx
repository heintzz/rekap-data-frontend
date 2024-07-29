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
];

export default function PojokLiterasi() {
  return (
    <div id="pojok-literasi">
      <div className="flex justify-between">
        <h2 className="text-[#4A5568] font-semibold">Pojok Literasi</h2>
      </div>
      <div className="grid gap-y-3 mt-3">
        {presentasi.map((item, index) => (
          <a
            key={index}
            href={item.link}
            className="bg-white pl-4 pr-2 py-3 min-h-[50px] flex items-center gap-x-3 shadow-sm rounded-md border border-[#E5E9F0]"
          >
            <BsFileEarmarkPdf color="#4A90E2" size={32} />
            <p className="text-sm text-[#4A5568]">{item.nama}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
