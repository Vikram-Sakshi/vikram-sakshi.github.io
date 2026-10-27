/*
  All wedding text lives here. Edit this file to change anything guests see.
  Leave a field as "" (empty) or [] to hide it on the site.
  Hindi wording is taken as-is from the printed card (PDF pages 1–4).
  A few short labels (buttons, section names) are not on the card; they are marked "UI".
*/
export const WEDDING = {
  config: {
    // Countdown target: the wedding day from the card (India time).
    countdownTo: "2026-11-24T00:00:00+05:30",
    // Put an MP3/M4A in public/ and set its path here to add background music. "" = no music.
    // "Indian Love Music" by Sonican (Pixabay, free under the Pixabay Content License)
    music: "/music-love.m4a",
  },

  couple: {
    groom: "विक्रम",
    bride: "साक्षी",
    groomFull: "विक्रम दुबे",
    groomPrefix: "चि.",
    brideFull: "साक्षी मिश्रा",
    bridePrefix: "आयु. कु.",
    withWord: "संग",
    monogram: ["वि", "सा"],
  },

  text: {
    blessing: "।। ॐ श्री गणेशाय नमः ।।",
    tapToOpen: "निमंत्रण खोलें", // UI
    envelopeFor: "सादर आमंत्रण", // UI
    guestDefault: "आप सपरिवार", // UI

    heroEyebrow: "।। का पाणिग्रहण संस्कार ।।",
    heroDate: { weekday: "मंगलवार", day: "24", month: "नवम्बर", year: "2026" },
    heroPlace: "नालासोपारा (पूर्व)",
    scroll: "आगे देखें", // UI

    welcomeEyebrow: "सादर निमंत्रण", // UI
    welcomeDear: "मान्यवर,",
    welcomeText: "श्री हरि की असीम कृपासे यह शुभ अवसर प्राप्त हुआ है कि हमारे यहाँ चि. विक्रम दुबे संग आयु. कु. साक्षी मिश्रा का पाणिग्रहण संस्कार मंगलवार दि. 24-11-2026 को होना सुनिश्चित हुआ है।",
    welcomeSign: "एवं समस्त दुबे परिवार",
    welcomeCta: "मांगलिक कार्यक्रम देखें", // UI
    chips: [
      { k: "दिनांक", v: "मंगलवार दि. 24-11-2026" },
      { k: "विवाह स्थल", v: "नव दुर्गा ग्राउण्ड, नालासोपारा (पूर्व)" },
      { k: "कार्यक्रम", v: "दि. 22 से 25-11-2026" },
    ],
    sealRing: "शुभविवाह ✦ 24 · 11 · 2026 ✦ विक्रम संग साक्षी ✦ ",

    countdownEyebrow: "शुभ घड़ी", // UI
    countdownTitle: "शुभविवाह में शेष समय", // UI
    countdownSub: "मंगलवार दि. 24-11-2026",
    units: ["दिन", "घंटे", "मिनट", "सेकंड"],
    countdownDone: "आज शुभविवाह का पावन दिन है!", // UI

    /* ---- PDF page 1 ---- */
    inviteEyebrow: "निमंत्रण", // UI
    invocations: ["।। ॐ श्री गणेशाय नमः ।।"],
    doha: "वक्रतुण्ड महाकाय, सूर्य कोटी समप्रभ: ।\nनिर्विघ्नं कुरु मे देव सर्व कार्येषु सर्वदा ।।",
    dohaMeaning: "",
    graceSalute: "मान्यवर,",
    graceLine: "श्री हरि की असीम कृपासे यह शुभ अवसर प्राप्त हुआ है कि हमारे यहाँ",
    groomFamily: [
      "सुपौत्र - श्रीमती स्व. इसरावतीदेवी एवं स्व. श्री. सीताराम दुबे",
      "सुपुत्र – श्रीमती सुनीता एवं श्री. विजय एस. दुबे",
      "ग्राम - पूराराम सहाय, पोस्ट - बेलवार, जिला - जौनपुर (उ. प्र.)",
    ],
    brideFamily: [
      "सुपौत्री - श्रीमती स्व. कमला एवं स्व. श्री. राय मिलन मिश्रा",
      "सुपुत्री – श्रीमती विनीता एवं श्री. पंकज मिश्रा",
      "ग्राम - रनीवा, पोस्ट - गोसाईगंज, जिला - अयोध्या (उ.प्र.)",
    ],
    sanskar: "।। का पाणिग्रहण संस्कार ।।",
    muhurat: "मंगलवार दि. 24-11-2026 को शुभविवाह होना सुनिश्चित हुआ है।",
    request: "अतः इस अवसर पर सस्नेह पधारकर वर-वधू को शुभाशिर्वाद प्रदान कर हमें अनुग्रहीत करें।",

    /* ---- PDF page 3 ---- */
    tilak: {
      eyebrow: "शुभ तिलकोत्सव",
      shloka: "सर्व मंगल मांगल्ये शिवे सर्वार्थ साधिके।\nशरण्ये त्र्यंबके गौरी, नारायणी नमोस्तुते ।।",
      title: "शुभ तिलकोत्सव",
      salute: "मान्यवर,",
      text: "ईश्वर की असीम कृपा से हमारे सुपुत्र का शुभ तिलकोत्सव का आयोजन किया गया है जिसमें निम्न कार्यक्रमानुसार आपकी उपस्थिति सादर प्रार्थनीय है।",
      name: "चि. विक्रम दुबे",
      lines: [
        "सुपौत्र - श्रीमती स्व. इसरावतीदेवी एवं स्व. श्री. सीताराम दुबे",
        "सुपुत्र – श्रीमती सुनीता एवं श्री. विजय एस. दुबे",
      ],
      whenTitle: "शुभ तिलकोत्सव एवं इंगेजमेंट",
      when: ["रविवार, दि. 22-11-2026 को", "शाम 3 बजे से रात्री 10 बजे तक"],
      whereTitle: "शुभ तिलकोत्सव स्थल",
      where: ["संस्कृति रोज, नादब्रम्हा रोड,", "कैपिटल मॉल के पास,", "नालासोपारा (पूर्व) : 401209."],
      map: "Sanskruti Rose, Nadbramha Road, near Capital Mall, Nalasopara East 401209",
    },

    /* ---- Baraat (note from PDF page 2) ---- */
    baraatEyebrow: "बारात", // UI
    baraatTitle: "बारात प्रस्थान", // UI
    // Baraat leaves at 5 pm (card page 2).
    baraatHour: "5",
    baraatNote: ["नोट : बारात हमारे निवास स्थान से शाम", "बजे प्रस्थान करेगी।"],
    baraatHint: "ढोल बजाएँ, आसमान पर टैप करें, बारात को खींचें", // UI
    dholBtn: "ढोल बजाएँ", // UI
    ticketDate: "दिनांक", ticketTime: "समय", ticketFrom: "प्रस्थान", ticketTo: "आगमन", // UI
    baraatTime: "मंगलवार, दि. 24-11-2026 · शाम 5 बजे प्रस्थान",
    baraatFrom: "निवास स्थान",
    baraatFromSub: "सी-703, संस्कृति रोज, कैपिटल माल के पास",
    baraatTo: "नव दुर्गा ग्राउण्ड",
    baraatToSub: "यशवन्त एम्पायर, निकट डी-मार्ट, नालासोपारा (पूर्व)",
    baraatMap: "Nav Durga Ground, Yashwant Empire, Yashwant Viva Township, near D-Mart, Nalasopara East",
    directions: "नक्शा", // UI

    /* ---- PDF page 2 ---- */
    eventsEyebrow: "।। ॐ श्री गणेशाय नमः ।।",
    eventsTitle: "मांगलिक कार्यक्रम",
    eventsDoha: "मंगलम् भगवान विष्णु: मंगलम् गरुड़ध्वज:।\nमंगलम् पुण्डरीकाक्ष: मंगलाय तनो हरि:।।",
    eventsDohaMeaning: "",
    addCalendar: "कैलेंडर में जोड़ें", // UI
    openMap: "नक्शा देखें", // UI

    venueTitle: "विवाह स्थल",
    venueName: "नव दुर्गा ग्राउण्ड",
    venueLines: ["यशवन्त एम्पायर, यशवन्त वीवा टाउन सिप,", "निकट डी-मार्ट, नालासोपारा (पूर्व)."],
    homeTitle: "निवास स्थान",
    homeLines: ["सी-703, संस्कृति रोज", "कैपिटल माल के पास, नालासोपारा (पूर्व).", "मो. : 7977274663"],
    homeMap: "Sanskruti Rose, near Capital Mall, Nalasopara East",

    familyEyebrow: "सस्नेह", // UI
    familyTitle: "परिवार", // UI
    familyText: "",

    contactEyebrow: "संपर्क", // UI
    contactTitle: "संपर्क करें", // UI
    call: "कॉल", // UI

    closingEyebrow: "सस्नेह", // UI
    closingTitle: "आपकी गरिमामयी उपस्थिति की प्रतीक्षा में", // UI
    share: "निमंत्रण साझा करें", // UI
    copied: "लिंक कॉपी हो गया", // UI
    shareText: "चि. विक्रम दुबे संग आयु. कु. साक्षी मिश्रा का पाणिग्रहण संस्कार · मंगलवार दि. 24-11-2026 — आप सपरिवार सादर आमंत्रित हैं",
    mithiTitle: "बाल मनुहार", // UI (common heading on Hindi cards)
    mithiText: "मेरे मामा की शादी में आप सभी जरुर से जरुर आना है ....",
    mithiFrom: "",
    mithiNames: "गीतिका, प्रांजली, शरन्या, मान्या, इशिता, वृन्दा, आरवी",
    footer: "।। ॐ श्री गणेशाय नमः ।।",
    footerCols: { events: "कार्यक्रम", contact: "संपर्क", explore: "देखें" }, // UI
    nav: { home: "मुख्य", invitation: "निमंत्रण", tilak: "तिलक", baraat: "बारात", celebrations: "कार्यक्रम", family: "परिवार", call: "कॉल" }, // UI
  },

  // Ceremonies from the card. Times are India time; the card gives a time only for the tilak.
  events: [
    {
      id: "tilak", icon: "diya", name: "शुभ तिलकोत्सव एवं इंगेजमेंट", note: "",
      day: "रविवार", date: "दि. 22-11-2026", dd: "22", mon: "नव.", short: "22 नव.", time: "शाम 3 बजे से रात्री 10 बजे तक",
      venue: "संस्कृति रोज, नादब्रम्हा रोड, कैपिटल मॉल के पास, नालासोपारा (पूर्व)",
      start: "2026-11-22T15:00:00+05:30", end: "2026-11-22T22:00:00+05:30",
      mapQuery: "Sanskruti Rose, Nadbramha Road, near Capital Mall, Nalasopara East 401209",
    },
    {
      id: "haldi", icon: "thali", name: "यज्ञोपवित, शिलमायन, हल्दी", note: "",
      day: "सोमवार", date: "दि. 23-11-2026", dd: "23", mon: "नव.", short: "23 नव.", time: "",
      venue: "", start: "2026-11-23T10:00:00+05:30", end: "2026-11-23T14:00:00+05:30", mapQuery: "",
    },
    {
      id: "vivah", icon: "mandap", name: "शुभविवाह", note: "",
      day: "मंगलवार", date: "दि. 24-11-2026", dd: "24", mon: "नव.", short: "24 नव.", time: "",
      venue: "नव दुर्गा ग्राउण्ड, यशवन्त एम्पायर, निकट डी-मार्ट, नालासोपारा (पूर्व)",
      start: "2026-11-24T18:00:00+05:30", end: "2026-11-24T23:59:00+05:30",
      mapQuery: "Nav Durga Ground, Yashwant Empire, Yashwant Viva Township, near D-Mart, Nalasopara East",
    },
    {
      id: "vidai", icon: "diya", name: "विदाई", note: "",
      day: "बुधवार", date: "दि. 25-11-2026", dd: "25", mon: "नव.", short: "25 नव.", time: "",
      venue: "", start: "2026-11-25T08:00:00+05:30", end: "2026-11-25T11:00:00+05:30", mapQuery: "",
    },
  ],

  // Family lists from the card (page 1).
  family: [
    {
      title: "दर्शनाभिलाषी", tab: "दर्शनाभिलाषी", sub: "",
      names: ["श्री. विक्रम जेटली", "श्री. अमरीश उपाध्याय", "श्री. आनन्द दुबे", "श्री. शत्रुघ्न दुबे", "श्री. प्रफुल्ल शुक्ला", "श्री. अमित गोडसे"],
      extra: [] as string[], closing: "",
    },
    {
      title: "विनीत", tab: "विनीत", sub: "पराग (देवा) मो. : 8779744163",
      names: ["श्री. दूधनाथ दुबे", "श्री. रामचन्द्र दुबे", "श्री. अशोक दुबे", "श्री. धर्मेन्द्र दुबे", "श्री. भावेश दुबे"],
      extra: [] as string[], closing: "",
    },
    {
      title: "स्वागताकांक्षी", tab: "स्वागताकांक्षी", sub: "",
      names: [] as string[],
      extra: ["देवेश, गौरव, विकास, पराग (देवा), ध्वनिल, जयनील, चैतन्य, वेदान्त, यश, श्लोक, नीवान, राघव, अंकिता, प्रीती"],
      closing: "एवं समस्त दुबे परिवार",
    },
  ],

  contacts: [
    { name: "निवास स्थान", phone: "7977274663" },
    { name: "पराग (देवा)", phone: "8779744163" },
  ],
};

export type Wedding = typeof WEDDING;
export type WeddingEvent = (typeof WEDDING.events)[number];
export type FamilyGroup = (typeof WEDDING.family)[number];
