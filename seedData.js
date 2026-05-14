const mongoose = require('mongoose');
const dns = require('dns');
const dotenv = require('dotenv');

dns.setDefaultResultOrder('ipv4first');
dns.setServers(['8.8.8.8', '8.8.4.4']);
dotenv.config();

const Franchise = require('./models/Franchise');

const franchises = [
  {
    name: "McDonald's",
    category: "Food",
    investmentRange: "₹8.3Cr - ₹18.3Cr",
    description: "World's largest fast food chain with over 40,000 locations globally.",
    fullDescription: "Join the golden arches family. McDonald's offers one of the most recognized franchise opportunities in the world with proven systems, strong brand support, and consistent customer demand.",
    images: [
      "https://images.unsplash.com/photo-1619881590738-a111d176d906?w=600&q=80",
    ],
    roi: "15-25%",
    requirements: ["Minimum $500k liquid assets", "Business management experience", "Full-time commitment"],
    city: "Nationwide",
    popularity: 100,
  },
  {
    name: "Subway",
    category: "Food",
    investmentRange: "₹1.25Cr - ₹2.9Cr",
    description: "World's largest submarine sandwich chain with fresh, customizable meals.",
    fullDescription: "Subway is one of the most affordable franchise opportunities in fast food. With low startup costs and a simple operating model, it's perfect for first-time franchise owners.",
    images: [
      "https://images.unsplash.com/photo-1509722747041-616f39b57569?w=600&q=80",
    ],
    roi: "20-30%",
    requirements: ["$80k liquid capital", "No food experience required", "Willingness to train"],
    city: "Nationwide",
    popularity: 95,
  },
  {
    name: "Starbucks",
    category: "Food",
    investmentRange: "₹2.5Cr - ₹5.8Cr",
    description: "Premium coffee experience with a loyal global customer base.",
    fullDescription: "Starbucks licensed stores offer a unique opportunity to bring the world's most loved coffee brand to airports, grocery stores, hospitals and more.",
    images: [
      "https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=600&q=80",
    ],
    roi: "15-20%",
    requirements: ["Foodservice experience", "$500k net worth", "Existing retail location preferred"],
    city: "Urban Areas",
    popularity: 92,
  },
  {
    name: "7-Eleven",
    category: "Retail",
    investmentRange: "₹41L - ₹1.66Cr",
    description: "America's largest convenience store chain open 24/7.",
    fullDescription: "7-Eleven offers one of the best franchise deals in retail. With an existing store model, training, and inventory support, you can be up and running quickly.",
    images: [
      "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=600&q=80",
    ],
    roi: "25-35%",
    requirements: ["$50k liquid assets", "No prior retail experience needed", "Full-time dedication"],
    city: "Suburban & Urban",
    popularity: 88,
  },
  {
    name: "Kumon",
    category: "Education",
    investmentRange: "₹58L - ₹1.25Cr",
    description: "World's largest after-school math and reading program.",
    fullDescription: "Kumon franchisees run learning centers that help children build strong academic foundations. Low overhead, recurring revenue, and a meaningful mission make this a top education franchise.",
    images: [
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80",
    ],
    roi: "25-40%",
    requirements: ["Teaching or education background preferred", "$70k liquid capital", "Community-oriented mindset"],
    city: "Residential Areas",
    popularity: 80,
  },
  {
    name: "Jan-Pro Cleaning",
    category: "Services",
    investmentRange: "₹3.3L - ₹41L",
    description: "Commercial cleaning franchise with low startup cost and high demand.",
    fullDescription: "Jan-Pro is one of the most affordable franchises available. With recurring commercial cleaning contracts, you get predictable monthly revenue from day one.",
    images: [
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&q=80",
    ],
    roi: "30-50%",
    requirements: ["$4k minimum investment", "Physical ability to clean", "Reliable transportation"],
    city: "Any City",
    popularity: 75,
  },
  {
    name: "Anytime Fitness",
    category: "Services",
    investmentRange: "₹2.5Cr - ₹5Cr",
    description: "24/7 gym franchise with over 5,000 locations worldwide.",
    fullDescription: "Anytime Fitness is the fastest growing gym franchise in the world. Members get 24/7 access, and franchisees benefit from a simple, scalable model with strong corporate support.",
    images: [
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80",
    ],
    roi: "20-30%",
    requirements: ["$100k liquid assets", "Passion for fitness", "Real estate location secured"],
    city: "Suburban Areas",
    popularity: 85,
  },
  {
    name: "The UPS Store",
    category: "Retail",
    investmentRange: "₹1.25Cr - ₹3.3Cr",
    description: "Shipping, printing and business services franchise.",
    fullDescription: "The UPS Store offers essential business services that customers need every day — shipping, printing, mailboxes and more. Strong brand recognition drives consistent foot traffic.",
    images: [
      "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=600&q=80",
    ],
    roi: "15-25%",
    requirements: ["$75k liquid capital", "Business management skills", "Customer service mindset"],
    city: "Nationwide",
    popularity: 78,
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 15000, family: 4 });
    console.log('Connected to MongoDB');
    await Franchise.deleteMany({});
    await Franchise.insertMany(franchises);
    console.log(`✅ Seeded ${franchises.length} franchises with images!`);
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err.message);
    process.exit(1);
  }
}

seed();
