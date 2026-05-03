import React from 'react';
import { stateElectionData } from '../stateData';

const TopicContent = React.memo(({ topic, t, mode, userState, shareToWhatsApp }) => {
  if (topic === 'process') {
    return (
      <div className="content-view">
        <h2>{t.process.title}</h2>
        <div className="phases-list">
          {t.process.phases.map((phase, idx) => (
            <div key={idx} className="phase-item glass-card">
              <h3>{idx + 1}. {phase.name}</h3>
              <p>{mode === 'eli10' ? `Imagine this: ${phase.desc}` : phase.desc}</p>
            </div>
          ))}
        </div>
        <p className="disclaimer">{t.process.disclaimer}</p>
      </div>
    );
  }
  if (topic === 'registration') {
    return (
      <div className="content-view">
        <h2>{t.registration.title}</h2>
        <div className="phases-list">
          {t.registration.phases.map((phase, idx) => (
            <div key={idx} className="phase-item glass-card">
              <h3>{idx + 1}. {phase.name}</h3>
              <p>{mode === 'eli10' ? `Simple step: ${phase.desc}` : phase.desc}</p>
            </div>
          ))}
        </div>
        {(t.registration.actionLink || t.registration.appLink) && (
          <div style={{marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center'}}>
            {t.registration.portalWarning && (
              <p style={{color: '#f87171', fontSize: '0.9rem', textAlign: 'center', maxWidth: '400px', margin: '0 auto', marginBottom: '1rem'}}>
                {t.registration.portalWarning}
              </p>
            )}
            <button aria-label="Share Registration Link via WhatsApp" className="btn btn-whatsapp" onClick={() => shareToWhatsApp(`🗳️ Register to vote online! Official ECI Link: ${t.registration.actionLink?.url || 'https://voters.eci.gov.in/'}`)}>
               💬 Share Registration Link via WhatsApp
            </button>
            {t.registration.actionLink && (
              <a href={t.registration.actionLink.url} target="_blank" rel="noopener noreferrer" className="btn" style={{display: 'inline-flex', textDecoration: 'none'}}>
                🔗 {t.registration.actionLink.text}
              </a>
            )}
            {t.registration.appLink && (
              <a href={t.registration.appLink.url} target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{display: 'inline-flex', textDecoration: 'none'}}>
                📱 {t.registration.appLink.text}
              </a>
            )}
          </div>
        )}
      </div>
    );
  }
  if (topic === 'steps') {
    return (
      <div className="content-view">
        <h2>{t.steps.title}</h2>
        <div className="steps-list">
          {t.steps.phases.map((phase, idx) => (
            <div key={idx} className="phase-item glass-card">
              <h3>{phase.name}</h3>
              <p>{mode === 'eli10' ? `At this step: ${phase.desc}` : phase.desc}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (topic === 'firstTime') {
     return (
      <div className="content-view">
        <h2>{t.firstTime.title}</h2>
        <p>{t.firstTime.intro}</p>
        <div className="steps-list">
          {t.firstTime.steps.map((s, idx) => (
            <div key={idx} className="phase-item glass-card">
              <h3>{s.name}</h3>
              <p>{mode === 'eli10' ? `Tip: ${s.desc}` : s.desc}</p>
            </div>
          ))}
        </div>
        {(t.firstTime.actionLink || t.firstTime.appLink) && (
          <div style={{marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center'}}>
            {t.firstTime.actionLink && (
              <a href={t.firstTime.actionLink.url} target="_blank" rel="noopener noreferrer" className="btn" style={{display: 'inline-flex', textDecoration: 'none'}}>
                🔗 {t.firstTime.actionLink.text}
              </a>
            )}
            {t.firstTime.appLink && (
              <a href={t.firstTime.appLink.url} target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{display: 'inline-flex', textDecoration: 'none'}}>
                📱 {t.firstTime.appLink.text}
              </a>
            )}
          </div>
        )}
      </div>
    );
  }
  if (topic === 'faqs') {
    return (
      <div className="content-view">
        <h2>{t.faqs.title}</h2>
        <div className="faq-list">
          {t.faqs.items.map((item, idx) => (
            <div key={idx} className="phase-item glass-card">
              <h4>{item.q}</h4>
              <p>{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (topic === 'timeline') {
    const stateInfo = stateElectionData[userState];
    if (!stateInfo) {
      return (
        <div className="content-view" aria-live="polite">
          <h2>{userState} Election Data</h2>
          <div className="glass-card" style={{textAlign: 'center', padding: '3rem 1rem'}}>
             <span aria-hidden="true" style={{fontSize: '3rem'}}>⏳</span>
             <h3>Data Updating...</h3>
             <p style={{color: '#94a3b8'}}>We are currently compiling the exact historical election records for {userState}. Please check back soon!</p>
          </div>
        </div>
      );
    }

    return (
      <div className="content-view timeline-view">
        <h2>{userState} Elections</h2>
        
        <div className="timeline-section upcoming-section glass-card" style={{borderLeft: '4px solid var(--accent)', marginBottom: '2rem'}}>
           <div className="badge pulse-badge">Upcoming</div>
           <h3 style={{marginTop: '0.5rem', color: 'var(--accent)'}}>{stateInfo.upcoming.expectedDate}</h3>
           <p>{stateInfo.upcoming.type}</p>
           <button aria-label="Share Reminder via WhatsApp" className="btn btn-whatsapp" onClick={() => shareToWhatsApp(`⏳ Reminder! The next ${stateInfo.upcoming.type} in ${userState} is expected in ${stateInfo.upcoming.expectedDate}. Get ready to vote!`)} style={{marginTop: '1rem'}}>
             💬 Share Reminder via WhatsApp
           </button>
        </div>

        <h3 style={{marginBottom: '1.5rem', color: '#cbd5e1'}}>Historical Data</h3>
        <div className="history-list">
          {stateInfo.history.map((hist, idx) => (
            <div key={idx} className="history-card glass-card">
               <div className="history-header">
                  <span className="year-badge">{hist.year}</span>
                  <span className="type-text">{hist.type}</span>
               </div>
               <div className="history-body">
                  <p><strong>Date:</strong> {hist.date}</p>
                  {hist.totalSeats && <p><strong>Total Seats:</strong> {hist.totalSeats}</p>}
                  {hist.turnout && <p><strong>Voter Turnout:</strong> {hist.turnout}</p>}
                  {hist.winningAlliance && <p><strong>Winning Party/Alliance:</strong> <span style={{color: 'var(--primary)'}}>{hist.winningAlliance}</span></p>}
                  {hist.chiefMinister && <p><strong>Chief Minister:</strong> {hist.chiefMinister}</p>}
                  {hist.note && <p style={{fontStyle: 'italic', color: '#94a3b8', fontSize: '0.9rem', marginTop: '0.5rem'}}>{hist.note}</p>}
               </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  if (topic === 'booth') {
    return (
      <div className="content-view booth-view">
        <h2>{t.booth.title}</h2>
        <div className="glass-card" style={{textAlign: 'center', padding: '3rem 1rem'}}>
           <span aria-hidden="true" style={{fontSize: '3rem'}}>📍</span>
           <h3 style={{margin: '1rem 0'}}>Official Electoral Search</h3>
           <p style={{marginBottom: '2rem'}}>Search for your polling booth directly on the official Election Commission of India portal.</p>
           <a aria-label="Search on Official Electoral Search Website" href="https://electoralsearch.eci.gov.in/" target="_blank" rel="noopener noreferrer" className="btn" style={{display: 'inline-flex', textDecoration: 'none', padding: '1rem 2rem', fontSize: '1.2rem', background: 'var(--primary)'}}>
              👉 Search on Official Website
           </a>
           <div style={{marginTop: '2rem'}}>
              <button aria-label="Share Official Link via WhatsApp" className="btn btn-whatsapp" onClick={() => shareToWhatsApp(`🗳️ Find your Polling Booth and Voter Details at the Official ECI Portal: https://electoralsearch.eci.gov.in/`)}>
                 💬 Share Official Link via WhatsApp
              </button>
           </div>
        </div>
      </div>
    );
  }
  return <p aria-live="polite">Content coming soon for {topic}...</p>;
});

export default TopicContent;
