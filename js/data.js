// SEI Regional Data - All regions with live matches, content, teams, and merch

const REGIONS = {
  za: {
    flag: '🇿🇦',
    name: 'South Africa',
    curr: 'R',
    currFull: 'ZAR',
    proPrice: '149',
    elitePrice: '299',
    hero: {
      title: 'Sundowns<br>vs Pirates',
      meta: 'PSL · Matchday 28 · Loftus Versfeld, Pretoria',
      s1: '2',
      s2: '0',
      time: 'Live Now · 68\'',
      tag: '🇿🇦 South Africa · Featured',
      score: '2 — 0',
      teams: 'SUNDOWNS · PIRATES',
      matchLabel: 'PSL · Loftus Versfeld · 68\'',
      viewers: '82K',
      bg: 'linear-gradient(125deg,#050010,#0A041A 40%,#001A08 70%,#060A04)'
    },
    live: [
      { sport: 'Football', match: 'Sundowns vs Pirates', time: '68\'', v: '127K', bg: 'linear-gradient(135deg,#001A08,#002A10)', score: '2–0', f: '🇿🇦' },
      { sport: 'Rugby', match: 'Bulls vs Sharks · URC', time: '52\'', v: '89K', bg: 'linear-gradient(135deg,#001030,#001A4A)', score: '21–14', f: '🇿🇦' },
      { sport: 'Cricket', match: 'Proteas vs Australia', time: '14.2 Ov', v: '156K', bg: 'linear-gradient(135deg,#0A0A00,#1A1A00)', score: '128/4', f: '🇿🇦' },
      { sport: 'Football', match: 'Chiefs vs SuperSport', time: '33\'', v: '94K', bg: 'linear-gradient(135deg,#1A0800,#2A1000)', score: '1–1', f: '🇿🇦' },
      { sport: 'Athletics', match: 'SA Athletics Champs', time: 'Live', v: '67K', bg: 'linear-gradient(135deg,#0A0010,#180020)', score: '', f: '🇿🇦' },
      { sport: 'Rugby', match: 'Lions vs Stormers', time: '71\'', v: '73K', bg: 'linear-gradient(135deg,#1A0004,#280008)', score: '17–17', f: '🇿🇦' },
      { sport: 'Boxing', match: 'SA Heavyweight Title', time: 'Rd 10', v: '213K', bg: 'linear-gradient(135deg,#200004,#3A0008)', score: '', f: '🇿🇦' },
      { sport: 'Netball', match: 'Proteas vs Australia', time: '45\'', v: '52K', bg: 'linear-gradient(135deg,#001020,#002040)', score: '34–28', f: '🇿🇦' }
    ],
    sports: ['All', 'Football', 'Rugby', 'Cricket', 'Athletics', 'Boxing'],
    content: [
      { sport: 'Football', name: 'PSL · Matchday 28', label: 'Live', pro: false, bg: 'linear-gradient(135deg,#001808,#002814)' },
      { sport: 'Rugby', name: 'URC · Bulls vs Sharks', label: 'Live', pro: false, bg: 'linear-gradient(135deg,#000C20,#001830)' },
      { sport: 'Cricket', name: 'Proteas vs Australia', label: 'Live', pro: false, bg: 'linear-gradient(135deg,#0A0A00,#181800)' },
      { sport: 'Football', name: 'AFCON Qualifiers · SA', label: 'Replay', pro: false, bg: 'linear-gradient(135deg,#001808,#002010)' },
      { sport: 'Rugby', name: 'Super Rugby Pacific', label: 'Live', pro: true, bg: 'linear-gradient(135deg,#001028,#001840)' },
      { sport: 'Boxing', name: 'SA Title Fight Night', label: 'PPV', pro: true, bg: 'linear-gradient(135deg,#1A0004,#260008)' }
    ],
    teams: ['All Teams', 'Sundowns', 'Kaizer Chiefs', 'Orlando Pirates', 'Bulls', 'Sharks', 'Proteas'],
    merch: [
      { name: 'Home Jersey 25/26', team: 'Sundowns', cat: 'jersey', price: 'R 680', bg: '#141000', badge: 'MS', badgeBg: '#FFD700', e: '👕' },
      { name: 'Away Kit 25/26', team: 'Kaizer Chiefs', cat: 'jersey', price: 'R 650', bg: '#180A00', badge: 'KC', badgeBg: '#FFD700', e: '👕' },
      { name: 'Training Top', team: 'Orlando Pirates', cat: 'jersey', price: 'R 520', bg: '#080808', badge: 'OP', badgeBg: '#FFFFFF', e: '👕' },
      { name: 'Snapback Cap', team: 'Sundowns', cat: 'hat', price: 'R 280', bg: '#121000', badge: 'MS', badgeBg: '#FFD700', e: '🧢' },
      { name: 'Stadium Hoodie', team: 'Bulls', cat: 'accessory', price: 'R 720', bg: '#00080A', badge: 'BU', badgeBg: '#005B8C', e: '🧥' },
      { name: 'Fan Scarf', team: 'Kaizer Chiefs', cat: 'accessory', price: 'R 190', bg: '#140800', badge: 'KC', badgeBg: '#FFD700', e: '🧣' }
    ]
  },
  ng: {
    flag: '🇳🇬',
    name: 'Nigeria',
    curr: '₦',
    currFull: 'NGN',
    proPrice: '4,900',
    elitePrice: '9,500',
    hero: {
      title: 'Enyimba<br>vs Rangers',
      meta: 'NPFL · Week 26 · Enyimba Stadium, Aba',
      s1: '1',
      s2: '0',
      time: 'Live Now · 44\'',
      tag: '🇳🇬 Nigeria · Featured',
      score: '1 — 0',
      teams: 'ENYIMBA · RANGERS',
      matchLabel: 'NPFL · Enyimba Stadium · 44\'',
      viewers: '51K',
      bg: 'linear-gradient(125deg,#050F00,#0A1E00 40%,#001800 70%,#030A00)'
    },
    live: [
      { sport: 'Football', match: 'Enyimba vs Rangers Int\'l', time: '44\'', v: '51K', bg: 'linear-gradient(135deg,#001808,#002A10)', score: '1–0', f: '🇳🇬' },
      { sport: 'Football', match: 'Rivers Utd vs Kano Pillars', time: '29\'', v: '33K', bg: 'linear-gradient(135deg,#001030,#001A40)', score: '0–0', f: '🇳🇬' },
      { sport: 'Basketball', match: 'Nigeria Premier League', time: 'Q2', v: '18K', bg: 'linear-gradient(135deg,#0A0800,#181200)', score: '44–38', f: '🇳🇬' },
      { sport: 'Boxing', match: 'WBC African Title', time: 'Rd 6', v: '28K', bg: 'linear-gradient(135deg,#1A0004,#260008)', score: '', f: '🇳🇬' }
    ],
    sports: ['All', 'Football', 'Basketball', 'Boxing', 'Athletics'],
    content: [
      { sport: 'Football', name: 'NPFL · Week 26', label: 'Live', pro: false, bg: 'linear-gradient(135deg,#001608,#002412)' },
      { sport: 'Football', name: 'AFCON Qualifiers · Nigeria', label: 'Live', pro: false, bg: 'linear-gradient(135deg,#001028,#001838)' },
      { sport: 'Basketball', name: 'Nigeria Premier League', label: 'Live', pro: false, bg: 'linear-gradient(135deg,#0A0800,#181200)' },
      { sport: 'Boxing', name: 'WBC African Title', label: 'PPV', pro: true, bg: 'linear-gradient(135deg,#180004,#240008)' }
    ],
    teams: ['All Teams', 'Enyimba', 'Rangers Int\'l', 'Rivers Utd', 'Kano Pillars'],
    merch: [
      { name: 'Home Jersey 25/26', team: 'Enyimba', cat: 'jersey', price: '₦ 32,000', bg: '#000A20', badge: 'EN', badgeBg: '#E8001D', e: '👕' },
      { name: 'Training Top', team: 'Rivers Utd', cat: 'jersey', price: '₦ 26,000', bg: '#080000', badge: 'RU', badgeBg: '#0047AB', e: '👕' },
      { name: 'Fan Cap', team: 'Kano Pillars', cat: 'hat', price: '₦ 12,000', bg: '#080800', badge: 'KP', badgeBg: '#FFD700', e: '🧢' },
      { name: 'Stadium Scarf', team: 'Rangers Int\'l', cat: 'accessory', price: '₦ 9,000', bg: '#001008', badge: 'RI', badgeBg: '#009A44', e: '🧣' }
    ]
  },
  gh: {
    flag: '🇬🇭',
    name: 'Ghana',
    curr: 'GH₵',
    currFull: 'GHS',
    proPrice: '89',
    elitePrice: '179',
    hero: {
      title: 'Hearts of Oak<br>vs Kotoko',
      meta: 'GPL · Week 24 · Accra Sports Stadium',
      s1: '1',
      s2: '1',
      time: 'Live Now · 77\'',
      tag: '🇬🇭 Ghana · Featured',
      score: '1 — 1',
      teams: 'HEARTS · KOTOKO',
      matchLabel: 'GPL · Accra Stadium · 77\'',
      viewers: '42K',
      bg: 'linear-gradient(125deg,#0F0800,#180E00 40%,#001000 70%,#080400)'
    },
    live: [
      { sport: 'Football', match: 'Hearts of Oak vs Kotoko', time: '77\'', v: '42K', bg: 'linear-gradient(135deg,#0A0000,#180000)', score: '1–1', f: '🇬🇭' },
      { sport: 'Athletics', match: 'Ghana Athletics Open', time: 'Live', v: '14K', bg: 'linear-gradient(135deg,#0A0A00,#181800)', score: '', f: '🇬🇭' },
      { sport: 'Boxing', match: 'Ghana Boxing Authority', time: 'Rd 8', v: '22K', bg: 'linear-gradient(135deg,#1A0004,#260008)', score: '', f: '🇬🇭' }
    ],
    sports: ['All', 'Football', 'Athletics', 'Boxing'],
    content: [
      { sport: 'Football', name: 'GPL · Week 24', label: 'Live', pro: false, bg: 'linear-gradient(135deg,#0A0000,#160000)' },
      { sport: 'Football', name: 'AFCON Qualifiers · Ghana', label: 'Live', pro: false, bg: 'linear-gradient(135deg,#001028,#001838)' },
      { sport: 'Athletics', name: 'Ghana Athletics Open', label: 'Live', pro: false, bg: 'linear-gradient(135deg,#0A0A00,#181800)' },
      { sport: 'Boxing', name: 'GBA Title Fight Night', label: 'PPV', pro: true, bg: 'linear-gradient(135deg,#180004,#240008)' }
    ],
    teams: ['All Teams', 'Hearts of Oak', 'Asante Kotoko', 'Medeama', 'Dreams FC'],
    merch: [
      { name: 'Home Jersey 25/26', team: 'Hearts of Oak', cat: 'jersey', price: 'GH₵ 290', bg: '#0A0000', badge: 'HO', badgeBg: '#E8001D', e: '👕' },
      { name: 'Away Kit', team: 'Asante Kotoko', cat: 'jersey', price: 'GH₵ 270', bg: '#0A0000', badge: 'AK', badgeBg: '#E8001D', e: '👕' },
      { name: 'Fan Cap', team: 'Medeama', cat: 'hat', price: 'GH₵ 95', bg: '#0A0A00', badge: 'ME', badgeBg: '#FFD700', e: '🧢' },
      { name: 'Fan Scarf', team: 'Dreams FC', cat: 'accessory', price: 'GH₵ 65', bg: '#001008', badge: 'DF', badgeBg: '#009A44', e: '🧣' }
    ]
  },
  ke: {
    flag: '🇰🇪',
    name: 'Kenya',
    curr: 'KES',
    currFull: 'KES',
    proPrice: '1,450',
    elitePrice: '2,900',
    hero: {
      title: 'Gor Mahia<br>vs AFC Leopards',
      meta: 'KPL · Week 22 · Kasarani Stadium, Nairobi',
      s1: '2',
      s2: '1',
      time: 'Live Now · 61\'',
      tag: '🇰🇪 Kenya · Featured',
      score: '2 — 1',
      teams: 'GOR MAHIA · AFC LEOPARDS',
      matchLabel: 'KPL · Kasarani · 61\'',
      viewers: '38K',
      bg: 'linear-gradient(125deg,#050A00,#0A1400 40%,#001000 70%,#030600)'
    },
    live: [
      { sport: 'Football', match: 'Gor Mahia vs AFC Leopards', time: '61\'', v: '38K', bg: 'linear-gradient(135deg,#001008,#001C10)', score: '2–1', f: '🇰🇪' },
      { sport: 'Athletics', match: 'Kenyan Athletics Trials', time: 'Live', v: '62K', bg: 'linear-gradient(135deg,#0A0A00,#181800)', score: '', f: '🇰🇪' },
      { sport: 'Basketball', match: 'KBL Semi-Finals', time: 'Q3', v: '11K', bg: 'linear-gradient(135deg,#0A0800,#161000)', score: '61–55', f: '🇰🇪' }
    ],
    sports: ['All', 'Football', 'Athletics', 'Basketball'],
    content: [
      { sport: 'Football', name: 'KPL · Week 22', label: 'Live', pro: false, bg: 'linear-gradient(135deg,#001008,#001C12)' },
      { sport: 'Athletics', name: 'Kenya Athletics Trials', label: 'Live', pro: false, bg: 'linear-gradient(135deg,#0A0A00,#181800)' },
      { sport: 'Football', name: 'AFCON Qualifiers · Kenya', label: 'Live', pro: false, bg: 'linear-gradient(135deg,#001028,#001838)' },
      { sport: 'Basketball', name: 'KBL Semi-Finals', label: 'Live', pro: false, bg: 'linear-gradient(135deg,#0A0800,#181200)' }
    ],
    teams: ['All Teams', 'Gor Mahia', 'AFC Leopards', 'Tusker FC', 'KCB FC'],
    merch: [
      { name: 'Home Jersey', team: 'Gor Mahia', cat: 'jersey', price: 'KES 4,200', bg: '#001008', badge: 'GM', badgeBg: '#009A44', e: '👕' },
      { name: 'Training Top', team: 'AFC Leopards', cat: 'jersey', price: 'KES 3,800', bg: '#000A20', badge: 'AFC', badgeBg: '#003399', e: '👕' },
      { name: 'Fan Scarf', team: 'Tusker FC', cat: 'accessory', price: 'KES 1,500', bg: '#0A0800', badge: 'TU', badgeBg: '#FFD700', e: '🧣' },
      { name: 'Fan Cap', team: 'KCB FC', cat: 'hat', price: 'KES 1,200', bg: '#00080A', badge: 'KCB', badgeBg: '#005B8C', e: '🧢' }
    ]
  },
  eg: {
    flag: '🇪🇬',
    name: 'Egypt',
    curr: 'EGP',
    currFull: 'EGP',
    proPrice: '350',
    elitePrice: '700',
    hero: {
      title: 'Al-Ahly<br>vs Zamalek',
      meta: 'EPL · Week 30 · Cairo International Stadium',
      s1: '1',
      s2: '0',
      time: 'Live Now · 55\'',
      tag: '🇪🇬 Egypt · Featured',
      score: '1 — 0',
      teams: 'AL-AHLY · ZAMALEK',
      matchLabel: 'EPL · Cairo Stadium · 55\'',
      viewers: '210K',
      bg: 'linear-gradient(125deg,#0A0400,#180900 40%,#0A0000 70%,#060200)'
    },
    live: [
      { sport: 'Football', match: 'Al-Ahly vs Zamalek', time: '55\'', v: '210K', bg: 'linear-gradient(135deg,#0A0000,#180000)', score: '1–0', f: '🇪🇬' },
      { sport: 'Football', match: 'Pyramids vs Ismaily', time: '38\'', v: '44K', bg: 'linear-gradient(135deg,#0A0800,#181200)', score: '0–0', f: '🇪🇬' },
      { sport: 'Handball', match: 'Egypt Super League', time: 'HT', v: '28K', bg: 'linear-gradient(135deg,#001028,#001838)', score: '18–16', f: '🇪🇬' }
    ],
    sports: ['All', 'Football', 'Handball', 'Basketball'],
    content: [
      { sport: 'Football', name: 'Egyptian Premier League · W30', label: 'Live', pro: false, bg: 'linear-gradient(135deg,#0A0000,#160000)' },
      { sport: 'Football', name: 'CAF Champions League', label: 'Live', pro: false, bg: 'linear-gradient(135deg,#001028,#001A38)' },
      { sport: 'Handball', name: 'Egypt Super League Final', label: 'Live', pro: true, bg: 'linear-gradient(135deg,#001028,#001838)' }
    ],
    teams: ['All Teams', 'Al-Ahly', 'Zamalek', 'Pyramids FC', 'Ismaily'],
    merch: [
      { name: 'Home Jersey 25/26', team: 'Al-Ahly', cat: 'jersey', price: 'EGP 1,200', bg: '#0A0000', badge: 'AH', badgeBg: '#E8001D', e: '👕' },
      { name: 'Away Kit', team: 'Zamalek', cat: 'jersey', price: 'EGP 1,100', bg: '#000A14', badge: 'ZA', badgeBg: '#FFFFFF', e: '👕' },
      { name: 'Fan Cap', team: 'Pyramids FC', cat: 'hat', price: 'EGP 380', bg: '#0A0800', badge: 'PY', badgeBg: '#C9941A', e: '🧢' }
    ]
  },
  af: {
    flag: '🌍',
    name: 'Pan-Africa',
    curr: '$',
    currFull: 'USD',
    proPrice: '7.99',
    elitePrice: '15.99',
    hero: {
      title: 'AFCON<br>Semi-Final',
      meta: 'CAF · Stade Olympique, Abidjan · Morocco vs Senegal',
      s1: '0',
      s2: '0',
      time: 'Live Now · AET',
      tag: '🌍 Pan-Africa · Featured',
      score: '0 — 0',
      teams: 'MOROCCO · SENEGAL',
      matchLabel: 'CAF AFCON · Abidjan · AET',
      viewers: '4.2M',
      bg: 'linear-gradient(125deg,#050A00,#0A1400 30%,#1A0A00 65%,#040800)'
    },
    live: [
      { sport: 'Football', match: 'AFCON SF · Morocco vs Senegal', time: 'AET', v: '4.2M', bg: 'linear-gradient(135deg,#001028,#001A38)', score: '0–0', f: '🌍' },
      { sport: 'Football', match: 'CAF CL Final · Al-Ahly vs Sundowns', time: '88\'', v: '1.1M', bg: 'linear-gradient(135deg,#0A0000,#001808)', score: '1–1', f: '🌍' },
      { sport: 'Athletics', match: 'All Africa Games · Track', time: 'Live', v: '340K', bg: 'linear-gradient(135deg,#0A0800,#181200)', score: '', f: '🌍' },
      { sport: 'Rugby', match: 'Africa Cup · SA vs Namibia', time: '67\'', v: '88K', bg: 'linear-gradient(135deg,#001030,#001848)', score: '31–7', f: '🌍' }
    ],
    sports: ['All', 'Football', 'Athletics', 'Rugby', 'Boxing'],
    content: [
      { sport: 'Football', name: 'AFCON 2025 Semi-Final', label: 'Live', pro: false, bg: 'linear-gradient(135deg,#001028,#001838)' },
      { sport: 'Football', name: 'CAF Champions League Final', label: 'Live', pro: false, bg: 'linear-gradient(135deg,#001808,#002414)' },
      { sport: 'Athletics', name: 'All Africa Games · Track', label: 'Live', pro: false, bg: 'linear-gradient(135deg,#0A0800,#181200)' },
      { sport: 'Rugby', name: 'Africa Cup of Nations Rugby', label: 'Live', pro: true, bg: 'linear-gradient(135deg,#001030,#001848)' },
      { sport: 'Boxing', name: 'WBC Africa Title Night', label: 'PPV', pro: true, bg: 'linear-gradient(135deg,#180004,#240008)' }
    ],
    teams: ['All Teams', 'Al-Ahly', 'Sundowns', 'Gor Mahia', 'Enyimba', 'Hearts of Oak'],
    merch: [
      { name: 'AFCON 2025 Fan Jersey', team: 'Pan-Africa', cat: 'jersey', price: '$42', bg: '#001808', badge: '🌍', badgeBg: '#009A44', e: '👕' },
      { name: 'CAF Official Cap', team: 'Pan-Africa', cat: 'hat', price: '$28', bg: '#0A0800', badge: 'CAF', badgeBg: '#C9941A', e: '🧢' },
      { name: 'All Africa Games Tee', team: 'Pan-Africa', cat: 'accessory', price: '$34', bg: '#0A0A00', badge: 'AAG', badgeBg: '#FFD700', e: '🧥' }
    ]
  },
  gl: {
    flag: '🌐',
    name: 'Global',
    curr: '$',
    currFull: 'USD',
    proPrice: '9.99',
    elitePrice: '19.99',
    hero: {
      title: 'Real Madrid<br>vs Barcelona',
      meta: 'La Liga · Matchday 36 · Estadio Bernabéu',
      s1: '2',
      s2: '1',
      time: 'Live Now · 72\'',
      tag: '🌐 Global · Featured',
      score: '2 — 1',
      teams: 'REAL MADRID · BARCELONA',
      matchLabel: 'La Liga · Bernabéu · 72\'',
      viewers: '5.1M',
      bg: 'linear-gradient(125deg,#07000F,#0A0518 35%,#001020 65%,#050A0A)'
    },
    live: [
      { sport: 'Football', match: 'Real Madrid vs Barcelona', time: '72\'', v: '5.1M', bg: 'linear-gradient(135deg,#001838,#002A5A)', score: '2–1', f: '🌐' },
      { sport: 'Basketball', match: 'NBA · Lakers vs Celtics', time: 'Q3 5:22', v: '1.2M', bg: 'linear-gradient(135deg,#200800,#3C1200)', score: '78–82', f: '🌐' },
      { sport: 'Formula 1', match: 'Monaco GP · Race', time: 'Lap 44/78', v: '3.1M', bg: 'linear-gradient(135deg,#1A1800,#2A2600)', score: '', f: '🌐' },
      { sport: 'Tennis', match: 'Alcaraz vs Djokovic · SF', time: 'Set 2', v: '680K', bg: 'linear-gradient(135deg,#001018,#001C28)', score: '6-4, 3-2', f: '🌐' },
      { sport: 'MMA', match: 'UFC 320 · Main Event', time: 'Rd 3', v: '2.2M', bg: 'linear-gradient(135deg,#1A0014,#280020)', score: '', f: '🌐' }
    ],
    sports: ['All', 'Football', 'Basketball', 'Formula 1', 'Tennis', 'MMA', 'Cricket'],
    content: [
      { sport: 'Football', name: 'Premier League · GW36', label: 'Live', pro: false, bg: 'linear-gradient(135deg,#00102A,#001A44)' },
      { sport: 'Basketball', name: 'NBA Conference Finals', label: 'Live', pro: false, bg: 'linear-gradient(135deg,#280600,#401000)' },
      { sport: 'Formula 1', name: 'Monaco Grand Prix', label: 'Live', pro: false, bg: 'linear-gradient(135deg,#181600,#282200)' },
      { sport: 'MMA', name: 'UFC 320 · Main Card', label: 'PPV', pro: true, bg: 'linear-gradient(135deg,#180018,#240024)' },
      { sport: 'Tennis', name: 'Wimbledon Centre Court', label: 'Live', pro: true, bg: 'linear-gradient(135deg,#001618,#002428)' },
      { sport: 'Cricket', name: 'Ashes · 2nd Test', label: 'Live', pro: false, bg: 'linear-gradient(135deg,#0A1800,#142800)' }
    ],
    teams: ['All Teams', 'Real Madrid', 'Man City', 'Lakers', 'PSG', 'Bayern Munich'],
    merch: [
      { name: 'Home Jersey 25/26', team: 'Real Madrid', cat: 'jersey', price: '$89', bg: '#08142E', badge: 'RM', badgeBg: '#C9941A', e: '👕' },
      { name: 'Away Kit 24/25', team: 'Man City', cat: 'jersey', price: '$85', bg: '#082232', badge: 'MC', badgeBg: '#5EA8D8', e: '👕' },
      { name: 'Snapback Cap', team: 'Lakers', cat: 'hat', price: '$38', bg: '#160822', badge: 'LAL', badgeBg: '#FFA500', e: '🧢' },
      { name: 'Stadium Hoodie', team: 'PSG', cat: 'accessory', price: '$72', bg: '#001020', badge: 'PSG', badgeBg: '#003399', e: '🧥' },
      { name: 'Heritage Scarf', team: 'Man City', cat: 'accessory', price: '$29', bg: '#081822', badge: 'MC', badgeBg: '#5EA8D8', e: '🧣' }
    ]
  }
};
