import MainLayout from 'components/MainLayout';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { TfiArrowCircleRight } from 'react-icons/tfi';

const AccordionItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border-b border-[#E5E9F0]">
      <button
        className="flex justify-between items-center w-full py-3 px-4 text-left"
        onClick={onClick}
      >
        <span className="text-[13.8px]">{question}</span>
        <TfiArrowCircleRight
          size={20}
          className={`text-[#4A90E2] transform transition-transform ${isOpen ? 'rotate-90' : ''}`}
        />
      </button>
      {isOpen && (
        <div className="py-3 px-4 bg-[#EBF4FF]">
          <p className="text-sm">{answer}</p>
        </div>
      )}
    </div>
  );
};

const HalamanInformasiWebsite = () => {
  const [openItem, setOpenItem] = useState(null);

  const toggleItem = (index) => {
    if (openItem === index) {
      setOpenItem(null);
    } else {
      setOpenItem(index);
    }
  };

  const qnaItems = [
    {
      question: 'Apakah terdapat materi tambahan bagi para kader?',
      answer:
        'Ya, pada halaman beranda terdapat berbagai macam materi yang bisa menjadi pembelajaran bagi kader.',
    },
    {
      question: 'Bagaimana cara menambahkan data pemeriksaan?',
      answer:
        'Pastikan data orang tua dan data anak sudah dimasukkan. Kemudian, pergi ke halaman periksa dan isi kolom yang tersedia. Pastikan semua kolom terpenuhi, lalu tekan tombol simpan.',
    },
    {
      question: 'Bagaimana cara mendownload laporan bulanan?',
      answer:
        'Pergi ke halaman riwayat lalu pilih bulan dan tahun yang sesuai kemudian klik tombol unduh pada layar bagian bawah.',
    },
    {
      question: 'Bagaimana cara menambahkan data orang tua?',
      answer:
        'Pada halaman beranda, skrol layar hingga menemui menu "Data Orang Tua". Setelah itu akan ada daftar nama orang tua dan terdapat tombol "Tambah Orang Tua" pada pojok kanan atas layar.',
    },
    {
      question: 'Bagaimana cara menambahkan data anak?',
      answer:
        'Pada halaman beranda, skrol layar hingga menemui menu "Data Anak". Setelah itu akan ada daftar nama anak dan terdapat tombol "Tambah Anak" pada pojok kanan atas layar.',
    },
    {
      question: 'Bagaimana cara menambahkan data imunisasi?',
      answer:
        'Data imunisasi dimasukkan pada halaman detail anak. Pertama-tama, pengguna dapat mengakses halaman beranda lalu menskrol hingga ke menu Data Anak. Kemudian, terdapat list anak yang terdaftar dalam website. Untuk menambahkan data imunisasi pilih salah satu anak kemudian skrol pada bagian Imunisasi Anak. Centanglah dan masukkan tanggal imunisasi anak tersebut.',
    },
    {
      question: 'Apakah saya bisa menambahkan data dari luar?',
      answer:
        'Untuk saat ini, belum terdapat fitur yang digunakan untuk mengimport data. Fokus dari website ini adalah menyediakan laporan bulanan yang cepat.',
    },
    {
      question: 'Siapa pengembang website SiTunting?',
      answer: 'Tim KKN-PPM UGM Jumantara Pejawaran 2024.',
    },
  ];

  return (
    <MainLayout>
      <div className="px-4">
        <h1 className="text-xl font-semibold mb-4">Informasi Website</h1>
        <div className="bg-white rounded-md border border-[#E5E9F0] overflow-hidden">
          {qnaItems.map((item, index) => (
            <AccordionItem
              key={index}
              question={item.question}
              answer={item.answer}
              isOpen={openItem === index}
              onClick={() => toggleItem(index)}
            />
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

AccordionItem.propTypes = {
  question: PropTypes.string,
  answer: PropTypes.string,
  isOpen: PropTypes.bool,
  onClick: PropTypes.func,
};

export default HalamanInformasiWebsite;
