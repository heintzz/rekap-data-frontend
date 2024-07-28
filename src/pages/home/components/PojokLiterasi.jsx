import { BsFileEarmarkPdf } from 'react-icons/bs';
import { MdArrowForwardIos } from 'react-icons/md';

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
        <h2>Pojok Literasi</h2>
        <button className="flex items-center gap-x-1 btn btn-primary text-sm">
          Selengkapnya <MdArrowForwardIos />
        </button>
      </div>
      <div className="grid gap-y-3 mt-3">
        {presentasi.map((item, index) => (
          <a
            key={index}
            href={item.link}
            className="bg-white pl-4 pr-2 py-3 min-h-[50px] flex items-center gap-x-3 shadow-lg rounded-md"
          >
            <BsFileEarmarkPdf color="red" size={32} />
            <p className="text-sm">{item.nama}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
