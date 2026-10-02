import { useState } from "react";

// ─── TRANSIT LINE CHIPS ───────────────────────────────────────────────────────
const LINE_COLORS = {
  "Ginza Line":    { bg: "#f79500", text: "#000" },
  "Midosuji Line": { bg: "#e5171f", text: "#fff" },
  "Tanimachi Line":{ bg: "#9b7cb6", text: "#fff" },
  "Oedo Line":     { bg: "#b5007f", text: "#fff" },
  "Hibiya Line":   { bg: "#9caeb7", text: "#000" },
  "Keihan Line":   { bg: "#0b7dc3", text: "#fff" },
  "Odakyu Line":   { bg: "#0066b3", text: "#fff" },
  "Enoden":        { bg: "#4caf50", text: "#fff" },
  "Keio Inokashira":{ bg: "#00a0a0", text: "#fff" },
  "Hankyu":        { bg: "#7b3b99", text: "#fff" },
  "JR":            { bg: "#f15a22", text: "#fff" },
  "NEX":           { bg: "#003087", text: "#fff" },
  "Yamanote Line": { bg: "#80c241", text: "#000" },
  "Kintetsu":      { bg: "#f06400", text: "#fff" },
  "Fujikyuko":     { bg: "#e60012", text: "#fff" },
  "Setagaya":      { bg: "#89c4e1", text: "#000" },
  "Den-en-toshi":  { bg: "#e8171f", text: "#fff" },
  "Tobu":          { bg: "#f59600", text: "#000" },
  "Willer":        { bg: "#ff6b35", text: "#fff" },
  "Garaku":        { bg: "#7b3b99", text: "#fff" },
  "Sagano":        { bg: "#c8a400", text: "#000" },
};

function TransitChips({ text, dark = true }) {
  const chips = Object.keys(LINE_COLORS).filter(line => text.includes(line));
  // Highlight from → to pattern
  const highlighted = text.replace(/([A-Za-z\u3000-\u9fff\u30A0-\u30FF\s]+)\s*→\s*([A-Za-z\u3000-\u9fff\u30A0-\u30FF\s]+?)(?=[,.\s(]|$)/g, (match, from, to) => {
    return `__FROM__${from.trim()}__ARROW__${to.trim()}__END__`;
  });

  const parts = highlighted.split(/(__FROM__.*?__END__)/g);

  return (
    <div>
      {chips.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginBottom: "5px" }}>
          {chips.map(line => (
            <span key={line} style={{
              fontSize: "7.5px", fontWeight: "bold", letterSpacing: "0.05em",
              padding: "1px 5px", borderRadius: "3px",
              background: LINE_COLORS[line].bg, color: LINE_COLORS[line].text,
            }}>{line}</span>
          ))}
        </div>
      )}
      <div style={{ fontSize: "12px", color: dark ? "#d8d0c4" : "#111827", lineHeight: "1.5", marginTop: "4px" }}>
        {parts.map((part, i) => {
          if (part.startsWith("__FROM__")) {
            const inner = part.replace("__FROM__", "").replace("__END__", "");
            const [from, to] = inner.split("__ARROW__");
            return (
              <span key={i}>
                <span style={{ color: dark ? "#fff" : "#1a1a2e", fontWeight: "600", background: dark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.08)", padding: "0 4px", borderRadius: "3px" }}>{from}</span>
                <span style={{ color: "#4a9eff", fontWeight: "bold", margin: "0 3px" }}>→</span>
                <span style={{ color: dark ? "#fff" : "#1a1a2e", fontWeight: "600", background: dark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.08)", padding: "0 4px", borderRadius: "3px" }}>{to}</span>
              </span>
            );
          }
          return <span key={i}>{part}</span>;
        })}
      </div>
    </div>
  );
}


const HALAL = {
  fuji: [
    { name: "T&T Fujiyama Halal Restaurant ⭐", note: "1-12-10 Koasumi, Fujiyoshida. Opens 11:30 AM daily. Halal Hoto noodles, beef sukiyaki, chicken. Has prayer room. 4.9★ — arrive at opening, fills fast. Tel: 080-5106-2280", type: "restaurant" },
    { name: "Kosher/Halal Ramen Fuji", note: "Kawaguchiko town area — check Google Maps on arrival", type: "restaurant" },
    { name: "7-Eleven / FamilyMart", note: "Onigiri with fish, egg sandwiches, vegetarian items. 10 min walk from Sawa Hotel.", type: "konbini" },
    { name: "Sawa Hotel breakfast", note: "Breakfast available 7–9 AM (book time night before). Mostly Japanese set — inform staff of no pork when checking in.", type: "tip" },
  ],
  osaka: [
    { name: "Halal Takoyaki — Dotonbori", note: "Several stalls near Dotonbori canal are halal-certified. Look for 'ハラール' sign.", type: "restaurant" },
    { name: "Osaka Halal Food (Namba)", note: "Namba area has multiple halal curry, kebab, and ramen shops", type: "restaurant" },
    { name: "Mos Burger (some branches)", note: "Halal-certified beef patties at selected branches. Confirm before ordering.", type: "fastfood" },
    { name: "Kuromon Market", note: "Fresh seafood stalls — grilled fish, scallops on stick. Avoid pork sausage stalls.", type: "market" },
    { name: "Muslim Prayer Room — Osaka", note: "Osaka Namba Mosque (Nipponbashi area). Also prayer rooms at Namba Parks mall.", type: "prayer" },
  ],
  kyoto: [
    { name: "🍜 Honolu Premier Nishiki ⭐ HALAL CERTIFIED", note: "Satake Bldg 2F, 571 Obiya-cho, Nakagyo-ku — right next to Nishiki Market. Wagyu beef ramen, chicken ramen, gyoza. Tel: 075-746-3787. Oct 13 lunch ✅", type: "restaurant" },
    { name: "🍚 Ayam-Ya Karasuma ⭐ HALAL CERTIFIED (MHC/JAKIM)", note: "Douka Bldg 1F, 470 Kannondocho, Nakagyo-ku — ~10 min from Kyoto Station. Chicken ramen + rice bowls. Has prayer space + wudhu. Open Mon-Sat. Tel: 075-253-1688. Oct 13 dinner ✅", type: "restaurant" },
    { name: "Fushimi Inari street stalls", note: "Inari sushi (tofu pouch with rice) is traditionally vegetarian/halal-safe. Confirm no mirin.", type: "tip" },
    { name: "Nishiki Market", note: "Tofu skewers, grilled fish, tamagoyaki — mostly halal-safe. Avoid teriyaki stalls with mirin.", type: "market" },
    { name: "Kyoto Tower prayer room (3F)", note: "Ask Kansai Tourist Information Center on same floor. Fill registration form. Men/women separated. Wudhu available.", type: "prayer" },
    { name: "Arashiyama tofu restaurants", note: "Yudofu (hot tofu) is a Kyoto specialty — fully halal. Several restaurants near Tenryu-ji.", type: "restaurant" },
  ],
  tokyo: [
    { name: "🍜 Shinjukutei Halal Wagyu Ramen ⭐ HALAL CERTIFIED", note: "3-11-6 Shinjuku B103, 4 min from Shinjuku-sanchome Stn. Wagyu ramen + sushi + karaage sets. Prayer room on site. Open daily 12PM–9PM. Oct 15 dinner ✅", type: "restaurant" },
    { name: "Halal restaurants near Senso-ji Asakusa", note: "Multiple options within 5 min of Kaminarimon gate. Ask HalalNavi app.", type: "restaurant" },
    { name: "Halal lunch near Kaminarimon", note: "Several halal-friendly spots for Oct 15 kimono lunch. Check HalalNavi on the day.", type: "restaurant" },
    { name: "Halal dinner Shibuya", note: "Needed for Oct 14 evening. Check HalalNavi — several halal ramen and izakaya options in Shibuya.", type: "restaurant" },
    { name: "Halal Gyudon — Matsuya (selected branches)", note: "Check matsuya.com/en/halal for certified branches.", type: "fastfood" },
    { name: "Narita Airport prayer room", note: "T1: near Gate 11 · T2: 4F. Oct 16 departure — Jamak Zuhur+Asr before flight ✅", type: "prayer" },
    { name: "Asakusa Ryokan Toukaisou room", note: "Use for Subuh, Jamak Taqdim and Jamak Takhir on Oct 14–15.", type: "prayer" },
    { name: "Shinjukutei prayer room", note: "3-11-6 Shinjuku B103. Use for Jamak Takhir Maghrib+Isha on Oct 15 after dinner ✅", type: "prayer" },
    { name: "Konbini everywhere", note: "7-Eleven, FamilyMart, Lawson. Onigiri (tuna/egg/salmon), matcha drinks safe.", type: "shopping" },
  ],
};

const MUSTDO = {
  fuji: [
    { icon: "🌅", name: "Sunset at Oishi Park", timing: "Oct 7, ~5:15PM. Cycle from Sawa Hotel (15 min). Kochia bushes turning red. Fuji peak turns orange-pink.", priority: "ESSENTIAL" },
    { icon: "🌄", name: "Lake Yamanaka Panorama-dai — Fuji sunrise", timing: "Oct 8, ~6:00AM. Taxi from Sawa Hotel (~30 min). Japan's highest lake, enormous Fuji view, almost nobody at dawn.", priority: "ESSENTIAL" },
    { icon: "📸", name: "Honcho Street (Shimoyoshida)", timing: "Oct 8, ~7:50AM. Taxi from Yamanaka (~20 min). Fuji at end of retro shophouse street. Best at dawn.", priority: "ESSENTIAL" },
    { icon: "🍜", name: "T&T Fujiyama Halal Restaurant", timing: "Oct 8, 11:30AM sharp. Halal Hoto noodles + prayer room. 4.9★. Tel: 080-5106-2280.", priority: "HIGH" },
    { icon: "⛩️", name: "Chureito Pagoda", timing: "Oct 8, ~1:00PM. 397 steps. Red pagoda + Fuji in background.", priority: "ESSENTIAL" },
    { icon: "📸", name: "Lawson + Ohashi Bridge photo", timing: "Oct 7, ~3:40PM on arrival. First Fuji shots of the trip.", priority: "HIGH" },
  ],
  osaka: [
    { icon: "🏮", name: "Dotonbori — Glico Man + Kani Doraku crab sign", timing: "Oct 9 evening. Ebisu Bridge for Glico Man photo, walk west for giant mechanical crab sign.", priority: "ESSENTIAL" },
    { icon: "📷", name: "Camera shopping — Den Den Town", timing: "Oct 9, ~9:45AM. Nipponbashi electronics district. Joshin Denki, second-hand Fujifilm. Tax-free with passport.", priority: "HIGH" },
    { icon: "🐟", name: "Kuromon Ichiba Market", timing: "Oct 9, 8:30AM. 10 min walk from E-Stay. Fresh oysters, grilled seafood, tamagoyaki.", priority: "HIGH" },
    { icon: "🦌", name: "Nara deer park + Todai-ji exterior", timing: "Oct 10 morning. Done by 11:45AM. Todai-ji exterior FREE.", priority: "ESSENTIAL" },
    { icon: "🏯", name: "Osaka Castle", timing: "Oct 10, ~2:15PM after Nara. Grounds + optional tenshu (¥600).", priority: "ESSENTIAL" },
    { icon: "🏙️", name: "Shinsekai retro district", timing: "Oct 9 afternoon — 5 min walk from E-Stay.", priority: "HIGH" },
  ],
  kyoto: [
    { icon: "⛩️", name: "Fushimi Inari — torii gate hike", timing: "Oct 11, ~11AM. Bag-free after Welcome Desk drop. Push past first 2 clusters.", priority: "ESSENTIAL" },
    { icon: "🚂", name: "Sagano Romantic Train", timing: "Oct 12, 9:02AM. ✅ Booked RM46.66. Sit RIGHT side. Scenic gorge + October foliage.", priority: "ESSENTIAL" },
    { icon: "🚣", name: "Hozugawa River Boat — Kameoka → Arashiyama", timing: "Oct 12, 11:00AM. ✅ Booked RM317.30. 2 hrs of gorge scenery.", priority: "ESSENTIAL" },
    { icon: "🎋", name: "Bamboo Grove, Arashiyama", timing: "Oct 12, ~2:15PM after boat lunch. Afternoon golden light through bamboo.", priority: "ESSENTIAL" },
    { icon: "🏯", name: "Kiyomizu-dera at dawn", timing: "Oct 13, 8:00AM. Main visit. Misty, near empty. ¥500.", priority: "ESSENTIAL" },
    { icon: "✨", name: "Ishibe Koji Road", timing: "Oct 13, ~10:15AM. Hidden photogenic alley — stone path, lanterns, bamboo fences.", priority: "HIGH" },
    { icon: "🏮", name: "Gion at dusk + Pontocho dinner", timing: "Oct 11 evening. Hanamikoji + Shirakawa canal. Pontocho for dinner.", priority: "ESSENTIAL" },
    { icon: "⛩️", name: "Yasaka Shrine + Maruyama Park", timing: "Oct 13, ~11:40AM. Open 24hrs, FREE. End of Hanamikoji street.", priority: "HIGH" },
    { icon: "🌊", name: "Shirakawa Canal walk", timing: "Oct 13, ~12:20PM. Willow-lined canal, lantern reflections.", priority: "HIGH" },
  ],
  tokyo: [
    { icon: "🏯", name: "Kamakura — Great Buddha + Hasedera", timing: "Oct 14, morning. Odakyu Freepass ¥1,640pp. Great Buddha ¥300, Hasedera ¥400.", priority: "ESSENTIAL" },
    { icon: "📸", name: "Kamakura Kōkōmae Enoden crossing", timing: "Oct 14, ~9:35AM. Slam Dunk anime famous crossing. Go FIRST while quiet. Freepass covers Enoden.", priority: "ESSENTIAL" },
    { icon: "🍜", name: "Shirasu lunch by the sea, Kamakura", timing: "Oct 14, ~12:05PM near Hase. Whitebait rice bowl — only available in Kamakura area.", priority: "HIGH" },
    { icon: "👘", name: "Kimono rental + stroll Asakusa", timing: "Oct 15, ~10AM. Kiraboshi Asakusa — walk-in ✅ No pre-booking needed!", priority: "ESSENTIAL" },
    { icon: "🍳", name: "Kappabashi Kitchen Street", timing: "Oct 15, 9:00AM. Japanese knives, ceramics — best practical gifts in Tokyo. Opens 9AM.", priority: "HIGH" },
    { icon: "🚦", name: "Shibuya Crossing at peak hour", timing: "Oct 14, ~5PM. Watch from Starbucks 2F or Mag's Park rooftop (free).", priority: "ESSENTIAL" },
    { icon: "🏮", name: "Senso-ji at night", timing: "Oct 14, ~9:30PM. 5 min walk from Toukaisou. Kaminarimon lit, lanterns, near empty.", priority: "ESSENTIAL" },
    { icon: "🍜", name: "Shinjukutei Halal Wagyu dinner", timing: "Oct 15, 6:00PM. 3-11-6 Shinjuku B103. Wagyu ramen set. Prayer room on site.", priority: "HIGH" },
    { icon: "🏮", name: "Omoide Yokocho (Memory Lane)", timing: "Oct 15, ~7:15PM. Shinjuku west exit. Smoky, red lanterns, last night atmosphere.", priority: "HIGH" },
  ],
};

const CHECKLIST = [
  {
    category: "✈️ Flights",
    color: "#4a9eff",
    items: [
      { task: "OUTBOUND: AK884 KUL→DMK (13:30 Oct 6, arr 14:45) + XJ602 DMK→NRT (01:15 Oct 7, arr 09:45). Booking: ZDNIUZ. Nadjwa: 7kg carry-on, Seat 18A→24A. Hakimi: 20kg checked + 7kg carry-on, Seat 18B→24C.", booked: true, urgent: false, when: "✓ Booked" },
      { task: "RETURN: XJ603 NRT→DMK (11:10 Oct 16, arr 15:45) + AK889 DMK→KUL (19:50 Oct 16, arr 23:00). Booking: ZDNIUZ. Both: 7kg carry-on only.", booked: true, urgent: false, when: "✓ Booked" },
    ]
  },
  {
    category: "🚌 Transport",
    color: "#ff6b35",
    items: [
      { task: "Keio Bus: Shinjuku → Kawaguchiko — Oct 7, 13:35. Busta Shinjuku 4F. Arrives ~3:35PM.", booked: true, urgent: false, when: "✓ Booked" },
      { task: "Fujiyama Liner: Kawaguchiko → Osaka Namba — Oct 8, 20:32. Arrives 07:13 Oct 9.", booked: true, urgent: false, when: "✓ Booked RM445.50" },
      { task: "Sagano Romantic Train: Torokko Saga → Kameoka — Oct 12, 9:02AM.", booked: true, urgent: false, when: "✓ Booked RM46.66" },
      { task: "Hozugawa River Boat: Kameoka → Arashiyama — Oct 12, 11:00AM.", booked: true, urgent: false, when: "✓ Booked RM317.30" },
      { task: "Willer Express: Kyoto → Tokyo Shinjuku — Oct 13, 23:50. Arrives 7:50AM Oct 14.", booked: true, urgent: false, when: "✓ Booked RM483.70" },
      { task: "Named Regular Suica x2 — buy at Narita JR counter. Say 'Suica card, name card please'. Fill name + DOB. ¥2,000 each (¥500 deposit + ¥1,500 usable).", booked: false, urgent: false, when: "Oct 7 at Narita after immigration" },
      { task: "NEX Round Trip x2 ✅ — BOUGHT! Covers Oct 7 arrival (Narita→Shinjuku) + Oct 16 departure (Shinjuku→Narita).", booked: true, urgent: false, when: "✅ Done" },
      { task: "Odakyu Enoshima-Kamakura Freepass x2 — buy at Odakyu Shinjuku counter. ¥1,640pp. Covers Shinjuku→Fujisawa round trip + unlimited Enoden.", booked: false, urgent: false, when: "Oct 14 morning at Odakyu Shinjuku" },
    ]
  },
  {
    category: "🏨 Accommodation",
    color: "#9b59b6",
    items: [
      { task: "Sawa Hotel, Fujikawaguchiko — Oct 7 (1N). Request 3F+ north-facing room.", booked: true, urgent: false, when: "✓ Booked" },
      { task: "E-Stay Ebisu, Osaka — Oct 9–11 (2N). ⚠️ Email to inform 7:13AM arrival Oct 9.", booked: true, urgent: true, when: "Email now" },
      { task: "Machiya Kamiuneya, Kyoto — Oct 11–13 (2N). Check-in desk: 685-2 Shiokojicho (3 min Kyoto Stn). Open 10AM–7PM. Tel: +81 90-8161-3870. FREE luggage delivery.", booked: true, urgent: true, when: "⚠️ Email info@ume-machiya.com — confirm Oct 11 ~2PM arrival + key drop method" },
      { task: "Asakusa Ryokan Toukaisou, Tokyo — Oct 14–16 (2N). Check-in 3–10PM. Tawaramachi G18 Exit 3 (5 min walk).", booked: true, urgent: true, when: "⚠️ Reply to their email NOW — tell them check-in ~4PM Oct 14" },
    ]
  },
  {
    category: "🎟️ Attractions",
    color: "#e91e8c",
    items: [
      { task: "👘 Kimono rental x2 — Oct 15, ~10AM. Yae Kimono Rental (Quatre Chic 6F, 1-16-2 Asakusa) or Rikawafuku (HULIC Kaminarimon 6F). ~¥5,980 women / ¥5,680 men. Pre-book required!", booked: false, urgent: true, when: "⚠️ Book NOW — October fills up fast" },
      { task: "Kotoku-in Great Buddha, Kamakura — Oct 14, ~10AM. ¥300 entry. Buy on day.", booked: false, urgent: false, when: "Day of" },
      { task: "Hasedera Temple, Kamakura — Oct 14, ~11AM. ¥400 entry. Buy on day.", booked: false, urgent: false, when: "Day of" },
      { task: "Tenryu-ji garden, Arashiyama — Oct 12, ~3PM. ¥500 entry. Buy on day.", booked: false, urgent: false, when: "Day of" },
      { task: "Kiyomizu-dera, Kyoto — Oct 13, ~8AM. ¥500 entry. Opens 6AM.", booked: false, urgent: false, when: "Day of" },
      { task: "Kodai-ji Temple, Kyoto — Oct 13, ~10:35AM. ¥600 entry. Opens 9AM.", booked: false, urgent: false, when: "Day of" },
    ]
  },
  {
    category: "📦 Luggage Forwarding (Yamato)",
    color: "#f0c040",
    items: [
      { task: "Yamato LEG 1 — Oct 8, 5:40AM at Sawa Hotel checkout. Send to E-Stay Ebisu, Osaka. ~¥1,500–2,000/bag.", booked: false, urgent: false, when: "Pay on the day" },
      { task: "Yamato LEG 2 — Oct 13, 7:20AM at konbini near machiya. Send to Toukaisou, 2-16-12 Nishiasakusa, Taito, Tokyo 111-0035. ~¥2,500–3,000/bag.", booked: false, urgent: false, when: "Pay on the day" },
    ]
  },
  {
    category: "📱 Apps + Pre-Trip Prep",
    color: "#27ae60",
    items: [
      { task: "Visit Japan Web ✅ — Nadjwa + Hakimi registered. QR code generated. Both covered under one account.", booked: true, urgent: false, when: "✅ Done" },
      { task: "Agoda eSIM ✅ — 5GB/day × 10 days for both pax. Install QR before Oct 6. Activate ONLY after landing Narita Oct 7.", booked: true, urgent: false, when: "✅ Done — activate Oct 7 at Narita" },
      { task: "GO App (Japan taxi) ✅ — downloaded and ready.", booked: true, urgent: false, when: "✅ Done" },
      { task: "Google Maps offline ✅ — downloaded.", booked: true, urgent: false, when: "✅ Done" },
      { task: "Muslim Pro / Athan ✅ — downloaded.", booked: true, urgent: false, when: "✅ Done" },
      { task: "HalalNavi ✅ — downloaded.", booked: true, urgent: false, when: "✅ Done" },
      { task: "Google Translate ✅ — Japanese offline pack downloaded.", booked: true, urgent: false, when: "✅ Done" },
      { task: "Klook app ✅ — all bookings + QR codes saved offline.", booked: true, urgent: false, when: "✅ Done" },
      { task: "Notify bank of Japan travel Oct 7–16 to avoid card blocks.", booked: false, urgent: false, when: "Before Oct 6" },
      { task: "Exchange cash ✅ — done via Wise App.", booked: true, urgent: false, when: "✅ Done" },
      { task: "Travel plug adapter ✅ — bought! Malaysia Type G → Japan Type A.", booked: true, urgent: false, when: "✅ Done" },
    ]
  },
];

const MOVEMENTS = [
  {
    from: "Narita Airport",
    to: "Shinjuku (Tokyo)",
    how: "Narita Express (N'EX)",
    duration: "~90 min",
    cost: "¥3,070 pp",
    tip: "Buy at airport. IC card won't cover this — needs separate ticket.",
    emoji: "🚆",
    date: "Oct 7, ~10:30 AM",
    color: "#4a9eff",
  },
  {
    from: "Shinjuku",
    to: "Kawaguchiko (Fuji)",
    how: "Keio / Fujikyuko Highway Bus",
    duration: "~2 hrs",
    cost: "¥1,800 pp",
    tip: "✅ BOOKED. Departs Busta Shinjuku 4F at 13:35, arrives Kawaguchiko ~3:35PM. Sit left side — Fuji appears on approach.",
    emoji: "🚌",
    date: "Oct 7, ~12:30 PM",
    color: "#4a9eff",
  },
  {
    from: "Kawaguchiko",
    to: "Osaka Namba (DIRECT)",
    how: "Fujiyama Liner night bus (Kintetsu + Fujikyuko)",
    duration: "~9–10 hrs",
    cost: "RM445.50 total (2 pax) — booked ✅",
    tip: "Booked on Klook. Boards Kawaguchiko 20:32, arrives Namba OCAT 2F at 07:13. No Shinjuku backtrack needed.",
    emoji: "🌙",
    date: "Oct 8 night → Oct 9 morning",
    color: "#ff6b35",
    overnight: true,
  },
  {
    from: "Osaka-Umeda (Hankyu)",
    to: "Kyoto-Kawaramachi (Hankyu)",
    how: "🚃 Kyo-train Garaku — Hankyu Kyoto Line",
    duration: "~43 min",
    cost: "¥410 pp",
    tip: "Runs weekends & holidays only — Oct 11 is a Sunday ✅. No reservation needed, board with Suica. 4 departures/day: 9:32, 11:32, 13:32, 15:32 from Osaka-Umeda. Target 9:32 — check out early, no extra charge. If full or missed, take next regular Hankyu Limited Express (every 10 min, same fare).",
    emoji: "🚃",
    date: "Oct 11, 9:32 AM",
    color: "#e91e8c",
  },
  {
    from: "Kyoto Station",
    to: "Tokyo (Shinjuku Expressway Bus Terminal)",
    how: "Overnight Highway Bus (Klook — Bus SA48 Standard)",
    duration: "~8 hrs",
    cost: "RM483.70 total (2 pax) — booked ✅",
    tip: "Departs 23:50 from Kyoto Station. Arrives Shinjuku ~7:50 AM Oct 14.",
    emoji: "🌙",
    date: "Oct 13, 23:50",
    color: "#ff6b35",
    overnight: true,
  },
  {
    from: "Shinjuku (Tokyo)",
    to: "Narita Airport",
    how: "Narita Express (N'EX)",
    duration: "~90 min",
    cost: "¥3,070 pp",
    tip: "Depart Shinjuku by 7:45 AM for 11:10 AM flight. Arrives Narita ~9:15 AM — 2 hrs before departure. Buy ticket night before or at station.",
    emoji: "🚆",
    date: "Oct 16, 8:00 AM",
    color: "#e74c3c",
  },
];

// ─── DETAILED HOUR-BY-HOUR ────────────────────────────────────────────────────

const DETAILED = [
  {
    date: "Oct 7", title: "Arrive → Fuji Afternoon & Sunset", color: "#4a9eff", emoji: "🗻",
    note: "🌡️ Kawaguchiko: 8–18°C (cold at dawn ~8°C, bring jacket!) | Flight: XJ602 DMK→NRT departs 01:15AM, lands 9:45AM at Narita Terminal 2. Hakimi has 20kg checked bag to collect. Prayer: Subuh on plane → Jamak Zuhur+Asr at Sawa Hotel after check-in → Jamak Maghrib+Isha at hotel.",
    slots: [
      { t: "9:45", d: "Land Narita Terminal 2 (Thai AirAsia X XJ602). Immigration + collect Hakimi's 20kg checked bag (~75 min). Both carry-ons with you.", kind: "transit", dur: "75 min" },
      { t: "11:00", d: "Head to JR counter at Narita. Queue ~10–15 min. Buy: (1) Named Regular Suica — say 'Suica card, name card please', fill name + DOB form, ¥2,000 total. (2) NEX Round Trip ticket — ¥5,000pp covers today + Oct 16 return.", kind: "transit", dur: "30 min" },
      { t: "11:30", d: "🚆 Narita Express → Shinjuku. ~90 min — rest, decompress, first views of Japan.", kind: "transit", dur: "90 min" },
      { t: "13:00", d: "Arrive Shinjuku. Quick lunch at Busta Shinjuku 4F food court or grab onigiri from konbini. Walk to bus terminal.", kind: "food", dur: "30 min" },
      { t: "13:35", d: "🚌 Keio Highway Bus from Busta Shinjuku 4F → Kawaguchiko Station. ✅ BOOKED. Sit left side — Fuji appears on approach. ~2 hrs.", kind: "transit", dur: "~2 hrs" },
      { t: "15:35", d: "Arrive Kawaguchiko Station. Fuji visible from the station building — first photo here.", kind: "walk", dur: "5 min" },
      { t: "15:40", d: "📸 LAWSON PHOTO SPOT: 2 min walk north of station. Fuji towers behind the convenience store. 10 min total — quick and iconic.", kind: "highlight", dur: "10 min" },
      { t: "15:55", d: "Walk 8 min east to Kawaguchi Ohashi Bridge. Walk onto the bridge — Fuji reflected in the lake on a calm day.", kind: "highlight", dur: "20 min" },
      { t: "16:20", d: "Check in Sawa Hotel — request 3rd floor or above, north-facing room for Fuji view.", kind: "rest", dur: "15 min" },
      { t: "16:35", d: "🕌 JAMAK TAQDIM — Zuhur + Asr at Sawa Hotel room. Private, quiet, perfect.", kind: "rest", dur: "20 min" },
      { t: "16:55", d: "Rent bicycle from station area (¥1,000/day). Cycle north along lakeside road to Oishi Park — 15 min.", kind: "transit", dur: "15 min" },
      { t: "17:10", d: "Oishi Park — October kochia bushes turning red/orange. Walk lakeside path, different Fuji angles.", kind: "sight", dur: "20 min" },
      { t: "17:30", d: "🌅 SUNSET at Oishi Park (~5:15PM mid-Oct in Kawaguchiko). Fuji peak turns orange-pink. Bring a jacket — temperature drops after sunset.", kind: "highlight", dur: "30 min" },
      { t: "18:05", d: "Cycle back to hotel (~15 min).", kind: "transit", dur: "15 min" },
      { t: "18:30", d: "Shower, change. Dinner nearby — Hoto noodles or soba. Ask staff for no pork recommendation.", kind: "food", dur: "75 min" },
      { t: "20:00", d: "🕌 JAMAK TAKHIR — Maghrib + Isha at Sawa Hotel room. Charge phone. Set TWO alarms for 5:20AM. Lay out warm clothes for tomorrow.", kind: "rest", dur: "20 min" },
      { t: "20:00", d: "🕌 JAMAK TAKHIR — Maghrib + Isha at Sawa Hotel room. Charge phone. Set TWO alarms for 5:20AM. Pack daypack tonight: tomorrow's clothes, chargers, valuables, prayer mat, bus snacks.", kind: "rest", dur: "20 min" },
    ]
  },
  {
    date: "Oct 8", title: "Yamanaka Sunrise → Honcho → T&T Lunch → Chureito → Osaka", color: "#4a9eff", emoji: "🌄",
    note: "🌡️ Kawaguchiko: 8–18°C (6AM Yamanaka very cold ~8°C, midday ~18°C) | Big day — 4 zones. ✅ Bags forwarded last night — daypack only all day. Prayer plan: 🕌 Subuh 5:20AM → Zuhur+Asr jamak taqdim at T&T prayer room ~11:30AM → Maghrib+Isha jamak takhir before boarding bus.",
    slots: [
      { t: "5:20", d: "🕌 SUBUH — pray at Sawa Hotel room.", kind: "rest", dur: "15 min" },
      { t: "5:40", d: "Check out Sawa Hotel. 📦 YAMATO at front desk — say 'Takuhaibin, onegaishimasu'. Send both backpacks → E-Stay Ebisu, Osaka. Fill waybill (staff will help). Delivery date: Oct 9. Cost ~¥1,500–2,000 per bag. Pack daypack: today's clothes, chargers, valuables, prayer mat, bus snacks. Then taxi to Yamanaka. ✅ Fully bag-free all day!", kind: "transit", dur: "20 min" },
      { t: "6:00", d: "🌄 LAKE YAMANAKA — PANORAMA-DAI: Japan's highest lake (~980m). Fuji looms enormous directly across the water. Watch sunrise light the peak gold-orange.", kind: "highlight", dur: "60 min" },
      { t: "7:00", d: "Konbini breakfast in the Yamanaka area. Enjoy the view.", kind: "food", dur: "30 min" },
      { t: "7:30", d: "🚕 Taxi: Lake Yamanaka → Honcho Street, Shimoyoshida (~20 min, ~¥2,000).", kind: "transit", dur: "20 min" },
      { t: "7:50", d: "📸 HONCHO STREET: Stand at the famous T-junction — Fuji fills the end of the retro shophouse street. Best morning light.", kind: "highlight", dur: "45 min" },
      { t: "8:45", d: "Explore Shimoyoshida neighbourhood — retro shop signs, old textile town vibes.", kind: "walk", dur: "45 min" },
      { t: "11:30", d: "🍜 T&T FUJIYAMA HALAL RESTAURANT + 🕌 JAMAK TAQDIM: Opens 11:30AM sharp. USE THE PRAYER ROOM here — perfectly timed for Zuhur+Asr jamak taqdim. Pray first, then eat. Hoto noodles, beef sukiyaki, chicken. ¥1,000–1,500pp. 4.9★.", kind: "highlight", dur: "90 min" },
      { t: "13:00", d: "Walk 10 min to Arakurayama Sengen Park base. Climb 397 steps to Chureito Pagoda (~20–25 min up).", kind: "walk", dur: "25 min" },
      { t: "13:25", d: "⛩️ CHUREITO PAGODA: Five-storey red pagoda, Fuji directly behind. October foliage on hillside.", kind: "highlight", dur: "50 min" },
      { t: "14:30", d: "Walk 15 min to Shimoyoshida Station. Fujikyuko Line → Kawaguchiko (~13 min, ¥220pp).", kind: "transit", dur: "20 min" },
      { t: "15:00", d: "Arrive Kawaguchiko. Lakeside walk, sit by the lake. Enjoy Fuji one last time.", kind: "sight", dur: "90 min" },
      { t: "16:30", d: "Konbini run — snacks, drinks, onigiri, neck pillow for the overnight bus.", kind: "food", dur: "30 min" },
      { t: "18:00", d: "Final dinner near Kawaguchiko Station.", kind: "food", dur: "60 min" },
      { t: "19:30", d: "🕌 JAMAK TAKHIR — Maghrib + Isha. Find quiet spot near station or konbini area. Bring prayer mat.", kind: "rest", dur: "20 min" },
      { t: "20:00", d: "Head to Bus Stop No. 2. Confirm Fujiyama Liner boarding.", kind: "rest", dur: "30 min" },
      { t: "20:32", d: "🌙 Board Fujiyama Liner — departs 20:32 sharp → Osaka Namba OCAT 2F DIRECT. ✅ Booked RM445.50. Arrives 07:13 next morning.", kind: "highlight", dur: "~10.5 hrs" },
    ]
  },
  {
    date: "Oct 9", title: "Osaka — Gentle Arrival Day", color: "#e91e8c", emoji: "🏮",
    note: "🌡️ Osaka: 15–23°C (comfortable, light jacket for evening) | Arrive 7:13AM off overnight bus. Prayer plan: 🕌 Subuh on the bus before arrival → Zuhur+Asr jamak taqdim ~1PM at E-Stay after rest → Maghrib+Isha jamak takhir ~9PM at E-Stay.",
    slots: [
      { t: "7:13", d: "Arrive Osaka Namba OCAT 2F off the Fujiyama Liner. Walk ~10 min to E-Stay Ebisu (Shin-Imamiya). ✅ Backpacks already forwarded via Yamato — ask reception, they arrive this afternoon. Freshen up at hotel lobby or nearby 24hr manga café shower (¥500).", kind: "transit", dur: "30 min" },
      { t: "7:45", d: "Konbini breakfast — sit outside, decompress. No rushing today.", kind: "food", dur: "30 min" },
      { t: "8:30", d: "Walk 10 min to Kuromon Ichiba Market. Early stalls are open — fresh oysters, tamagoyaki, grilled seafood on sticks. Eat as you walk.", kind: "food", dur: "75 min" },
      { t: "9:45", d: "📷 DEN DEN TOWN CAMERA SHOPPING — Nipponbashi electronics district, 5 min walk from Kuromon. Key stops: Joshin Denki (large new camera floor, tax-free with passport ✅), K's Denki, and specialist second-hand camera shops along Nipponbashi-suji street. Great for camera bodies, lenses, accessories. Bring passport for tax-free shopping — saves 10%.", kind: "highlight", dur: "90 min" },
      { t: "13:00", d: "🕌 JAMAK TAQDIM — Zuhur + Asr at E-Stay room or lobby quiet corner. Then lunch near Shinsekai — kushikatsu restaurant.", kind: "rest", dur: "90 min" },
      { t: "14:30", d: "🏙️ Shinsekai retro district — Tsutenkaku Tower, Billiken statues, retro 1950s Osaka street vibes. 5 min walk from E-Stay.", kind: "sight", dur: "75 min" },
      { t: "15:00", d: "Check in to E-Stay Ebisu properly. Shower and rest — mandatory after overnight bus.", kind: "rest", dur: "90 min" },
      { t: "17:00", d: "Shinsaibashi covered arcade (15 min metro). 600m of shops — browse lightly.", kind: "sight", dur: "75 min" },
      { t: "18:30", d: "🏮 DOTONBORI at night — start at Ebisu Bridge for the iconic 🏃 GLICO MAN neon sign photo (running man in lights, best shot from the bridge). Walk west along the canal → 🦀 KANI DORAKU — giant mechanical moving crab sign above the restaurant entrance, one of Osaka's most iconic landmarks. Canal walk, neon reflections on water. Halal takoyaki stalls near canal. Dinner crawl along the strip.", kind: "highlight", dur: "2.5 hrs" },
      { t: "21:00", d: "🕌 JAMAK TAKHIR — Maghrib + Isha at E-Stay room. Sleep early — tomorrow is Nara + Castle.", kind: "rest", dur: "20 min" },
    ]
  },
  {
    date: "Oct 10", title: "Nara Half Day + Osaka Castle", color: "#e91e8c", emoji: "🦌",
    note: "🌡️ Osaka/Nara: 15–23°C (pleasant walking weather) | Prayer plan: 🕌 Subuh at E-Stay → Zuhur+Asr jamak taqdim ~1:30PM on train back from Nara → Maghrib+Isha jamak takhir ~9:30PM after dinner.",
    slots: [
      { t: "5:30", d: "🕌 SUBUH — pray at E-Stay room. Go back to sleep.", kind: "rest", dur: "15 min" },
      { t: "7:30", d: "Walk 7 min to Shin-Imamiya Station. JR Yamatoji Rapid → JR Nara Station (¥580pp, ~50 min).", kind: "transit", dur: "60 min" },
      { t: "8:45", d: "Arrive Nara. Walk 20 min east into Nara Park. Deer appear immediately. Buy shika senbei (deer crackers, ¥200).", kind: "walk", dur: "20 min" },
      { t: "9:15", d: "🦌 Tōdai-ji Great Buddha Hall — walk around the exterior (FREE). The building itself is massive — largest wooden structure in the world. Deer roam freely around the grounds. No need to pay ¥600 entry.", kind: "highlight", dur: "45 min" },
      { t: "10:30", d: "Kasuga Taisha shrine via forested deer path. Lantern-lined approach, peaceful forest.", kind: "sight", dur: "60 min" },
      { t: "11:30", d: "Nakatanidou — famous fresh pounded mochi on the street. Quick Nara Park snack walk.", kind: "food", dur: "45 min" },
      { t: "12:15", d: "Walk to JR Nara. JR Yamatoji Rapid → Osaka-Namba (~50 min, ¥580).", kind: "transit", dur: "60 min" },
      { t: "13:30", d: "🕌 JAMAK TAQDIM — Zuhur + Asr on the train or at Namba station quiet area. Then quick lunch near Namba.", kind: "rest", dur: "60 min" },
      { t: "14:30", d: "🏯 Osaka Castle: Metro Tanimachi Line → Tanimachi 4-chome (~20 min, ¥230). Castle grounds + tenshu interior.", kind: "highlight", dur: "2 hrs" },
      { t: "16:30", d: "Osaka Castle park walk — Nishinomaru Garden (¥200). October foliage starting.", kind: "walk", dur: "45 min" },
      { t: "17:30", d: "Metro back to Namba. 🛍️ Shinsaibashi covered arcade — proper evening browse.", kind: "sight", dur: "90 min" },
      { t: "19:30", d: "Dinner in Dotonbori or Amerikamura. Last Osaka night — eat well.", kind: "food", dur: "90 min" },
      { t: "21:30", d: "🕌 JAMAK TAKHIR — Maghrib + Isha at E-Stay room. Sleep.", kind: "rest", dur: "20 min" },
    ]
  },
  {
    date: "Oct 11", title: "Osaka → Kyoto + Fushimi Inari", color: "#9b59b6", emoji: "⛩️",
    note: "🌡️ Kyoto: 14–22°C (comfortable, light layer for morning) | Prayer plan: 🕌 Subuh at E-Stay → Zuhur+Asr jamak taqdim ~12:45PM after Fushimi Inari lunch → Maghrib+Isha jamak takhir ~9PM after Gion dinner at machiya.",
    slots: [
      { t: "5:30", d: "🕌 SUBUH — pray at E-Stay room. Go back to sleep.", kind: "rest", dur: "15 min" },
      { t: "8:00", d: "Pack up and check out E-Stay Ebisu early — just hand key and go. Konbini breakfast near Shin-Imamiya.", kind: "food", dur: "30 min" },
      { t: "8:30", d: "Walk 3 min to Dobutsuen-mae Station → Osaka Metro Midosuji Line → Umeda (8 stops, ~15 min, ¥290). Bags on your back — overhead rack on Garaku.", kind: "transit", dur: "25 min" },
      { t: "9:15", d: "Head to Hankyu Osaka-Umeda Station platform. Board 🚃 Kyo-train Garaku at 9:32 — tap Suica (¥410pp). 43 min scenic ride to Kyoto.", kind: "highlight", dur: "43 min" },
      { t: "10:15", d: "Arrive Kyoto-Kawaramachi. Metro/walk to Kyoto Station (~10 min, ¥160 or walkable in 15 min).", kind: "transit", dur: "15 min" },
      { t: "10:30", d: "📦 MACHIYA INNS & HOTELS check-in desk: 685-2 Shiokojicho, Shimogyo Ward (3 min walk from Kyoto Station). Open 10AM–7PM. Tel: +81 90-8161-3870. Collect room key + entrance door code. Hand bags — FREE delivery to machiya. ✅ Bag-free from here!", kind: "transit", dur: "25 min" },
      { t: "10:55", d: "Kintetsu Line from Kyoto Station → Fushimi Inari (2 stops, ~10 min, ¥150). Bag-free hike through torii gates. Push past first 2 clusters — upper trails thin out fast.", kind: "highlight", dur: "2 hrs" },
      { t: "10:35", d: "⛩️ Fushimi Inari Taisha. Hike through torii gates — push past first 2 clusters. Aim for Yotsutsuji viewpoint (~30 min up).", kind: "highlight", dur: "2 hrs" },
      { t: "13:00", d: "Inari sushi lunch at shrine approach stalls.", kind: "food", dur: "45 min" },
      { t: "13:45", d: "🕌 JAMAK TAQDIM — Zuhur + Asr. Find quiet corner near Fushimi Inari Station or café.", kind: "rest", dur: "20 min" },
      { t: "14:05", d: "Keihan Line → Gion-Shijo (~15 min, ¥220). Walk to Machiya Kamiumeya in Higashiyama (~15 min). Bags already delivered ✅ — just let yourself in with door code.", kind: "transit", dur: "35 min" },
      { t: "15:00", d: "Rest at machiya. Heated tatami floors, private garden — enjoy it.", kind: "rest", dur: "90 min" },
      { t: "17:00", d: "🏮 Gion at dusk — Hanamikoji, Shirakawa canal. Best light 5:30–7 PM when lanterns glow.", kind: "highlight", dur: "2 hrs" },
      { t: "19:30", d: "🍽️ PONTOCHO ALLEY dinner — narrow riverside lane parallel to Kamo River, best at night when lanterns reflect on the water. First night in Kyoto — make it count.", kind: "food", dur: "90 min" },
      { t: "21:00", d: "🕌 JAMAK TAKHIR — Maghrib + Isha at machiya tatami room. Quiet, private. Sleep.", kind: "rest", dur: "20 min" },
    ]
  },
  {
    date: "Oct 12", title: "Full Day Arashiyama — Sagano + Hozugawa + Bamboo + Tenryu-ji", color: "#9b59b6", emoji: "🎋",
    note: "🌡️ Kyoto: 14–22°C (~20°C in Hozugawa gorge with river breeze — bring light jacket) | Full day in Arashiyama — no cross-city rush. ✅ Bags at machiya — send via Yamato TOMORROW morning (Oct 13) before leaving. Prayer plan: 🕌 Subuh 4:30AM machiya → Jamak Zuhur+Asr at boat dock → Jamak Maghrib+Isha at machiya after dinner.",
    slots: [
      { t: "4:30", d: "🕌 SUBUH — pray at machiya tatami room. Go back to sleep.", kind: "rest", dur: "15 min" },
      { t: "7:00", d: "Wake up. Pack daypack for today + night bus essentials.", kind: "rest", dur: "15 min" },
      { t: "7:15", d: "Konbini — grab breakfast (onigiri, egg sandwich), snacks + drinks for the boat ride.", kind: "food", dur: "10 min" },
      { t: "7:25", d: "Walk 8 min south to Gion-Shijo Station. Tap Suica → Keihan Line → Tofukuji (2 stops, ~5 min, ¥160) → JR Sagano Line → Saga-Arashiyama (~17 min, ¥240).", kind: "transit", dur: "35 min" },
      { t: "8:00", d: "Arrive JR Saga-Arashiyama. Walk 1 min to Torokko Saga Station. 1 hr buffer — sit by the Oi River, finish breakfast, relax.", kind: "walk", dur: "60 min" },
      { t: "9:02", d: "🚂 SAGANO ROMANTIC TRAIN departs → Torokko Kameoka. 25 min scenic gorge ride. October foliage on canyon walls. Sit RIGHT side for best views.", kind: "highlight", dur: "25 min" },
      { t: "9:27", d: "Arrive Torokko Kameoka. Shuttle bus to Hozugawa boat dock (¥350, ~15 min). Arrive dock ~9:45AM.", kind: "transit", dur: "20 min" },
      { t: "10:00", d: "🕌 JAMAK TAQDIM — Zuhur + Asr at boat dock. Quiet riverside area. Bring prayer mat in daypack.", kind: "rest", dur: "20 min" },
      { t: "11:00", d: "🚣 HOZUGAWA RIVER BOAT RIDE — 16km downstream Kameoka → Arashiyama. 2 hrs of gorge scenery, October foliage, skilled boatmen navigating rapids. ¥6,000pp (~RM158.65pp). Drops at Togetsukyo Bridge.", kind: "highlight", dur: "2 hrs" },
      { t: "13:00", d: "Arrive Arashiyama. Lunch riverside — yudofu or cold soba by the Oi River. Take your time.", kind: "food", dur: "75 min" },
      { t: "14:15", d: "🎋 BAMBOO GROVE — afternoon October light through bamboo is golden and warm. Walk end-to-end (~20 min). No rush.", kind: "highlight", dur: "45 min" },
      { t: "15:00", d: "Tenryu-ji inner garden (¥500, open till 5PM). Zen rock garden, pond, mountain backdrop. Fully relaxed visit.", kind: "sight", dur: "60 min" },
      { t: "16:00", d: "🌉 Togetsukyo Bridge stroll — iconic Arashiyama view, October light on the mountains. Browse riverside shops.", kind: "walk", dur: "60 min" },
      { t: "17:00", d: "JR Sagano Line from Saga-Arashiyama → Tofukuji → Gion-Shijo → walk to machiya (~40 min total).", kind: "transit", dur: "45 min" },
      { t: "17:45", d: "Back at machiya. Freshen up, rest.", kind: "rest", dur: "45 min" },
      { t: "18:30", d: "Dinner near Higashiyama — quiet soba, teishoku or ramen close to machiya. Maruyama Park area has nice spots.", kind: "food", dur: "75 min" },
      { t: "20:00", d: "🕌 JAMAK TAKHIR — Maghrib + Isha at machiya tatami room. Pack daypack for tomorrow + night bus. Sleep.", kind: "rest", dur: "30 min" },
    ]
  },
  {
    date: "Oct 13", title: "Kyoto — Final Walk: Kiyomizu → Gion → Nishiki → Kyoto Station", color: "#9b59b6", emoji: "🏮",
    note: "🌡️ Kyoto: 14–22°C (great walking weather, cool evening) | Perfect southeast → northwest route, all mostly downhill, ending at Kyoto Station for night bus. Yamato first, then bag-free all day. Prayer plan: 🕌 Subuh 4:30AM → Jamak Zuhur+Asr ~11:30AM near Hanamikoji → Jamak Maghrib+Isha ~7:30PM Kyoto Station.",
    slots: [
      { t: "4:30", d: "🕌 SUBUH — pray at machiya tatami room. Go back to sleep.", kind: "rest", dur: "15 min" },
      { t: "7:00", d: "Wake up. Pack main backpacks for Yamato. Pack daypack for today + night bus.", kind: "rest", dur: "20 min" },
      { t: "7:20", d: "📦 YAMATO FORWARD: Walk to nearest FamilyMart or 7-Eleven (~3 min). Send both backpacks → Asakusa Ryokan Toukaisou, Tokyo. Address: 2-16-12 Nishiasakusa, Taito, Tokyo 111-0035. Delivery date Oct 14. ~¥2,500–3,000 per bag. Keep tracking slip.", kind: "transit", dur: "20 min" },
      { t: "7:40", d: "Return key to machiya key drop box or Welcome Desk (confirm method). ✅ Checkout done. Grab konbini breakfast nearby.", kind: "transit", dur: "20 min" },
      { t: "8:00", d: "🏯 KIYOMIZU-DERA — walk uphill 15 min from machiya (opens 6AM). Misty morning, near empty. Main Kiyomizu visit. ¥500 entry. Views of Kyoto below.", kind: "highlight", dur: "75 min" },
      { t: "9:15", d: "🚶 Walk downhill → SANNENZAKA → NINENZAKA. Preserved Edo stone lanes, matcha soft serve, last souvenir shops — ceramics, fans, matcha sweets.", kind: "walk", dur: "60 min" },
      { t: "10:15", d: "✨ ISHIBE KOJI ROAD — hidden photogenic alley just off Ninenzaka. Stone path, wooden machiya, bamboo fences, glowing lanterns. One of Kyoto's most beautiful hidden streets.", kind: "highlight", dur: "20 min" },
      { t: "10:35", d: "⛩️ KODAI-JI TEMPLE (opens 9AM, ¥600). Beautiful zen garden, reflective pond, bamboo grove inside. October foliage on the hillside.", kind: "sight", dur: "45 min" },
      { t: "11:20", d: "🏮 HANAMIKOJI STREET — walk north through the heart of Gion geisha district. Traditional teahouses, red lanterns, stone-paved street.", kind: "walk", dur: "20 min" },
      { t: "11:40", d: "⛩️ YASAKA SHRINE — at the top of Hanamikoji, the big orange torii gate marks the entrance. Open 24hrs, FREE. Walk through the main hall grounds into Maruyama Park behind it. Peaceful, beautiful, effortless — you're passing right by anyway.", kind: "sight", dur: "20 min" },
      { t: "12:00", d: "🕌 JAMAK TAQDIM — Zuhur + Asr. Find quiet corner in Maruyama Park or nearby café.", kind: "rest", dur: "20 min" },
      { t: "12:20", d: "🌊 SHIRAKAWA CANAL — willow-lined canal, stone bridges, lantern reflections on water. Most romantic street in Gion. Stroll slowly.", kind: "highlight", dur: "30 min" },
      { t: "12:35", d: "🍜 HONOLU PREMIER NISHIKI — Halal certified ramen right next to Nishiki Market! Satake Bldg 2F, 571 Obiya-cho, Nakagyo-ku (5 min walk from Nishiki). Wagyu beef ramen, chicken ramen, gyoza. Tel: 075-746-3787. Rich broth, premium halal ingredients. Last proper Kyoto meal.", kind: "food", dur: "75 min" },
      { t: "14:00", d: "Walk 15 min south to Kyoto Station area. ✅ Daypack only — no bags to worry about.", kind: "transit", dur: "15 min" },
      { t: "14:15", d: "Kyoto Tower B2 browse. Rest, sit down, charge devices.", kind: "rest", dur: "90 min" },
      { t: "16:00", d: "Explore Kyoto Station area — Isetan basement, station roof garden, souvenir shops.", kind: "rest", dur: "90 min" },
      { t: "18:00", d: "🍚 AYAM-YA KARASUMA — Halal certified chicken ramen + rice bowls. Douka Bldg 1F, 470 Kannondocho, Nakagyo-ku (~10 min walk from Kyoto Station). Certified by MHC/JAKIM. Has prayer space + wudhu. Open Mon-Sat till 10PM. Oct 13 is Monday ✅. Tel: 075-253-1688.", kind: "food", dur: "90 min" },
      { t: "17:30", d: "Kyoto Station rooftop garden or Isetan basement. Rest, explore.", kind: "rest", dur: "120 min" },
      { t: "19:30", d: "🕌 JAMAK TAKHIR — Maghrib + Isha. Ayam-Ya has prayer space + wudhu — use it after dinner. ✅", kind: "rest", dur: "20 min" },
      { t: "23:35", d: "Walk to Kyoto Station highway bus terminal. Confirm boarding bay for Klook bus (SA48).", kind: "transit", dur: "15 min" },
      { t: "23:50", d: "🌙 Board overnight bus → Tokyo Shinjuku. Arrives ~7:50AM. Goodbye Kyoto — sleep well.", kind: "highlight", dur: "~8 hrs" },
    ]
  },
  {
    date: "Oct 14", title: "Tokyo — Kamakura Day Trip + Shibuya + Senso-ji Night", color: "#27ae60", emoji: "🗼",
    note: "🌡️ Tokyo/Kamakura: 15–22°C (pleasant coastal breeze at Kamakura) | Arrive Shinjuku 7:50AM — go straight to Kamakura, no detour. ✅ Bags already at Toukaisou via Yamato. Check in 3PM perfectly timed. Prayer: Subuh on bus → Jamak Taqdim at Toukaisou ~3PM → Jamak Takhir at Toukaisou ~10PM.",
    slots: [
      { t: "7:50", d: "Arrive Shinjuku Expressway Bus Terminal. ✅ Bags already at Toukaisou via Yamato — no lockers needed. Walk to Odakyu Shinjuku Station (south exit, 5 min).", kind: "transit", dur: "10 min" },
      { t: "8:00", d: "🎫 Buy ODAKYU ENOSHIMA-KAMAKURA FREEPASS at Odakyu Shinjuku Station ticket counter. ¥1,640pp (~RM85 total for 2). Includes: round-trip Odakyu Shinjuku→Fujisawa + unlimited Enoden all day. Worth it — Enoden alone costs ¥260 per ride.", kind: "transit", dur: "10 min" },
      { t: "8:10", d: "Odakyu Line: Shinjuku → Fujisawa (~60 min). Romancecar Express if available (¥900 surcharge, reserved seats, scenic). Otherwise take the regular Odakyu Limited Express. Sit and rest — first proper sleep after overnight bus!", kind: "transit", dur: "60 min" },
      { t: "9:10", d: "Arrive Fujisawa. Transfer to Enoden at Fujisawa Station. Board Enoden → Kamakura Kōkōmae direction. Konbini breakfast on the platform.", kind: "transit", dur: "25 min" },
      { t: "9:35", d: "📸 KAMAKURA KŌKŌMAE STATION (鎌倉高校前) — hop off here. Famous Slam Dunk anime level crossing with ocean and Enoden tram in one shot. Quiet at this hour — best time to shoot! Wait at the crossing for the tram to pass. Stand slightly left of the crossing for the classic angle. Then reboard Enoden toward Hase (2 stops, ~5 min).", kind: "highlight", dur: "25 min" },
      { t: "10:00", d: "Arrive Hase Station. 5 min walk to Great Buddha area.", kind: "transit", dur: "5 min" },
      { t: "10:05", d: "🏯 KOTOKU-IN GREAT BUDDHA — 13.35m bronze Buddha, built 1252. ¥300 entry. October foliage on surrounding hills. Can enter hollow Buddha interior (¥20 extra).", kind: "highlight", dur: "60 min" },
      { t: "11:05", d: "🌊 HASEDERA TEMPLE (5 min walk, ¥400). Stunning ocean view terrace overlooking Sagami Bay. October foliage in garden. Kannon statue 9.18m tall.", kind: "highlight", dur: "60 min" },
      { t: "12:05", d: "🍜 SHIRASU LUNCH by the sea — fresh whitebait (shirasu) is Kamakura's local specialty. Shirasu-don (whitebait rice bowl) near Hase or Yuigahama beach. Only available in Kamakura area.", kind: "food", dur: "60 min" },
      { t: "13:05", d: "Enoden: Hase → Kamakura Station (Freepass ✅, ~10 min). Browse Komachi-dori shopping street — local crafts, matcha snacks, Kamakura sweets.", kind: "walk", dur: "40 min" },
      { t: "13:45", d: "Enoden: Kamakura → Fujisawa (~35 min, Freepass ✅). Then Odakyu → Shinjuku (~60 min, Freepass ✅).", kind: "transit", dur: "100 min" },
      { t: "15:25", d: "Arrive Shinjuku. Metro to Tawaramachi G18 (Ginza Line, ~30 min). Exit 3 → straight → Bakery Yamazaki left → 5 blocks → Lawson left → LEFT kebab shop → 2 blocks → Hair So-y → RIGHT → Toukaisou on left.", kind: "transit", dur: "40 min" },
      { t: "16:05", d: "🏨 CHECK IN Toukaisou. ✅ Yamato bags here. Shower, rest.", kind: "rest", dur: "45 min" },
      { t: "16:50", d: "🕌 JAMAK TAQDIM — Zuhur + Asr at Toukaisou room.", kind: "rest", dur: "20 min" },
      { t: "17:10", d: "Metro → Shibuya (Ginza Line, ~30 min). 🚦 SHIBUYA CROSSING at peak hour — watch from Starbucks 2F or Mag's Park.", kind: "highlight", dur: "2 hrs" },
      { t: "19:30", d: "Dinner in Shibuya — ramen or izakaya.", kind: "food", dur: "75 min" },
      { t: "21:00", d: "Metro back to Asakusa (~30 min via Ginza Line).", kind: "transit", dur: "35 min" },
      { t: "21:30", d: "🏮 SENSO-JI AT NIGHT — 5 min walk from Toukaisou. Kaminarimon gate dramatically lit, incense smoke, stone lanterns glowing. Near empty. Walk through main hall approach and inner grounds.", kind: "highlight", dur: "60 min" },
      { t: "22:30", d: "🕌 JAMAK TAKHIR — Maghrib + Isha at Toukaisou room. Sleep.", kind: "rest", dur: "20 min" },
    ]
  },
  {
    date: "Oct 15", title: "Tokyo — Asakusa Morning + Kimono + Kappabashi + Shinjuku Night", color: "#27ae60", emoji: "🛍️",
    note: "🌡️ Tokyo: 15–22°C (comfortable walking weather) | Relaxed last full day. Asakusa morning with kimono stroll, then Shinjuku for dinner + Omoide Yokocho. Prayer: Subuh at Ryokan → Jamak Taqdim at Toukaisou ~2PM → Jamak Takhir at Shinjukutei prayer room ~7:45PM.",
    slots: [
      { t: "4:25", d: "🕌 SUBUH — pray at Asakusa Ryokan room. Go back to sleep.", kind: "rest", dur: "15 min" },
      { t: "8:30", d: "Breakfast near Asakusa — konbini or café near Kaminarimon.", kind: "food", dur: "30 min" },
      { t: "9:00", d: "🍳 KAPPABASHI KITCHEN STREET (10 min walk). Japanese knives, ceramics, chopsticks, fake food samples — best practical gifts in Tokyo. Opens 9AM.", kind: "sight", dur: "60 min" },
      { t: "10:00", d: "👘 KIMONO RENTAL — Yae Kimono Rental (Quatre Chic 6F, 1-16-2 Asakusa) or Rikawafuku (HULIC Kaminarimon 6F). Opens 9:30AM. ~¥5,980 women / ¥5,680 men. Includes hairstyling, accessories, geta sandals. Book in advance!", kind: "highlight", dur: "60 min" },
      { t: "11:00", d: "👘 STROLL ASAKUSA IN KIMONO — Nakamise shopping street to Senso-ji gates, Hoppy Street, Sumida River waterfront. October cool — perfect kimono weather. Photos at Kaminarimon gate.", kind: "highlight", dur: "90 min" },
      { t: "12:30", d: "Lunch in Asakusa in kimono — halal ramen or teishoku near Kaminarimon.", kind: "food", dur: "60 min" },
      { t: "13:30", d: "Return kimono (must return by 17:30). Change back to own clothes.", kind: "transit", dur: "20 min" },
      { t: "13:50", d: "Back to Toukaisou (5 min walk). Rest, pack daypack for Shinjuku evening.", kind: "rest", dur: "60 min" },
      { t: "14:50", d: "🕌 JAMAK TAQDIM — Zuhur + Asr at Toukaisou room.", kind: "rest", dur: "20 min" },
      { t: "15:30", d: "Metro to Shinjuku (Ginza Line → Oedo Line, ~25 min, ¥310pp). Browse Shinjuku area at leisure.", kind: "transit", dur: "30 min" },
      { t: "16:00", d: "Free time in Shinjuku — Takashimaya Times Square, Isetan department store, or just walk the streets.", kind: "walk", dur: "90 min" },
      { t: "18:00", d: "🍜 SHINJUKUTEI HALAL WAGYU — 3-11-6 Shinjuku B103 (4 min from Shinjuku-sanchome Stn). Wagyu ramen + sushi + karaage set. Halal certified. Prayer room on site. Open till 9PM.", kind: "highlight", dur: "75 min" },
      { t: "19:15", d: "🏮 OMOIDE YOKOCHO (Memory Lane) — narrow smoky alley behind Shinjuku Station west exit. Red lanterns, tiny yakitori stalls. Walk slowly, soak it in. Last night in Japan.", kind: "highlight", dur: "30 min" },
      { t: "19:45", d: "🕌 JAMAK TAKHIR — Maghrib + Isha at Shinjukutei prayer room (5 min back).", kind: "rest", dur: "20 min" },
      { t: "20:05", d: "Shinjuku → Asakusa (Ginza Line, ~30 min, ¥270pp).", kind: "transit", dur: "35 min" },
      { t: "20:40", d: "Back at Toukaisou. 📦 PACK EVERYTHING TONIGHT. Weigh bags. Set TWO alarms for 6:00AM. Flight 11:10AM.", kind: "rest", dur: "" },
    ]
  },
  {
    date: "Oct 16", title: "Fly Home — NRT→DMK→KUL", color: "#e74c3c", emoji: "✈️",
    note: "🌡️ Tokyo: 15–22°C | XJ603 NRT→DMK 11:10AM (arr 15:45) → AK889 DMK→KUL 19:50 (arr 23:00). Booking: ZDNIUZ. Terminal 2 Narita. Carry-on only (7kg each) on return. Prayer: Subuh at Ryokan → Jamak Zuhur+Asr at Narita T2 prayer room.",
    slots: [
      { t: "4:25", d: "🕌 SUBUH — pray at Asakusa Ryokan room. Go back to sleep.", kind: "rest", dur: "15 min" },
      { t: "6:00", d: "Wake. Final check: passport, phone, wallet, chargers, Booking ref ZDNIUZ. Checkout Toukaisou.", kind: "rest", dur: "40 min" },
      { t: "6:50", d: "Metro: Asakusa → Shinjuku (~35 min via Ginza Line, ¥310pp).", kind: "transit", dur: "35 min" },
      { t: "7:25", d: "Arrive Shinjuku. Quick breakfast at station food court or Lawson onigiri.", kind: "food", dur: "15 min" },
      { t: "7:45", d: "🚆 NEX: Shinjuku → Narita Terminal 2 (~90 min). ✅ Round Trip ticket covers this leg.", kind: "transit", dur: "90 min" },
      { t: "9:15", d: "Arrive Narita Terminal 2. Check in for XJ603. Carry-on only (7kg each) — no checked bags on return ✅ Fast check-in.", kind: "transit", dur: "30 min" },
      { t: "9:45", d: "🕌 JAMAK TAQDIM — Zuhur + Asr at Narita Terminal 2 prayer room (4F). Use before security.", kind: "rest", dur: "20 min" },
      { t: "10:05", d: "Security + immigration. Duty-free shopping after gates.", kind: "transit", dur: "45 min" },
      { t: "11:10", d: "✈️ XJ603 departs Narita Terminal 2 → Bangkok Don Mueang. Thai AirAsia X. 6h 35m flight.", kind: "highlight", dur: "6h 35m" },
      { t: "15:45", d: "Arrive Bangkok Don Mueang Terminal 1. Layover 4h 5min. Relax airside — eat, charge, rest. ⚠️ Do NOT exit airport (too tight).", kind: "transit", dur: "4h 5m" },
      { t: "19:50", d: "✈️ AK889 departs DMK Terminal 1 → Kuala Lumpur Terminal 2. AirAsia. 2h 10m.", kind: "highlight", dur: "2h 10m" },
      { t: "23:00", d: "🏠 Arrive Kuala Lumpur Terminal 2. Welcome home Jwa & Kimi! 🇲🇾 Trip complete.", kind: "highlight", dur: "" },
    ]
  },
];

const KIND_STYLE = {
  highlight: { c: "#f0c040", bg: "#f0c04012", label: "★" },
  sight: { c: "#4a9eff", bg: "#4a9eff10", label: "◆" },
  food: { c: "#ff8a4a", bg: "#ff8a4a10", label: "●" },
  transit: { c: "#888", bg: "#88888810", label: "→" },
  walk: { c: "#6fcf97", bg: "#6fcf9710", label: "↗" },
  rest: { c: "#9b59b6", bg: "#9b59b610", label: "○" },
};



const TAB_ICONS = { overview: "🗾", detailed: "🕐", halal: "☪️", mustdo: "⭐", transport: "🚌", budget: "💴", prayer: "🕌", accom: "🏨", checklist: "✅" };
const TAB_LABELS = { overview: "Overview", detailed: "Hour-by-Hour", halal: "Halal", mustdo: "Must Do", transport: "Getting Around", budget: "Budget", prayer: "Prayer", accom: "Accommodation", checklist: "Booking List" };

function HalalIcon({ type }) {
  return type === "prayer" ? "🕌" : type === "restaurant" ? "🍽️" : type === "market" ? "🛒" : type === "fastfood" ? "🍔" : "💡";
}

function PriorityBadge({ p }) {
  const colors = { ESSENTIAL: ["#ff4444", "#ff000020"], HIGH: ["#ff9500", "#ff950015"], MEDIUM: ["#888", "#88888815"] };
  const [c, bg] = colors[p] || colors.MEDIUM;
  return (
    <span style={{ fontSize: "8px", background: bg, border: `1px solid ${c}30`, color: c, borderRadius: "3px", padding: "1px 5px", letterSpacing: "0.1em", flexShrink: 0 }}>
      {p}
    </span>
  );
}

export default function App() {
  const [tab, setTab] = useState("overview");
  const [dark, setDark] = useState(true);
  const [yenInput, setYenInput] = useState("");
  const [rmInput, setRmInput] = useState("");
  const RATE = 0.0259;
  const handleYen = (v) => { setYenInput(v); setRmInput(v === "" ? "" : (parseFloat(v) * RATE).toFixed(2)); };
  const handleRm = (v) => { setRmInput(v); setYenInput(v === "" ? "" : Math.round(parseFloat(v) / RATE).toString()); };
  const dm = {
    // backgrounds
    appBg:    dark ? "#0a0a0f" : "#f0f2f5",
    cardBg:   dark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.04)",
    cardBorder: dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.1)",
    headerBg: dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.06)",
    tabBg:    dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.06)",
    tabActive: dark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.15)",
    inputBg:  dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
    // text
    text:     dark ? "#e8e0d4" : "#1a1a2e",
    textSub:  dark ? "#d8d0c4" : "#111827",
    textMute: dark ? "#888" : "#374151",
    textDim:  dark ? "#555" : "#1F2937",
    // slot colors
    slotBg:   dark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.03)",
    prayerBg: dark ? "FFF8E7" : "FFF3CD",
  };
  const [checklist, setChecklist] = useState(() =>
    CHECKLIST.map(cat => ({ ...cat, items: cat.items.map(i => ({ ...i })) }))
  );
  const [expandedCity, setExpandedCity] = useState(new Set(["fuji","osaka","kyoto","tokyo"]));
  const [expandedHalal, setExpandedHalal] = useState(new Set(["fuji","osaka","kyoto","tokyo"]));
  const [expandedMustdo, setExpandedMustdo] = useState(new Set(["fuji","osaka","kyoto","tokyo"]));
  const toggleSet = (setter, key) => setter(prev => { const next = new Set(prev); next.has(key) ? next.delete(key) : next.add(key); return next; });
  const [openDetailDay, setOpenDetailDay] = useState(0);

  const toggleCheck = (catIdx, itemIdx) => {
    setChecklist(prev => prev.map((cat, ci) =>
      ci !== catIdx ? cat : {
        ...cat,
        items: cat.items.map((item, ii) =>
          ii !== itemIdx ? item : { ...item, booked: !item.booked }
        )
      }
    ));
  };

  const totalItems = checklist.reduce((a, c) => a + c.items.length, 0);
  const doneItems = checklist.reduce((a, c) => a + c.items.filter(i => i.booked).length, 0);

  const cityKeys = ["fuji", "osaka", "kyoto", "tokyo"];
  const cityLabels = { fuji: "🗻 Mt Fuji", osaka: "🏮 Osaka", kyoto: "⛩️ Kyoto", tokyo: "🗼 Tokyo" };

  return (
    <div style={{ minHeight: "100vh", background: dark ? "#07090e" : "#f0f2f5", fontFamily: "Georgia, serif", color: dark ? "#ddd5c8" : "#1a1a2e", paddingBottom: "80px", transition: "background 0.3s, color 0.3s" }}>

      {/* Header */}
      <div style={{ background: dark ? "linear-gradient(180deg, #0d1520 0%, #07090e 100%)" : "linear-gradient(180deg, #ffffff 0%, #e8ecf0 100%)", padding: "28px 20px 16px", borderBottom: dark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.1)", transition: "background 0.3s, border-color 0.3s" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ fontSize: "9px", letterSpacing: "0.35em", color: "#4a9eff", textTransform: "uppercase", fontStyle: "italic", marginBottom: "6px" }}>Plan A · Finalised</div>
            <h1 style={{ fontSize: "26px", fontWeight: "400", margin: "0 0 3px", color: dark ? "#f0e8dc" : "#1a1a2e", letterSpacing: "-0.01em" }}>Japan Oct 2026</h1>
            <div style={{ fontSize: "12px", color: dark ? "#555" : "#1F2937", fontStyle: "italic" }}>2 pax · 9 nights · Halal-conscious · Light luggage</div>
          </div>
          <button onClick={() => setDark(!dark)} style={{ background: dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)", border: dark ? "1px solid rgba(255,255,255,0.15)" : "1px solid rgba(0,0,0,0.15)", borderRadius: "20px", padding: "6px 12px", cursor: "pointer", fontSize: "14px", color: dark ? "#f0e8dc" : "#1a1a2e", display: "flex", alignItems: "center", gap: "5px", flexShrink: 0, marginTop: "4px" }}>
            {dark ? "☀️" : "🌙"} <span style={{ fontSize: "10px" }}>{dark ? "Day" : "Night"}</span>
          </button>
        </div>

        {/* Route strip */}
        <div style={{ display: "flex", alignItems: "center", gap: "0", marginTop: "16px", overflowX: "auto", paddingBottom: "4px", scrollbarWidth: "none" }}>
          {[
            { label: "NRT", sub: "Oct 7", color: "#4a9eff" },
            { label: "Fuji", sub: "1N", color: "#4a9eff" },
            { label: "🌙", sub: "bus", color: "#ff6b35" },
            { label: "Osaka", sub: "2N", color: "#e91e8c" },
            { label: "Kyoto", sub: "2N", color: "#9b59b6" },
            { label: "🌙", sub: "bus", color: "#ff6b35" },
            { label: "Tokyo", sub: "2N", color: "#27ae60" },
            { label: "NRT", sub: "Oct 16", color: "#e74c3c" },
          ].map((s, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
              <div style={{ textAlign: "center", minWidth: s.label.length > 3 ? "48px" : "36px" }}>
                <div style={{ fontSize: s.label === "🌙" ? "16px" : "11px", color: s.color, fontWeight: "400" }}>{s.label}</div>
                <div style={{ fontSize: "8px", color: dark ? "#444" : "#1F2937" }}>{s.sub}</div>
              </div>
              {i < 7 && <div style={{ width: "14px", height: "1px", background: dark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.25)", flexShrink: 0 }} />}
            </div>
          ))}
        </div>
      </div>

      {/* ¥ → RM Real-time Converter */}
      <div style={{ padding: "8px 16px", background: dark ? "rgba(74,158,255,0.05)" : "rgba(74,158,255,0.06)", borderBottom: dark ? "1px solid rgba(74,158,255,0.1)" : "1px solid rgba(74,158,255,0.2)", transition: "background 0.3s, border-color 0.3s" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ position: "relative", flex: 1 }}>
            <span style={{ position: "absolute", left: "8px", top: "50%", transform: "translateY(-50%)", fontSize: "12px", color: dark ? "#f0c040" : "#B45309", fontWeight: "bold", pointerEvents: "none" }}>¥</span>
            <input
              type="number"
              placeholder="0"
              value={yenInput}
              onChange={e => handleYen(e.target.value)}
              style={{ width: "100%", paddingLeft: "22px", paddingRight: "8px", paddingTop: "6px", paddingBottom: "6px", background: dark ? "rgba(255,255,255,0.07)" : "#ffffff", border: dark ? "1px solid rgba(255,255,255,0.12)" : "1px solid rgba(0,0,0,0.15)", borderRadius: "8px", color: dark ? "#f0c040" : "#B45309", fontSize: "13px", fontWeight: "bold", outline: "none", boxSizing: "border-box" }}
            />
          </div>
          <span style={{ fontSize: "14px", color: dark ? "#4a9eff" : "#1D4ED8", flexShrink: 0 }}>⇄</span>
          <div style={{ position: "relative", flex: 1 }}>
            <span style={{ position: "absolute", left: "8px", top: "50%", transform: "translateY(-50%)", fontSize: "11px", color: dark ? "#4ade80" : "#166534", fontWeight: "bold", pointerEvents: "none" }}>RM</span>
            <input
              type="number"
              placeholder="0.00"
              value={rmInput}
              onChange={e => handleRm(e.target.value)}
              style={{ width: "100%", paddingLeft: "30px", paddingRight: "8px", paddingTop: "6px", paddingBottom: "6px", background: dark ? "rgba(255,255,255,0.07)" : "#ffffff", border: dark ? "1px solid rgba(255,255,255,0.12)" : "1px solid rgba(0,0,0,0.15)", borderRadius: "8px", color: dark ? "#4ade80" : "#166534", fontSize: "13px", fontWeight: "bold", outline: "none", boxSizing: "border-box" }}
            />
          </div>
          <span style={{ fontSize: "8px", color: dark ? "#555" : "#9CA3AF", whiteSpace: "nowrap", flexShrink: 0 }}>¥100=RM2.59</span>
        </div>
      </div>

      {/* Tab bar */}
      <div style={{ display: "flex", borderBottom: dark ? "1px solid rgba(255,255,255,0.07)" : "1px solid rgba(0,0,0,0.12)", background: dark ? "#07090e" : "#ffffff", position: "sticky", top: 0, zIndex: 50, overflowX: "auto", scrollbarWidth: "none", transition: "background 0.3s, border-color 0.3s" }}>
        {Object.keys(TAB_ICONS).map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            flex: "0 0 auto",
            padding: "12px 14px 10px",
            background: "transparent",
            border: "none",
            borderBottom: `2px solid ${tab === t ? "#4a9eff" : "transparent"}`,
            color: tab === t ? "#4a9eff" : (dark ? "#555" : "#1F2937"),
            fontSize: "11px",
            cursor: "pointer",
            fontFamily: "Georgia",
            whiteSpace: "nowrap",
            transition: "all 0.2s",
          }}>
            {TAB_ICONS[t]} {TAB_LABELS[t]}
          </button>
        ))}
      </div>

      {/* ── OVERVIEW TAB ── */}
      {tab === "overview" && (
        <div style={{ padding: "20px 16px", background: dark ? "transparent" : "#f0f2f5", minHeight: "100vh" }}>
          <div style={{ fontSize: "9px", color: dark ? "#444" : "#1F2937", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "14px" }}>Day-by-Day Summary</div>
          {[
            { dates: "Oct 6 (Tue)", city: "KUL→DMK→overnight", nights: "On plane", color: "#374151", emoji: "✈️", summary: "✈️ AK884 KUL T2 13:30 → DMK 14:45 → 10.5hr layover DMK T1 → ✈️ XJ602 DMK 01:15 Oct 7 → Narita T2. Booking: ZDNIUZ." },
            { dates: "Oct 7 (Wed)", city: "Fuji", nights: "1N · Sawa Hotel", color: "#4a9eff", emoji: "🗻", summary: "Land Narita T2 9:45AM (XJ602) → collect 20kg bag → Named Suica + NEX → 🚌 Keio Bus 13:35 ✅ → Kawaguchiko 3:35PM → 📸 Lawson → Ohashi Bridge → 🏨 Sawa Hotel → 🕌 Jamak Zuhur+Asr → 🚲 Oishi Park sunset → 🕌 Jamak Maghrib+Isha" },
            { dates: "Oct 8", city: "Fuji → Osaka", nights: "Overnight bus", color: "#ff6b35", emoji: "🌄", summary: "🕌 Subuh 5:20AM → 📦 Yamato bags at checkout → taxi 🌄 Lake Yamanaka sunrise → taxi 📸 Honcho Street 7:50AM → 🍜 T&T Halal lunch 11:30AM (🕌 Jamak Taqdim) → ⛩️ Chureito Pagoda → train Kawaguchiko → 🌙 Fujiyama Liner 20:32" },
            { dates: "Oct 9", city: "Osaka", nights: "2N · E-Stay Ebisu", color: "#e91e8c", emoji: "🏮", summary: "Arrive 7:13AM → freshen up → 🐟 Kuromon Market 8:30AM → Namba wander → 🕌 Jamak Taqdim → lunch kushikatsu → Shinsekai → check in + rest → Shinsaibashi → 🏮 Dotonbori → 🕌 Jamak Takhir" },
            { dates: "Oct 10", city: "Osaka", nights: "", color: "#e91e8c", emoji: "🦌", summary: "🕌 Subuh → JR to Nara → 🦌 Nara Park deer (Todai-ji exterior FREE) → ⛩️ Kasuga Taisha → 🍡 Nakatanidou mochi → 🕌 Jamak Taqdim on train → Osaka Castle 🏯 → Shinsaibashi → dinner → 🕌 Jamak Takhir" },
            { dates: "Oct 11", city: "Osaka → Kyoto", nights: "2N · Machiya Kamiumeya", color: "#9b59b6", emoji: "⛩️", summary: "🕌 Subuh → early checkout E-Stay → 🚃 Garaku 9:32 → Kawaramachi → Kyoto Station Welcome Desk (📦 drop bags FREE) → ⛩️ Fushimi Inari bag-free → 🕌 Jamak Taqdim → machiya key + bags → 🏮 Gion dusk → 🍽️ Pontocho dinner → 🕌 Jamak Takhir" },
            { dates: "Oct 12", city: "Kyoto", nights: "", color: "#9b59b6", emoji: "🎋", summary: "🕌 Subuh 4:30AM → leave 7AM by train → 🚂 Sagano Train 9:02 → 🕌 Jamak Taqdim at dock → 🚣 Hozugawa Boat 11AM → lunch → 🎋 Bamboo Grove → Tenryu-ji → 🌉 Togetsukyo Bridge → train back machiya → dinner → 🕌 Jamak Takhir" },
            { dates: "Oct 13", city: "Kyoto", nights: "", color: "#9b59b6", emoji: "🏮", summary: "🕌 Subuh → 📦 Yamato 7:20AM → checkout → 🏯 Kiyomizu dawn → Sannenzaka → Ninenzaka → ✨ Ishibe Koji → ⛩️ Kodai-ji → 🏮 Hanamikoji → ⛩️ Yasaka Shrine → 🕌 Jamak Taqdim → 🌊 Shirakawa Canal → 🍜 Honolu Ramen → Kyoto Station → 🍚 Ayam-Ya dinner (🕌 Jamak Takhir) → 🌙 night bus 23:50" },
            { dates: "Oct 14", city: "Tokyo", nights: "2N · Asakusa Ryokan Toukaisou", color: "#27ae60", emoji: "🗼", summary: "Arrive Shinjuku 7:50AM → 🎫 Odakyu Freepass ¥1,640pp → Kamakura (🏯 Great Buddha + 🌊 Hasedera + 🍜 shirasu + 🚃 Enoden) → check in Toukaisou 4PM ✅ → 🕌 Jamak Taqdim → 🚦 Shibuya Crossing → dinner → 🏮 Senso-ji at night → 🕌 Jamak Takhir" },
            { dates: "Oct 15", city: "Tokyo", nights: "", color: "#27ae60", emoji: "🛍️", summary: "🕌 Subuh → 🍳 Kappabashi → 👘 Kimono rental + stroll Asakusa → lunch in kimono → rest → 🕌 Jamak Taqdim → Shinjuku → 🍜 Shinjukutei Halal Wagyu → 🏮 Omoide Yokocho → 🕌 Jamak Takhir → 📦 pack" },
            { dates: "Oct 16", city: "→ Narita → DMK → KUL", nights: "Fly home", color: "#e74c3c", emoji: "✈️", summary: "🕌 Subuh → checkout 6AM → NEX 7:45AM → Narita T2 9:15AM → 🕌 Jamak Taqdim → ✈️ XJ603 11:10AM → Bangkok DMK 15:45 (4h layover airside) → ✈️ AK889 19:50 → 🏠 KUL 23:00" },
          ].map((d, i) => (
            <div key={i} style={{ display: "flex", gap: "12px", marginBottom: "10px" }}>
              <div style={{ flexShrink: 0, width: "52px", paddingTop: "2px" }}>
                <div style={{ fontSize: "9px", color: d.color, fontStyle: "italic" }}>{d.dates}</div>
                {d.nights && <div style={{ fontSize: "8px", color: dark ? "#444" : "#1F2937", marginTop: "2px" }}>{d.nights}</div>}
              </div>
              <div style={{ flex: 1, background: dark ? "rgba(255,255,255,0.03)" : "#ffffff", borderLeft: `2px solid ${d.color}`, borderRadius: "0 8px 8px 0", padding: "8px 12px", boxShadow: dark ? "none" : "0 1px 3px rgba(0,0,0,0.08)" }}>
                <div style={{ display: "flex", gap: "6px", alignItems: "center", marginBottom: "4px" }}>
                  <span style={{ fontSize: "14px" }}>{d.emoji}</span>
                  <span style={{ fontSize: "12px", color: d.color }}>{d.city}</span>
                </div>
                <div style={{ fontSize: "11.5px", color: dark ? "#888" : "#1F2937", lineHeight: "1.5" }}>{d.summary}</div>
              </div>
            </div>
          ))}

          {/* Budget snapshot */}
          <div style={{ marginTop: "24px", background: dark ? "rgba(255,255,255,0.02)" : "#ffffff", border: dark ? "1px solid rgba(255,255,255,0.07)" : "1px solid rgba(0,0,0,0.1)", borderRadius: "12px", padding: "16px", boxShadow: dark ? "none" : "0 1px 3px rgba(0,0,0,0.08)" }}>
            <div style={{ fontSize: "9px", color: dark ? "#444" : "#1F2937", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "12px" }}>Budget Snapshot (2 pax)</div>
            {[
              { label: "Hotels (7 nights)", val: "¥65,000–90,000", rm: "~RM1,950–2,700" },
              { label: "Overnight buses (×2)", val: "¥16,000–24,000", rm: "~RM480–720" },
              { label: "Local trains + NEX + buses", val: "¥18,000–24,000", rm: "~RM540–720" },
              { label: "Food (all meals)", val: "¥35,000–55,000", rm: "~RM1,050–1,650" },
              { label: "Attractions", val: "¥8,000–14,000", rm: "~RM240–420" },
            ].map(b => (
              <div key={b.label} style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", alignItems: "baseline" }}>
                <span style={{ fontSize: "12px", color: dark ? "#888" : "#374151" }}>{b.label}</span>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: "11px", color: dark ? "#ccc" : "#111827" }}>{b.val}</div>
                  <div style={{ fontSize: "9px", color: dark ? "#555" : "#374151" }}>{b.rm}</div>
                </div>
              </div>
            ))}
            <div style={{ borderTop: dark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.08)", marginTop: "10px", paddingTop: "10px", display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: "12px", color: dark ? "#ccc" : "#111827" }}>Total (excl. flights + shopping)</span>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: "14px", color: "#4a9eff" }}>¥142,000–207,000</div>
                <div style={{ fontSize: "10px", color: "#27ae60" }}>~RM4,260–6,210</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── DETAILED HOUR-BY-HOUR TAB ── */}
      {tab === "detailed" && (
        <div style={{ padding: "16px 12px" }}>
          {/* Day pills */}
          <div style={{ display: "flex", gap: "5px", overflowX: "auto", paddingBottom: "10px", scrollbarWidth: "none", marginBottom: "8px" }}>
            {DETAILED.map((d, i) => (
              <button key={i} onClick={() => setOpenDetailDay(i)} style={{
                flexShrink: 0,
                background: openDetailDay === i ? d.color : (dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.06)"),
                border: `1px solid ${openDetailDay === i ? d.color : (dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.12)")}`,
                borderRadius: "8px",
                padding: "7px 10px",
                cursor: "pointer",
                textAlign: "center",
                minWidth: "60px",
                transition: "all 0.2s",
              }}>
                <div style={{ fontSize: "15px", lineHeight: 1, marginBottom: "2px" }}>{d.emoji}</div>
                <div style={{ fontSize: "8.5px", color: openDetailDay === i ? "#000" : (dark ? "#888" : "#374151"), fontStyle: "italic" }}>{d.date.replace("Oct ", "")}</div>
              </button>
            ))}
          </div>

          {(() => {
            const d = DETAILED[openDetailDay];
            return (
              <div>
                {/* Day header */}
                <div style={{ background: dark ? `linear-gradient(135deg, ${d.color}18 0%, transparent 100%)` : `linear-gradient(135deg, ${d.color}10 0%, #ffffff 100%)`, border: `1px solid ${d.color}${dark ? "30" : "40"}`, borderRadius: "12px", padding: "14px 16px", marginBottom: "14px" }}>
                  <div style={{ fontSize: "10px", color: d.color, letterSpacing: "0.2em", textTransform: "uppercase", fontStyle: "italic", marginBottom: "3px" }}>{d.date}</div>
                  <h2 style={{ fontSize: "20px", fontWeight: "400", margin: "0 0 8px", color: dark ? "#f0e8dc" : "#111827" }}>{d.emoji} {d.title}</h2>
                  <div style={{ fontSize: "11.5px", color: dark ? "#999" : "#1F2937", lineHeight: "1.55", borderLeft: `2px solid ${d.color}`, paddingLeft: "10px", fontStyle: "italic" }}>
                    {d.note}
                  </div>
                </div>

                {/* Timeline */}
                {d.slots.map((s, i) => {
                  const ks = KIND_STYLE[s.kind] || KIND_STYLE.sight;
                  return (
                    <div key={i} style={{ display: "flex", gap: "10px", marginBottom: "8px", position: "relative" }}>
                      {/* connector line */}
                      {i < d.slots.length - 1 && (
                        <div style={{ position: "absolute", left: "42px", top: "24px", width: "1px", height: "calc(100% + 8px)", background: dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.05)" }} />
                      )}
                      {/* time */}
                      <div style={{ flexShrink: 0, width: "38px", textAlign: "right", paddingTop: "4px" }}>
                        <div style={{ fontSize: "12px", color: d.color, fontVariantNumeric: "tabular-nums", fontWeight: "500" }}>{s.t}</div>
                      </div>
                      {/* dot */}
                      <div style={{ flexShrink: 0, width: "10px", display: "flex", justifyContent: "center", paddingTop: "6px" }}>
                        <div style={{ width: "9px", height: "9px", borderRadius: "50%", background: ks.c, border: `2px solid ${dark ? "#07090e" : "#f0f2f5"}`, zIndex: 1 }} />
                      </div>
                      {/* content */}
                      <div style={{ flex: 1, background: dark ? ks.bg : (ks.bg === "rgba(255,248,231,0.08)" ? "#FEF9C3" : "#ffffff"), border: `1px solid ${ks.c}${dark ? "20" : "30"}`, borderRadius: "8px", padding: "8px 11px" }}>
                        {s.kind === "transit" ? (
                          <TransitChips text={s.d} dark={dark} />
                        ) : (
                          <div style={{ fontSize: "12px", color: dark ? "#d8d0c4" : "#111827", lineHeight: "1.5" }}>{s.d}</div>
                        )}
                        {s.dur && (
                          <div style={{ fontSize: "9px", color: dark ? ks.c : ks.c, marginTop: "3px", letterSpacing: "0.05em" }}>{ks.label} {s.dur}</div>
                        )}
                      </div>
                    </div>
                  );
                })}

                {/* Legend */}
                <div style={{ marginTop: "16px", display: "flex", gap: "10px", flexWrap: "wrap", padding: "10px 12px", background: "rgba(255,255,255,0.02)", borderRadius: "8px" }}>
                  {[["highlight", "Highlight"], ["sight", "Sightseeing"], ["food", "Food"], ["transit", "Transit"], ["walk", "Walk"], ["rest", "Rest"]].map(([k, lbl]) => (
                    <div key={k} style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                      <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: KIND_STYLE[k].c }} />
                      <span style={{ fontSize: "9.5px", color: dark ? "#777" : "#1F2937" }}>{lbl}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* ── HALAL TAB ── */}
      {tab === "halal" && (
        <div style={{ padding: "20px 16px", background: dark ? "transparent" : "#f0f2f5", minHeight: "100vh" }}>
          <div style={{ background: dark ? "rgba(255,255,255,0.03)" : "#ffffff", border: dark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.12)", borderRadius: "10px", padding: "12px 14px", marginBottom: "16px", fontSize: "12px", color: dark ? "#aaa" : "#374151", lineHeight: "1.6" }}>
            ☪️ Japan is not a halal-majority country. Strategy: <span style={{ color: "#e0c080" }}>seafood-first, vegetarian fallback, certified restaurants when available.</span> Avoid anything with pork/lard explicitly. Most soy sauce and mirin contain trace alcohol — decide your own comfort level before travelling.
          </div>

          {cityKeys.map(city => (
            <div key={city} style={{ marginBottom: "10px", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "10px", overflow: "hidden" }}>
              <div
                onClick={() => toggleSet(setExpandedHalal, city)}
                style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "13px 16px", cursor: "pointer", background: expandedHalal.has(city) ? (dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.05)") : (dark ? "transparent" : "#ffffff") }}
              >
                <span style={{ fontSize: "14px" }}>{cityLabels[city]}</span>
                <span style={{ color: dark ? "#444" : "#1F2937", fontSize: "12px" }}>{expandedHalal.has(city) ? "▲" : "▼"}</span>
              </div>
              {expandedHalal.has(city) && (
                <div style={{ padding: "0 16px 14px" }}>
                  {HALAL[city].map((h, i) => (
                    <div key={i} style={{ display: "flex", gap: "10px", marginBottom: "10px", background: dark ? "rgba(255,255,255,0.02)" : "#F8FAFC", borderRadius: "8px", padding: "10px", border: dark ? "none" : "1px solid rgba(0,0,0,0.06)" }}>
                      <div style={{ fontSize: "18px", flexShrink: 0 }}><HalalIcon type={h.type} /></div>
                      <div>
                        <div style={{ fontSize: "12.5px", color: dark ? "#ddd" : "#1a1a2e", marginBottom: "3px" }}>{h.name}</div>
                        <div style={{ fontSize: "11px", color: dark ? "#777" : "#1F2937", lineHeight: "1.4" }}>{h.note}</div>
                        <div style={{ marginTop: "4px" }}>
                          <span style={{ fontSize: "8px", background: h.type === "prayer" ? (dark ? "#1a0d2e" : "#EDE9FE") : (dark ? "#0d1a0d" : "#DCFCE7"), border: `1px solid ${h.type === "prayer" ? "#9b59b640" : "#27ae6040"}`, color: h.type === "prayer" ? (dark ? "#c792ea" : "#7C3AED") : (dark ? "#6fcf97" : "#166534"), borderRadius: "3px", padding: "1px 6px", letterSpacing: "0.1em" }}>
                            {h.type === "prayer" ? "🕌 PRAYER" : h.type === "restaurant" ? "🍽 HALAL" : h.type === "market" ? "🛒 MARKET" : h.type === "fastfood" ? "✓ CERTIFIED" : "💡 TIP"}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          <div style={{ marginTop: "12px", background: "rgba(255,165,0,0.05)", border: "1px solid rgba(255,165,0,0.2)", borderRadius: "10px", padding: "14px" }}>
            <div style={{ fontSize: "10px", color: "#c4a830", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "8px" }}>💡 General Tips</div>
            {["Google 'halal near me' in Japanese cities — surprisingly good results now.", "HalalGourmet Japan app: best dedicated halal restaurant finder.", "Konbini (7-Eleven, FamilyMart): onigiri (salmon, tuna), sandwiches, eggs — your best backup.", "Muslim-friendly hotels near Kyoto Station and Namba often provide Qibla direction cards.", "Carry your own prayer mat — small travel mat recommended."].map((t, i) => (
              <div key={i} style={{ fontSize: "11.5px", color: dark ? "#999" : "#1F2937", marginBottom: "6px", lineHeight: "1.4", paddingLeft: "8px", borderLeft: "1px solid rgba(255,165,0,0.3)" }}>{t}</div>
            ))}
          </div>
        </div>
      )}

      {/* ── MUST DO TAB ── */}
      {tab === "mustdo" && (
        <div style={{ padding: "20px 16px", background: dark ? "transparent" : "#f0f2f5", minHeight: "100vh" }}>
          {cityKeys.map(city => (
            <div key={city} style={{ marginBottom: "10px", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "10px", overflow: "hidden" }}>
              <div
                onClick={() => toggleSet(setExpandedMustdo, city)}
                style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "13px 16px", cursor: "pointer", background: expandedMustdo.has(city) ? (dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.05)") : (dark ? "transparent" : "#ffffff") }}
              >
                <span style={{ fontSize: "14px" }}>{cityLabels[city]}</span>
                <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                  <span style={{ fontSize: "10px", color: dark ? "#555" : "#374151" }}>{MUSTDO[city].length} spots</span>
                  <span style={{ color: dark ? "#444" : "#1F2937", fontSize: "12px" }}>{expandedMustdo.has(city) ? "▲" : "▼"}</span>
                </div>
              </div>
              {expandedMustdo.has(city) && (
                <div style={{ padding: "0 16px 14px" }}>
                  {MUSTDO[city].map((m, i) => (
                    <div key={i} style={{ display: "flex", gap: "10px", marginBottom: "10px", background: dark ? "rgba(255,255,255,0.02)" : "#F8FAFC", borderRadius: "8px", padding: "10px 12px", border: dark ? "none" : "1px solid rgba(0,0,0,0.06)", borderLeft: `2px solid ${m.priority === "ESSENTIAL" ? "#ff4444" : m.priority === "HIGH" ? "#ff9500" : "#555"}30` }}>
                      <div style={{ fontSize: "20px", flexShrink: 0 }}>{m.icon}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "8px", marginBottom: "4px" }}>
                          <div style={{ fontSize: "12.5px", color: dark ? "#ddd" : "#1a1a2e" }}>{m.name}</div>
                          <PriorityBadge p={m.priority} />
                        </div>
                        <div style={{ fontSize: "10px", color: dark ? "#666" : "#1F2937", fontStyle: "italic" }}>⏰ {m.timing}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          <div style={{ marginTop: "8px", display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {[["#ff4444", "ESSENTIAL", "Non-negotiable"], ["#ff9500", "HIGH", "Strong recommend"], ["#888", "MEDIUM", "If time allows"]].map(([c, l, d]) => (
              <div key={l} style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <div style={{ width: "8px", height: "8px", borderRadius: "2px", background: c + "30", border: `1px solid ${c}50` }} />
                <span style={{ fontSize: "10px", color: dark ? "#666" : "#1F2937" }}>{l} — {d}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── TRANSPORT TAB ── */}
      {tab === "transport" && (
        <div style={{ padding: "20px 16px", background: dark ? "transparent" : "#f0f2f5", minHeight: "100vh" }}>
          <div style={{ fontSize: "9px", color: dark ? "#444" : "#1F2937", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "14px" }}>All City-to-City Movements</div>

          {MOVEMENTS.map((m, i) => (
            <div key={i} style={{ marginBottom: "12px", background: m.overnight ? (dark ? "linear-gradient(135deg, #1a1008 0%, #0a0a08 100%)" : "linear-gradient(135deg, #fff8ee 0%, #ffffff 100%)") : (dark ? "rgba(255,255,255,0.02)" : "#ffffff"), border: `1px solid ${m.color}${dark ? "25" : "40"}`, borderRadius: "12px", overflow: "hidden" }}>
              {m.overnight && (
                <div style={{ background: m.color + "20", padding: "4px 14px", fontSize: "8px", color: m.color, letterSpacing: "0.2em", textTransform: "uppercase", fontStyle: "italic" }}>
                  🌙 Overnight — saves hotel night
                </div>
              )}
              <div style={{ padding: "12px 14px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                  <span style={{ fontSize: "20px" }}>{m.emoji}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <span style={{ fontSize: "12px", color: dark ? "#ccc" : "#111827" }}>{m.from}</span>
                      <span style={{ fontSize: "10px", color: dark ? "#444" : "#1F2937" }}>→</span>
                      <span style={{ fontSize: "12px", color: m.color }}>{m.to}</span>
                    </div>
                    <div style={{ fontSize: "10px", color: dark ? "#555" : "#1F2937", fontStyle: "italic", marginTop: "1px" }}>{m.date}</div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: "8px", marginBottom: "8px", flexWrap: "wrap" }}>
                  <div style={{ background: dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)", borderRadius: "6px", padding: "5px 9px" }}>
                    <div style={{ fontSize: "9px", color: dark ? "#555" : "#1F2937" }}>METHOD</div>
                    <div style={{ fontSize: "11px", color: dark ? "#ccc" : "#111827" }}>{m.how}</div>
                  </div>
                  <div style={{ background: dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)", borderRadius: "6px", padding: "5px 9px" }}>
                    <div style={{ fontSize: "9px", color: dark ? "#555" : "#1F2937" }}>DURATION</div>
                    <div style={{ fontSize: "11px", color: dark ? "#ccc" : "#111827" }}>{m.duration}</div>
                  </div>
                  <div style={{ background: dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.05)", borderRadius: "6px", padding: "5px 9px" }}>
                    <div style={{ fontSize: "9px", color: dark ? "#555" : "#374151" }}>COST</div>
                    <div style={{ fontSize: "11px", color: m.color }}>{m.cost}</div>
                  </div>
                </div>
                <div style={{ fontSize: "11.5px", color: dark ? "#888" : "#374151", lineHeight: "1.5", borderLeft: `2px solid ${m.color}30`, paddingLeft: "10px" }}>💡 {m.tip}</div>
                {m.link && <div style={{ marginTop: "6px", fontSize: "10px", color: "#4a9eff66", fontStyle: "italic" }}>🔗 {m.link}</div>}
              </div>
            </div>
          ))}

          <div style={{ marginTop: "8px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "10px", padding: "14px" }}>
            <div style={{ fontSize: "9px", color: dark ? "#444" : "#1F2937", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "10px" }}>Within-City Transport</div>
            {[
              { city: "Fuji", text: "Retro bus (Kawaguchiko Loop Bus) ¥500/day pass. Bicycle rental ¥1,000/day from lakeside shops." },
              { city: "Osaka", text: "Osaka 1-day subway pass ¥800 pp. Most sights walkable from Namba. Use IC card for JR lines." },
              { city: "Kyoto", text: "City bus 1-day pass ¥700 pp covers most sights. Taxi for Arashiyama early morning (¥1,500 from station)." },
              { city: "Tokyo", text: "Suica IC card for all trains and buses. 24-hr subway pass ¥600 if doing lots of metro." },
            ].map(c => (
              <div key={c.city} style={{ marginBottom: "8px", display: "flex", gap: "8px" }}>
                <span style={{ fontSize: "10px", color: dark ? "#666" : "#1F2937", minWidth: "40px", paddingTop: "2px" }}>{c.city}</span>
                <span style={{ fontSize: "11.5px", color: dark ? "#888" : "#374151", lineHeight: "1.5" }}>{c.text}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── LUGGAGE TAB ── */}
      {tab === "luggage" && (
        <div style={{ padding: "20px 16px", background: dark ? "transparent" : "#f0f2f5", minHeight: "100vh" }}>
          <div style={{ background: "rgba(240,192,64,0.06)", border: "1px solid rgba(240,192,64,0.2)", borderRadius: "10px", padding: "12px 14px", marginBottom: "18px", fontSize: "12px", color: dark ? "#aaa" : "#374151", lineHeight: "1.6" }}>
            📦 <span style={{ color: "#f0c040" }}>Takuhaibin (宅配便)</span> — Japan's luggage forwarding service. Drop a bag at your hotel front desk, fill out a waybill, and it appears at your next hotel the next day. ~¥1,500–3,000 per bag. Say: <span style={{ color: "#f0c040", fontStyle: "italic" }}>"Takuhaibin, onegaishimasu"</span>
          </div>

          {[
            {
              leg: "LEG 1",
              when: "Oct 8 morning — at Sawa Hotel checkout (~5:40 AM)",
              from: "Sawa Hotel, Fujikawaguchiko",
              to: "E-Stay Ebisu, Osaka (Shin-Imamiya)",
              toAddress: "E-Stay Ebisu — provide address when filling waybill. Ask Sawa Hotel staff to write it in Japanese.",
              arrivalDate: "Oct 9 (afternoon)",
              cost: "~¥1,500–2,000 per bag",
              why: "You checkout at 5:40 AM and head straight to Lake Yamanaka. Send bags at checkout — daypack only all day. Bags arrive at E-Stay while you're sleeping on the overnight bus.",
              steps: [
                "At checkout (5:40 AM), go to Sawa Hotel front desk",
                "Say: 'Takuhaibin, onegaishimasu' — staff will bring the waybill",
                "Fill in: your name, E-Stay Ebisu address, delivery date Oct 9",
                "Staff weigh & measure bags — pay on the spot",
                "Pack daypack: today's clothes, chargers, toiletries, valuables, prayer mat, bus snacks",
                "Hand bags over. Check out. Taxi to Yamanaka. Fully bag-free ✅",
              ],
              backup: "If Sawa Hotel can't arrange at 5:40AM: ask them to arrange it the night before (Oct 7 evening) so it's ready at checkout. Or walk to nearest 7-Eleven after checkout.",
              color: "#4a9eff",
              confirm: "Email E-Stay Ebisu before the trip to confirm they can receive a forwarded delivery on Oct 9.",
            },
            {
              leg: "LEG 2",
              when: "Oct 13 morning — nearest konbini to machiya (~7:20 AM)",
              from: "FamilyMart/7-Eleven near Machiya Kamiumeya, Kyoto",
              to: "Asakusa Ryokan Toukaisou, Tokyo",
              toAddress: "2-16-12 Nishiasakusa, Taito Ward, Tokyo 111-0035 / 浅草旅館 東海荘",
              arrivalDate: "Oct 14 (afternoon, before 3PM check-in)",
              cost: "~¥2,500–3,000 per bag (Kyoto → Tokyo)",
              why: "Send bags first thing Oct 13 morning before leaving for Kiyomizu. Enjoy your last full Kyoto day completely bag-free. Bags waiting at Toukaisou when you check in Oct 14 at 3PM.",
              steps: [
                "Oct 13, 7:20 AM — walk 3 min to nearest FamilyMart or 7-Eleven",
                "Bring both backpacks and your daypack",
                "Show konbini staff: 'Yamato takuhaibin onegaishimasu'",
                "Fill waybill: destination Asakusa Ryokan Toukaisou, delivery date Oct 14",
                "Address: 2-16-12 Nishiasakusa, Taito, Tokyo 111-0035",
                "Pay shipping (~¥2,500–3,000 per bag). Keep tracking slip.",
                "Walk back to machiya with daypack only. Last Kyoto day begins ✅",
              ],
              backup: "If konbini won't accept (rare): ask Machiya Welcome Desk to arrange pickup — Tel: +81 90-8161-3870. Open 10AM–7PM so call when they open.",
              color: "#9b59b6",
              confirm: "Email Asakusa Ryokan Toukaisou before the trip to confirm they can receive forwarded bags on Oct 14. They list luggage storage as an amenity so this should be fine.",
            },
          ].map((leg, i) => (
            <div key={i} style={{ marginBottom: "20px", border: `1px solid ${leg.color}30`, borderRadius: "12px", overflow: "hidden" }}>
              <div style={{ background: `${leg.color}15`, padding: "10px 16px", borderBottom: `1px solid ${leg.color}20` }}>
                <div style={{ fontSize: "8px", color: leg.color, letterSpacing: "0.25em", textTransform: "uppercase", fontStyle: "italic", marginBottom: "2px" }}>{leg.leg}</div>
                <div style={{ fontSize: "14px", color: dark ? "#f0e8dc" : "#111827", marginBottom: "2px" }}>📦 {leg.from}</div>
                <div style={{ fontSize: "11px", color: leg.color }}>→ {leg.to}</div>
              </div>

              <div style={{ padding: "14px 16px" }}>
                {/* Meta row */}
                <div style={{ display: "flex", gap: "8px", marginBottom: "12px", flexWrap: "wrap" }}>
                  {[["📅 When", leg.when], ["📬 Arrives", leg.arrivalDate], ["💴 Cost", leg.cost]].map(([label, val]) => (
                    <div key={label} style={{ background: dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.05)", borderRadius: "6px", padding: "5px 9px" }}>
                      <div style={{ fontSize: "8px", color: dark ? "#555" : "#374151" }}>{label}</div>
                      <div style={{ fontSize: "10px", color: dark ? "#ccc" : "#111827" }}>{val}</div>
                    </div>
                  ))}
                </div>

                {/* Why */}
                <div style={{ fontSize: "11.5px", color: dark ? "#999" : "#1F2937", lineHeight: "1.5", borderLeft: `2px solid ${leg.color}40`, paddingLeft: "10px", marginBottom: "14px", fontStyle: "italic" }}>
                  {leg.why}
                </div>

                {/* Steps */}
                <div style={{ fontSize: "9px", color: leg.color, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "8px" }}>Step-by-Step</div>
                {leg.steps.map((step, si) => (
                  <div key={si} style={{ display: "flex", gap: "8px", marginBottom: "7px", alignItems: "flex-start" }}>
                    <div style={{ flexShrink: 0, width: "18px", height: "18px", borderRadius: "50%", background: `${leg.color}20`, border: `1px solid ${leg.color}40`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ fontSize: "8px", color: leg.color }}>{si + 1}</span>
                    </div>
                    <div style={{ fontSize: "11.5px", color: dark ? "#ccc" : "#111827", lineHeight: "1.5", paddingTop: "1px" }}>{step}</div>
                  </div>
                ))}

                {/* Destination address */}
                <div style={{ marginTop: "12px", background: "rgba(255,255,255,0.03)", borderRadius: "8px", padding: "10px 12px" }}>
                  <div style={{ fontSize: "8px", color: dark ? "#555" : "#374151", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "4px" }}>Destination Address</div>
                  <div style={{ fontSize: "11.5px", color: dark ? "#aaa" : "#374151", lineHeight: "1.5" }}>{leg.toAddress}</div>
                </div>

                {/* Backup plan */}
                <div style={{ marginTop: "12px", background: "rgba(255,107,53,0.05)", border: "1px solid rgba(255,107,53,0.2)", borderRadius: "8px", padding: "10px 12px" }}>
                  <div style={{ fontSize: "8px", color: "#ff6b35", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "5px" }}>⚠️ Backup Plan</div>
                  <div style={{ fontSize: "11.5px", color: dark ? "#aaa" : "#374151", lineHeight: "1.5" }}>{leg.backup}</div>
                </div>

                {/* Confirm note */}
                <div style={{ marginTop: "10px", fontSize: "11px", color: dark ? "#666" : "#1F2937", fontStyle: "italic", lineHeight: "1.4" }}>
                  ✉️ {leg.confirm}
                </div>
              </div>
            </div>
          ))}

          {/* General tips */}
          <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "10px", padding: "14px" }}>
            <div style={{ fontSize: "9px", color: dark ? "#444" : "#1F2937", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "10px" }}>General Takuhaibin Tips</div>
            {[
              "Must send the day before delivery — same-day delivery not standard. Send Oct 8 morning for Oct 9 arrival. Send Oct 13 morning for Oct 14 arrival.",
              "Weight limit: 30 kg per bag. Size limit: 200 cm total (L+W+H). Standard suitcases are well within this.",
              "You'll get a tracking slip — photograph it. If bags don't arrive, call the hotel with the slip number.",
              "Pack a daypack with: 1 change of clothes, chargers, valuables, passport, cash, medication, and snacks for the bus.",
              "Convenience stores (7-Eleven, FamilyMart) also accept drop-offs if the hotel can't send — staff will help fill the waybill.",
              "Total forwarding cost for 2 bags across both legs: ~¥8,000–10,000. Worth every yen vs lugging suitcases on overnight buses.",
            ].map((t, i) => (
              <div key={i} style={{ fontSize: "11.5px", color: dark ? "#888" : "#374151", marginBottom: "8px", lineHeight: "1.5", paddingLeft: "10px", borderLeft: "1px solid rgba(255,255,255,0.1)" }}>{t}</div>
            ))}
          </div>
        </div>
      )}

      {/* ── BUDGET TAB ── */}
      {tab === "budget" && (
        <div style={{ padding: "20px 16px", background: dark ? "transparent" : "#f0f2f5", minHeight: "100vh" }}>
          {/* Header */}
          <div style={{ background: dark ? "rgba(255,255,255,0.03)" : "#ffffff", border: dark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.12)", borderRadius: "10px", padding: "14px", marginBottom: "16px" }}>
            <div style={{ fontSize: "11px", color: dark ? "#888" : "#374151", marginBottom: "8px" }}>💴 Exchange rate used: ¥100 = RM2.59</div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: "9px", color: dark ? "#555" : "#374151", letterSpacing: "0.15em", textTransform: "uppercase" }}>Total Paid</div>
                <div style={{ fontSize: "22px", color: "#4ade80", fontWeight: "bold" }}>RM 5,302.26</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: "9px", color: dark ? "#555" : "#374151", letterSpacing: "0.15em", textTransform: "uppercase" }}>Still to Pay</div>
                <div style={{ fontSize: "22px", color: "#fb923c", fontWeight: "bold" }}>~RM 1,359–1,411</div>
              </div>
            </div>
            <div style={{ marginTop: "10px", paddingTop: "10px", borderTop: dark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.08)", display: "flex", justifyContent: "space-between" }}>
              <div style={{ fontSize: "10px", color: dark ? "#888" : "#1F2937" }}>Fixed costs total</div>
              <div style={{ fontSize: "13px", color: "#f0c040", fontWeight: "bold" }}>~RM 6,661–6,713</div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "4px" }}>
              <div style={{ fontSize: "10px", color: dark ? "#888" : "#1F2937" }}>+ Daily expenses (food, entries, shopping)</div>
              <div style={{ fontSize: "13px", color: "#f0c040", fontWeight: "bold" }}>~RM 1,200–1,600</div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "6px", paddingTop: "6px", borderTop: dark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.08)" }}>
              <div style={{ fontSize: "10px", color: dark ? "#ccc" : "#111827", fontWeight: "bold" }}>FULL TRIP ESTIMATE (2 pax, excl. camera)</div>
              <div style={{ fontSize: "14px", color: "#fff", fontWeight: "bold" }}>~RM 7,861–8,313</div>
            </div>
          </div>

          {/* PAID section */}
          {[
            {
              label: "✅ ALREADY PAID", color: "#4ade80", bg: "rgba(74,222,128,0.05)",
              items: [
                { cat: "✈️ Flights", item: "AK884 KUL→DMK + XJ602 DMK→NRT (Oct 6-7) + XJ603 NRT→DMK + AK889 DMK→KUL (Oct 16). Booking: ZDNIUZ", rm: "1,145.60", note: "✅ Booked. Nadjwa: 7kg carry-on. Hakimi: 20kg checked + 7kg carry-on." },
                { cat: "🏨 Hotel", item: "Sawa Hotel, Fujikawaguchiko (1N)", rm: "299.12", note: "Booked" },
                { cat: "🏨 Hotel", item: "E-Stay Ebisu, Osaka (2N)", rm: "522.70", note: "Booked" },
                { cat: "🏨 Hotel", item: "Machiya Kamiuneya, Kyoto (2N)", rm: "1,440.83", note: "Booked" },
                { cat: "🏨 Hotel", item: "Asakusa Ryokan Toukaisou, Tokyo (2N)", rm: "479.35", note: "Booked" },
                { cat: "🚌 Bus", item: "Keio Bus: Shinjuku→Kawaguchiko (13:35, Oct 7)", rm: "~121.50", note: "Booked ✅" },
                { cat: "🚌 Bus", item: "Fujiyama Liner: Kawaguchiko→Osaka (20:32, Oct 8)", rm: "445.50", note: "Booked ✅" },
                { cat: "🚌 Bus", item: "Willer Express: Kyoto→Shinjuku (23:50, Oct 13)", rm: "483.70", note: "Booked ✅" },
                { cat: "🚂 Train", item: "Sagano Romantic Train (9:02, Oct 12)", rm: "46.66", note: "Booked ✅" },
                { cat: "🚣 Boat", item: "Hozugawa River Boat (11:00, Oct 12)", rm: "317.30", note: "Booked ✅" },
              ],
              total: "5,302.26"
            },
            {
              label: "⏳ STILL TO PAY", color: "#fb923c", bg: "rgba(251,146,60,0.05)",
              items: [
                { cat: "🚆 NEX", item: "NEX Round Trip x2 — Oct 7 + Oct 16", rm: "~259.00", note: "Buy at Narita JR counter Oct 7" },
                { cat: "🟢 Suica", item: "Named Regular Suica x2 (¥2,000 each)", rm: "~104.00", note: "Buy at Narita JR counter Oct 7" },
                { cat: "🚃 Odakyu", item: "Enoshima-Kamakura Freepass x2 (Oct 14)", rm: "~85.00", note: "Buy at Odakyu Shinjuku Oct 14 morning" },
                { cat: "📦 Yamato", item: "LEG 1: Kawaguchiko → Osaka (Size 140 + Size 80)", rm: "~100", note: "¥3,850 cashless. Oct 8 at FamilyMart Kawaguchiko Station West. 5:40AM." },
                { cat: "📦 Yamato", item: "LEG 2: Kyoto → Tokyo (Size 140 + Size 80)", rm: "~107", note: "¥4,114 cashless. Oct 13 at FamilyMart Kiyomizu Higashiyama. 7:20AM." },
                { cat: "👘 Kimono", item: "Kimono rental x2, Asakusa (Oct 15 ~10AM)", rm: "~302.00", note: "⚠️ Pre-book NOW at Yae/Rikawafuku" },
                { cat: "⛩️ Entries", item: "Kiyomizu ¥500 + Kodai-ji ¥600 + Tenryu-ji ¥500 + Great Buddha ¥300 + Hasedera ¥400", rm: "~59.00", note: "Pay on day" },
                { cat: "🚕 Taxi", item: "Oct 8: Sawa Hotel→Yamanaka + Yamanaka→Honcho St", rm: "~143.00", note: "Pay on day" },
                { cat: "🚇 Suica", item: "Top-ups full trip (2 pax, ~¥7,700 total)", rm: "~199.00", note: "Top up at konbini/stations throughout" },
              ],
              total: "~1,316–1,368"
            },
            {
              label: "🍽️ DAILY EXPENSES (ESTIMATE)", color: "#a78bfa", bg: "rgba(167,139,250,0.05)",
              items: [
                { cat: "🍜 Food", item: "Meals — 3 meals/day × 10 days × 2 pax", rm: "~650.00", note: "Mix konbini + restaurants" },
                { cat: "🍡 Snacks", item: "Street food, konbini, vending machines", rm: "~150.00", note: "Daily" },
                { cat: "🛍️ Shopping", item: "Souvenirs, Ameyoko, Nishiki Market etc", rm: "~400–800", note: "Personal budget" },
                { cat: "📷 Camera", item: "Optional — Fujifilm second-hand or film camera at Den Den Town", rm: "~650–1,500", note: "Oct 9, Osaka" },
              ],
              total: "~1,200–1,600 (excl. camera)"
            },
          ].map((section, si) => (
            <div key={si} style={{ marginBottom: "16px" }}>
              <div style={{ fontSize: "9px", color: section.color, letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: "bold", marginBottom: "8px" }}>{section.label}</div>
              <div style={{ background: section.bg, border: `1px solid ${section.color}20`, borderRadius: "10px", overflow: "hidden" }}>
                {section.items.map((item, ii) => (
                  <div key={ii} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 12px", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: "9px", color: dark ? "#555" : "#374151" }}>{item.cat}</div>
                      <div style={{ fontSize: "10.5px", color: dark ? "#ccc" : "#111827", lineHeight: "1.4" }}>{item.item}</div>
                      <div style={{ fontSize: "8.5px", color: dark ? "#444" : "#1F2937", fontStyle: "italic" }}>{item.note}</div>
                    </div>
                    <div style={{ fontSize: "11px", color: section.color, fontWeight: "bold", marginLeft: "8px", flexShrink: 0 }}>RM {item.rm}</div>
                  </div>
                ))}
                <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 12px", background: "rgba(255,255,255,0.03)" }}>
                  <div style={{ fontSize: "10px", color: dark ? "#888" : "#1F2937" }}>Subtotal</div>
                  <div style={{ fontSize: "12px", color: section.color, fontWeight: "bold" }}>RM {section.total}</div>
                </div>
              </div>
            </div>
          ))}

          {/* Yamato waybill reference */}
          <div style={{ marginBottom: "16px" }}>
            <div style={{ fontSize: "9px", color: "#f0c040", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "8px" }}>📦 YAMATO WAYBILL QUICK REFERENCE</div>

            {[
              {
                leg: "LEG 1 — Oct 8 Morning (5:40AM)",
                drop: "FamilyMart Kawaguchiko Station West (24hrs)",
                dropAddr: "3433-1 Funatsu, Fujikawaguchiko, Yamanashi",
                from: "Sawa Hotel, Fujikawaguchiko",
                fromAddr: "Ask hotel staff to fill sender address in Japanese",
                to: "E-Stay Ebisu",
                toAddr: "〒556-0005 大阪府大阪市浪速区日本橋西1丁目1-17 (confirm with hotel before trip)",
                delivery: "Oct 9",
                bags: "Size 140 (20kg luggage) + Size 80 (carry-on)",
                cost: "¥3,850 cashless / ¥3,860 cash",
                color: "#4a9eff",
              },
              {
                leg: "LEG 2 — Oct 13 Morning (7:20AM)",
                drop: "FamilyMart Kiyomizu Higashiyama (24hrs)",
                dropAddr: "4-chome-182-18 Kiyomizu, Higashiyama Ward, Kyoto",
                from: "Machiya Kamiumeya / Your name",
                fromAddr: "685-2 Shiokojicho, Shimogyo Ward, Kyoto (Welcome Desk address)",
                to: "Asakusa Ryokan Toukaisou",
                toAddr: "〒111-0035 東京都台東区西浅草2-16-12 浅草旅館 東海荘",
                delivery: "Oct 14",
                bags: "Size 140 (20kg luggage) + Size 80 (carry-on)",
                cost: "¥4,114 cashless / ¥4,120 cash",
                color: "#9b59b6",
              },
            ].map((leg, i) => (
              <div key={i} style={{ background: `${leg.color}08`, border: `1px solid ${leg.color}25`, borderRadius: "10px", padding: "12px 14px", marginBottom: "10px" }}>
                <div style={{ fontSize: "10px", color: leg.color, fontWeight: "bold", marginBottom: "8px" }}>{leg.leg}</div>
                {[
                  ["📍 Drop at", `${leg.drop}\n${leg.dropAddr}`],
                  ["📤 From (差出人)", `${leg.from}\n${leg.fromAddr}`],
                  ["📥 To (お届け先)", `${leg.to}\n${leg.toAddr}`],
                  ["📅 Delivery date (お届け希望日)", leg.delivery],
                  ["📦 Bags", leg.bags],
                  ["💴 Cost", leg.cost],
                ].map(([label, value], j) => (
                  <div key={j} style={{ display: "flex", gap: "8px", marginBottom: "6px", alignItems: "flex-start" }}>
                    <div style={{ fontSize: "9px", color: dark ? "#555" : "#374151", flexShrink: 0, width: "130px", paddingTop: "1px" }}>{label}</div>
                    <div style={{ fontSize: "10px", color: dark ? "#ccc" : "#111827", lineHeight: "1.5", whiteSpace: "pre-line" }}>{value}</div>
                  </div>
                ))}
                <div style={{ marginTop: "8px", paddingTop: "8px", borderTop: dark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.08)", fontSize: "9px", color: dark ? "#444" : "#1F2937", fontStyle: "italic" }}>
                  Say: "Yamato takuhaibin, onegaishimasu" · Use cashless (Suica/card) to save ¥1–6 per bag
                </div>
              </div>
            ))}
          </div>

          <div style={{ background: dark ? "rgba(255,255,255,0.02)" : "#ffffff", border: dark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.1)", borderRadius: "10px", padding: "12px 14px" }}>
            <div style={{ fontSize: "9px", color: dark ? "#444" : "#1F2937", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "8px" }}>💡 Budget Tips</div>
            {[
              "Konbini meals (7-Eleven, FamilyMart) cost ¥400–700 — great for breakfast and snacks",
              "Free sights: Oishi Park, Bamboo Grove, Gion walk, Shibuya Crossing, Tokyo Met Gov observatory",
              "Suica works at convenience stores, vending machines, and most metro lines",
              "Coin lockers: ¥400 (small), ¥500 (medium), ¥700 (large) per day at major stations",
              "Taxi Oct 8 is unavoidable — no early bus to Yamanaka. Confirm booking with hotel night before.",
            ].map((t, i) => (
              <div key={i} style={{ fontSize: "10.5px", color: dark ? "#888" : "#374151", marginBottom: "7px", paddingLeft: "10px", borderLeft: "2px solid rgba(255,255,255,0.08)", lineHeight: "1.5" }}>{t}</div>
            ))}
          </div>
        </div>
      )}

      {/* ── PRAYER TAB ── */}
      {tab === "prayer" && (
        <div style={{ padding: "20px 16px", background: dark ? "transparent" : "#f0f2f5", minHeight: "100vh" }}>

          {/* Intro banner */}
          <div style={{ background: "rgba(74,158,255,0.06)", border: "1px solid rgba(74,158,255,0.15)", borderRadius: "10px", padding: "12px 14px", marginBottom: "18px" }}>
            <div style={{ fontSize: "11px", color: "#4a9eff", fontWeight: "bold", marginBottom: "4px" }}>🕌 Japan Prayer Guide — October 2026</div>
            <div style={{ fontSize: "10.5px", color: dark ? "#999" : "#1F2937", lineHeight: "1.6" }}>All times use Karachi method (University of Islamic Sciences) — standard in Japan. Times shift ~1–2 min daily. Download <span style={{ color: "#4a9eff" }}>Muslim Pro</span> or <span style={{ color: "#4a9eff" }}>Athan</span> for live GPS-based times. Qibla direction from Japan: roughly <span style={{ color: "#f0c040" }}>northwest (~300°)</span>.</div>
          </div>

          {/* Prayer timetable by city */}
          {[
            {
              city: "🗻 Mt. Fuji — Kawaguchiko", dates: "Oct 7–8", color: "#4a9eff",
              prayers: [
                { name: "Fajr", time: "~4:30 AM", note: "Pray at Sawa Hotel before heading out" },
                { name: "Sunrise", time: "~5:50 AM", note: "Not a prayer — marks end of Fajr window", sunrise: true },
                { name: "Dhuhr", time: "~11:40 AM", note: "Oct 8: T&T Fujiyama has prayer room — perfect timing ✅" },
                { name: "Asr", time: "~2:45 PM", note: "Oct 8: Between Chureito and Kawaguchiko Station" },
                { name: "Maghrib", time: "~5:15 PM", note: "Oct 7: Cycle back from Oishi Park, pray at hotel. Oct 8: At Kawaguchiko before boarding bus" },
                { name: "Isha", time: "~6:45 PM", note: "Oct 7: After dinner at hotel. Oct 8: Board Fujiyama Liner 20:32 — pray before boarding" },
              ]
            },
            {
              city: "🏮 Osaka", dates: "Oct 9–10", color: "#e91e8c",
              prayers: [
                { name: "Fajr", time: "~4:35 AM", note: "Oct 9: You arrive at 7:13 AM — pray at E-Stay lobby or on the bus before arrival" },
                { name: "Sunrise", time: "~5:58 AM", note: "Not a prayer — marks end of Fajr window", sunrise: true },
                { name: "Dhuhr", time: "~11:45 AM", note: "Oct 9: Near Namba/Shin-Imamiya — konbini quiet corner or E-Stay. Oct 10: On JR train back from Nara" },
                { name: "Asr", time: "~2:50 PM", note: "Oct 9: After rest at E-Stay. Oct 10: Osaka Castle grounds — quiet corner available" },
                { name: "Maghrib", time: "~5:33 PM", note: "Oct 9: Before heading to Shinsaibashi. Oct 10: Before Dotonbori dinner" },
                { name: "Isha", time: "~7:00 PM", note: "Oct 9: During Dotonbori walk. Oct 10: After dinner" },
              ]
            },
            {
              city: "⛩️ Kyoto — Higashiyama", dates: "Oct 11–13", color: "#9b59b6",
              prayers: [
                { name: "Fajr", time: "~4:35 AM", note: "Pray at machiya — tatami room, quiet. Best prayer spot of the trip." },
                { name: "Sunrise", time: "~5:58 AM", note: "Not a prayer — marks end of Fajr window", sunrise: true },
                { name: "Dhuhr", time: "~11:45 AM", note: "Oct 11: After Fushimi Inari lunch. Oct 12: Shuttle bus at Kameoka before boat. Oct 13: Nishiki Market area" },
                { name: "Asr", time: "~2:50 PM", note: "Oct 11: At machiya after check-in ✅. Oct 12: Find a quiet café or rest area near Higashiyama after Kiyomizu. Oct 13: Kyoto Station basement has quiet corners." },
                { name: "Maghrib", time: "~5:30 PM", note: "Oct 11: Pray at machiya before heading to Gion. Oct 12: Return to machiya briefly or find a quiet corner in a café near Gion. Oct 13: Pray at machiya before heading to Kyoto Station." },
                { name: "Isha", time: "~6:58 PM", note: "Oct 11: During Gion dinner. Oct 12: Simple dinner near Higashiyama. Oct 13: Kyoto Tower basement area — pray before bus" },
              ]
            },
            {
              city: "🗼 Tokyo — Asakusa", dates: "Oct 14–16", color: "#e74c3c",
              prayers: [
                { name: "Fajr", time: "~4:25 AM", note: "Oct 14: Pray on the overnight bus before arriving Shinjuku 7AM. Oct 15–16: Pray at Asakusa Ryokan" },
                { name: "Sunrise", time: "~5:48 AM", note: "Not a prayer — marks end of Fajr window", sunrise: true },
                { name: "Dhuhr", time: "~11:38 AM", note: "Oct 14: Tsukiji or Senso-ji area — quiet corner at temple grounds. Oct 15: Koenji café" },
                { name: "Asr", time: "~2:42 PM", note: "Oct 14: Near Kappabashi or Asakusa Ryokan check-in. Oct 15: Koenji or Don Quijote" },
                { name: "Maghrib", time: "~5:08 PM", note: "Oct 14: Shibuya area — plan prayer before Shibuya Crossing crowds peak. Oct 15: Before Tokyo Met Gov observatory. Oct 16: At Narita Airport — has prayer room ✅" },
                { name: "Isha", time: "~6:38 PM", note: "Oct 14: Dinner in Shibuya. Oct 15: Dinner in Shinjuku. Oct 16: At Narita before flight" },
              ]
            },
          ].map((city, ci) => (
            <div key={ci} style={{ marginBottom: "18px", border: `1px solid ${city.color}25`, borderRadius: "12px", overflow: "hidden" }}>
              <div style={{ background: `${city.color}15`, padding: "10px 14px", borderBottom: `1px solid ${city.color}20`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontSize: "13px", color: dark ? "#f0e8dc" : "#111827", fontWeight: "bold" }}>{city.city}</div>
                <div style={{ fontSize: "9px", color: city.color, letterSpacing: "0.1em" }}>{city.dates}</div>
              </div>
              {city.prayers.map((p, pi) => (
                <div key={pi} style={{ display: "flex", gap: "10px", padding: "9px 14px", borderBottom: pi < city.prayers.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none", background: p.sunrise ? "rgba(255,255,255,0.01)" : "transparent", opacity: p.sunrise ? 0.5 : 1 }}>
                  <div style={{ flexShrink: 0, width: "70px" }}>
                    <div style={{ fontSize: "10px", fontWeight: "bold", color: p.sunrise ? "#555" : city.color }}>{p.name}</div>
                    <div style={{ fontSize: "11px", color: p.sunrise ? "#444" : "#e0d8cf", fontWeight: "bold" }}>{p.time}</div>
                  </div>
                  <div style={{ fontSize: "10px", color: dark ? "#777" : "#1F2937", lineHeight: "1.5", paddingTop: "1px" }}>{p.note}</div>
                </div>
              ))}
            </div>
          ))}

          {/* Sun times */}
          <div style={{ marginBottom: "16px" }}>
            <div style={{ fontSize: "9px", color: "#f0c040", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "8px" }}>🌅 Sunrise & Sunset by City (October)</div>
            <div style={{ background: "rgba(240,192,64,0.05)", border: "1px solid rgba(240,192,64,0.15)", borderRadius: "10px", overflow: "hidden" }}>
              {[
                { city: "🗻 Kawaguchiko", sunrise: "5:50 AM", sunset: "5:15 PM", dusk: "5:40 PM" },
                { city: "🏮 Osaka", sunrise: "5:58 AM", sunset: "5:33 PM", dusk: "5:58 PM" },
                { city: "⛩️ Kyoto", sunrise: "5:58 AM", sunset: "5:30 PM", dusk: "5:55 PM" },
                { city: "🗼 Tokyo", sunrise: "5:48 AM", sunset: "5:08 PM", dusk: "5:33 PM" },
              ].map((row, i) => (
                <div key={i} style={{ display: "flex", padding: "8px 14px", borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.04)" : "none", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ fontSize: "10.5px", color: dark ? "#ccc" : "#111827", width: "120px" }}>{row.city}</div>
                  <div style={{ fontSize: "10px", color: "#f0c040" }}>🌄 {row.sunrise}</div>
                  <div style={{ fontSize: "10px", color: "#fb923c" }}>🌇 {row.sunset}</div>
                  <div style={{ fontSize: "10px", color: dark ? "#555" : "#374151" }}>🌑 {row.dusk}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Prayer facilities */}
          <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "10px", padding: "14px" }}>
            <div style={{ fontSize: "9px", color: "#4a9eff", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "10px" }}>🕌 Prayer Facilities & Tips</div>
            {[
              "📱 Download Muslim Pro or Athan app — GPS-based live prayer times + nearest musolla finder",
              "🏬 Department stores in Osaka/Kyoto/Tokyo often have musolla — ask at info counter",
              "⛩️ T&T Fujiyama (Oct 8, Fujiyoshida) — has dedicated prayer room ✅",
              "🕌 Tokyo Camii (Yoyogi-Uehara, Tokyo) — largest mosque in Japan. If in Tokyo area on Friday, worth visiting for Jumu'ah",
              "🕌 Osaka Ibaraki Mosque — north Osaka, about 30 min from Shin-Imamiya",
              "🕌 Kyoto Mosque — Kamigyo Ward near Doshisha University",
              "✈️ Narita Airport — has interfaith prayer room (Terminal 1 & 2). Use on Oct 16 departure",
              "🧭 Qibla direction from all Japan cities: roughly Northwest (~295–305°)",
              "🔇 Japan is quiet and respectful — praying discreetly in parks, temple grounds, or train station quiet corners is generally fine",
            ].map((t, i) => (
              <div key={i} style={{ fontSize: "10.5px", color: dark ? "#888" : "#374151", marginBottom: "8px", paddingLeft: "10px", borderLeft: "2px solid rgba(74,158,255,0.2)", lineHeight: "1.5" }}>{t}</div>
            ))}
          </div>

          {/* Shop opening hours */}
          <div style={{ marginTop: "16px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "10px", padding: "14px" }}>
            <div style={{ fontSize: "9px", color: "#4ade80", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "10px" }}>🏪 Shop & Mall Opening Hours</div>
            {[
              ["Convenience stores (7-Eleven, FamilyMart, Lawson)", "24 hours", "24 hours"],
              ["Department stores (Isetan, Hankyu, Daimaru)", "10:00 AM", "8–9 PM"],
              ["Shopping malls", "10–11 AM", "9–10 PM"],
              ["Covered arcades (Shinsaibashi, Nishiki, Teramachi)", "9–10 AM", "7–8 PM"],
              ["Koenji vintage shops (Pal/Look Street)", "11 AM–12 PM", "7–9 PM"],
              ["Don Quijote", "9 AM", "Midnight–2 AM (some 24hrs)"],
              ["Tsukiji Outer Market", "5–6 AM", "2 PM (best before 11 AM)"],
              ["Kuromon Market, Osaka", "9 AM", "6 PM (best 10AM–2PM)"],
              ["Ameyoko Market, Ueno", "10 AM", "7–8 PM"],
              ["Izakayas / restaurants", "11 AM", "11 PM–midnight"],
              ["Ramen shops", "11 AM", "11 PM–2 AM"],
              ["Drugstores (Matsumoto Kiyoshi)", "10 AM", "10 PM"],
            ].map(([type, open, close], i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "6px 0", borderBottom: i < 11 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                <div style={{ fontSize: "10px", color: dark ? "#aaa" : "#374151", flex: 1 }}>{type}</div>
                <div style={{ fontSize: "9.5px", color: "#4ade80", marginLeft: "8px", flexShrink: 0 }}>Open {open}</div>
                <div style={{ fontSize: "9.5px", color: "#fb923c", marginLeft: "8px", flexShrink: 0 }}>Close {close}</div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* ── ACCOMMODATION TAB ── */}
      {tab === "accom" && (
        <div style={{ padding: "20px 16px", background: dark ? "transparent" : "#f0f2f5", minHeight: "100vh" }}>

          <div style={{ background: dark ? "rgba(255,255,255,0.03)" : "#ffffff", border: dark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.12)", borderRadius: "10px", padding: "12px 14px", marginBottom: "16px" }}>
            <div style={{ fontSize: "11px", color: "#4a9eff", fontWeight: "bold", marginBottom: "4px" }}>🏨 4 Properties · 7 Nights · All Booked ✅</div>
            <div style={{ fontSize: "10px", color: dark ? "#888" : "#1F2937" }}>Oct 7–8 Fuji → Oct 9–11 Osaka → Oct 11–13 Kyoto → Oct 14–16 Tokyo</div>
          </div>

          {[
            {
              name: "Sawa Hotel",
              city: "🗻 Fujikawaguchiko",
              dates: "Oct 7–8 (1 night)",
              color: "#1D4ED8",
              bg: "rgba(29,78,216,0.06)",
              status: "✅ Booked",
              checkin: "Flexible — afternoon",
              checkout: "5:40 AM (early for Yamato + taxi)",
              request: "⚠️ Request 3F+ north-facing room for Fuji view from bed",
              address: "Fujikawaguchiko, Yamanashi",
              nearest: "Kawaguchiko Station (5 min walk)",
              notes: "Ask hotel to arrange 5:45AM taxi to Lake Yamanaka on Oct 8. Leave Yamato request with front desk Oct 7 evening.",
              yamato: "📦 Send bags here on Oct 8 checkout morning → FamilyMart nearby",
              contacts: [
                ["Phone", "Ask hotel for number"],
                ["Email", "Via Agoda booking"],
              ],
              keyinfo: [
                ["Room type", "Standard — request mountain view"],
                ["Breakfast", "Available 7–9AM (ask for no pork)"],
                ["Bicycle rental", "¥1,000/day — rent on Oct 7 for Oishi Park"],
              ],
            },
            {
              name: "E-Stay Ebisu",
              city: "🏮 Osaka (Shin-Imamiya)",
              dates: "Oct 9–11 (2 nights)",
              color: "#BE185D",
              bg: "rgba(190,24,93,0.06)",
              status: "✅ Booked",
              checkin: "3:00 PM (arrive 7:13AM — ask to store bags)",
              checkout: "8:00 AM Oct 11 (early for Garaku 9:32)",
              request: "⚠️ Email: inform 7:13AM arrival. Yamato bags arriving Oct 9 afternoon.",
              address: "Shin-Imamiya, Naniwa Ward, Osaka",
              nearest: "Shin-Imamiya Station / Dobutsuen-mae Station (3 min walk)",
              notes: "Yamato bags from Fuji arriving Oct 9 afternoon — confirm they can receive. Checkout Oct 11 at 8AM, carry bags on Garaku train to Kyoto.",
              yamato: "✅ Yamato LEG 1 bags arriving here Oct 9 afternoon",
              contacts: [
                ["Email", "Contact via Agoda booking"],
              ],
              keyinfo: [
                ["Nearby station", "Dobutsuen-mae (Midosuji Line) for Oct 10 Nara"],
                ["Walk to Kuromon", "10 min"],
                ["Walk to Shinsekai", "5 min"],
              ],
            },
            {
              name: "Machiya Kamiuneya",
              city: "⛩️ Higashiyama, Kyoto",
              dates: "Oct 11–13 (2 nights)",
              color: "#5B21B6",
              bg: "rgba(91,33,182,0.06)",
              status: "✅ Booked",
              checkin: "Check-in DESK (not machiya directly!): 685-2 Shiokojicho, Shimogyo Ward — 3 min walk from Kyoto Station. Open 10AM–7PM.",
              checkout: "7:40 AM Oct 13 (key drop box or Welcome Desk)",
              request: "⚠️ Email to confirm Oct 11 ~2PM arrival + key drop method for Oct 13 checkout",
              address: "Kamiumeya, Higashiyama Ward, Kyoto",
              nearest: "Gion-Shijo Station (Keihan, 15 min walk) — use Keihan to/from Fushimi",
              notes: "Private tatami machiya — best prayer spot of the trip. FREE luggage delivery from Welcome Desk to machiya.",
              yamato: "📦 Send bags from nearby FamilyMart Oct 13, 7:20AM → Toukaisou Tokyo",
              contacts: [
                ["Welcome Desk Tel", "+81 90-8161-3870"],
                ["Email", "info@ume-machiya.com"],
                ["Check-in Desk Address", "685-2 Shiokojicho, Shimogyo Ward, Kyoto"],
              ],
              keyinfo: [
                ["Entrance door code", "Collect at Welcome Desk with room key"],
                ["Checkout method", "Key drop box at machiya or return to Welcome Desk — confirm by email"],
                ["Walk to Kiyomizu", "15 min uphill"],
                ["Walk to Gion", "10 min"],
                ["FamilyMart nearby", "4-chome-182-18 Kiyomizu (24hrs) — for Yamato Oct 13"],
              ],
            },
            {
              name: "Asakusa Ryokan Toukaisou",
              city: "🗼 Asakusa, Tokyo",
              dates: "Oct 14–16 (2 nights)",
              color: "#DC2626",
              bg: "rgba(220,38,38,0.06)",
              status: "✅ Booked (NON-REFUNDABLE)",
              checkin: "3:00 PM – 10:00 PM (NOT open 24hrs — must arrive before 10PM!)",
              checkout: "6:00 AM Oct 16 (early flight)",
              request: "⚠️ REPLY TO THEIR EMAIL NOW — tell them check-in ~4PM Oct 14",
              address: "2-16-12 Nishiasakusa, Taito Ward, Tokyo 111-0035 / 浅草旅館 東海荘",
              nearest: "Tawaramachi Station (Ginza Line G18) Exit 3 — 5 min walk",
              notes: "Yamato bags from Kyoto arriving Oct 14 afternoon. Luggage stored from 10AM. Non-refundable booking.",
              yamato: "✅ Yamato LEG 2 bags arriving here Oct 14 afternoon",
              contacts: [
                ["Booking Ref", "2020733965 (Agoda)"],
                ["Contact", "Via Agoda booking"],
              ],
              keyinfo: [
                ["Room type", "Double Room with Small Double Bed + private bath"],
                ["Directions from Tawaramachi Exit 3", "Walk straight → Bakery Yamazaki on left → 5 blocks → Lawson on left → LEFT at kebab shop → 2 blocks → Hair So-y → RIGHT → Toukaisou on left after parking lot"],
                ["Walk to Senso-ji", "5 min ✅ (night visit Oct 14)"],
                ["Walk to Kappabashi", "10 min (Oct 15 morning)"],
              ],
            },
          ].map((h, i) => (
            <div key={i} style={{ marginBottom: "18px", border: `1px solid ${h.color}25`, borderRadius: "12px", overflow: "hidden" }}>
              {/* Header */}
              <div style={{ background: `${h.color}20`, padding: "12px 14px", borderBottom: `1px solid ${h.color}20` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <div style={{ fontSize: "14px", color: "#fff", fontWeight: "bold" }}>{h.name}</div>
                    <div style={{ fontSize: "10px", color: h.color, marginTop: "2px" }}>{h.city} · {h.dates}</div>
                  </div>
                  <div style={{ fontSize: "9px", color: "#4ade80", background: "rgba(74,222,128,0.1)", padding: "3px 8px", borderRadius: "4px", fontWeight: "bold" }}>{h.status}</div>
                </div>
              </div>

              <div style={{ padding: "12px 14px", background: h.bg }}>
                {/* Check-in/out */}
                <div style={{ display: "flex", gap: "12px", marginBottom: "10px" }}>
                  <div style={{ flex: 1, background: dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.05)", borderRadius: "6px", padding: "8px 10px" }}>
                    <div style={{ fontSize: "8px", color: dark ? "#555" : "#374151", textTransform: "uppercase", letterSpacing: "0.1em" }}>Check-in</div>
                    <div style={{ fontSize: "10px", color: dark ? "#ccc" : "#111827", marginTop: "2px", lineHeight: "1.4" }}>{h.checkin}</div>
                  </div>
                  <div style={{ flex: 1, background: dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.05)", borderRadius: "6px", padding: "8px 10px" }}>
                    <div style={{ fontSize: "8px", color: dark ? "#555" : "#374151", textTransform: "uppercase", letterSpacing: "0.1em" }}>Checkout</div>
                    <div style={{ fontSize: "10px", color: dark ? "#ccc" : "#111827", marginTop: "2px", lineHeight: "1.4" }}>{h.checkout}</div>
                  </div>
                </div>

                {/* Request banner */}
                <div style={{ background: "rgba(251,146,60,0.08)", border: "1px solid rgba(251,146,60,0.2)", borderRadius: "6px", padding: "8px 10px", marginBottom: "10px" }}>
                  <div style={{ fontSize: "10px", color: "#fb923c", lineHeight: "1.4" }}>{h.request}</div>
                </div>

                {/* Address + nearest */}
                <div style={{ marginBottom: "10px" }}>
                  <div style={{ fontSize: "9px", color: dark ? "#555" : "#374151", marginBottom: "3px" }}>📍 {h.address}</div>
                  <div style={{ fontSize: "9px", color: dark ? "#555" : "#374151" }}>🚇 {h.nearest}</div>
                </div>

                {/* Contacts */}
                {h.contacts.map(([label, val], ci) => (
                  <div key={ci} style={{ display: "flex", gap: "8px", marginBottom: "4px" }}>
                    <div style={{ fontSize: "9px", color: dark ? "#444" : "#1F2937", width: "120px", flexShrink: 0 }}>{label}:</div>
                    <div style={{ fontSize: "9.5px", color: h.color, fontWeight: "bold" }}>{val}</div>
                  </div>
                ))}

                {/* Key info */}
                <div style={{ marginTop: "10px", paddingTop: "10px", borderTop: dark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.08)" }}>
                  {h.keyinfo.map(([label, val], ki) => (
                    <div key={ki} style={{ display: "flex", gap: "8px", marginBottom: "5px", alignItems: "flex-start" }}>
                      <div style={{ fontSize: "9px", color: dark ? "#444" : "#1F2937", width: "120px", flexShrink: 0, paddingTop: "1px" }}>{label}:</div>
                      <div style={{ fontSize: "10px", color: dark ? "#aaa" : "#374151", lineHeight: "1.4" }}>{val}</div>
                    </div>
                  ))}
                </div>

                {/* Notes */}
                <div style={{ marginTop: "10px", paddingTop: "10px", borderTop: dark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.08)", fontSize: "10px", color: dark ? "#666" : "#374151", lineHeight: "1.5" }}>{h.notes}</div>

                {/* Yamato */}
                <div style={{ marginTop: "8px", background: "rgba(240,192,64,0.06)", border: "1px solid rgba(240,192,64,0.15)", borderRadius: "6px", padding: "6px 10px", fontSize: "9.5px", color: "#f0c040" }}>{h.yamato}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── CHECKLIST TAB ── */}
      {tab === "checklist" && (
        <div style={{ padding: "20px 16px", background: dark ? "transparent" : "#f0f2f5", minHeight: "100vh" }}>
          {/* Progress */}
          <div style={{ background: dark ? "rgba(255,255,255,0.03)" : "#ffffff", border: dark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.12)", borderRadius: "10px", padding: "14px", marginBottom: "16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
              <span style={{ fontSize: "12px", color: dark ? "#ccc" : "#111827" }}>Booking Progress</span>
              <span style={{ fontSize: "12px", color: "#4a9eff" }}>{doneItems} / {totalItems}</span>
            </div>
            <div style={{ height: "6px", background: dark ? "#111" : "#E5E7EB", borderRadius: "3px", overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${(doneItems / totalItems) * 100}%`, background: "linear-gradient(90deg, #4a9eff, #27ae60)", borderRadius: "3px", transition: "width 0.4s ease" }} />
            </div>
            <div style={{ fontSize: "10px", color: dark ? "#555" : "#374151", marginTop: "6px", fontStyle: "italic" }}>
              {doneItems === 0 ? "Nothing booked yet — start with flights and overnight buses." : doneItems === totalItems ? "✓ All done — you're ready!" : `${totalItems - doneItems} items remaining`}
            </div>
          </div>

          {checklist.map((cat, ci) => (
            <div key={ci} style={{ marginBottom: "14px" }}>
              <div style={{ fontSize: "10px", color: cat.color, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "8px", fontStyle: "italic" }}>
                {cat.category}
              </div>
              {cat.items.map((item, ii) => (
                <div
                  key={ii}
                  onClick={() => toggleCheck(ci, ii)}
                  style={{
                    display: "flex",
                    gap: "12px",
                    marginBottom: "8px",
                    background: item.booked ? (dark ? "rgba(39,174,96,0.06)" : "#F0FDF4") : item.urgent ? (dark ? "rgba(255,107,53,0.04)" : "#FFF7ED") : (dark ? "rgba(255,255,255,0.02)" : "#ffffff"),
                    border: `1px solid ${item.booked ? (dark ? "#27ae6030" : "#86EFAC") : item.urgent ? (dark ? "#ff6b3520" : "#FED7AA") : (dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.1)")}`,
                    borderRadius: "10px",
                    padding: "11px 13px",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    alignItems: "flex-start",
                  }}
                >
                  <div style={{
                    width: "18px",
                    height: "18px",
                    borderRadius: "4px",
                    border: `1.5px solid ${item.booked ? "#27ae60" : (dark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.25)")}`,
                    background: item.booked ? "#27ae60" : "transparent",
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: "1px",
                    transition: "all 0.2s",
                  }}>
                    {item.booked && <span style={{ color: "#fff", fontSize: "10px" }}>✓</span>}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "12px", color: item.booked ? (dark ? "#666" : "#6B7280") : (dark ? "#ccc" : "#111827"), textDecoration: item.booked ? "line-through" : "none", lineHeight: "1.4" }}>
                      {item.task}
                    </div>
                    <div style={{ display: "flex", gap: "6px", marginTop: "4px", flexWrap: "wrap", alignItems: "center" }}>
                      {item.urgent && !item.booked && (
                        <span style={{ fontSize: "8px", background: "#ff6b3515", border: "1px solid #ff6b3530", color: "#ff6b35", borderRadius: "3px", padding: "1px 5px", letterSpacing: "0.1em" }}>URGENT</span>
                      )}
                      <span style={{ fontSize: "10px", color: dark ? "#555" : "#1F2937", fontStyle: "italic" }}>{item.when}</span>
                      {item.link && <span style={{ fontSize: "10px", color: "#4a9eff66" }}>→ {item.link}</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
