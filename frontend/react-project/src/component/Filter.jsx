import React, { useState } from 'react';
import '../css/Filter.css';

function Filter({ filtersBuffers, setFiltersBuffers }) {
  const [activeBuffer, setActiveBuffer] = useState(null);

  const handleDeleteBuffer = (name) => {
    const filteredBuffers = filtersBuffers.filter(buffer => buffer.name !== name);
    setFiltersBuffers(filteredBuffers);
    setActiveBuffer(null);
  };

  return (
    <div className="filter-card">
      <div className="filter-card-content">
        {/* Sol taraf */}
        <div className="filter-left">
          <h3 className="filter-header">Filter Groups </h3>
          {filtersBuffers.length === 0 && <p>No Filter Groups added yet</p>}
          <div className="filter-buttons">
            {filtersBuffers.map(({ name, filters }) => (
              <button
                key={name}
                className="filter-btn"
                onClick={() => setActiveBuffer({ name, filters })}
              >
                {name}
              </button>
            ))}
          </div>
        </div>

        {/* Dikey çizgi */}
        <div className="filter-divider"></div>

        {/* Sağ taraf */}
        <div className="filter-right">
          <button className="action-btn">application date</button>
          <button
            className="action-btn"
            onClick={() => {
              // GPA'ya göre azalan sıralama için:
              setFiltersBuffers(prev => {
                // GPA sıralama butonu filtre grubu ile ilgili değil, doğrudan Candidate.jsx'e etki etmeli.
                // Bu yüzden burada bir callback veya prop fonksiyonu kullanılmalı.
                // Aşağıdaki gibi bir fonksiyon prop'u ekleyin:
                if (typeof window.sortCandidatesByGPA === 'function') {
                  window.sortCandidatesByGPA();
                }
                return prev;
              });
            }}
          >
            GPA
          </button>
          <button
            className="action-btn"
            onClick={() => {
              // English Level'a göre sıralama için:
              setFiltersBuffers(prev => {
                if (typeof window.sortCandidatesByEnglishLevel === 'function') {
                  window.sortCandidatesByEnglishLevel();
                }
                return prev;
              });
            }}
          >
            English Level
          </button>
          <button
            className="action-btn"
            onClick={() => {
              // Educational Status'a göre sıralama için:
              setFiltersBuffers(prev => {
                if (typeof window.sortCandidatesByEducationalStatus === 'function') {
                  window.sortCandidatesByEducationalStatus();
                }
                return prev;
              });
            }}
          >
            Educational Status
          </button>
        </div>
      </div>

      {activeBuffer && (
        <div className="popup">
          <div className="popup-content">
            <button className="close-btn" onClick={() => setActiveBuffer(null)}>
              &times;
            </button>
            <h4>{activeBuffer.name} Details</h4>
            <ul>
              {Object.entries(activeBuffer.filters).map(([key, values]) => (
                <li key={key}>
                  <strong>{key}:</strong> {values.length > 0 ? values.join(', ') : 'Seçilmedi'}
                </li>
              ))}
            </ul>
            <button
              className="delete-btn"
              onClick={() => handleDeleteBuffer(activeBuffer.name)}
            >
              Delete Filter Group
            </button>
            <button
              className="send-btn"
              onClick={() => {
                // activeBuffer.filters içeriğini backend beklediği isimlere dönüştür
                const payload = {
                  candidateBirthDay: activeBuffer.filters['yas_araligi'] || '',
                  candidateUniversity: activeBuffer.filters['University'] || '',
                  candidateMajor: activeBuffer.filters['Majors'] || '',
                  candidateGPA: activeBuffer.filters['GpaOptions'] || '',
                  candidateSex: activeBuffer.filters['Sex'] || '',
                  candidateCurrentYear: activeBuffer.filters['ApplicationStatus'] || '',
                  expectedGraduateYear: activeBuffer.filters['educations'] || '',
                  candidateEnglishLevel: activeBuffer.filters['EnglishLevels'] || '',
                  candidateCity: activeBuffer.filters['Cities'] || '',

                };

                fetch('http://localhost:8080/userside/application/add', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(payload),
                })
                  .then(response => {
                    if (!response.ok) throw new Error('Network response was not ok');
                    return response.text();
                  })
                  .then(data => {
                    console.log('Success:', data);
                    alert('Filtre başarıyla gönderildi.');
                    setActiveBuffer(null);
                  })
                  .catch(error => {
                    console.error('Error:', error);
                    alert('Gönderimde hata oluştu.');
                  });
              }}
            >
              Send to Backend
            </button>

          </div>
        </div>
      )}





    </div>
  );
}

export default Filter;
