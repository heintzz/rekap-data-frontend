import { MdArrowForwardIos } from 'react-icons/md';

export default function Artikel() {
  return (
    <div id="artikel">
      <div className="flex justify-between">
        <h2 className="text-[#4A5568] font-semibold">Artikel</h2>
        <button className="flex items-center gap-x-1 bg-[#4A90E2] text-white px-3 py-1 rounded-md text-sm hover:bg-[#3A7BC8]">
          Selengkapnya <MdArrowForwardIos />
        </button>
      </div>
      <div id="gallery" className="grid gap-y-2 mt-2">
        {[1, 2].map((item) => (
          <div
            className="bg-white grid grid-cols-3 gap-x-3 p-2 rounded-md shadow-sm border border-[#E5E9F0]"
            key={item}
          >
            <div className="col-span-1 min-h-20 bg-[#EBF4FF]"></div>
            <div className="col-span-2 flex flex-col justify-between">
              <p className="text-[#4A5568]">Lorem ipsum dolor sit amet consectetur adipisicing</p>
              <p className="text-[#4A90E2]">26 Mei 2024</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
