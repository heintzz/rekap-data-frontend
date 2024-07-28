import { MdArrowForwardIos } from 'react-icons/md';

export default function Artikel() {
  return (
    <div id="artikel">
      <div className="flex justify-between">
        <h2>Artikel</h2>
        <button className="flex items-center gap-x-1 btn btn-primary text-sm">
          Selengkapnya <MdArrowForwardIos />
        </button>
      </div>
      <div id="gallery" className="grid gap-y-2 mt-2">
        {[1, 2].map((item) => (
          <div className="bg-white grid grid-cols-3 gap-x-3" key={item}>
            <div className="col-span-1 min-h-20 bg-[#EEEEEE]"></div>
            <div className="col-span-2 flex flex-col justify-between">
              <p>Lorem ipsum dolor sit amet consectetur adipisicing</p>
              <p>26 Mei 2024</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
