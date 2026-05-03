import { useState, useEffect, useRef } from 'react'
import { generateAIResponse } from './services/aiService'
import TopicContent from './components/TopicContent'
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
  const [apiKey, setApiKey] = useState(localStorage.getItem('gemini_api_key') || '')
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
    if (key.trim().length < 10) {
      alert("Please enter a valid API key.");
      return;
    }
    setApiKey(key.trim());
    localStorage.setItem('gemini_api_key', key.trim());
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

    const sanitizedInput = inputText.substring(0, 500).replace(/</g, "&lt;").replace(/>/g, "&gt;"); // Enforce max length and sanitize
    const userMessage = { role: 'user', content: sanitizedInput };
    setChatHistory(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    try {
      const responseText = await generateAIResponse({ apiKey, lang, userState, inputText: sanitizedInput });
      const botMessage = { role: 'bot', content: responseText };
      setChatHistory(prev => [...prev, botMessage]);
      speak(responseText);
    } catch (error) {
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

  return (
    <main className="chat-container">
      <button aria-label="Toggle Voice" className="voice-toggle" onClick={() => setVoiceEnabled(!voiceEnabled)}>
        {voiceEnabled ? '🔊 Voice On' : '🔇 Voice Off'}
      </button>

      <header className="logo-container">
        <h1>🇮🇳 Election Guide</h1>
        <p className="subtitle">Your digital assistant for Indian Democracy</p>
      </header>

      <section className="interaction-area">
        {step === 'LANGUAGE' && (
          <div className="message-group">
            <div className="message-bubble message-bot" role="status">
              <span aria-hidden="true">👋</span> Namaste! Please choose your preferred language to continue.
            </div>
            <div className="option-grid">
              {languages.map(l => (
                <button aria-label={`Select ${l.native} language`} key={l.code} className="btn btn-secondary" onClick={() => handleLangSelect(l.code)}>
                  {l.native}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 'STATE' && (
          <div className="message-group">
            <div className="message-bubble message-bot" role="status">
              {t.statePrompt}
            </div>
            <div className="option-grid" style={{maxHeight: '400px', overflowY: 'auto'}}>
              {states.map(s => (
                <button aria-label={`Select state ${s}`} key={s} className="btn btn-secondary" onClick={() => handleStateSelect(s)}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 'MENU' && (
          <div className="message-group">
            <div className="message-bubble message-bot" role="status">
              {t.topicPrompt} (State: {userState})
            </div>
            <nav className="option-grid" aria-label="Topics Menu">
              <button className="btn" style={{gridColumn: '1 / -1', background: 'var(--secondary)'}} onClick={() => setStep('AI_CHAT')}><span aria-hidden="true">🤖</span> Ask AI (Free Chat)</button>
              <button className="btn" onClick={() => handleTopicSelect('process')}>{t.topics.process}</button>
              <button className="btn" onClick={() => handleTopicSelect('registration')}>{t.topics.registration}</button>
              <button className="btn" onClick={() => handleTopicSelect('steps')}>{t.topics.steps}</button>
              <button className="btn" onClick={() => handleTopicSelect('faqs')}>{t.topics.faqs}</button>
              <button className="btn" onClick={() => handleTopicSelect('firstTime')}>{t.topics.firstTime}</button>
              <button className="btn" style={{gridColumn: '1 / -1'}} onClick={() => handleTopicSelect('timeline')}>{t.topics.timeline}</button>
              <button className="btn" style={{gridColumn: '1 / -1', background: 'var(--accent)'}} onClick={() => handleTopicSelect('booth')}>{t.topics.booth}</button>
            </nav>
          </div>
        )}

        {step === 'CONTENT' && (
          <div className="message-group">
            <div className="controls glass-card" style={{display: 'flex', gap: '1rem', marginBottom: '1rem', padding: '1rem'}} role="group" aria-label="Reading modes">
               <button aria-pressed={mode === 'normal'} className={`btn ${mode === 'normal' ? '' : 'btn-secondary'}`} onClick={() => setMode('normal')}>{t.modes.normal}</button>
               <button aria-pressed={mode === 'eli10'} className={`btn ${mode === 'eli10' ? '' : 'btn-secondary'}`} onClick={() => setMode('eli10')}>{t.modes.eli10}</button>
               <button aria-pressed={mode === 'summary'} className={`btn ${mode === 'summary' ? '' : 'btn-secondary'}`} onClick={() => setMode('summary')}>{t.modes.summary}</button>
            </div>
            <TopicContent 
              topic={topic} 
              t={t} 
              mode={mode} 
              userState={userState} 
              shareToWhatsApp={shareToWhatsApp} 
            />
          </div>
        )}

        {step === 'AI_CHAT' && (
          <div className="message-group" style={{width: '100%'}}>
            <div className="chat-history" aria-live="polite" aria-relevant="additions">
              {chatHistory.length === 0 && (
                <div className="message-bubble message-bot" style={{alignSelf: 'center', textAlign: 'center'}}>
                  <span aria-hidden="true">🤖</span> I am your AI Assistant powered by Gemini. Ask me anything about the Indian Election Process in your language!
                </div>
              )}
              {chatHistory.map((msg, idx) => (
                <div key={idx} className={`chat-message ${msg.role}`}>
                  {msg.content}
                </div>
              ))}
              {isTyping && <div className="typing-indicator" aria-live="polite">Assistant is typing...</div>}
              <div ref={chatEndRef} />
            </div>
            
            <div className="chat-input-container">
              <input 
                type="text" 
                className="chat-input"
                placeholder="Type your question here..."
                aria-label="Chat input"
                maxLength={500}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <button aria-label="Send Message" className="send-btn" onClick={handleSendMessage} disabled={isTyping || !inputText.trim()}>
                ➤
              </button>
            </div>
          </div>
        )}
      </section>

      <div className="mic-container">
        <button 
          aria-label="Voice Input"
          className={`mic-btn ${isListening ? 'listening' : ''}`} 
          onClick={startListening}
          title="Click to speak your choice"
        >
          🎤
        </button>
      </div>

      <nav className="nav-footer" style={{marginTop: '0rem', display: 'flex', gap: '1rem', justifyContent: 'center'}} aria-label="Footer Navigation">
        {step !== 'LANGUAGE' && (
          <button aria-label="Go Back" className="btn btn-secondary" onClick={goBack}><span aria-hidden="true">⬅️</span> Back</button>
        )}
        <button aria-label="Reset Application" className="btn btn-secondary" onClick={reset}><span aria-hidden="true">🔄</span> Reset</button>
        <button aria-label="Settings" className="btn btn-secondary" onClick={() => setShowSettings(true)}><span aria-hidden="true">⚙️</span> Settings</button>
      </nav>

      {showSettings && (
        <div className="modal-overlay" role="dialog" aria-labelledby="settings-title" aria-modal="true">
          <div className="modal-content">
            <h3 id="settings-title" style={{marginTop: 0, color: 'var(--primary)'}}><span aria-hidden="true">🤖</span> AI Configuration</h3>
            <p style={{fontSize: '0.9rem', color: '#94a3b8'}}>To use the free chat feature, please enter your Google Gemini API Key. It will be saved securely in your browser's local storage.</p>
            <input 
              type="password" 
              className="modal-input" 
              placeholder="Paste your API Key here"
              aria-label="API Key"
              defaultValue={apiKey}
              id="apiKeyInput"
            />
            <div style={{display: 'flex', gap: '1rem', marginTop: '1rem'}}>
              <button aria-label="Save API Key" className="btn" style={{flex: 1}} onClick={() => saveApiKey(document.getElementById('apiKeyInput').value)}>Save Key</button>
              <button aria-label="Cancel" className="btn btn-secondary" onClick={() => setShowSettings(false)}>Cancel</button>
            </div>
            <p style={{fontSize: '0.8rem', marginTop: '1.5rem', textAlign: 'center'}}>
              <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" style={{color: 'var(--secondary)'}}>Get a free API key here</a>
            </p>
          </div>
        </div>
      )}
    </main>
  )
}

export default App
