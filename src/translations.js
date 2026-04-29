export const languages = [
  { code: 'en', name: 'English', native: 'English' },
  { code: 'hi', name: 'Hindi', native: 'हिन्दी' },
  { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
  { code: 'te', name: 'Telugu', native: 'తెలుగు' },
  { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ' },
  { code: 'ml', name: 'Malayalam', native: 'മലയാളம்' },
  { code: 'bn', name: 'Bengali', native: 'বাংলা' },
  { code: 'mr', name: 'Marathi', native: 'मরাठी' },
  { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી' },
  { code: 'pa', name: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
  { code: 'or', name: 'Odia', native: 'ଓଡ଼ିଆ' },
  { code: 'as', name: 'Assamese', native: 'অসমীয়া' },
  { code: 'ur', name: 'Urdu', native: 'اردو' },
  { code: 'sa', name: 'Sanskrit', native: 'संस्कृतम्' },
  { code: 'kok', name: 'Konkani', native: 'कोंकणी' }
];

export const states = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", 
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", 
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", 
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", 
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
];

const baseTranslations = {
  en: {
    welcome: "Please choose your preferred language to begin your election education journey.",
    statePrompt: "Which state/UT are you from?",
    topicPrompt: "What would you like to learn today?",
    topics: {
      process: "Election Process",
      registration: "Voter Registration",
      steps: "Voting Steps",
      faqs: "FAQs",
      firstTime: "First-Time Voter Guide",
      timeline: "📅 Election Timeline & History",
      booth: "📍 Find Polling Booth"
    },
    process: {
      title: "The Election Process in India",
      phases: [
        { name: "Voter List Update", desc: "Citizens register or update their details in the electoral roll. This ensures everyone eligible can vote." },
        { name: "Notification & Nomination", desc: "The election is officially announced, and candidates file their nomination papers to run." },
        { name: "Scrutiny", desc: "Election officials verify the nomination papers to ensure candidates meet all legal requirements." },
        { name: "Campaigning Period", desc: "Candidates and parties share their ideas and promises with the public to win support." },
        { name: "Polling Day 🗳️", desc: "The most important day! Citizens visit booths to cast their secret ballots using EVMs." },
        { name: "Counting & Results", desc: "Votes are securely counted, and the candidate with the most votes is declared the winner." }
      ],
      disclaimer: "⚠️ Note: Exact dates and timelines vary by state and election cycle."
    },
    firstTime: {
      title: "First-Time Voter Guide",
      intro: "Welcome to Indian Democracy! Voting is your superpower. Here is how to use it:",
      steps: [
        { name: "Register as a Voter", desc: "If you are 18+, fill Form 6 on the NVSP portal or use the Voter Helpline App." },
        { name: "Get Your Voter ID", desc: "Once approved, you get a EPIC (Voter ID). You can also download an e-EPIC online." },
        { name: "Find Your Polling Booth", desc: "Check your name in the electoral roll and locate your assigned booth online." },
        { name: "Cast Your Vote", desc: "On polling day, take your ID to the booth, get your finger inked, and vote!" }
      ],
      actionLink: { text: "Register Online Here (Official Portal)", url: "https://voters.eci.gov.in/" },
      appLink: { text: "Voter Helpline App (Android)", url: "https://play.google.com/store/apps/details?id=com.eci.citizen" }
    },
    registration: {
      title: "Voter Registration Process",
      phases: [
        { name: "Eligibility Check", desc: "You must be an Indian citizen, 18 years or older as of Jan 1st of the revision year." },
        { name: "Form 6 Submission", desc: "Apply online at voters.eci.gov.in or through the Voter Helpline App." },
        { name: "Document Verification", desc: "Provide proof of age and proof of address." },
        { name: "Status Tracking", desc: "Track your application using the reference number." },
        { name: "EPIC Generation", desc: "Once verified, your Electors Photo Identity Card (EPIC) is generated." }
      ],
      actionLink: { text: "Register Online Here (Official Portal)", url: "https://voters.eci.gov.in/" },
      appLink: { text: "Voter Helpline App (Android)", url: "https://play.google.com/store/apps/details?id=com.eci.citizen" }
    },
    steps: {
      title: "Step-by-Step Voting Process",
      phases: [
        { name: "1. Polling Officer 1", desc: "Checks your name on the voter list and verifies your ID document." },
        { name: "2. Polling Officer 2", desc: "Inks your finger, gives you a slip, and takes your signature." },
        { name: "3. Polling Officer 3", desc: "Takes the slip and enables the EVM for your vote." },
        { name: "4. Voting Compartment", desc: "Press the blue button on the EVM. Wait for the beep sound." },
        { name: "5. VVPAT Verification", desc: "Check the printed slip in the VVPAT machine for 7 seconds." }
      ]
    },
    faqs: {
      title: "Common Election Questions",
      items: [
        { q: "What is NOTA?", a: "NOTA stands for 'None of the Above'. It allows you to reject all candidates if you don't like any." },
        { q: "Can I vote without a Voter ID card?", a: "Yes, if your name is in the voter list, you can use Aadhaar, PAN, or Passport as ID." },
        { q: "How do I check my Voter ID status?", a: "Visit voters.eci.gov.in and enter your EPIC number or personal details." }
      ]
    },
    booth: {
      title: "📍 Find Your Polling Booth",
      methodPrompt: "How would you like to search your polling booth?",
      epicOption: "1️⃣ Voter ID (EPIC)",
      detailsOption: "2️⃣ Name + DOB + State",
      epicPrompt: "Enter your Voter ID (EPIC number)",
      searchBtn: "Search Booth",
      namePrompt: "Full Name",
      dobPrompt: "Date of Birth",
      statePrompt: "State",
      errorMsg: "We couldn't find your polling booth locally. Please check your details or try the official website.",
      officialBtn: "👉 Official Electoral Search",
      resultTitle: "📍 Your Polling Booth Details",
      boothName: "🏫 Booth Name:",
      boothNum: "🔢 Booth Number:",
      address: "📍 Address:",
      constituency: "🗳️ Constituency:",
      mapBtn: "👉 Open in Maps"
    },
    modes: { eli10: "Child-Friendly", summary: "Quick Summary", normal: "Detailed" }
  },
  hi: {
    welcome: "अपनी चुनाव शिक्षा यात्रा शुरू करने के लिए कृपया अपनी पसंदीदा भाषा चुनें।",
    statePrompt: "आप किस राज्य/केंद्र शासित प्रदेश से हैं?",
    topicPrompt: "आज आप क्या सीखना चाहेंगे?",
    topics: {
      process: "चुनाव प्रक्रिया",
      registration: "मतदाता पंजीकरण",
      steps: "मतदान के चरण",
      faqs: "सामान्य प्रश्न",
      firstTime: "पहली बार मतदाता मार्गदर्शिका",
      timeline: "📅 चुनाव समयरेखा और इतिहास",
      booth: "📍 मतदान केंद्र खोजें"
    },
    process: {
      title: "भारत में चुनाव प्रक्रिया",
      phases: [
        { name: "मतदाता सूची अपडेट", desc: "नागरिक मतदाता सूची में अपना विवरण पंजीकृत या अपडेट करते हैं।" },
        { name: "अधिसूचना और नामांकन", desc: "चुनाव की घोषणा होती है और उम्मीदवार अपना नामांकन पत्र दाखिल करते हैं।" },
        { name: "जांच (Scrutiny)", desc: "अधिकारी नामांकन पत्रों की जांच करते हैं ताकि वे कानूनी आवश्यकताओं को पूरा करें।" },
        { name: "प्रचार अवधि", desc: "उम्मीदवार और दल जनता के साथ अपने विचार और वादे साझा करते हैं।" },
        { name: "मतदान का दिन 🗳️", desc: "नागरिक ईवीएम का उपयोग करके अपना वोट डालने के लिए मतदान केंद्रों पर जाते हैं।" },
        { name: "मतगणना और परिणाम", desc: "वोटों की गिनती की जाती है और विजेता की घोषणा की जाती है।" }
      ],
      disclaimer: "⚠️ नोट: सटीक तारीखें राज्य और चुनाव के अनुसार भिन्न हो सकती हैं।"
    },
    firstTime: {
      title: "पहली बार मतदाता मार्गदर्शिका",
      intro: "भारतीय लोकतंत्र में आपका स्वागत है! वोट देना आपकी महाशक्ति है।",
      steps: [
        { name: "मतदाता के रूप में पंजीकरण करें", desc: "NVSP पोर्टल पर फॉर्म 6 भरें या वोटर हेल्पलाइन ऐप का उपयोग करें।" },
        { name: "अपना वोटर आईडी प्राप्त करें", desc: "स्वीकृति के बाद, आपको EPIC (वोटर आईडी) प्राप्त होगा।" },
        { name: "अपना मतदान केंद्र खोजें", desc: "मतदाता सूची में अपना नाम जांचें और ऑनलाइन अपना बूथ खोजें।" },
        { name: "अपना वोट डालें", desc: "मतदान के दिन, आईडी लेकर बूथ पर जाएं और वोट दें!" }
      ],
      actionLink: { text: "यहां ऑनलाइन पंजीकरण करें (आधिकारिक पोर्टल)", url: "https://voters.eci.gov.in/" },
      appLink: { text: "वोटर हेल्पलाइन ऐप (Android)", url: "https://play.google.com/store/apps/details?id=com.eci.citizen" }
    },
    registration: {
      title: "मतदाता पंजीकरण प्रक्रिया",
      phases: [
        { name: "पात्रता (Eligibility)", desc: "आपको भारतीय नागरिक होना चाहिए, उम्र 18 वर्ष या उससे अधिक।" },
        { name: "फॉर्म 6 जमा करना", desc: "voters.eci.gov.in पर या वोटर हेल्पलाइन ऐप के माध्यम से ऑनलाइन आवेदन करें।" },
        { name: "दस्तावेज़ सत्यापन", desc: "आयु प्रमाण और पते का प्रमाण प्रदान करें।" },
        { name: "स्थिति जांचना", desc: "संदर्भ संख्या का उपयोग करके अपने आवेदन को ट्रैक करें।" },
        { name: "EPIC जनरेशन", desc: "सत्यापित होने के बाद, आपका वोटर आईडी (EPIC) जनरेट हो जाता है।" }
      ],
      actionLink: { text: "यहां ऑनलाइन पंजीकरण करें (आधिकारिक पोर्टल)", url: "https://voters.eci.gov.in/" },
      appLink: { text: "वोटर हेल्पलाइन ऐप (Android)", url: "https://play.google.com/store/apps/details?id=com.eci.citizen" }
    },
    steps: {
      title: "मतदान की चरण-दर-चरण प्रक्रिया",
      phases: [
        { name: "1. मतदान अधिकारी 1", desc: "मतदाता सूची में आपके नाम और आईडी की जांच करता है।" },
        { name: "2. मतदान अधिकारी 2", desc: "आपकी उंगली पर स्याही लगाता है, एक पर्ची देता है, और हस्ताक्षर लेता है।" },
        { name: "3. मतदान अधिकारी 3", desc: "पर्ची लेता है और आपके वोट के लिए ईवीएम चालू करता है।" },
        { name: "4. वोटिंग कम्पार्टमेंट", desc: "ईवीएम पर नीला बटन दबाएं और बीप की आवाज का इंतजार करें।" },
        { name: "5. वीवीपीएटी (VVPAT)", desc: "पुष्टि करने के लिए वीवीपीएटी मशीन में छपी हुई पर्ची को 7 सेकंड तक देखें।" }
      ]
    },
    faqs: {
      title: "सामान्य चुनाव प्रश्न",
      items: [
        { q: "नोटा (NOTA) क्या है?", a: "यह आपको सभी उम्मीदवारों को अस्वीकार करने का विकल्प देता है।" },
        { q: "क्या मैं वोटर आईडी कार्ड के बिना वोट दे सकता हूं?", a: "हाँ, यदि आपका नाम सूची में है, तो आप आधार या पैन का उपयोग कर सकते हैं।" },
        { q: "मैं अपना वोटर आईडी स्टेटस कैसे देखूं?", a: "voters.eci.gov.in पर जाएं और अपना विवरण दर्ज करें।" }
      ]
    },
    booth: {
      title: "📍 अपना मतदान केंद्र खोजें",
      methodPrompt: "आप अपना मतदान केंद्र कैसे खोजना चाहेंगे?",
      epicOption: "1️⃣ वोटर आईडी (EPIC)",
      detailsOption: "2️⃣ नाम + जन्म तिथि + राज्य",
      epicPrompt: "अपना वोटर आईडी दर्ज करें",
      searchBtn: "केंद्र खोजें",
      namePrompt: "पूरा नाम",
      dobPrompt: "जन्म तिथि",
      statePrompt: "राज्य",
      errorMsg: "हम आपका मतदान केंद्र स्थानीय रूप से नहीं खोज सके। कृपया आधिकारिक वेबसाइट देखें।",
      officialBtn: "👉 आधिकारिक खोज",
      resultTitle: "📍 आपके मतदान केंद्र का विवरण",
      boothName: "🏫 केंद्र का नाम:",
      boothNum: "🔢 केंद्र संख्या:",
      address: "📍 पता:",
      constituency: "🗳️ निर्वाचन क्षेत्र:",
      mapBtn: "👉 मैप्स में खोलें"
    },
    modes: { eli10: "बच्चों के लिए सरल", summary: "त्वरित सारांश", normal: "विस्तृत" }
  },
  ta: {
    welcome: "உங்கள் தேர்தல் கல்விப் பயணத்தைத் தொடங்க உங்களுக்கு விருப்பமான மொழியைத் தேர்ந்தெடுக்கவும்.",
    statePrompt: "நீங்கள் எந்த மாநிலம்/யூனியன் பிரதேசத்தைச் சேர்ந்தவர்?",
    topicPrompt: "இன்று நீங்கள் எதைப் பற்றி அறிய விரும்புகிறீர்கள்?",
    topics: {
      process: "தேர்தல் செயல்முறை",
      registration: "வாக்காளர் பதிவு",
      steps: "வாக்களிக்கும் முறைகள்",
      faqs: "கேள்வி பதில்",
      firstTime: "முதல் முறை வாக்காளர் வழிகாட்டி",
      timeline: "📅 தேர்தல் காலவரிசை மற்றும் வரலாறு",
      booth: "📍 வாக்குச்சாவடியைக் கண்டறியவும்"
    },
    process: {
      title: "இந்தியாவில் தேர்தல் செயல்முறை",
      phases: [
        { name: "வாக்காளர் பட்டியல் புதுப்பிப்பு", desc: "வாக்காளர் பட்டியலில் குடிமக்கள் தங்கள் விவரங்களைப் பதிவு செய்கிறார்கள் அல்லது புதுப்பிக்கிறார்கள்." },
        { name: "அறிவிப்பு மற்றும் வேட்புமனு", desc: "தேர்தல் அறிவிக்கப்பட்டு, வேட்பாளர்கள் தங்கள் வேட்புமனுக்களைத் தாக்கல் செய்கிறார்கள்." },
        { name: "சரிபார்ப்பு (Scrutiny)", desc: "வேட்புமனுக்கள் சட்டப்பூர்வமாக சரியாக உள்ளதா என்று அதிகாரிகள் சரிபார்க்கிறார்கள்." },
        { name: "பிரச்சார காலம்", desc: "வேட்பாளர்கள் தங்கள் வாக்குறுதிகளை மக்களிடம் பகிர்ந்து கொள்கிறார்கள்." },
        { name: "வாக்குப்பதிவு நாள் 🗳️", desc: "குடிமக்கள் வாக்குச்சாவடிகளுக்குச் சென்று தங்கள் வாக்குகளைப் பதிவு செய்கிறார்கள்." },
        { name: "எண்ணிக்கை மற்றும் முடிவுகள்", desc: "வாக்குகள் எண்ணப்பட்டு, வெற்றி பெற்றவர் அறிவிக்கப்படுகிறார்." }
      ],
      disclaimer: "⚠️ குறிப்பு: தேதிகள் மாநிலத்திற்கு மாநிலம் மாறுபடலாம்."
    },
    firstTime: {
      title: "முதல் முறை வாக்காளர் வழிகாட்டி",
      intro: "இந்திய ஜனநாயகத்திற்கு வரவேற்கிறோம்! வாக்களிப்பது உங்கள் உரிமை.",
      steps: [
        { name: "வாக்காளராகப் பதிவு செய்யுங்கள்", desc: "NVSP இணையதளத்தில் படிவம் 6-ஐப் பூர்த்தி செய்யவும்." },
        { name: "வாக்காளர் அடையாள அட்டை", desc: "உங்களுக்கு EPIC அட்டை வழங்கப்படும்." },
        { name: "வாக்குச்சாவடியைக் கண்டறியவும்", desc: "ஆன்லைனில் உங்கள் வாக்குச்சாவடியைச் சரிபார்க்கவும்." },
        { name: "வாக்களிக்கவும்", desc: "வாக்குப்பதிவு நாளில் அடையாள அட்டையுடன் சென்று வாக்களிக்கவும்!" }
      ],
      actionLink: { text: "ஆன்லைனில் பதிவு செய்ய (அதிகாரப்பூர்வ தளம்)", url: "https://voters.eci.gov.in/" },
      appLink: { text: "வாக்காளர் உதவிச் செயலி (Android)", url: "https://play.google.com/store/apps/details?id=com.eci.citizen" }
    },
    registration: {
      title: "வாக்காளர் பதிவு முறை",
      phases: [
        { name: "தகுதி", desc: "நீங்கள் 18 வயது நிரம்பிய இந்தியக் குடிமகனாக இருக்க வேண்டும்." },
        { name: "படிவம் 6", desc: "voters.eci.gov.in மூலம் ஆன்லைனில் விண்ணப்பிக்கவும்." },
        { name: "ஆவணங்கள்", desc: "வயது மற்றும் முகவரி சான்றுகளை சமர்ப்பிக்கவும்." },
        { name: "நிலை அறிதல்", desc: "குறிப்பு எண்ணைப் பயன்படுத்தி விண்ணப்பத்தின் நிலையை அறியலாம்." },
        { name: "அடையாள அட்டை", desc: "சரிபார்க்கப்பட்ட பின் உங்கள் வாக்காளர் அட்டை (EPIC) வழங்கப்படும்." }
      ],
      actionLink: { text: "ஆன்லைனில் பதிவு செய்ய (அதிகாரப்பூர்வ தளம்)", url: "https://voters.eci.gov.in/" },
      appLink: { text: "வாக்காளர் உதவிச் செயலி (Android)", url: "https://play.google.com/store/apps/details?id=com.eci.citizen" }
    },
    steps: {
      title: "வாக்களிக்கும் முறைகள்",
      phases: [
        { name: "1. அதிகாரி 1", desc: "உங்கள் பெயர் மற்றும் அடையாள அட்டையைச் சரிபார்ப்பார்." },
        { name: "2. அதிகாரி 2", desc: "விரலில் மை வைத்து, கையொப்பம் பெறுவார்." },
        { name: "3. அதிகாரி 3", desc: "EVM இயந்திரத்தை வாக்களிக்கத் தயார் செய்வார்." },
        { name: "4. வாக்களித்தல்", desc: "EVM இல் நீல நிற பொத்தானை அழுத்தவும்." },
        { name: "5. VVPAT", desc: "7 வினாடிகள் VVPAT இயந்திரத்தில் நீங்கள் வாக்களித்ததை உறுதி செய்யலாம்." }
      ]
    },
    faqs: {
      title: "பொதுவான கேள்விகள்",
      items: [
        { q: "நோட்டா (NOTA) என்றால் என்ன?", a: "எந்த வேட்பாளரையும் பிடிக்கவில்லை என்றால் அதைத் தேர்ந்தெடுக்கலாம்." },
        { q: "அடையாள அட்டை இல்லாமல் வாக்களிக்க முடியுமா?", a: "ஆம், பட்டியலில் பெயர் இருந்தால் ஆதார் அட்டையைப் பயன்படுத்தலாம்." },
        { q: "நிலையை எவ்வாறு சரிபார்ப்பது?", a: "voters.eci.gov.in இணையதளத்தைப் பார்வையிடவும்." }
      ]
    },
    booth: {
      title: "📍 உங்கள் வாக்குச்சாவடியைக் கண்டறியவும்",
      methodPrompt: "உங்கள் வாக்குச்சாவடியை எவ்வாறு தேட விரும்புகிறீர்கள்?",
      epicOption: "1️⃣ வாக்காளர் அடையாள அட்டை (EPIC)",
      detailsOption: "2️⃣ பெயர் + பிறந்த தேதி + மாநிலம்",
      epicPrompt: "உங்கள் வாக்காளர் அடையாள எண்ணை உள்ளிடவும்",
      searchBtn: "தேடு",
      namePrompt: "முழு பெயர்",
      dobPrompt: "பிறந்த தேதி",
      statePrompt: "மாநிலம்",
      errorMsg: "உங்கள் வாக்குச்சாவடியை எங்களால் கண்டறிய முடியவில்லை. தயவுசெய்து அதிகாரப்பூர்வ இணையதளத்தைப் பார்க்கவும்.",
      officialBtn: "👉 அதிகாரப்பூர்வ தேடல்",
      resultTitle: "📍 உங்கள் வாக்குச்சாவடி விவரங்கள்",
      boothName: "🏫 வாக்குச்சாவடி பெயர்:",
      boothNum: "🔢 வாக்குச்சாவடி எண்:",
      address: "📍 முகவரி:",
      constituency: "🗳️ தொகுதி:",
      mapBtn: "👉 வரைபடத்தில் திறக்க"
    },
    modes: { eli10: "குழந்தைகளுக்கான எளிய முறை", summary: "சுருக்கம்", normal: "விரிவானது" }
  },
  te: {
    welcome: "మీ ఎన్నికల విద్యా ప్రయాణాన్ని ప్రారంభించడానికి దయచేసి మీకు ఇష్టమైన భాషను ఎంచుకోండి.",
    statePrompt: "మీరు ఏ రాష్ట్రం/కేంద్రపాలిత ప్రాంతానికి చెందినవారు?",
    topicPrompt: "ఈరోజు మీరు ఏం నేర్చుకోవాలనుకుంటున్నారు?",
    topics: {
      process: "ఎన్నికల ప్రక్రియ",
      registration: "ఓటరు నమోదు",
      steps: "ఓటింగ్ దశలు",
      faqs: "ప్రశ్నలు-సమాధానాలు",
      firstTime: "మొదటిసారి ఓటరు గైడ్",
      timeline: "📅 ఎన్నికల కాలక్రమం మరియు చరిత్ర",
      booth: "📍 పోలింగ్ కేంద్రాన్ని కనుగొనండి"
    },
    process: {
      title: "భారతదేశంలో ఎన్నికల ప్రక్రియ",
      phases: [
        { name: "ఓటరు జాబితా అప్‌డేట్", desc: "పౌరులు ఓటరు జాబితాలో తమ వివరాలను నమోదు చేసుకుంటారు లేదా అప్‌డేట్ చేస్తారు." },
        { name: "నోటిఫికేషన్ & నామినేషన్", desc: "ఎన్నికల ప్రకటన వస్తుంది మరియు అభ్యర్థులు నామినేషన్ దాఖలు చేస్తారు." },
        { name: "పరిశీలన (Scrutiny)", desc: "అధికారులు నామినేషన్ పత్రాలను పరిశీలిస్తారు." },
        { name: "ప్రచార కాలం", desc: "అభ్యర్థులు మరియు పార్టీలు తమ వాగ్దానాలను ప్రజలకు వివరిస్తారు." },
        { name: "పోలింగ్ రోజు 🗳️", desc: "పౌరులు పోలింగ్ కేంద్రాలకు వెళ్లి తమ ఓటు వేస్తారు." },
        { name: "కౌంటింగ్ & ఫలితాలు", desc: "ఓట్లను లెక్కించి విజేతను ప్రకటిస్తారు." }
      ],
      disclaimer: "⚠️ గమనిక: తేదీలు రాష్ట్రం మరియు ఎన్నికలను బట్టి మారవచ్చు."
    },
    firstTime: {
      title: "మొదటిసారి ఓటరు గైడ్",
      intro: "భారత ప్రజాస్వామ్యానికి స్వాగతం! ఓటు వేయడం మీ శక్తి.",
      steps: [
        { name: "ఓటరుగా నమోదు చేసుకోండి", desc: "NVSP పోర్టల్‌లో ఫారమ్ 6 నింపండి." },
        { name: "ఓటరు ఐడి పొందండి", desc: "మీకు EPIC కార్డ్ జారీ చేయబడుతుంది." },
        { name: "పోలింగ్ కేంద్రాన్ని కనుగొనండి", desc: "ఆన్‌లైన్‌లో మీ బూత్‌ను తనిఖీ చేయండి." },
        { name: "ఓటు వేయండి", desc: "ఓటింగ్ రోజున ఐడితో వెళ్లి ఓటు వేయండి!" }
      ],
      actionLink: { text: "ఆన్‌లైన్‌లో ఇక్కడ నమోదు చేసుకోండి (అధికారిక పోర్టల్)", url: "https://voters.eci.gov.in/" },
      appLink: { text: "ఓటరు హెల్ప్‌లైన్ యాప్ (Android)", url: "https://play.google.com/store/apps/details?id=com.eci.citizen" }
    },
    registration: {
      title: "ఓటరు నమోదు ప్రక్రియ",
      phases: [
        { name: "అర్హత", desc: "మీరు 18 ఏళ్లు పైబడిన భారతీయ పౌరుడై ఉండాలి." },
        { name: "ఫారమ్ 6 సమర్పణ", desc: "voters.eci.gov.in ద్వారా ఆన్‌లైన్‌లో దరఖాస్తు చేయండి." },
        { name: "పత్రాల ధృవీకరణ", desc: "వయస్సు మరియు చిరునామా రుజువును అందించండి." },
        { name: "స్థితి ట్రాకింగ్", desc: "రిఫరెన్స్ నంబర్‌తో మీ దరఖాస్తును ట్రాక్ చేయండి." },
        { name: "కార్డ్ జారీ", desc: "ధృవీకరించిన తర్వాత మీ ఓటరు కార్డు (EPIC) జారీ చేయబడుతుంది." }
      ],
      actionLink: { text: "ఆన్‌లైన్‌లో ఇక్కడ నమోదు చేసుకోండి (అధికారిక పోర్టల్)", url: "https://voters.eci.gov.in/" },
      appLink: { text: "ఓటరు హెల్ప్‌లైన్ యాప్ (Android)", url: "https://play.google.com/store/apps/details?id=com.eci.citizen" }
    },
    steps: {
      title: "ఓటింగ్ దశలు",
      phases: [
        { name: "1. అధికారి 1", desc: "జాబితాలో మీ పేరును మరియు ఐడి పత్రాన్ని తనిఖీ చేస్తారు." },
        { name: "2. అధికారి 2", desc: "వేలికి సిరా పెట్టి, సంతకం తీసుకుంటారు." },
        { name: "3. అధికారి 3", desc: "మీరు ఓటు వేయడానికి EVM ను ఆన్ చేస్తారు." },
        { name: "4. ఓటింగ్ గది", desc: "EVM లో నీలిరంగు బటన్‌ను నొక్కండి." },
        { name: "5. VVPAT", desc: "VVPAT యంత్రంలో 7 సెకన్ల పాటు మీ ఓటును ధృవీకరించుకోండి." }
      ]
    },
    faqs: {
      title: "సాధారణ ప్రశ్నలు",
      items: [
        { q: "నోటా (NOTA) అంటే ఏమిటి?", a: "ఏ అభ్యర్థి నచ్చకపోతే దీన్ని ఎంచుకోవచ్చు." },
        { q: "ఓటరు ఐడి లేకపోయినా ఓటు వేయవచ్చా?", a: "అవును, ఓటరు జాబితాలో పేరుంటే ఆధార్‌తో ఓటు వేయవచ్చు." },
        { q: "స్టేటస్ ఎలా చూడాలి?", a: "voters.eci.gov.in సందర్శించండి." }
      ]
    },
    booth: {
      title: "📍 మీ పోలింగ్ కేంద్రాన్ని కనుగొనండి",
      methodPrompt: "మీరు మీ పోలింగ్ కేంద్రాన్ని ఎలా శోధించాలనుకుంటున్నారు?",
      epicOption: "1️⃣ ఓటరు ID (EPIC)",
      detailsOption: "2️⃣ పేరు + పుట్టిన తేదీ + రాష్ట్రం",
      epicPrompt: "మీ ఓటరు ID ని నమోదు చేయండి",
      searchBtn: "శోధించండి",
      namePrompt: "పూర్తి పేరు",
      dobPrompt: "పుట్టిన తేదీ",
      statePrompt: "రాష్ట్రం",
      errorMsg: "మేము మీ పోలింగ్ కేంద్రాన్ని కనుగొనలేకపోయాము. దయచేసి అధికారిక వెబ్‌సైట్‌ను తనిఖీ చేయండి.",
      officialBtn: "👉 అధికారిక శోధన",
      resultTitle: "📍 మీ పోలింగ్ కేంద్రం వివరాలు",
      boothName: "🏫 బూత్ పేరు:",
      boothNum: "🔢 బూత్ నంబర్:",
      address: "📍 చిరునామా:",
      constituency: "🗳️ నియోజకవర్గం:",
      mapBtn: "👉 మ్యాప్స్‌లో తెరవండి"
    },
    modes: { eli10: "పిల్లల కోసం సరళంగా", summary: "క్లుప్త వివరణ", normal: "వివరణాత్మక" }
  },
  kn: {
    welcome: "ಚುನಾವಣಾ ಶಿಕ್ಷಣದ ಪ್ರಯಾಣವನ್ನು ಪ್ರಾರಂಭಿಸಲು ದಯವಿಟ್ಟು ನಿಮ್ಮ ಭಾಷೆಯನ್ನು ಆರಿಸಿ.",
    statePrompt: "ನೀವು ಯಾವ ರಾಜ್ಯದವರು?",
    topicPrompt: "ನೀವು ಏನು ಕಲಿಯಲು ಬಯಸುತ್ತೀರಿ?",
    topics: {
      process: "ಚುನಾವಣಾ ಪ್ರಕ್ರಿಯೆ",
      registration: "ಮತದಾರರ ನೋಂದಣಿ",
      steps: "ಮತದಾನದ ಹಂತಗಳು",
      faqs: "ಪ್ರಶ್ನೋತ್ತರ",
      firstTime: "ಮೊದಲ ಬಾರಿಯ ಮತದಾರರ ಮಾರ್ಗದರ್ಶಿ",
      timeline: "📅 ಚುನಾವಣಾ ಟೈಮ್‌ಲೈನ್ ಮತ್ತು ಇತಿಹಾಸ",
      booth: "📍 ಮತಗಟ್ಟೆ ಹುಡುಕಿ"
    },
    process: {
      title: "ಭಾರತದಲ್ಲಿ ಚುನಾವಣಾ ಪ್ರಕ್ರಿಯೆ",
      phases: [
        { name: "ಮತದಾರರ ಪಟ್ಟಿ ನವೀಕರಣ", desc: "ಮತದಾರರ ಪಟ್ಟಿಯಲ್ಲಿ ಹೆಸರು ನೋಂದಾಯಿಸುವ ಪ್ರಕ್ರಿಯೆ." },
        { name: "ಅಧಿಸೂಚನೆ ಮತ್ತು ನಾಮನಿರ್ದೇಶನ", desc: "ಚುನಾವಣಾ ಪ್ರಕಟಣೆ ಮತ್ತು ಅಭ್ಯರ್ಥಿಗಳಿಂದ ನಾಮಪತ್ರ ಸಲ್ಲಿಕೆ." },
        { name: "ಪರಿಶೀಲನೆ (Scrutiny)", desc: "ನಾಮಪತ್ರಗಳ ಕಾನೂನುಬದ್ಧ ಪರಿಶೀಲನೆ." },
        { name: "ಪ್ರಚಾರದ ಅವಧಿ", desc: "ಅಭ್ಯರ್ಥಿಗಳಿಂದ ಮತದಾರರ ಮನವೊಲಿಸುವ ಪ್ರಕ್ರಿಯೆ." },
        { name: "ಮತದಾನದ ದಿನ 🗳️", desc: "ಮತಗಟ್ಟೆಗೆ ಹೋಗಿ ಮತ ಚಲಾಯಿಸುವ ದಿನ." },
        { name: "ಮತ ಎಣಿಕೆ ಮತ್ತು ಫಲಿತಾಂಶ", desc: "ಮತಗಳ ಎಣಿಕೆ ಮತ್ತು ವಿಜೇತರ ಘೋಷಣೆ." }
      ],
      disclaimer: "⚠️ ಗಮನಿಸಿ: ದಿನಾಂಕಗಳು ಬದಲಾಗಬಹುದು."
    },
    firstTime: {
      title: "ಮೊದಲ ಬಾರಿಯ ಮತದಾರರ ಮಾರ್ಗದರ್ಶಿ",
      intro: "ಭಾರತೀಯ ಪ್ರಜಾಪ್ರಭುತ್ವಕ್ಕೆ ಸ್ವಾಗತ!",
      steps: [
        { name: "ನೋಂದಣಿ ಮಾಡಿ", desc: "NVSP ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ಫಾರ್ಮ್ 6 ಭರ್ತಿ ಮಾಡಿ." },
        { name: "ಮತದಾರರ ಚೀಟಿ", desc: "ನಿಮ್ಮ EPIC ಕಾರ್ಡ್ ಪಡೆಯಿರಿ." },
        { name: "ಮತಗಟ್ಟೆ ತಿಳಿಯಿರಿ", desc: "ನಿಮ್ಮ ಮತಗಟ್ಟೆಯನ್ನು ಆನ್‌ಲೈನ್‌ನಲ್ಲಿ ಹುಡುಕಿ." },
        { name: "ಮತದಾನ ಮಾಡಿ", desc: "ಗುರುತಿನ ಚೀಟಿಯೊಂದಿಗೆ ಮತಗಟ್ಟೆಗೆ ಹೋಗಿ ಮತ ಹಾಕಿ." }
      ],
      actionLink: { text: "ಆನ್‌ಲೈನ್‌ನಲ್ಲಿ ನೋಂದಾಯಿಸಿ (ಅಧಿಕೃತ ಪೋರ್ಟಲ್)", url: "https://voters.eci.gov.in/" },
      appLink: { text: "ಮತದಾರರ ಸಹಾಯವಾಣಿ ಆಪ್ (Android)", url: "https://play.google.com/store/apps/details?id=com.eci.citizen" }
    },
    registration: {
      title: "ಮತದಾರರ ನೋಂದಣಿ ಪ್ರಕ್ರಿಯೆ",
      phases: [
        { name: "ಅರ್ಹತೆ", desc: "ನೀವು 18 ವರ್ಷ ಮೇಲ್ಪಟ್ಟ ಭಾರತೀಯ ಪ್ರಜೆಯಾಗಿರಬೇಕು." },
        { name: "ಫಾರ್ಮ್ 6 ಸಲ್ಲಿಕೆ", desc: "voters.eci.gov.in ಮೂಲಕ ಆನ್‌ಲೈನ್‌ನಲ್ಲಿ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ." },
        { name: "ದಾಖಲೆಗಳ ಪರಿಶೀಲನೆ", desc: "ವಯಸ್ಸು ಮತ್ತು ವಿಳಾಸದ ಪುರಾವೆಗಳನ್ನು ಒದಗಿಸಿ." },
        { name: "ಅರ್ಜಿ ಸ್ಥಿತಿ", desc: "ಉಲ್ಲೇಖ ಸಂಖ್ಯೆಯನ್ನು ಬಳಸಿ ಅರ್ಜಿಯನ್ನು ಪರಿಶೀಲಿಸಿ." },
        { name: "ಕಾರ್ಡ್ ವಿತರಣೆ", desc: "ಪರಿಶೀಲನೆಯ ನಂತರ ಮತದಾರರ ಚೀಟಿ (EPIC) ನೀಡಲಾಗುತ್ತದೆ." }
      ],
      actionLink: { text: "ಆನ್‌ಲೈನ್‌ನಲ್ಲಿ ನೋಂದಾಯಿಸಿ (ಅಧಿಕೃತ ಪೋರ್ಟಲ್)", url: "https://voters.eci.gov.in/" },
      appLink: { text: "ಮತದಾರರ ಸಹಾಯವಾಣಿ ಆಪ್ (Android)", url: "https://play.google.com/store/apps/details?id=com.eci.citizen" }
    },
    steps: {
      title: "ಮತದಾನದ ಹಂತಗಳು",
      phases: [
        { name: "1. ಅಧಿಕಾರಿ 1", desc: "ಪಟ್ಟಿಯಲ್ಲಿ ನಿಮ್ಮ ಹೆಸರು ಮತ್ತು ಗುರುತಿನ ಚೀಟಿಯನ್ನು ಪರಿಶೀಲಿಸುತ್ತಾರೆ." },
        { name: "2. ಅಧಿಕಾರಿ 2", desc: "ಬೆರಳಿಗೆ ಶಾಯಿ ಹಾಕಿ ಸಹಿ ಪಡೆಯುತ್ತಾರೆ." },
        { name: "3. ಅಧಿಕಾರಿ 3", desc: "ಮತದಾನ ಮಾಡಲು ಇವಿಎಂ ಆನ್ ಮಾಡುತ್ತಾರೆ." },
        { name: "4. ಮತದಾನ ಕೊಠಡಿ", desc: "ಇವಿಎಂ ನಲ್ಲಿ ನೀಲಿ ಗುಂಡಿಯನ್ನು ಒತ್ತಿ." },
        { name: "5. VVPAT", desc: "VVPAT ಯಂತ್ರದಲ್ಲಿ 7 ಸೆಕೆಂಡುಗಳ ಕಾಲ ನಿಮ್ಮ ಮತವನ್ನು ದೃಢೀಕರಿಸಿ." }
      ]
    },
    faqs: {
      title: "ಸಾಮಾನ್ಯ ಪ್ರಶ್ನೆಗಳು",
      items: [
        { q: "ನೋಟಾ (NOTA) ಎಂದರೇನು?", a: "ಯಾವುದೇ ಅಭ್ಯರ್ಥಿ ಇಷ್ಟವಾಗದಿದ್ದರೆ ಈ ಆಯ್ಕೆ ಬಳಸಬಹುದು." },
        { q: "ಗುರುತಿನ ಚೀಟಿ ಇಲ್ಲದೆ ಮತ ಹಾಕಬಹುದೇ?", a: "ಹೌದು, ಪಟ್ಟಿಯಲ್ಲಿ ಹೆಸರಿದ್ದರೆ ಆಧಾರ್ ಬಳಸಬಹುದು." },
        { q: "ಸ್ಥಿತಿ ತಿಳಿಯುವುದು ಹೇಗೆ?", a: "voters.eci.gov.in ನೋಡಿ." }
      ]
    },
    booth: {
      title: "📍 ನಿಮ್ಮ ಮತಗಟ್ಟೆಯನ್ನು ಹುಡುಕಿ",
      methodPrompt: "ನಿಮ್ಮ ಮತಗಟ್ಟೆಯನ್ನು ಹೇಗೆ ಹುಡುಕಲು ಬಯಸುತ್ತೀರಿ?",
      epicOption: "1️⃣ ಮತದಾರರ ಗುರುತಿನ ಚೀಟಿ (EPIC)",
      detailsOption: "2️⃣ ಹೆಸರು + ಜನ್ಮ ದಿನಾಂಕ + ರಾಜ್ಯ",
      epicPrompt: "ನಿಮ್ಮ ಮತದಾರರ ಗುರುತಿನ ಚೀಟಿ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ",
      searchBtn: "ಹುಡುಕಿ",
      namePrompt: "ಪೂರ್ಣ ಹೆಸರು",
      dobPrompt: "ಜನ್ಮ ದಿನಾಂಕ",
      statePrompt: "ರಾಜ್ಯ",
      errorMsg: "ನಿಮ್ಮ ಮತಗಟ್ಟೆಯನ್ನು ಹುಡುಕಲು ನಮಗೆ ಸಾಧ್ಯವಾಗಲಿಲ್ಲ. ದಯವಿಟ್ಟು ಅಧಿಕೃತ ವೆಬ್‌ಸೈಟ್ ಪರಿಶೀಲಿಸಿ.",
      officialBtn: "👉 ಅಧಿಕೃತ ಹುಡುಕಾಟ",
      resultTitle: "📍 ನಿಮ್ಮ ಮತಗಟ್ಟೆಯ ವಿವರಗಳು",
      boothName: "🏫 ಮತಗಟ್ಟೆ ಹೆಸರು:",
      boothNum: "🔢 ಮತಗಟ್ಟೆ ಸಂಖ್ಯೆ:",
      address: "📍 ವಿಳಾಸ:",
      constituency: "🗳️ ಕ್ಷೇತ್ರ:",
      mapBtn: "👉 ಮ್ಯಾಪ್‌ನಲ್ಲಿ ತೆರೆಯಿರಿ"
    },
    modes: { eli10: "ಮಕ್ಕಳಿಗಾಗಿ ಸರಳ", summary: "ಸಂಕ್ಷಿಪ್ತ", normal: "ವಿವರವಾದ" }
  },
  // Adding more languages iteratively...
};

// Fill in other requested languages with English fallback if needed, but I'll provide the structures
export const translations = {
  ...baseTranslations,
  ml: { ...baseTranslations.en, welcome: "തിരഞ്ഞെടുപ്പ് വിദ്യാഭ്യാസ യാത്ര ആരംഭിക്കാൻ ഭാഷ തിരഞ്ഞെടുക്കുക." },
  bn: { ...baseTranslations.en, welcome: "নির্বাচনী শিক্ষা যাত্রা শুরু করতে আপনার ভাষা বেছে নিন।" },
  mr: { ...baseTranslations.en, welcome: "निवडणूक शिक्षण प्रवास सुरू करण्यासाठी तुमची भाषा निवडा." },
  gu: { ...baseTranslations.en, welcome: "ચૂંટણી શિક્ષણ પ્રવાસ શરૂ કરવા માટે તમારી ભાષા પસંદ કરો." },
  pa: { ...baseTranslations.en, welcome: "ਚੋਣ ਸਿੱਖਿਆ ਯਾਤਰਾ ਸ਼ੁਰೂ ਕਰਨ ਲਈ ਆਪਣੀ ਭਾಷਾ ਚੁਣੋ।" },
  or: { ...baseTranslations.en, welcome: "ନିର୍ବାଚନ ଶିକ୍ଷା ଯାତ୍ରା ଆରମ୍ಭ କରିବା ପାଇଁ ଆପଣଙ୍କ ଭାષા ବାଛନ୍ତୁ |" },
  as: { ...baseTranslations.en, welcome: "নিৰ্বাচনী শিক্ষা যাত্ৰা আৰম্ভ কৰিবলৈ আপোনাৰ ভাষা বাছক।" },
  ur: { ...baseTranslations.en, welcome: "انتخابی تعلیمی سفر شروع کرنے کے لیے اپنی زبان منتخب کریں۔" },
  sa: { ...baseTranslations.en, welcome: "निर्वाचनशिक्षायाः यात्रां आरब्धुं स्वभाषां चिनोतु।" },
  kok: { ...baseTranslations.en, welcome: "वेंचणूक शिक्षण यात्रा सुरू करपाक तुमची भास वेंचून काढा।" }
};
