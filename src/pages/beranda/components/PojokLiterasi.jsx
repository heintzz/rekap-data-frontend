import { BsFileEarmarkPdf } from 'react-icons/bs';
import { MdArrowForwardIos } from 'react-icons/md';

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
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="bg-white pl-4 pr-2 py-3 min-h-[50px] flex items-center gap-x-3 shadow-lg rounded-md"
          >
            <BsFileEarmarkPdf color="red" size={32} />
            <p className="text-sm">Pembinaan Kader Posyandu Desa Dalam Penanganan Stunting</p>
          </div>
        ))}
      </div>
    </div>
  );
}
