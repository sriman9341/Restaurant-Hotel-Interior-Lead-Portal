const connectDB = require('../config/db');
const mongoose = require('mongoose');
const User = require('../models/User');
const Lead = require('../models/Lead');
const Quotation = require('../models/Quotation');

const runTests = async () => {
  console.log('--- Starting API Integration Tests ---');
  try {
    process.env.MONGODB_URI =
      process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/glory_simon_interiors';
    await connectDB();

    await User.deleteMany({ email: 'testadmin@glorysimon.com' });
    await Lead.deleteMany({ email: 'testclient@restaurant.com' });

    console.log('1. Testing User registration & validation...');
    const testAdmin = await User.create({
      name: 'Test Admin',
      email: 'testadmin@glorysimon.com',
      password: 'testpassword123',
      role: 'Admin'
    });
    if (!testAdmin) throw new Error('Failed to create test admin');
    console.log('   [SUCCESS] Test Admin registered.');

    console.log('2. Testing password cryptography hooks...');
    const isMatch = await testAdmin.matchPassword('testpassword123');
    if (!isMatch) throw new Error('Password check failed');
    const isWrongMatch = await testAdmin.matchPassword('wrongpassword');
    if (isWrongMatch) throw new Error('False password authenticated incorrectly');
    console.log('   [SUCCESS] Cryptography works correctly.');

    console.log('3. Testing Lead model validation...');
    const testLead = await Lead.create({
      name: 'Test Client',
      mobile: '9988998899',
      email: 'testclient@restaurant.com',
      projectType: 'Restaurant',
      seatingCapacity: 60,
      area: 1800,
      location: 'South Ex, Delhi',
      theme: 'Luxury',
      budget: '10–25 Lakhs',
      timeline: 'Within 1 Month',
      notes: 'Test lead notes text'
    });
    if (!testLead) throw new Error('Lead creation failed');
    console.log('   [SUCCESS] Test Lead created.');

    console.log('4. Testing Quotation database allocation...');
    const testQuote = await Quotation.create({
      leadId: testLead._id,
      designCost: 100000,
      furnitureCost: 500000,
      lightingCost: 150000,
      flooringCost: 100000,
      civilWorkCost: 200000,
      miscellaneousCost: 50000,
      subtotal: 1100000,
      gst: 198000,
      total: 1298000
    });
    if (!testQuote) throw new Error('Quotation creation failed');
    console.log('   [SUCCESS] Test Quotation saved.');

    await User.deleteOne({ _id: testAdmin._id });
    await Lead.deleteOne({ _id: testLead._id });
    await Quotation.deleteOne({ _id: testQuote._id });
    console.log('   [SUCCESS] Test records cleaned up.');

    console.log('--- ALL INTEGRATION TESTS COMPLETED SUCCESSFULLY ---');
    mongoose.connection.close();
    process.exit(0);
  } catch (err) {
    console.error('   [FAILURE] Test error encountered:', err.message);
    if (mongoose.connection) {
      mongoose.connection.close();
    }
    process.exit(1);
  }
};

runTests();
