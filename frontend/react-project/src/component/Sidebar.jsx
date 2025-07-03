import React, { useState } from 'react';
import '../css/Sidebar.css';

function Sidebar({ onFilterApply = () => {} }) {
  const [bufferCount, setBufferCount] = useState(1);
  

  // Filtre state'leri
  const [secilenCinsiyet, setSecilenCinsiyet] = useState('');
  const [secilenCinsiyetler, setSecilenCinsiyetler] = useState([]);

  const [secilenSehir, setSecilenSehir] = useState('');
  const [secilenSehirler, setSecilenSehirler] = useState([]);

  const [secilenYas, setSecilenYas] = useState('');
  const [secilenYaslar, setSecilenYaslar] = useState([]);

  const [secilenDil, setSecilenDil] = useState('');
  const [secilenDiller, setSecilenDiller] = useState([]);

  const [secilenBolum, setSecilenBolum] = useState('');
  const [secilenBolumler, setSecilenBolumler] = useState([]);

  const [secilenGpa, setSecilenGpa] = useState('');
  const [secilenGpaListesi, setSecilenGpaListesi] = useState([]);

  const [secilenBasvuruDurumu, setSecilenBasvuruDurumu] = useState('');
  const [secilenBasvuruDurumlari, setSecilenBasvuruDurumlari] = useState([]);

  const [SecilenEgitim, setSecilenEgitim] = useState('');
  const [secilenEgitimler, SetSecilenEgitimler] = useState([]);



  // Filtre seçenekleri
  const Sex = ['Female', 'Male'];
  const EnglishLevels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  const educations = ['1', '2', '3','4','Graduate'];
  const yas_araligi = ['22-27', '28-33', '34-39', '40-45', '46-51', '52-57', '58-63'];
  const Cities = ['İstanbul', 'Ankara', 'İzmir'];
  const GpaOptions = ['Above 3.50', 'Between 3.00 and 3.50', 'Between 2.50 and 3.00', 'Between 2.00 and 2.50'];
  const ApplicationStatus = ['Approval','rejection','Pending'];
  const Majors = [
    'Bilgisayar Mühendisliği',
    'Yazılım Mühendisliği',
    'Elektrik-Elektronik Mühendisliği',
    'Endüstri Mühendisliği',
    'Bilişim Sistemleri Mühendisliği',
    'Veri Bilimi',
    'Yapay Zeka Mühendisliği',
    'Bilgisayar Bilimleri',
    'Bilgisayar ve Enformasyon Sistemleri',
    'Sistem Mühendisliği',
    'Bilgisayar ve Yazılım Mühendisliği',
    'Bilgisayar Teknolojileri ve Bilişim Sistemleri',
    'İnternet ve Bilgi Teknolojileri',
    'Bilgi Sistemleri Mühendisliği',
    'Haberleşme Mühendisliği'
  ];

  // Ortak fonksiyonlar
  const handleSelectChange = (setter) => (e) => setter(e.target.value);
  const handleAddItem = (item, list, setList, reset) => {
    if (item && !list.includes(item)) {
      setList([...list, item]);
      reset('');
    }
  };
  const handleRemoveItem = (item, list, setList) => {
    setList(list.filter((i) => i !== item));
  };

  // Filtreyi otomatik isimle uygula
  const applyFilter = () => {
    const bufferName = `Filter ${bufferCount}`;

    onFilterApply(bufferName, {
      Genders : secilenCinsiyetler,
      Cities : secilenSehirler,
      Age_Ranges : secilenYaslar,
      English_levels: secilenDiller,
      Majors : secilenBolumler,
      GBA_Lists: secilenGpaListesi,
      Educational_Status: secilenEgitimler,
      Application_Status: secilenBasvuruDurumlari,

    });

    setBufferCount(bufferCount + 1);
  };

  return (
    <div className="sidebar">

      {/* Şehirler */}
      <FilterSection
        title="City"
        value={secilenSehir}
        options={Cities}
        onChange={handleSelectChange(setSecilenSehir)}
        onAdd={() => handleAddItem(secilenSehir, secilenSehirler, setSecilenSehirler, setSecilenSehir)}
        items={secilenSehirler}
        onDelete={(item) => handleRemoveItem(item, secilenSehirler, setSecilenSehirler)}
      />
      {/* Status */}
      <FilterSection
      title="Applications Status"
      value={secilenBasvuruDurumu}
      options={ApplicationStatus}
      onChange={handleSelectChange(setSecilenBasvuruDurumu)}
      onAdd={() => handleAddItem(secilenBasvuruDurumu,secilenBasvuruDurumlari, setSecilenBasvuruDurumlari,setSecilenBasvuruDurumu )}
      items={secilenBasvuruDurumlari}
      onDelete={(item) => handleRemoveItem(item, secilenBasvuruDurumlari, setSecilenBasvuruDurumlari)}
      />

      {/* Cinsiyet */}
      <FilterSection
        title="Sex"
        value={secilenCinsiyet}
        options={Sex}
        onChange={handleSelectChange(setSecilenCinsiyet)}
        onAdd={() => handleAddItem(secilenCinsiyet, secilenCinsiyetler, setSecilenCinsiyetler, setSecilenCinsiyet)}
        items={secilenCinsiyetler}
        onDelete={(item) => handleRemoveItem(item, secilenCinsiyetler, setSecilenCinsiyetler)}
      />

      {/* Yaş Aralığı */}
      <FilterSection
        title="Age Range"
        value={secilenYas}
        options={yas_araligi}
        onChange={handleSelectChange(setSecilenYas)}
        onAdd={() => handleAddItem(secilenYas, secilenYaslar, setSecilenYaslar, setSecilenYas)}
        items={secilenYaslar}
        onDelete={(item) => handleRemoveItem(item, secilenYaslar, setSecilenYaslar)}
      />

      {/* İngilizce Seviyesi */}
      <FilterSection
        title="English Level"
        value={secilenDil}
        options={EnglishLevels}
        onChange={handleSelectChange(setSecilenDil)}
        onAdd={() => handleAddItem(secilenDil, secilenDiller, setSecilenDiller, setSecilenDil)}
        items={secilenDiller}
        onDelete={(item) => handleRemoveItem(item, secilenDiller, setSecilenDiller)}
      />

      {/* Bölüm */}
      <FilterSection
        title="Majority"
        value={secilenBolum}
        options={Majors}
        onChange={handleSelectChange(setSecilenBolum)}
        onAdd={() => handleAddItem(secilenBolum, secilenBolumler, setSecilenBolumler, setSecilenBolum)}
        items={secilenBolumler}
        onDelete={(item) => handleRemoveItem(item, secilenBolumler, setSecilenBolumler)}
      />

      {/* Not Ortalaması (GPA) */}
      <FilterSection
        title="Grade Point Average (4-Point System)"
        value={secilenGpa}
        options={GpaOptions}
        onChange={handleSelectChange(setSecilenGpa)}
        onAdd={() => handleAddItem(secilenGpa, secilenGpaListesi, setSecilenGpaListesi, setSecilenGpa)}
        items={secilenGpaListesi}
        onDelete={(item) => handleRemoveItem(item, secilenGpaListesi, setSecilenGpaListesi)}
      />

      {/* Eğitim */}
      <FilterSection
        title="Educational Status"
        value={SecilenEgitim}
        options={educations}
        onChange={handleSelectChange(setSecilenEgitim)}
        onAdd={() => handleAddItem(SecilenEgitim, secilenEgitimler, SetSecilenEgitimler, setSecilenEgitim)}
        items={secilenEgitimler}
        onDelete={(item) => handleRemoveItem(item, secilenEgitimler, SetSecilenEgitimler)}
      />

      <div className="Filter-container">
        <button className="filtreUygulaButon" onClick={applyFilter}>
          apply filter
        </button>
      </div>

    </div>
  );
}

function FilterSection({ title, value, options, onChange, onAdd, items, onDelete }) {
  return (
    <div className="Filter-container">
      <h3 className="slide_baslik">{title}</h3>
      <div className="Filter-selector">
        <label>{title} Select</label>
        <select value={value} onChange={onChange}>
          <option value="">--Select --</option>
          {options.map((opt, i) => (
            <option key={i} value={opt}>{opt}</option>
          ))}
        </select>
        <button onClick={onAdd}>Add</button>
      </div>

      {items.length > 0 && (
        <ul className="Filter-list">
          {items.map((item, i) => (
            <li key={i}>
              {item}
              <button onClick={() => onDelete(item)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
      <hr className="ayirma_cubuk" />
    </div>
  );
}

export default Sidebar;
