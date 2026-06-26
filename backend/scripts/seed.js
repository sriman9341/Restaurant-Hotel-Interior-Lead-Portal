const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Lead = require('../models/Lead');
const Quotation = require('../models/Quotation');

dotenv.config({ path: `${__dirname}/../.env` });

const seedData = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/glory_simon_interiors';
    await mongoose.connect(mongoURI);
    console.log('MongoDB Connected for Seeding...');

    // Clear existing data
    await User.deleteMany();
    await Lead.deleteMany();
    await Quotation.deleteMany();
    console.log('Cleared existing collections.');

    // Seed Admin
    const admin = await User.create({
      name: 'Glory Simon Admin',
      email: 'admin@glorysimon.com',
      password: 'adminpassword123',
      role: 'Admin'
    });
    console.log('Admin user seeded successfully: admin@glorysimon.com / adminpassword123');

    // Seed mock Leads
    const mockLeads = [
      {
        name: 'Rahul Sharma',
        mobile: '9876543210',
        email: 'rahul.sharma@restaurant.com',
        company: 'Spice Route Bistro',
        projectType: 'Restaurant',
        seatingCapacity: 80,
        area: 2400,
        location: 'Connaught Place, New Delhi',
        theme: 'Luxury',
        kitchenRequired: true,
        barRequired: true,
        outdoorSeating: true,
        budget: '25–50 Lakhs',
        timeline: 'Within 1 Month',
        notes: 'Needs a premium fine dining look with a warm brass and velvet aesthetic. Central kitchen layout design is crucial.',
        status: 'New Lead',
        owner: 'Unassigned',
        internalNotes: []
      },
      {
        name: 'Vikram Malhotra',
        mobile: '9811223344',
        email: 'v.malhotra@grandpalms.com',
        company: 'Grand Palms Hotel Group',
        projectType: 'Hotel',
        seatingCapacity: 350,
        area: 12000,
        location: 'Juhu, Mumbai',
        theme: 'Luxury',
        kitchenRequired: true,
        barRequired: true,
        outdoorSeating: false,
        budget: 'Above 50 Lakhs',
        timeline: '3–6 Months',
        notes: 'Lobby and reception redesign, plus 20 luxury suites. Expecting contemporary styling combined with traditional elements.',
        status: 'Site Visit Scheduled',
        owner: 'Admin',
        internalNotes: [
          { text: 'Spoke with Vikram. Site visit scheduled for next Tuesday. Wants to review premium metal works portfolio.', author: 'Glory Simon Admin', date: new Date() }
        ]
      },
      {
        name: 'Aanya Sen',
        mobile: '9988776655',
        email: 'aanya.sen@brewandbites.com',
        company: 'Brew & Bites Cafe',
        projectType: 'Cafe',
        seatingCapacity: 45,
        area: 1100,
        location: 'Indiranagar, Bangalore',
        theme: 'Modern',
        kitchenRequired: true,
        barRequired: false,
        outdoorSeating: true,
        budget: '10–25 Lakhs',
        timeline: 'Immediate',
        notes: 'Cozy, hipster-friendly layout with industrial lighting and exposed brickwork. Needs space-optimized seating.',
        status: 'Completed',
        owner: 'Admin',
        internalNotes: [
          { text: 'Client signed off on design. Implementation completed ahead of schedule.', author: 'Glory Simon Admin', date: new Date() }
        ]
      },
      {
        name: 'Karan Johar',
        mobile: '9123456789',
        email: 'events@royalcelebrations.com',
        company: 'Royal Celebrations Banquet',
        projectType: 'Banquet Hall',
        seatingCapacity: 500,
        area: 8500,
        location: 'Gachibowli, Hyderabad',
        theme: 'Traditional',
        kitchenRequired: true,
        barRequired: true,
        outdoorSeating: false,
        budget: 'Above 50 Lakhs',
        timeline: '1–3 Months',
        notes: 'Premium banquet hall looking for luxury, royal theme with heavy wood carvings and modern acoustics integration.',
        status: 'Quotation Sent',
        owner: 'Admin',
        internalNotes: [
          { text: 'Sent Quotation. Client is reviewing civil and acoustic costing.', author: 'Glory Simon Admin', date: new Date() }
        ]
      },
      {
        name: 'Siddharth Roy',
        mobile: '9765432109',
        email: 'sroy@azurebeaches.com',
        company: 'Azure Sands Resort',
        projectType: 'Resort',
        seatingCapacity: 200,
        area: 15000,
        location: 'Calangute, Goa',
        theme: 'Contemporary',
        kitchenRequired: true,
        barRequired: true,
        outdoorSeating: true,
        budget: 'Above 50 Lakhs',
        timeline: '3–6 Months',
        notes: 'Outdoor poolside lounge and 15 wooden cottages interior designing.',
        status: 'Project Started',
        owner: 'Admin',
        internalNotes: [
          { text: 'Site cleared. Commenced foundation markings for pool lounge structure.', author: 'Glory Simon Admin', date: new Date() }
        ]
      }
    ];

    const seededLeads = await Lead.insertMany(mockLeads);
    console.log(`${seededLeads.length} mock leads seeded successfully.`);

    // Seed a mock quotation for the lead with status 'Quotation Sent'
    const quotationSentLead = seededLeads.find(l => l.status === 'Quotation Sent');
    if (quotationSentLead) {
      await Quotation.create({
        leadId: quotationSentLead._id,
        designCost: 500000,
        furnitureCost: 2000000,
        lightingCost: 800000,
        flooringCost: 600000,
        civilWorkCost: 1500000,
        miscellaneousCost: 400000,
        subtotal: 5800000,
        gst: 1044000,
        total: 6844000
      });
      console.log('Sample Quotation seeded successfully.');
    }

    console.log('Seeding finished successfully!');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding data:', error.message);
    process.exit(1);
  }
};

seedData();
