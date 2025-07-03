import React, { useState, useEffect } from 'react';
import '../css/Candidates.css';

const exampleData = [
  { id: 1, name: 'Ahmet', surname: 'Yılmaz', birthDay: '1999-05-10', email: 'ahmet@example.com', sex: 'Male', phone: '555-1234', university: 'XYZ Uni', majority: 'Computer Science', gpa: 3.6, classYear: 3, englishLevel: 'Advanced' },
  { id: 2, name: 'Ayşe', surname: 'Demir', birthDay: '2000-11-22', email: 'ayse@example.com', sex: 'Female', phone: '555-5678', university: 'ABC Uni', majority: 'Mathematics', gpa: 3.9, classYear: 2, englishLevel: 'Intermediate' },

  { id: 3, name: 'Ayşe', surname: 'Demir', birthDay: '2000-11-22', email: 'ayse@example.com', sex: 'Female', phone: '555-5678', university: 'ABC Uni', majority: 'Mathematics', gpa: 3.9, classYear: 2, englishLevel: 'Intermediate' },

  { id: 4, name: 'Ayşe', surname: 'Demir', birthDay: '2000-11-22', email: 'ayse@example.com', sex: 'Female', phone: '555-5678', university: 'ABC Uni', majority: 'Mathematics', gpa: 3.9, classYear: 2, englishLevel: 'Intermediate' },

  { id: 5, name: 'Ayşe', surname: 'Demir', birthDay: '2000-11-22', email: 'ayse@example.com', sex: 'Female', phone: '555-5678', university: 'ABC Uni', majority: 'Mathematics', gpa: 3.9, classYear: 2, englishLevel: 'Intermediate' },

  { id: 6, name: 'Ayşe', surname: 'Demir', birthDay: '2000-11-22', email: 'ayse@example.com', sex: 'Female', phone: '555-5678', university: 'ABC Uni', majority: 'Mathematics', gpa: 3.9, classYear: 2, englishLevel: 'Intermediate' },
  { id: 7, name: 'Ayşe', surname: 'Demir', birthDay: '2000-11-22', email: 'ayse@example.com', sex: 'Female', phone: '555-5678', university: 'ABC Uni', majority: 'Mathematics', gpa: 3.9, classYear: 2, englishLevel: 'Intermediate' },

  { id: 8, name: 'Ayşe', surname: 'Demir', birthDay: '2000-11-22', email: 'ayse@example.com', sex: 'Female', phone: '555-5678', university: 'ABC Uni', majority: 'Mathematics', gpa: 3.9, classYear: 2, englishLevel: 'Intermediate' },

  { id: 9, name: 'Ayşe', surname: 'Demir', birthDay: '2000-11-22', email: 'ayse@example.com', sex: 'Female', phone: '555-5678', university: 'ABC Uni', majority: 'Mathematics', gpa: 3.9, classYear: 2, englishLevel: 'Intermediate' },

  { id: 10, name: 'Ayşe', surname: 'Demir', birthDay: '2000-11-22', email: 'ayse@example.com', sex: 'Female', phone: '555-5678', university: 'ABC Uni', majority: 'Mathematics', gpa: 3.9, classYear: 2, englishLevel: 'Intermediate' },

  { id: 11, name: 'Ayşe', surname: 'Demir', birthDay: '2000-11-22', email: 'ayse@example.com', sex: 'Female', phone: '555-5678', university: 'ABC Uni', majority: 'Mathematics', gpa: 3.9, classYear: 2, englishLevel: 'Intermediate' },


  // Diğer adaylar...
];

const statusClasses = {
  approved: 'candidate-approved',
  rejected: 'candidate-rejected',
  pending: 'candidate-pending',
  none: '',
};

export default function Candidates() {
  const [candidates, setCandidates] = useState([]);
  const [selected, setSelected] = useState(null); // Seçili aday (popup için)

  useEffect(() => {
    setCandidates(exampleData.map(c => ({ ...c, status: 'none' })));
  }, []);

  const updateStatus = (id, newStatus) => {
    setCandidates(prev =>
      prev.map(c => (c.id === id ? { ...c, status: newStatus } : c))
    );
    setSelected(null); // Popup kapat
  };

  const downloadJV = (candidate) => {
    alert(`JV indir: ${candidate.name} ${candidate.surname}`);
    // Burada gerçek JV indirme işlemi yapılabilir
  };

  return (
    <div className="candidates-container" style={{ position: 'relative' }}>
     {candidates.map(candidate => (
  <div
    key={candidate.id}
    className={`candidate-card ${statusClasses[candidate.status]}`}
  >
    <div className="candidate-info">
      <p><strong>Name:</strong> {candidate.name}</p>
      <p><strong>Surname:</strong> {candidate.surname}</p>
      <p><strong>Job:</strong> {candidate.majority}</p>        {/* Job */}
      <p><strong>Major:</strong> {candidate.university}</p>    {/* Major */}
      <p><strong>Year:</strong> {candidate.classYear}</p>      {/* Year */}
    </div>
    <button className="detail-btn" onClick={() => setSelected(candidate)}>
      Detay
    </button>
  </div>
))}

      {selected && (
        <div className="popup-overlay" onClick={() => setSelected(null)}>
          <div className="popup-content" onClick={e => e.stopPropagation()}>
            <h3>Detaylar</h3>
            <div className="details">
              <p><strong>Name:</strong> {selected.name}</p>
              <p><strong>Surname:</strong> {selected.surname}</p>
              <p><strong>BirthDay:</strong> {selected.birthDay}</p>
              <p><strong>Email:</strong> {selected.email}</p>
              <p><strong>Sex:</strong> {selected.sex}</p>
              <p><strong>Phone:</strong> {selected.phone}</p>
              <p><strong>University:</strong> {selected.university}</p>
              <p><strong>Majority:</strong> {selected.majority}</p>
              <p><strong>GPA:</strong> {selected.gpa}</p>
              <p><strong>Class Year:</strong> {selected.classYear}</p>
              <p><strong>English Level:</strong> {selected.englishLevel}</p>
            </div>

            <button className="download-jv-btn" onClick={() => downloadJV(selected)}>
              CV İndir
            </button>

            <div className="popup-buttons">
              <button className="btn approve" onClick={() => updateStatus(selected.id, 'approved')}>
                Onayla
              </button>
              <button className="btn pending" onClick={() => updateStatus(selected.id, 'pending')}>
                Beklet
              </button>
              <button className="btn reject" onClick={() => updateStatus(selected.id, 'rejected')}>
                Reddet
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
