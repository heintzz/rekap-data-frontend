import { GrNext, GrPrevious } from 'react-icons/gr';
import 'styles/swiper.css';
import 'swiper/css';
import 'swiper/css/pagination';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function VideoMateri() {
  return (
    <div id="video-materi">
      <div className="flex justify-between">
        <h2>Video</h2>
      </div>
      <div className="grid gap-y-2 mt-2">
        <Swiper
          modules={[Navigation]}
          slidesPerView={1.2}
          spaceBetween={10}
          navigation={{
            nextEl: '.media.swiper-button-next',
            prevEl: '.media.swiper-button-prev',
          }}
          loop={true}
          className="w-full"
        >
          {[1, 2, 3, 4].map((item, index) => {
            return (
              <SwiperSlide key={index} className="px-1 py-2">
                <div className="flex flex-col min-h-[150px] bg-white shadow-md rounded-lg">
                  <iframe
                    src="https://www.youtube.com/embed/zqpinGFvivg?si=-Zqod3xGHuAhBD7x"
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    className="rounded-md"
                  />
                  <p className="m-2">8 aksi konvergensi penurunan Stunting</p>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
        <div className="flex justify-end gap-x-1">
          <span role="button" className="media swiper-button-prev shadow-md">
            <GrPrevious />
          </span>
          <span role="button" className="media swiper-button-next shadow-md">
            <GrNext />
          </span>
        </div>
      </div>
    </div>
  );
}
