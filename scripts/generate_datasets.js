const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '..', 'data');

const firstNames = ["James", "Emma", "Liam", "Olivia", "Noah", "Ava", "Oliver", "Sophia", "Elijah", "Isabella", "William", "Mia", "Lucas", "Charlotte", "Benjamin", "Amelia", "Henry", "Harper", "Alexander", "Evelyn", "Sebastian", "Abigail", "Jack", "Emily", "Daniel", "Elizabeth"];
const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin", "Lee", "Perez", "Thompson", "White", "Harris", "Sanchez"];
const cities = ["New York", "San Francisco", "London", "Tokyo", "Berlin", "Singapore", "Sydney", "Toronto", "Paris", "Austin", "Seattle", "Amsterdam", "Dublin", "Zurich", "Chicago", "Boston", "Seoul", "Melbourne", "Stockholm", "Madrid", "Barcelona", "Vancouver", "Vienna", "Copenhagen", "Dubai", "Oslo"];

function getName(i) {
  return `${firstNames[i % firstNames.length]} ${lastNames[i % lastNames.length]}`;
}

const datasets = {};

// 1. invoices (26 records)
datasets.invoices = Array.from({ length: 26 }, (_, i) => {
  const id = i + 1;
  const subtotal = 450 + (i * 125);
  const tax = Math.round(subtotal * 0.08);
  const statuses = ["paid", "paid", "pending", "overdue", "paid"];
  return {
    id,
    invoiceNumber: `INV-2026-${String(id).padStart(4, '0')}`,
    clientName: `${getName(i)} & Co`,
    clientEmail: `billing@client${id}.com`,
    issueDate: `2026-09-${String((i % 28) + 1).padStart(2, '0')}`,
    dueDate: `2026-10-${String((i % 28) + 1).padStart(2, '0')}`,
    subtotal: subtotal,
    tax: tax,
    totalAmount: subtotal + tax,
    currency: "USD",
    status: statuses[i % statuses.length],
    itemsCount: 2 + (i % 5)
  };
});

// 2. cryptos (26 records)
const cryptoList = [
  { s: "BTC", n: "Bitcoin", p: 68450.00, mc: 1350000000000, c: 2.45 },
  { s: "ETH", n: "Ethereum", p: 3520.50, mc: 423000000000, c: -1.20 },
  { s: "SOL", n: "Solana", p: 178.40, mc: 82000000000, c: 5.60 },
  { s: "BNB", n: "BNB", p: 585.10, mc: 87000000000, c: 0.85 },
  { s: "XRP", n: "XRP", p: 0.54, mc: 30000000000, c: -0.40 },
  { s: "ADA", n: "Cardano", p: 0.42, mc: 15000000000, c: 1.15 },
  { s: "AVAX", n: "Avalanche", p: 32.80, mc: 13000000000, c: 3.20 },
  { s: "DOGE", n: "Dogecoin", p: 0.12, mc: 17000000000, c: -2.10 },
  { s: "DOT", n: "Polkadot", p: 6.85, mc: 9800000000, c: 0.50 },
  { s: "LINK", n: "Chainlink", p: 14.20, mc: 8500000000, c: 4.10 },
  { s: "MATIC", n: "Polygon", p: 0.68, mc: 6700000000, c: -0.90 },
  { s: "NEAR", n: "NEAR Protocol", p: 5.40, mc: 5900000000, c: 6.30 },
  { s: "UNI", n: "Uniswap", p: 8.15, mc: 4800000000, c: 1.80 },
  { s: "LTC", n: "Litecoin", p: 72.30, mc: 5400000000, c: -0.30 },
  { s: "ATOM", n: "Cosmos", p: 6.20, mc: 2400000000, c: 0.90 },
  { s: "APT", n: "Aptos", p: 8.95, mc: 4100000000, c: 3.80 },
  { s: "ARB", n: "Arbitrum", p: 0.82, mc: 2600000000, c: -1.50 },
  { s: "OP", n: "Optimism", p: 1.75, mc: 1900000000, c: 2.10 },
  { s: "INJ", n: "Injective", p: 24.50, mc: 2300000000, c: 7.40 },
  { s: "SUI", n: "Sui", p: 1.95, mc: 5200000000, c: 4.50 },
  { s: "RENDER", n: "Render", p: 6.10, mc: 2300000000, c: 1.20 },
  { s: "FET", n: "Artificial Superintelligence", p: 1.45, mc: 3600000000, c: -3.40 },
  { s: "KAS", n: "Kaspa", p: 0.16, mc: 3900000000, c: 0.80 },
  { s: "TIA", n: "Celestia", p: 5.80, mc: 1200000000, c: -2.30 },
  { s: "SEI", n: "Sei", p: 0.38, mc: 1200000000, c: 1.90 },
  { s: "TAO", n: "Bittensor", p: 512.00, mc: 3700000000, c: 8.20 }
];
datasets.cryptos = cryptoList.map((c, i) => ({
  id: i + 1,
  symbol: c.s,
  name: c.n,
  priceUsd: c.p,
  marketCapUsd: c.mc,
  change24h: c.c,
  volume24h: Math.round(c.mc * 0.05),
  circulatingSupply: Math.round(c.mc / c.p)
}));

// 3. bank_accounts (26 records)
const banks = ["JPMorgan Chase", "Bank of America", "Wells Fargo", "Citibank", "Barclays", "HSBC", "Capital One", "Morgan Stanley"];
datasets.bank_accounts = Array.from({ length: 26 }, (_, i) => ({
  id: i + 1,
  accountNumber: `ACCT-${74829100 + i}`,
  bankName: banks[i % banks.length],
  holderName: getName(i),
  accountType: ["checking", "savings", "business", "money_market"][i % 4],
  balance: Math.round((5000 + (i * 2450.75)) * 100) / 100,
  currency: "USD",
  routingNumber: `0210000${(i % 9) + 1}`,
  status: i === 7 ? "frozen" : "active"
}));

// 4. expenses (26 records)
const merchants = ["AWS Cloud", "Google Workspace", "Slack Technologies", "Figma Design", "Stripe Billing", "Uber for Business", "Delta Airlines", "WeWork", "Zoom Video", "GitHub Enterprise"];
const categoriesExp = ["Cloud Infrastructure", "SaaS Subscriptions", "Office & Co-working", "Travel & Flight", "Developer Tools"];
datasets.expenses = Array.from({ length: 26 }, (_, i) => ({
  id: i + 1,
  expenseNumber: `EXP-2026-${String(i + 1).padStart(4, '0')}`,
  category: categoriesExp[i % categoriesExp.length],
  merchant: merchants[i % merchants.length],
  amount: Math.round((85 + (i * 92.5)) * 100) / 100,
  currency: "USD",
  expenseDate: `2026-10-${String((i % 24) + 1).padStart(2, '0')}`,
  paymentMethod: i % 2 === 0 ? "corporate_card" : "bank_transfer",
  receiptUrl: `https://mockmarket.io/receipts/exp_${i + 1}.pdf`,
  approvedBy: getName(i + 3),
  status: ["approved", "approved", "pending", "approved"][i % 4]
}));

// 5. coupons (26 records)
const couponCodes = ["WELCOME20", "SUMMER50", "DEVCON26", "BLACKFRIDAY", "FREESHIP", "SPRING25", "CYBERMONDAY", "SAVE10", "FLASHSALE", "VIPMEMBER", "EARLYBIRD", "MOCKMARKET", "STARTUP100", "TECHIE30", "HOLIDAY40", "BACKTOSCHOOL", "EASTER15", "OCTOBER20", "NEWYEAR30", "WEEKEND10", "BUNDLE50", "LOYALTY25", "FIRSTORDER", "STUDENT15", "COMMUNITY20", "PROMOX26"];
datasets.coupons = couponCodes.map((code, i) => ({
  id: i + 1,
  code: code,
  discountType: i % 3 === 0 ? "fixed_amount" : "percentage",
  discountValue: i % 3 === 0 ? 25 : (10 + (i % 5) * 5),
  minOrderAmount: 50 + (i % 4) * 25,
  maxDiscount: 100,
  validUntil: `2026-12-${String((i % 28) + 1).padStart(2, '0')}`,
  usageLimit: 500,
  usageCount: 45 + (i * 15),
  isActive: i !== 5
}));

// 6. doctors (26 records)
const specialties = ["Cardiology", "Dermatology", "Neurology", "Pediatrics", "Orthopedics", "Psychiatry", "Ophthalmology", "Oncology", "Endocrinology"];
const hospitals = ["Metro Health Center", "Saint Jude Medical", "Cedar Sinai Hospital", "Mayo Clinic Partner", "Bellevue Medical Center"];
datasets.doctors = Array.from({ length: 26 }, (_, i) => ({
  id: i + 1,
  fullName: `Dr. ${getName(i)}, M.D.`,
  specialty: specialties[i % specialties.length],
  hospital: hospitals[i % hospitals.length],
  experienceYears: 6 + (i % 18),
  consultationFee: 120 + (i % 8) * 20,
  rating: Math.round((4.4 + (i % 6) * 0.1) * 10) / 10,
  availableDays: ["Monday", "Wednesday", "Friday"],
  isAcceptingNewPatients: i % 4 !== 0
}));

// 7. appointments (26 records)
datasets.appointments = Array.from({ length: 26 }, (_, i) => ({
  id: i + 1,
  appointmentCode: `APT-${8400 + i}`,
  patientName: getName(i + 2),
  doctorId: (i % 26) + 1,
  doctorName: `Dr. ${getName(i)}, M.D.`,
  department: specialties[i % specialties.length],
  appointmentDate: `2026-10-${String((i % 25) + 1).padStart(2, '0')}`,
  timeSlot: `${9 + (i % 7)}:00 AM`,
  consultationType: i % 2 === 0 ? "in_person" : "video_call",
  status: ["confirmed", "completed", "confirmed", "in_progress", "cancelled"][i % 5],
  notes: "Routine medical checkup and follow-up consultation."
}));

// 8. workouts (26 records)
const workoutTitles = ["HIIT Cardio Blast", "Chest & Triceps Hypertrophy", "Power Yoga Flow", "Deadlift Strength Builder", "Core & Abs Sculpt", "Leg Day Heavy Squats", "Shoulder Bolder Builder", "Full Body Functional Circuit", "Back & Biceps Pull Day", "Glute Activation Burn", "Kettlebell Conditioning", "Calisthenics Mastery", "Sprint Interval Training", "Pilates Core Reform", "Olympic Snatch Technique", "Recovery Foam Rolling", "Boxer Endurance Drill", "Barbell Bench Mastery", "Endurance Rowing Challenge", "Tabata Fat Furnace", "Arm Blaster Super-Sets", "Mobility & Hip Flexor Flow", "Pyramid Upper Body", "CrossFit WOD Helen", "TRX Suspension Blast", "Post-Run Stretch Routine"];
const muscles = ["Chest", "Back", "Legs", "Core", "Full Body", "Shoulders", "Cardiovascular"];
datasets.workouts = workoutTitles.map((title, i) => ({
  id: i + 1,
  title: title,
  targetMuscle: muscles[i % muscles.length],
  difficultyLevel: ["Beginner", "Intermediate", "Advanced"][i % 3],
  durationMinutes: 20 + (i % 5) * 10,
  caloriesBurned: 180 + (i % 6) * 80,
  equipmentRequired: ["Dumbbells", "Barbell", "Mat"].slice(0, (i % 3) + 1),
  exercisesCount: 5 + (i % 5)
}));

// 9. pharmacy_items (26 records)
const drugNames = ["Amoxicillin", "Ibuprofen", "Metformin", "Atorvastatin", "Lisinopril", "Omeprazole", "Levothyroxine", "Amlodipine", "Metoprolol", "Albuterol", "Gabapentin", "Losartan", "Sertraline", "Simvastatin", "Hydrochlorothiazide", "Pantoprazole", "Furosemide", "Fluticasone", "Escitalopram", "Fluoxetine", "Cetirizine", "Montelukast", "Prednisone", "Meloxicam", "Citalopram", "Clopidogrel"];
const pharmaCats = ["Antibiotics", "Pain Relief", "Cardiovascular", "Diabetes", "Gastrointestinal", "Respiratory", "Mental Health"];
datasets.pharmacy_items = drugNames.map((name, i) => ({
  id: i + 1,
  drugName: `${name} ${20 + (i % 5) * 50}mg`,
  genericName: name,
  category: pharmaCats[i % pharmaCats.length],
  dosageForm: ["Tablet", "Capsule", "Inhaler", "Syrup"][i % 4],
  manufacturer: ["Pfizer", "Novartis", "Roche", "Bayer", "Sanofi", "GSK"][i % 6],
  prescriptionRequired: i % 3 !== 0,
  price: Math.round((8.50 + (i % 10) * 4.25) * 100) / 100,
  stockQuantity: 40 + (i * 12)
}));

// 10. shipments (26 records)
const couriers = ["FedEx Express", "DHL Global", "UPS Ground", "USPS Priority"];
datasets.shipments = Array.from({ length: 26 }, (_, i) => ({
  id: i + 1,
  trackingNumber: `TRK-${94820100 + i}US`,
  courierName: couriers[i % couriers.length],
  originCity: cities[i % cities.length],
  destinationCity: cities[(i + 5) % cities.length],
  currentStatus: ["in_transit", "out_for_delivery", "delivered", "exception"][i % 4],
  weightKg: Math.round((1.2 + (i % 8) * 1.5) * 10) / 10,
  estimatedDelivery: `2026-10-${String((i % 26) + 1).padStart(2, '0')}`,
  stepsCount: 3 + (i % 4)
}));

// 11. hotels (26 records)
const hotelNames = ["The Grand Horizon", "Azure Bay Resort", "Metropolitan Suites", "Alpine Crest Lodge", "The Ritz Carlton Reserve", "Four Seasons Haven", "Park Hyatt Palace", "Mandarin Oriental View", "St. Regis Sanctuary", "Waldorf Astoria Oasis", "W Hotel Downtown", "InterContinental Marina", "Rosewood Sanctuary", "Banyan Tree Villa", "Aman Tokyo Sanctuary", "The Langham Heritage", "Peninsula Elegance", "Shangri-La Horizon", "Fairmont Empress", "Bulgari Resort", "Belmond Cipriani", "Cheval Blanc", "Six Senses Hideaway", "One&Only Ocean", "Raffles Landmark", "Kempinski Palace"];
datasets.hotels = hotelNames.map((name, i) => ({
  id: i + 1,
  name: name,
  city: cities[i % cities.length],
  starRating: i % 3 === 0 ? 4 : 5,
  pricePerNight: 150 + (i % 8) * 85,
  currency: "USD",
  roomType: ["Deluxe King", "Executive Suite", "Ocean View Villa", "Penthouse"][i % 4],
  amenities: ["Free WiFi", "Infinity Pool", "Spa & Wellness", "Breakfast Included"],
  userRating: Math.round((4.5 + (i % 5) * 0.1) * 10) / 10
}));

// 12. flights (26 records)
const airlines = ["American Airlines", "Delta Air Lines", "Singapore Airlines", "Emirates", "Lufthansa", "British Airways", "Qatar Airways", "Cathay Pacific"];
const iatas = ["JFK", "LAX", "SIN", "LHR", "HND", "DXB", "FRA", "CDG", "SFO", "SYD"];
datasets.flights = Array.from({ length: 26 }, (_, i) => ({
  id: i + 1,
  flightNumber: `${airlines[i % airlines.length].slice(0, 2).toUpperCase()}-${300 + i}`,
  airline: airlines[i % airlines.length],
  originIata: iatas[i % iatas.length],
  destIata: iatas[(i + 3) % iatas.length],
  departureTime: `2026-10-${String((i % 25) + 1).padStart(2, '0')}T${String(8 + (i % 12)).padStart(2, '0')}:30:00Z`,
  ticketPrice: 380 + (i % 10) * 95,
  seatClass: ["Economy", "Premium Economy", "Business", "First Class"][i % 4],
  status: ["on_time", "boarding", "delayed", "landed"][i % 4]
}));

// 13. restaurants (26 records)
const restNames = ["Sakura Omakase", "Trattoria Bella Vista", "Le Petit Bistro", "El Fuego Cantina", "The Golden Dragon", "Blue Fin Seafood Grill", "Prime 112 Steakhouse", "Nonna's Secret Pasta", "Kyoto Ramen Bar", "Santorini Taverna", "Bombay Spice Club", "Seoul Korean BBQ", "Casa Tapas Bar", "Viking Smokehouse", "Bangkok Street Bites", "Copenhagen Nordic Farm", "Osteria Francescana Style", "Lima Ceviche Bar", "Hanoi Pho House", "Al-Amir Lebanese Grill", "Caelis Haute Cuisine", "Atelier Crenn Inspired", "Central Modern Kitchen", "Pujol Mexican Table", "Gaggan Progressive Feast", "Mirazur Coastal Flavors"];
const cuisines = ["Japanese", "Italian", "French", "Mexican", "Chinese", "Seafood", "Steakhouse", "Greek", "Thai", "Spanish"];
datasets.restaurants = restNames.map((name, i) => ({
  id: i + 1,
  name: name,
  cuisineType: cuisines[i % cuisines.length],
  city: cities[i % cities.length],
  address: `${100 + i * 14} Main Avenue`,
  priceRange: ["$$", "$$$", "$$$$"][i % 3],
  rating: Math.round((4.3 + (i % 7) * 0.1) * 10) / 10,
  openHours: "11:00 AM - 10:00 PM",
  reservationAvailable: i % 4 !== 0
}));

// 14. vehicles (26 records)
const carBrands = ["Tesla", "BMW", "Mercedes-Benz", "Porsche", "Audi", "Toyota", "Ford", "Volvo"];
const carModels = ["Model S Plaid", "M4 Competition", "C300 AMG", "Taycan 4S", "RS6 Avant", "RAV4 Hybrid", "Mustang Mach-E", "XC90 Recharge"];
datasets.vehicles = Array.from({ length: 26 }, (_, i) => ({
  id: i + 1,
  brand: carBrands[i % carBrands.length],
  model: carModels[i % carModels.length],
  year: 2024 + (i % 3),
  licensePlate: `${carBrands[i % carBrands.length].slice(0, 3).toUpperCase()}-${400 + i}`,
  category: ["Sedan", "SUV", "Sports", "Electric"][i % 4],
  transmission: "Automatic",
  dailyRate: 65 + (i % 8) * 35,
  fuelType: ["Electric", "Gasoline", "Hybrid"][i % 3],
  status: ["available", "rented", "available", "maintenance"][i % 4]
}));

// 15. podcasts (26 records)
const podcastTitles = ["The Modern Developer", "Deep Dive AI & LLMs", "Frontend Architects", "Scaling Cloud Systems", "Indie Hacker Chronicles", "Cybersecurity Frontlines", "The UX Psychology Podcast", "Data Engineering Today", "Startup Growth Engine", "Quantum Computing Pulse", "DevOps in Practice", "SaaS Founders Lounge", "Open Source Revolution", "The Product Mindset", "Machine Learning Decoded", "Web3 Decentralized Future", "Clean Code Weekly", "Mobile App Velocity", "Distributed Systems Talk", "Tech Lead Leadership", "The Agile Transformation", "Database Internals", "Microservices Real World", "Fullstack Journey", "Software Craftsmanship", "API First Architecture"];
datasets.podcasts = podcastTitles.map((title, i) => ({
  id: i + 1,
  title: title,
  hostName: getName(i + 1),
  episodeNumber: 12 + i * 3,
  durationMinutes: 30 + (i % 6) * 10,
  releaseDate: `2026-09-${String((i % 28) + 1).padStart(2, '0')}`,
  audioUrl: `https://mockmarket.io/audio/episode_${i + 1}.mp3`,
  listenerCount: 15000 + (i * 2400),
  tags: ["Tech", "Engineering", "Software", "Cloud"].slice(0, (i % 3) + 2)
}));

// 16. movies (26 records)
const movieTitles = ["Interstellar Horizon", "The Neon Syndicate", "Silent Odyssey", "Codebreaker 1944", "Echoes of Eternity", "Midnight in Kyoto", "Cyberpunk Reborn", "The Quantum Heist", "Chronicles of Mars", "Shadow Protocol", "The Artificial Soul", "Labyrinth of Memories", "Solaris Station 9", "The Last Algorithm", "Starlight Symphony", "Vortex of Oblivion", "Deep Ocean Mystery", "The Binary Paradox", "City of Holograms", "Neon Dreams 2088", "Chrono Shifter", "Dark Matter Protocol", "The Neural Network", "Zero Gravity Flight", "Apocalypse Redux", "Infinity Vector"];
const directors = ["Christopher Nolan", "Denis Villeneuve", "Greta Gerwig", "David Fincher", "Bong Joon-ho", "Ridley Scott", "James Cameron"];
const genres = ["Sci-Fi", "Thriller", "Action", "Drama", "Mystery", "Cyberpunk", "Adventure"];
datasets.movies = movieTitles.map((title, i) => ({
  id: i + 1,
  title: title,
  director: directors[i % directors.length],
  genre: genres[i % genres.length],
  releaseYear: 2020 + (i % 7),
  durationMinutes: 105 + (i % 8) * 10,
  imdbRating: Math.round((7.5 + (i % 18) * 0.1) * 10) / 10,
  ageRating: i % 2 === 0 ? "PG-13" : "R",
  language: "English"
}));

// 17. playlists (26 records)
const playlistTitles = ["Deep Focus Coding Beats", "Lo-Fi Midnight Coffee", "Synthwave Cyber Night", "Indie Chill Vibes", "Acoustic Morning Sunlight", "High BPM Workout Energy", "Ambient Space Drift", "Piano Concentration Masterpieces", "Jazz Cafe Rainy Evening", "Electronic Gaming Velocity", "Post-Rock Atmospheric Journeys", "Retro Wave 80s Highway", "Tropical Sunset Lounge", "Heavy Metal Gym Power", "Classical Studying Symphony", "Coffeehouse Folk Singer", "Vaporwave Nostalgia Hall", "Techno Warehouse Peak", "Chillstep Bass Odyssey", "Deep House Poolside", "Soulful R&B Groove", "Meditative Zen Garden", "Drum & Bass Rush Hour", "Reggae Summer Sunshine", "Cinematic Soundtracks Epic", "Minimalist Techno Flow"];
datasets.playlists = playlistTitles.map((title, i) => ({
  id: i + 1,
  title: title,
  creator: i % 2 === 0 ? "Spotify Editorial" : `${getName(i)} Curations`,
  genre: genres[i % genres.length],
  trackCount: 30 + (i % 5) * 10,
  totalDurationMinutes: 110 + (i * 8),
  followersCount: 12000 + (i * 7500),
  isPublic: true
}));

// 18. surveys (26 records)
const surveyTopics = ["Frontend Framework Trends", "Cloud Provider Preference", "Remote Work Satisfaction", "AI Pair Programming Adoption", "API Architecture Preferences", "State Management in React", "Mobile Dev: Native vs Flutter", "Database Selection in 2026", "Code Review Frequency", "CI/CD Pipeline Speed", "Testing Strategies & Coverage", "Microservices vs Monoliths", "TypeScript Adoption Rates", "CSS: Tailwind vs Styled", "Design System Scalability", "Kubernetes in Production", "GraphQL vs REST Preference", "Security Scanning Practices", "Developer Burnout Factors", "Open Source Contribution Habits", "Package Manager Performance", "Authentication Protocols", "Serverless Architecture Usage", "Monorepo Tooling Experience", "Tech Stack Modernization", "Career Growth in Tech"];
datasets.surveys = surveyTopics.map((topic, i) => ({
  id: i + 1,
  topic: topic,
  question: `What is your primary choice regarding ${topic.toLowerCase()}?`,
  options: ["Option A (Primary)", "Option B (Secondary)", "Option C (Alternative)", "Other / None"],
  totalResponses: 1200 + (i * 350),
  category: "Technology",
  closingDate: `2026-11-${String((i % 28) + 1).padStart(2, '0')}`,
  status: i % 4 === 0 ? "closed" : "active"
}));

// 19. badges (26 records)
const badgeNames = ["First Commit Pioneer", "Bug Bounty Slayer", "100-Day Streak", "Code Review Master", "API Wizard", "Speed Demon", "Pull Request Legend", "Security Sentinel", "Documentation Hero", "Refactor Champion", "Clean Code Advocate", "Deployment Guru", "Docker Captain", "Cloud Architect Pro", "Performance Optimizer", "Open Source Champion", "Early Adopter", "Community Leader", "Data Science Explorer", "Design System Guru", "Accessibility Champion", "Database Maestro", "Zero Downtime Legend", "High Velocity Coder", "Mentor of the Year", "Hall of Fame 2026"];
const badgeIcons = ["award", "shield-check", "zap", "flame", "star", "terminal", "gift", "trophy", "medal"];
datasets.badges = badgeNames.map((name, i) => ({
  id: i + 1,
  badgeName: name,
  description: `Awarded for demonstrating extraordinary achievement in ${name.toLowerCase()}.`,
  iconName: badgeIcons[i % badgeIcons.length],
  rarityTier: ["Common", "Rare", "Epic", "Legendary"][i % 4],
  pointsReward: 50 + (i % 4) * 150,
  unlockedCount: 250 + (26 - i) * 60
}));

// 20. devices (26 records)
const deviceTypes = ["Thermostat", "Security Camera", "Smart Sensor", "Gateway Bridge", "Smart Plug", "Air Quality Monitor"];
datasets.devices = Array.from({ length: 26 }, (_, i) => ({
  id: i + 1,
  deviceName: `${deviceTypes[i % deviceTypes.length]} ${String.fromCharCode(65 + (i % 26))}-${100 + i}`,
  deviceType: deviceTypes[i % deviceTypes.length],
  locationRoom: ["Living Room", "Data Center 1", "Conference Room A", "Warehouse 2", "Server Rack 3"][i % 5],
  ipAddress: `192.168.1.${100 + i}`,
  batteryPercent: 40 + (i % 61),
  firmwareVersion: `v2.${i % 5}.${i % 9}`,
  status: ["online", "online", "online", "updating", "offline"][i % 5]
}));

// 21. api_keys (26 records)
const keyNames = ["Production Payment Webhook", "Mobile App Read-Only", "CI/CD Deployment Token", "Analytics Collector", "Internal Dashboard Access", "Third-Party CRM Sync", "Partner Integration Key", "Automated Testing Suite", "Customer Portal Auth", "Data Warehouse Pipeline", "Staging Environment Key", "Audit Logger Token", "Public Catalog Reader", "Slack Bot Integration", "Email Service Relay", "SMS Gateway Token", "Monitoring Healthcheck", "Search Indexer Service", "AI Model Invoker", "Backup Storage Key", "SSO Federation Token", "Developer Sandbox", "Admin Superuser Token", "Reporting Export Engine", "Webhook Listener Key", "GraphQL Gateway Key"];
datasets.api_keys = keyNames.map((name, i) => ({
  id: i + 1,
  keyName: name,
  keyPrefix: `mm_live_${Math.random().toString(36).substring(2, 10)}`,
  scopes: ["read:data", "write:records", "admin:access"].slice(0, (i % 3) + 1),
  rateLimitPerMinute: 60 * ((i % 5) + 1),
  createdAt: `2026-0${(i % 9) + 1}-15`,
  lastUsedAt: `2026-10-${String((i % 24) + 1).padStart(2, '0')}T14:20:00Z`,
  isActive: i !== 8
}));

// 22. webhooks (26 records)
const eventsList = [["order.created", "order.paid"], ["user.registered", "user.deleted"], ["payment.succeeded", "payment.failed"], ["invoice.sent", "invoice.overdue"], ["shipment.delivered", "shipment.delayed"]];
datasets.webhooks = Array.from({ length: 26 }, (_, i) => ({
  id: i + 1,
  targetUrl: `https://api.partner${i + 1}.io/webhooks/v1/listener`,
  subscribedEvents: eventsList[i % eventsList.length],
  secretToken: `whsec_${Math.random().toString(36).substring(2, 12)}`,
  retryAttempts: 3 + (i % 3),
  successRatePercent: Math.round((97.5 + (i % 25) * 0.1) * 10) / 10,
  status: ["active", "active", "active", "paused", "failing"][i % 5]
}));

// 23. employees (26 records)
const depts = ["Engineering", "Product Design", "Marketing & Growth", "People Operations", "Finance & Legal", "Customer Success"];
const jobTitles = ["Staff Software Architect", "Senior Frontend Engineer", "Product Design Lead", "Technical Program Manager", "DevOps Cloud Engineer", "Growth Marketing Specialist"];
datasets.employees = Array.from({ length: 26 }, (_, i) => {
  const name = getName(i);
  return {
    id: i + 1,
    employeeId: `EMP-${2000 + i}`,
    fullName: name,
    department: depts[i % depts.length],
    jobTitle: jobTitles[i % jobTitles.length],
    workEmail: `${name.toLowerCase().replace(' ', '.')}@mockmarket.io`,
    joinDate: `2024-0${(i % 9) + 1}-01`,
    employmentStatus: i % 5 === 0 ? "contractor" : "full_time",
    location: cities[i % cities.length]
  };
});

// 24. server_metrics (26 records)
const regions = ["us-east-1", "us-west-2", "eu-central-1", "ap-southeast-1", "ap-northeast-1"];
datasets.server_metrics = Array.from({ length: 26 }, (_, i) => ({
  id: i + 1,
  serverNode: `node-${regions[i % regions.length]}-${String.fromCharCode(97 + (i % 4))}${i + 1}`,
  region: regions[i % regions.length],
  cpuUsagePercent: Math.round((15 + (i % 70) * 1.1) * 10) / 10,
  ramUsagePercent: Math.round((30 + (i % 60) * 1.1) * 10) / 10,
  diskUsageGb: 50 + (i * 15),
  uptimeDays: 20 + (i * 12),
  healthStatus: i % 7 === 0 ? "warning" : "healthy"
}));

// 25. feedbacks (26 records)
const feedbackTypes = ["Feature Request", "Bug Report", "Praise", "UX Improvement"];
const comments = [
  "Mock Market is incredibly fast and saves hours of mock backend development!",
  "Would love to see GraphQL schema generation in future updates.",
  "Great selection of REST endpoints. Very helpful for frontend prototyping.",
  "Pagination and filter query parameters work seamlessly with axios.",
  "The neo-brutalist tactile UI is gorgeous and refreshing."
];
datasets.feedbacks = Array.from({ length: 26 }, (_, i) => ({
  id: i + 1,
  customerName: getName(i + 4),
  ratingScore: 4 + (i % 2),
  feedbackType: feedbackTypes[i % feedbackTypes.length],
  comment: comments[i % comments.length],
  featureRequested: i % 2 === 0 ? "GraphQL endpoint generator" : "Seed data export",
  submittedAt: `2026-10-${String((i % 24) + 1).padStart(2, '0')}T11:45:00Z`,
  isResolved: i % 3 === 0
}));

// Write all 25 JSON files to data/
let totalNewRecords = 0;
for (const [key, records] of Object.entries(datasets)) {
  const filePath = path.join(dataDir, `${key}.json`);
  fs.writeFileSync(filePath, JSON.stringify(records, null, 2), 'utf-8');
  totalNewRecords += records.length;
  console.log(`Created ${key}.json with ${records.length} items`);
}

console.log(`\nSuccessfully created 25 JSON datasets! Total new records: ${totalNewRecords}`);
