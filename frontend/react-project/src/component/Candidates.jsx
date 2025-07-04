import React, { useState, useEffect } from 'react';
import '../css/Candidates.css';

const statusClasses = {
  approved: 'candidate-approved',
  rejected: 'candidate-rejected',
  pending: 'candidate-pending',
  none: '',
};
 // Bu fonksiyonu global olarak erişilebilir yap
  
export default function Candidates() {
  const [candidates, setCandidates] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    window.sortCandidatesByGPA = sortByGPA;
    return () => {
      delete window.sortCandidatesByGPA;
    };
  }, []);
  // GPA'ya göre sıralama fonksiyonu
  function sortByGPA() {
    setCandidates(prev =>
      [...prev].sort((a, b) => b.gpa - a.gpa)
    );
  }
  // ...component içinde...
function sortByEnglishLevel() {
  // Sıralama için seviyeleri belirle
  const levels = ['a1', 'a2', 'b1', 'b2', 'c1', 'c2'];
  setCandidates(prev =>
    [...prev].sort(
      (a, b) =>
        levels.indexOf((b.englishLevel || '').toLowerCase()) -
        levels.indexOf((a.englishLevel || '').toLowerCase())
    )
  );
}

useEffect(() => {
  window.sortCandidatesByEnglishLevel = sortByEnglishLevel;
  return () => {
    delete window.sortCandidatesByEnglishLevel;
  };
}, []);
function sortByEducationalStatus() {
  // Sıralama için seviyeleri belirle (örnek: graduated > senior > junior > sophomore > freshman)
  const order = ['graduated', 'senior', 'junior', 'sophomore', 'freshman'];
  setCandidates(prev =>
    [...prev].sort(
      (a, b) =>
        order.indexOf((a.currentYear || '').toLowerCase()) -
        order.indexOf((b.currentYear || '').toLowerCase())
    )
  );
}

useEffect(() => {
  window.sortCandidatesByEducationalStatus = sortByEducationalStatus;
  return () => {
    delete window.sortCandidatesByEducationalStatus;
  };
}, []);
  useEffect(() => {
    fetch('http://127.0.0.1:8080/userside/get/candidates')
      .then(response => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Fetched candidates:', data);
        setCandidates(
          data.map(c => ({
            id: c.candidateId,
            name: c.candidateName,
            surname: c.candidateSurname,
            birthday: c.candidateBirthDay,
            email: c.candidateEmail,
            sex: c.candidateSex,
            phone: c.candidatePhone,
            universityId: c.candidateUniversity,
            majorId: c.candidateMajor,
            gpa: c.candidateGPA,
            currentYear: c.candidateCurrentYear,
            expectedGraduateYear: c.candidateExpectedGraduateYear,
            englishLevel: c.candidateEnglishLevel,
            status: 'none',
          }))
        );
      })
      .catch(err => {
        console.error('Error fetching candidates:', err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  const updateStatus = (id, newStatus) => {
    setCandidates(prev =>
      prev.map(c => (c.id === id ? { ...c, status: newStatus } : c))
    );
    setSelected(null);
  };

  const downloadCV = candidate => {
    fetch(`http://127.0.0.1:8080/userside/download/cv?email=${encodeURIComponent(
      candidate.email
    )}`)
      .then(res => {
        if (!res.ok) {
          throw new Error('CV not found');
        }
        return res.blob();
      })
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute(
          'download',
          `${candidate.name}_${candidate.surname}_CV.pdf`
        );
        document.body.appendChild(link);
        link.click();
        link.remove();
      })
      .catch(err => alert('Error downloading CV: ' + err));
  };

  if (loading) {
    return <div className="loader">Loading candidates...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }
  function calculateAge(birthday) {
    const birth = new Date(birthday);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  }
  return (
    <div className="candidates-container">
      {candidates.length === 0 ? (
        <p className="no-data">No candidates found.</p>
      ) : (
        candidates.map(candidate => (
          <div
            key={candidate.id}
            className={`candidate-card ${statusClasses[candidate.status]}`}
          >
            <div className="candidate-info">
              <p>
                <strong></strong> {candidate.name} {candidate.surname} {candidate.birthday ? calculateAge(candidate.birthday) : '-'}
              </p>


              <p>
                <strong>University ID:</strong> {candidate.universityId}
              </p>
              <p>
                <strong>Major ID:</strong> {candidate.majorId}
              </p>

              <p>
                <strong>Class Year:</strong> {candidate.currentYear}
              </p>

            </div>
            <button
              className="detail-btn"
              onClick={() => setSelected(candidate)}
            >
              Detay
            </button>
          </div>
        ))
      )}

      {selected && (
        <div
          className="popup-overlay"
          onClick={() => setSelected(null)}
        >
          <div
            className="popup-content"
            onClick={e => e.stopPropagation()}
          >
            <button
              className="close-btn"
              onClick={() => setSelected(null)}
            >
              &times;
            </button>
            <h3>Detaylar</h3>
            <div className="details">
              {Object.entries(selected).map(([key, value]) => {
                if (['status', 'id'].includes(key)) return null;
                const label =
                  key.charAt(0).toUpperCase() + key.slice(1);
                return (
                  <p key={key}>
                    <strong>{label}:</strong> {String(value)}
                  </p>
                );
              })}
            </div>

            <button
              className="download-jv-btn"
              onClick={() => downloadCV(selected)}
            >
              CV İndir
            </button>

            <div className="popup-buttons">
              <button
                className="btn approve"
                onClick={() => updateStatus(selected.id, 'approved')}
              >
                Onayla
              </button>
              <button
                className="btn pending"
                onClick={() => updateStatus(selected.id, 'pending')}
              >
                Beklet
              </button>
              <button
                className="btn reject"
                onClick={() => updateStatus(selected.id, 'rejected')}
              >
                Reddet
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
