import { useState, useEffect, useRef } from 'react'
import { GoogleGenAI } from '@google/genai'
import { languages, states, translations } from './translations'
import { stateElectionData } from './stateData'

function App() {
  const [lang, setLang] = useState('en')
  const [step, setStep] = useState('LANGUAGE')
  const [userState, setUserState] = useState('')
  const [topic, setTopic] = useState('')
  const [mode, setMode] = useState('normal') // normal, eli10, summary
  const [voiceEnabled, setVoiceEnabled] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [chatHistory, setChatHistory] = useState([])
  const [inputText, setInputText] = useState('')
  const [showSettings, setShowSettings] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const chatEndRef = useRef(null)

  const t = translations[lang] || translations['en']

  // Auto-scroll chat
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatHistory, isTyping]);

  const saveApiKey = (key) => {
    setApiKey(key);
    localStorage.setItem('gemini_api_key', key);
    setShowSettings(false);
  }

  const shareToWhatsApp = (text) => {
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/?text=${encodedText}`, '_blank');
  }

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;
    if (!apiKey) {
      setShowSettings(true);
      return;
    }

    const userMessage = { role: 'user', content: inputText };
    setChatHistory(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: apiKey });
      const prompt = `You are a neutral, highly knowledgeable Election Guide Assistant for India. 
      The user is speaking in language code: ${lang}. State context: ${userState}.
      Answer the following question simply, factually, and without political bias. Do not use markdown headers, keep it conversational.
      User Question: ${inputText}`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      const botMessage = { role: 'bot', content: response.text };
      setChatHistory(prev => [...prev, botMessage]);
      speak(response.text);
    } catch (error) {
      console.error(error);
      const errorMsg = { role: 'bot', content: "Sorry, I had trouble connecting. Please check your API key and internet." };
      setChatHistory(prev => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  }

  const speak = (text) => {
    if (!voiceEnabled || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang === 'en' ? 'en-IN' : `${lang}-IN`;
    window.speechSynthesis.speak(utterance);
  }

  const stopSpeaking = () => {
    if (window.speechSynthesis) window.speechSynthesis.cancel();
  }

  useEffect(() => {
    if (!voiceEnabled) {
      stopSpeaking();
      return;
    }
    setTimeout(() => {
      if (step === 'LANGUAGE') speak("Namaste! Please choose your preferred language.");
      else if (step === 'STATE') speak(t.statePrompt);
      else if (step === 'MENU') speak(t.topicPrompt);
      else if (step === 'CONTENT') {
         if (topic === 'process') speak(t.process.title);
         else if (topic === 'registration') speak(t.registration.title);
         else if (topic === 'steps') speak(t.steps.title);
         else if (topic === 'firstTime') speak(t.firstTime.title);
         else if (topic === 'faqs') speak(t.faqs.title);
         else if (topic === 'booth') speak(t.booth.title);
      }
    }, 200);
  }, [step, topic, voiceEnabled, lang, t]);

  const handleVoiceCommand = (cmd) => {
    const c = cmd.toLowerCase();
    if (c.includes('back') || c.includes('पीछे') || c.includes('பின்னால்') || c.includes('వెనుక') || c.includes('ಹಿಂದೆ')) { goBack(); return; }
    if (c.includes('reset') || c.includes('रीसेट') || c.includes('மீட்டமை') || c.includes('రీసెట్') || c.includes('ಮರುಹೊಂದಿಸಿ')) { reset(); return; }

    if (step === 'LANGUAGE') {
      const matchedLang = languages.find(l => c.includes(l.name.toLowerCase()) || c.includes(l.native.toLowerCase()));
      if (matchedLang) handleLangSelect(matchedLang.code);
    } 
    else if (step === 'STATE') {
      const matchedState = states.find(s => c.includes(s.toLowerCase()));
      if (matchedState) handleStateSelect(matchedState);
    }
    else if (step === 'MENU') {
      if (c.includes('process') || c.includes('प्रक्रिया') || c.includes('செயல்முறை') || c.includes('ప్రక్రియ') || c.includes('ಪ್ರಕ್ರಿಯೆ')) handleTopicSelect('process');
      else if (c.includes('register') || c.includes('registration') || c.includes('पंजीकरण') || c.includes('பதிவு') || c.includes('నమోదు') || c.includes('ನೋಂದಣಿ')) handleTopicSelect('registration');
      else if (c.includes('step') || c.includes('चरण') || c.includes('முறைகள்') || c.includes('దశలు') || c.includes('ಹಂತಗಳು')) handleTopicSelect('steps');
      else if (c.includes('faq') || c.includes('question') || c.includes('प्रश्न') || c.includes('கேள்வி') || c.includes('ప్రశ్నలు') || c.includes('ಪ್ರಶ್ನೆಗಳು')) handleTopicSelect('faqs');
      else if (c.includes('first time') || c.includes('पहली बार') || c.includes('முதல் முறை') || c.includes('మొదటిసారి') || c.includes('ಮೊದಲ ಬಾರಿಯ')) handleTopicSelect('firstTime');
      else if (c.includes('timeline') || c.includes('history') || c.includes('इतिहास') || c.includes('வரலாறு') || c.includes('చరిత్ర') || c.includes('ಇತಿಹಾಸ')) handleTopicSelect('timeline');
      else if (c.includes('booth') || c.includes('केंद्र') || c.includes('வாக்குச்சாவடி') || c.includes('బూత్') || c.includes('ಮತಗಟ್ಟೆ')) handleTopicSelect('booth');
      else if (c.includes('chat') || c.includes('ai') || c.includes('ask') || c.includes('पूछें') || c.includes('கேள்')) setStep('AI_CHAT');
      else if (c.includes('share') || c.includes('whatsapp') || c.includes('साझा') || c.includes('பகிர்')) {
         if (topic === 'timeline' && stateElectionData[userState]) {
             shareToWhatsApp(`⏳ Reminder! The next ${stateElectionData[userState].upcoming.type} in ${userState} is expected in ${stateElectionData[userState].upcoming.expectedDate}. Check your voter status now!`);
         } else if (topic === 'registration') {
             shareToWhatsApp(`Register to vote online! Official Link: ${t.registration.actionLink?.url || 'https://voters.eci.gov.in/'}`);
         }
      }
    } else if (step === 'AI_CHAT') {
       setInputText(c);
       // We don't auto-send because it might need correction, but the input box is populated.
    }
  }

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice input is not supported in this browser. Please try Chrome or Edge.");
      return;
    }
    stopSpeaking();
    const recognition = new SpeechRecognition();
    recognition.lang = lang === 'en' ? 'en-IN' : `${lang}-IN`;
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      handleVoiceCommand(transcript);
    };

    try { recognition.start(); } catch (e) { setIsListening(false); }
  }

  const reset = () => {
    stopSpeaking();
    setStep('LANGUAGE')
    setLang('en')
    setUserState('')
    setTopic('')
    setMode('normal')
  }

  const goBack = () => {
    stopSpeaking();
    if (step === 'STATE') setStep('LANGUAGE')
    else if (step === 'MENU') setStep('STATE')
    else if (step === 'CONTENT' || step === 'AI_CHAT') setStep('MENU')
  }

  const handleLangSelect = (code) => {
    stopSpeaking();
    setLang(code)
    setStep('STATE')
  }

  const handleStateSelect = (name) => {
    stopSpeaking();
    setUserState(name)
    setStep('MENU')
  }

  const handleTopicSelect = (topicKey) => {
    stopSpeaking();
    setTopic(topicKey)
    setStep('CONTENT')
  }



  const renderContent = () => {
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
      )
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
              <button className="btn btn-whatsapp" onClick={() => shareToWhatsApp(`🗳️ Register to vote online! Official ECI Link: ${t.registration.actionLink?.url || 'https://voters.eci.gov.in/'}`)}>
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
      )
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
      )
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
      )
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
      )
    }
    if (topic === 'timeline') {
      const stateInfo = stateElectionData[userState];
      if (!stateInfo) {
        return (
          <div className="content-view">
            <h2>{userState} Election Data</h2>
            <div className="glass-card" style={{textAlign: 'center', padding: '3rem 1rem'}}>
               <span style={{fontSize: '3rem'}}>⏳</span>
               <h3>Data Updating...</h3>
               <p style={{color: '#94a3b8'}}>We are currently compiling the exact historical election records for {userState}. Please check back soon!</p>
            </div>
          </div>
        )
      }

      return (
        <div className="content-view timeline-view">
          <h2>{userState} Elections</h2>
          
          <div className="timeline-section upcoming-section glass-card" style={{borderLeft: '4px solid var(--accent)', marginBottom: '2rem'}}>
             <div className="badge pulse-badge">Upcoming</div>
             <h3 style={{marginTop: '0.5rem', color: 'var(--accent)'}}>{stateInfo.upcoming.expectedDate}</h3>
             <p>{stateInfo.upcoming.type}</p>
             <button className="btn btn-whatsapp" onClick={() => shareToWhatsApp(`⏳ Reminder! The next ${stateInfo.upcoming.type} in ${userState} is expected in ${stateInfo.upcoming.expectedDate}. Get ready to vote!`)} style={{marginTop: '1rem'}}>
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
      )
    }
    
    if (topic === 'booth') {
      return (
        <div className="content-view booth-view">
          <h2>{t.booth.title}</h2>
          <div className="glass-card" style={{textAlign: 'center', padding: '3rem 1rem'}}>
             <span style={{fontSize: '3rem'}}>📍</span>
             <h3 style={{margin: '1rem 0'}}>Official Electoral Search</h3>
             <p style={{marginBottom: '2rem'}}>Search for your polling booth directly on the official Election Commission of India portal.</p>
             <a href="https://electoralsearch.eci.gov.in/" target="_blank" rel="noopener noreferrer" className="btn" style={{display: 'inline-flex', textDecoration: 'none', padding: '1rem 2rem', fontSize: '1.2rem', background: 'var(--primary)'}}>
                👉 Search on Official Website
             </a>
             <div style={{marginTop: '2rem'}}>
                <button className="btn btn-whatsapp" onClick={() => shareToWhatsApp(`🗳️ Find your Polling Booth and Voter Details at the Official ECI Portal: https://electoralsearch.eci.gov.in/`)}>
                   💬 Share Official Link via WhatsApp
                </button>
             </div>
          </div>
        </div>
      )
    }
    return <p>Content coming soon for {topic}...</p>
  }

  return (
    <div className="chat-container">
      <button className="voice-toggle" onClick={() => setVoiceEnabled(!voiceEnabled)}>
        {voiceEnabled ? '🔊 Voice On' : '🔇 Voice Off'}
      </button>

      <div className="logo-container">
        <h1>🇮🇳 Election Guide</h1>
        <p className="subtitle">Your digital assistant for Indian Democracy</p>
      </div>

      <div className="interaction-area">
        {step === 'LANGUAGE' && (
          <div className="message-group">
            <div className="message-bubble message-bot">
              👋 Namaste! Please choose your preferred language to continue.
            </div>
            <div className="option-grid">
              {languages.map(l => (
                <button key={l.code} className="btn btn-secondary" onClick={() => handleLangSelect(l.code)}>
                  {l.native}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 'STATE' && (
          <div className="message-group">
            <div className="message-bubble message-bot">
              {t.statePrompt}
            </div>
            <div className="option-grid" style={{maxHeight: '400px', overflowY: 'auto'}}>
              {states.map(s => (
                <button key={s} className="btn btn-secondary" onClick={() => handleStateSelect(s)}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 'MENU' && (
          <div className="message-group">
            <div className="message-bubble message-bot">
              {t.topicPrompt} (State: {userState})
            </div>
            <div className="option-grid">
              <button className="btn" style={{gridColumn: '1 / -1', background: 'var(--secondary)'}} onClick={() => setStep('AI_CHAT')}>🤖 Ask AI (Free Chat)</button>
              <button className="btn" onClick={() => handleTopicSelect('process')}>{t.topics.process}</button>
              <button className="btn" onClick={() => handleTopicSelect('registration')}>{t.topics.registration}</button>
              <button className="btn" onClick={() => handleTopicSelect('steps')}>{t.topics.steps}</button>
              <button className="btn" onClick={() => handleTopicSelect('faqs')}>{t.topics.faqs}</button>
              <button className="btn" onClick={() => handleTopicSelect('firstTime')}>{t.topics.firstTime}</button>
              <button className="btn" style={{gridColumn: '1 / -1'}} onClick={() => handleTopicSelect('timeline')}>{t.topics.timeline}</button>
              <button className="btn" style={{gridColumn: '1 / -1', background: 'var(--accent)'}} onClick={() => handleTopicSelect('booth')}>{t.topics.booth}</button>
            </div>
          </div>
        )}

        {step === 'CONTENT' && (
          <div className="message-group">
            <div className="controls glass-card" style={{display: 'flex', gap: '1rem', marginBottom: '1rem', padding: '1rem'}}>
               <button className={`btn ${mode === 'normal' ? '' : 'btn-secondary'}`} onClick={() => setMode('normal')}>{t.modes.normal}</button>
               <button className={`btn ${mode === 'eli10' ? '' : 'btn-secondary'}`} onClick={() => setMode('eli10')}>{t.modes.eli10}</button>
               <button className={`btn ${mode === 'summary' ? '' : 'btn-secondary'}`} onClick={() => setMode('summary')}>{t.modes.summary}</button>
            </div>
            {renderContent()}
          </div>
        )}

        {step === 'AI_CHAT' && (
          <div className="message-group" style={{width: '100%'}}>
            <div className="chat-history">
              {chatHistory.length === 0 && (
                <div className="message-bubble message-bot" style={{alignSelf: 'center', textAlign: 'center'}}>
                  🤖 I am your AI Assistant powered by Gemini. Ask me anything about the Indian Election Process in your language!
                </div>
              )}
              {chatHistory.map((msg, idx) => (
                <div key={idx} className={`chat-message ${msg.role}`}>
                  {msg.content}
                </div>
              ))}
              {isTyping && <div className="typing-indicator">Assistant is typing...</div>}
              <div ref={chatEndRef} />
            </div>
            
            <div className="chat-input-container">
              <input 
                type="text" 
                className="chat-input"
                placeholder="Type your question here..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <button className="send-btn" onClick={handleSendMessage} disabled={isTyping || !inputText.trim()}>
                ➤
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="mic-container">
        <button 
          className={`mic-btn ${isListening ? 'listening' : ''}`} 
          onClick={startListening}
          title="Click to speak your choice"
        >
          🎤
        </button>
      </div>

      <div className="nav-footer" style={{marginTop: '0rem', display: 'flex', gap: '1rem', justifyContent: 'center'}}>
        {step !== 'LANGUAGE' && (
          <button className="btn btn-secondary" onClick={goBack}>⬅️ Back</button>
        )}
        <button className="btn btn-secondary" onClick={reset}>🔄 Reset</button>
        <button className="btn btn-secondary" onClick={() => setShowSettings(true)}>⚙️ Settings</button>
      </div>

      {showSettings && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 style={{marginTop: 0, color: 'var(--primary)'}}>🤖 AI Configuration</h3>
            <p style={{fontSize: '0.9rem', color: '#94a3b8'}}>To use the free chat feature, please enter your Google Gemini API Key. It will be saved securely in your browser.</p>
            <input 
              type="password" 
              className="modal-input" 
              placeholder="Paste your API Key here"
              defaultValue={apiKey}
              id="apiKeyInput"
            />
            <div style={{display: 'flex', gap: '1rem', marginTop: '1rem'}}>
              <button className="btn" style={{flex: 1}} onClick={() => saveApiKey(document.getElementById('apiKeyInput').value)}>Save Key</button>
              <button className="btn btn-secondary" onClick={() => setShowSettings(false)}>Cancel</button>
            </div>
            <p style={{fontSize: '0.8rem', marginTop: '1.5rem', textAlign: 'center'}}>
              <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" style={{color: 'var(--secondary)'}}>Get a free API key here</a>
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
