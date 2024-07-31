import { GrNext, GrPrevious } from 'react-icons/gr';
import 'styles/swiper.css';
import 'swiper/css';
import 'swiper/css/pagination';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const videos = [
  {
    id: 1,
    title: 'Animasi 5 Gerakan Sehat',
    link: 'https://www.youtube.com/embed/jkS6glRPD_o?si=MPbEqMSpEDT0cjsS',
  },
  {
    id: 2,
    title: 'Video Edukasi Tablet Tambah Darah',
    link: 'https://www.youtube.com/embed/CRCJ5ibZSiw?si=cGfHg4pqsWQBOg6c',
  },
  {
    id: 3,
    title: 'Makanan Pendamping ASI',
    link: 'https://www.youtube.com/embed/_7MHyuwxkyw?si=5oBRl460tWofslF6',
  },
  {
    id: 4,
    title: 'Edukasi Konsumsi Sayur dan Buah',
    link: 'https://www.youtube.com/embed/SS3w5mPohcE?si=r-WsuKIRUrDmLZ5p',
  },
  {
    id: 5,
    title: 'Cegah Stunting dengan ABCDE',
    link: 'https://www.youtube.com/embed/NU_MDQ2iNYE?si=XAQJyph9syzpy3Wf',
  },
];

export default function VideoMateri() {
  return (
    <div id="video-materi">
      <div className="flex justify-between">
        <h2 className="text-[#4A5568] font-semibold">Video</h2>
      </div>
      <div className="grid gap-y-2 mt-2">
        <Swiper
          modules={[Navigation]}
          slidesPerView={1.35}
          spaceBetween={10}
          navigation={{
            nextEl: '.media.swiper-button-next',
            prevEl: '.media.swiper-button-prev',
          }}
          loop={true}
          className="w-full"
        >
          {videos.map((video) => {
            return (
              <SwiperSlide key={video.id} className="px-1 py-2">
                <div className="flex flex-col min-h-[50px] bg-white shadow-md rounded-lg border border-[#E5E9F0]">
                  <iframe
                    src={video.link}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    className="rounded-md"
                  />
                  <p className="m-2 text-[#4A5568] text-sm">{video.title}</p>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
        <div className="flex justify-end gap-x-1">
          <span
            role="button"
            className="media swiper-button-prev shadow-md bg-white text-[#4A90E2] p-2 rounded-full"
          >
            <GrPrevious />
          </span>
          <span
            role="button"
            className="media swiper-button-next shadow-md bg-white text-[#4A90E2] p-2 rounded-full"
          >
            <GrNext />
          </span>
        </div>
      </div>
    </div>
  );
}
