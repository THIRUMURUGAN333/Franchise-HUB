const mongoose = require('mongoose');
const Franchise = require('../models/Franchise');
const db = require('../config/db');

db();

const sampleFranchises = [
  {
    name: 'Burger King',
    category: 'Food',
    investmentRange: '$500k - $1M',
    description: 'Fast food chain',
    fullDescription: 'Join the king of burgers with proven success.',
    images: ['https://example.com/bk1.jpg', 'https://example.com/bk2.jpg'],
    roi: '20-30%',
    requirements: ['Business experience', 'Net worth $1M'],
    city: 'Nationwide',
    popularity: 100,
  },
  // Add more: e.g., Starbucks (Food), Walmart (Retail), Kumon (Education), Cleaning Service (Services)
  {
    name: 'Starbucks',
    category: 'Food',
    investmentRange: '$300k - $500k',
    description: 'Coffee franchise',
    fullDescription: 'Brew success with global brand.',
    images: ['https://example.com/starbucks.jpg'],
    roi: '15-25%',
    requirements: ['Retail experience'],
    city: 'Urban areas',
    popularity: 90,
  },
  {
    name: 'Walmart Franchise',
    category: 'Retail',
    investmentRange: '$1M - $2M',
    description: 'Retail giant',
    fullDescription: 'Everyday low prices, high returns.',
    images: ['https://example.com/walmart.jpg'],
    roi: '10-20%',
    requirements: ['Large capital'],
    city: 'Suburban',
    popularity: 80,
  },
  {
    name: 'Kumon Learning',
    category: 'Education',
    investmentRange: '$100k - $200k',
    description: 'Tutoring center',
    fullDescription: 'Educate the future.',
    images: ['https://example.com/kumon.jpg'],
    roi: '25-35%',
    requirements: ['Teaching background'],
    city: 'Residential',
    popularity: 70,
  },
  {
    name: 'Maid Service',
    category: 'Services',
    investmentRange: '$50k - $100k',
    description: 'Cleaning business',
    fullDescription: 'Clean up with recurring revenue.',
    images: ['https://example.com/maid.jpg'],
    roi: '30-40%',
    requirements: ['Management skills'],
    city: 'Any',
    popularity: 60,
  },
];

async function seed() {
  await Franchise.deleteMany({});
  await Franchise.insertMany(sampleFranchises);
  console.log('Data seeded!');
  process.exit();
}

seed();