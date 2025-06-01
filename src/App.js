import React, { useState, useEffect } from 'react';
import './App.css';

const Clock = ({ format, timezone }) => {
  const getFormattedTime = () => {
    const now = new Date();
    const localOffset = now.getTimezoneOffset() * 60000;
    let offsetMs = 0;

    if (timezone !== 'local') {
      const match = timezone.match(/([+-])(\d{1,2}):(\d{2})/);
      if (match) {
        const sign = match[1] === '+' ? 1 : -1;
        const hours = parseInt(match[2], 10);
        const minutes = parseInt(match[3], 10);
        offsetMs = sign * (hours * 60 + minutes) * 60000;
      }
    }

    const adjustedTime = new Date(now.getTime() + localOffset + offsetMs);
    let hours = adjustedTime.getHours();
    const minutes = adjustedTime.getMinutes().toString().padStart(2, '0');
    const seconds = adjustedTime.getSeconds().toString().padStart(2, '0');

    if (format === '12') {
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12 || 12;
      return `${hours}:${minutes}:${seconds} ${ampm}`;
    }

    return `${hours.toString().padStart(2, '0')}:${minutes}:${seconds}`;
  };

  const [time, setTime] = useState(getFormattedTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getFormattedTime());
    }, 1000);
    return () => clearInterval(interval);
  }, [timezone, format]);

  return <div className="clock">Время: {time}</div>;
};

const professionData = {
  Analyst: [
    'Tableau',
    'Power BI',
    'Google Data Studio',
    'Excel',
    'SQL Tutorial',
    'Kaggle',
    'DataCamp',
  ],
  Writer: [
    'Grammarly',
    'Hemingway Editor',
    'Medium',
    'ProWritingAid',
    'Scrivener',
    'NaNoWriMo',
    'Reedsy',
  ],
  Photographer: [
    '500px',
    'Flickr',
    'Adobe Lightroom',
    'Photoshop',
    'Pexels',
    'Unsplash',
    'Digital Photography School',
  ],
  Chef: [
    'Allrecipes',
    'Serious Eats',
    'Food Network',
    'America’s Test Kitchen',
    'Epicurious',
    'ChefSteps',
    'The Kitchn',
  ],
  Architect: [
    'ArchDaily',
    'Dezeen',
    'Autodesk Revit',
    'SketchUp',
    'ArchiCAD',
    'World Architecture Community',
    'The Architect’s Newspaper',
  ],
};

const JobSelector = ({ selected, onChange }) => (
  <div className="job-selector">
    <label htmlFor="prof-select">Выберите профессию:</label><br />
    <select
      id="prof-select"
      value={selected}
      onChange={e => onChange(e.target.value)}
    >
      {Object.keys(professionData).map(prof => (
        <option key={prof} value={prof}>{prof}</option>
      ))}
    </select>
  </div>
);

const JobMenu = ({ profession }) => {
  const items = professionData[profession] || [];
  return (
    <div className="job-menu">
      <h3>Полезные ссылки для: {profession}</h3>
      <ul>
        {items.map((item, idx) => (
          <li key={idx}>
            <a href="#" target="_blank" rel="noopener noreferrer">{item}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

function App() {
  const [profession, setProfession] = useState('Analyst');
  const [format, setFormat] = useState('24');
  const [timezone, setTimezone] = useState('+3:00');

  return (
    <div className="app-container">
      <section className="clock-settings">
        <div className="field-group">
          <label htmlFor="format-select">Формат времени:</label>
          <select
            id="format-select"
            value={format}
            onChange={e => setFormat(e.target.value)}
          >
            <option value="24">24 часа</option>
            <option value="12">12 часов</option>
          </select>
        </div>

        <div className="field-group">
          <label htmlFor="timezone-select">Часовой пояс:</label>
          <select
            id="timezone-select"
            value={timezone}
            onChange={e => setTimezone(e.target.value)}
          >
            <option value="local">Локальный</option>
            <option value="-8:00">-8:00 (США, Калифорния)</option>
            <option value="-5:00">-5:00 (Нью-Йорк)</option>
            <option value="+0:00">0:00 (Гринвич)</option>
            <option value="+3:00">+3:00 (Минск, Москва)</option>
            <option value="+5:30">+5:30 (Индия)</option>
            <option value="+9:00">+9:00 (Япония)</option>
          </select>
        </div>
      </section>

      <Clock format={format} timezone={timezone} />

      <hr />

      <JobSelector selected={profession} onChange={setProfession} />
      <JobMenu profession={profession} />
    </div>
  );
}

export default App;