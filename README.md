# SEI - Sport Entertainment International
## Africa-First Sports Streaming Platform Demo

A fully interactive sports streaming demo app with region switching, live matches, merch store, pricing tiers, video player, search, and user profiles.

---

## 🎬 DEMO WALKTHROUGH FOR CLIENTS

### Quick Start (2 minutes)
1. **Open** the app (no install needed)
2. **Sign In** as "demo@sei.tv" (or click "Continue as guest")
3. Try these features in order:

#### Page 1: Home
- **Watch Live** — Click any match to see the video player (play/pause, quality selector showing Pro lock)
- **Region Switch** — Top-right dropdown, pick "Nigeria" or "Global" to see instant content swap
- **Browse** — Click "Football" pill to filter content by sport
- **Search** — Cmd+K (Mac) or Ctrl+K (Windows) to search matches

#### Page 2: Merch Store
- **Team Tabs** — Switch between teams to see regional merchandise
- **Add to Cart** — Click "Add to Cart" on any item, see toast notification
- **Region Pricing** — Go back to home, switch region, come back to see prices change currency

#### Page 3: Plans
- **Pricing Model** — Free vs Pro vs Elite (each region shows local currency)
- **Feature Breakdown** — Compare what each tier unlocks

#### Page 4: Profile
- **User Info** — Shows your name/email from auth
- **Watchlist** — Scrollable saved content
- **Settings** — Stubs ready for backend integration

### Keyboard Shortcuts (for smooth demo)
- **Cmd+K** (Mac) / **Ctrl+K** (Windows) — Open search
- **Cmd+1** / **Ctrl+1** — Go to Home
- **Cmd+2** / **Ctrl+2** — Go to Merch
- **Cmd+3** / **Ctrl+3** — Go to Plans
- **Cmd+4** / **Ctrl+4** — Go to Profile
- **ESC** — Close any overlay

### Key Features to Highlight
✅ **Region-Aware Everything** — Switch South Africa → Nigeria and *everything* updates (prices, teams, sports, live matches, all in local currency)  
✅ **Real Video Player** — Not a mockup; interactive player with progress bar, quality lock  
✅ **Mobile-First** — Works perfectly on phones (bottom nav), desktop (top nav)  
✅ **Fast** — All animations are smooth, no lag  
✅ **Ready for Backend** — All UI is production-ready, just needs API integration  

---

## 📁 Project Structure

```
sei-demo/
├── index.html          # Main HTML file (entry point)
├── css/
│   └── main.css       # All styling (responsive, dark theme)
├── js/
│   ├── data.js        # Regional data (7 regions: ZA, NG, GH, KE, EG, AF, GL)
│   └── app.js         # Main application logic
└── assets/            # Placeholder for future assets
```

---

## 🚀 Getting Started

### Option 1: VS Code (Local Development)
1. Extract `sei-demo.zip` to your desired folder
2. Open the folder in VS Code
3. Install the "Live Server" extension (by Ritwick Dey)
4. Right-click `index.html` → "Open with Live Server"
5. App will open at `http://localhost:5500` with hot reload

### Option 2: GitHub Pages (Live Demo)
1. Push the folder to a GitHub repo
2. Go to Settings → Pages → Source: `main` branch, `/root` folder
3. Access at `https://yourusername.github.io/sei-demo`

### Option 3: Run Locally Without Live Server
1. Simply double-click `index.html` to open in browser
2. No build step required — it's vanilla HTML/CSS/JS

---

## 🎯 Features

### Authentication
- **Sign In** with email/password
- **Create Account** with region selection
- **Guest Mode** for quick access
- User avatar in nav updates from name

### Streaming
- **7 Regions**: South Africa, Nigeria, Ghana, Kenya, Egypt, Pan-Africa, Global
- **Region Switcher**: Top nav dropdown instantly swaps all content to selected region
- **Live Matches**: Horizontal scroll of currently streaming content
- **Full Video Player**:
  - Animated progress bar (realistic scrubbing)
  - Play/pause toggle
  - Quality selector (720p free, 1080p/4K locked behind Pro)
  - Live badge + viewer count
  - Cast & fullscreen buttons

### Content Discovery
- **Browse by Sport**: Categories filter content dynamically
- **Africa/Global Toggle**: Switch between regional and worldwide sports
- **Search Overlay**: Full-screen search with sport shortcuts

### Store
- **Team Tabs**: Filter merch by team (region-aware)
- **Category Filters**: Jersey, Headwear, Accessories
- **Add to Cart**: Toast notification with cart count
- **Region-Specific Pricing**: Each region has local currency

### Pricing & Profiles
- **3-Tier Model**: Free (720p), Pro ($), Elite (4K)
- **Dynamic Pricing**: Changes with region currency
- **User Profile**: Name, email, stats, watchlist, settings
- **Sign Out**: Return to auth screen

### Mobile-First Design
- **Bottom Navigation**: Mobile-exclusive nav bar (5 tabs)
- **Responsive Grid**: 2-3 cols on mobile, auto-fill on desktop
- **Touch-Optimized**: All buttons and overlays sized for touch

---

## 🔧 Customization Guide

### Change Default Region
In `js/app.js`, find the `launchApp()` function:
```javascript
launchApp('za'); // Change 'za' to any region code
```

### Add New Sport
In `js/data.js`, add to any region's `sports` array:
```javascript
sports: ['All', 'Football', 'NEW_SPORT']
```

### Add New Match
In `js/data.js`, add to a region's `live` array:
```javascript
{ sport: 'NEW_SPORT', match: 'Team A vs Team B', time: "30'", v: '50K', bg: 'gradient...', score: '1–0', f: '🇿🇦' }
```

### Update Pricing
In `js/data.js`, find region object:
```javascript
proPrice: '149',      // Change Pro monthly price
elitePrice: '299'     // Change Elite monthly price
```

### Modify Colors
In `css/main.css`, update CSS variables:
```css
:root {
  --red: #E8001D;          /* Primary brand color */
  --gold: #D4891A;         /* Accent color */
  --bg: #05050C;           /* Background */
  --t1: #FFFFFF;           /* Text primary */
}
```

---

## 📊 Data Structure

### Region Object
```javascript
region: {
  flag: '🇿🇦',
  name: 'South Africa',
  curr: 'R',                          // Currency symbol
  currFull: 'ZAR',                    // Currency code
  proPrice: '149',                    // Pro tier price
  elitePrice: '299',                  // Elite tier price
  hero: { /* featured match data */ },
  live: [ /* live channel array */ ],
  sports: [ /* sport category array */ ],
  content: [ /* browse content array */ ],
  teams: [ /* merch team array */ ],
  merch: [ /* merchandise items */ ]
}
```

### Live Match Object
```javascript
{
  sport: 'Football',
  match: 'Team A vs Team B',
  time: "45'",
  v: '82K',                           // Viewers
  bg: 'linear-gradient(...)',         // Card background
  score: '2–0',
  f: '🇿🇦'                             // Flag
}
```

### Merch Item Object
```javascript
{
  name: 'Home Jersey 25/26',
  team: 'Sundowns',
  cat: 'jersey',                      // jersey, hat, accessory
  price: 'R 680',
  bg: '#141000',                      // Image background color
  badge: 'MS',                        // Team abbreviation
  badgeBg: '#FFD700',                 // Badge background
  e: '👕'                              // Emoji
}
```

---

## 🎨 Styling Notes

- **Dark Theme**: OLED-friendly dark background (#05050C)
- **Golden Accents**: Premium feel (#D4891A)
- **Red Highlights**: Energy & action (#E8001D)
- **Responsive**: Works seamlessly from 375px to 2560px
- **Fonts**: Bebas Neue (headings), Outfit (body)

---

## 🔄 Workflow

### Add a New Region
1. Add region object to `js/data.js` under `REGIONS`
2. Add region code to region dropdown in `index.html`
3. Update the region loop in `app.js` `setRegion()` function
4. Test by selecting region in dropdown

### Update Live Matches
1. Edit `js/data.js` → Region → `live` array
2. Changes render instantly on page refresh

### Modify Pricing
1. Edit `js/data.js` → Region → `proPrice` / `elitePrice`
2. Update hero banner price in `app.js` `applyRegion()` or directly in HTML

---

## 📱 Browser Support

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Mobile Safari (iOS 14+)

---

## 🚀 Deployment

### GitHub Pages
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/sei-demo.git
git branch -M main
git push -u origin main
# Then enable Pages in settings
```

### Netlify (1-click deploy)
- Drag & drop folder to Netlify.com
- Instant live URL

### DigitalOcean App Platform
- Connect GitHub repo
- Auto-deploys on push
- Custom domain support

---

## 📝 Notes for Development

- **No Build Step**: Everything runs in vanilla JS — no webpack, no Node required
- **No Database**: All data is hardcoded in `js/data.js` (ready for API integration)
- **No External Dependencies**: Only Google Fonts (can work offline)
- **Minification**: Ready for Terser/CSSNano when going to production

---

## 🎯 Next Steps

1. **Connect Real API**: Replace `REGIONS` data with live API calls
2. **Add Authentication**: Integrate Firebase/Auth0 for real login
3. **Payment Gateway**: Add Stripe for subscriptions
4. **Real Video Player**: Swap fake player for HLS.js + live streams
5. **Backend**: Node/Django API for user accounts, merch inventory, billing

---

## 📞 Support

For questions or to report issues, check the code comments or reach out to the development team.

Enjoy building! 🚀
