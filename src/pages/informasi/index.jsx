import MainLayout from 'components/MainLayout';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
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
          {typeof answer === 'string' ? <div className="text-sm">{answer}</div> : answer}
        </div>
      )}
    </div>
  );
};

const HalamanInformasiWebsite = () => {
  const [openItem, setOpenItem] = useState(null);
  const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptInstall, setPromptInstall] = useState(null);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      console.log('Installation prompt available');
      setSupportsPWA(true);
      setPromptInstall(e);
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallPWA = (evt) => {
    evt.preventDefault();
    if (!promptInstall) {
      return;
    }
    promptInstall.prompt();
  };

  const toggleAccordionItem = (index) => {
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
      question: 'Bagaimana cara menginstall SiTunting menjadi aplikasi?',
      answer: (
        <div className="text-sm">
          <p>
            Pada menu browser pengguna pilih menu tambahkan ke beranda. Kemudian akan ada konfirmasi
            untuk menginstall, lalu tekan tombol install.
          </p>
          {supportsPWA && (
            <div className="mt-2">
              <p>
                Jika belum terinstall, Anda dapat menekan tombol di bawah ini untuk menginstall
                aplikasi:
              </p>
              <button
                id="setup_button"
                aria-label="Install app"
                title="Install app"
                className="bg-green-400 px-2 text-white py-1 rounded-md mt-2 font-semibold"
                onClick={handleInstallPWA}
              >
                Install SiTunting
              </button>
            </div>
          )}
        </div>
      ),
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
              onClick={() => toggleAccordionItem(index)}
            />
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

AccordionItem.propTypes = {
  question: PropTypes.string.isRequired,
  answer: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default HalamanInformasiWebsite;
