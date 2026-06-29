// Helper to get/set collections from localStorage
const getLocalCollection = (collectionName) => {
  const data = localStorage.getItem(`mock_db_${collectionName}`);
  return data ? JSON.parse(data) : [];
};

const setLocalCollection = (collectionName, data) => {
  localStorage.setItem(`mock_db_${collectionName}`, JSON.stringify(data));
};

// Seed default data if empty (e.g. some mock leads so dashboard has beautiful stats)
const seedInitialData = () => {
  if (!localStorage.getItem('mock_db_seeded')) {
    const mockLeads = [
      {
        id: 'lead-1',
        name: 'Sriman Murthy',
        mobile: '9876543210',
        email: 'sriman@grandbites.com',
        company: 'Grand Bites Restaurant',
        projectType: 'Restaurant',
        seatingCapacity: '120',
        area: '4200',
        location: 'Hyderabad, India',
        theme: 'Luxury',
        kitchenRequired: true,
        barRequired: true,
        outdoorSeating: true,
        budget: '25-50 Lakhs',
        timeline: '1-3 Months',
        notes: 'Premium theme, fine dining setup with an open kitchen and outdoor lounge.',
        status: 'New Lead',
        owner: 'Unassigned',
        internalNotes: [],
        createdAt: new Date(Date.now() - 3 * 24 * 3600 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 3 * 24 * 3600 * 1000).toISOString()
      },
      {
        id: 'lead-2',
        name: 'Elena Gilbert',
        mobile: '9123456789',
        email: 'elena@mysticgrill.com',
        company: 'Mystic Grill Cafe',
        projectType: 'Cafe',
        seatingCapacity: '50',
        area: '1500',
        location: 'Mumbai, India',
        theme: 'Modern / Minimalist',
        kitchenRequired: true,
        barRequired: false,
        outdoorSeating: true,
        budget: '10-25 Lakhs',
        timeline: 'Immediate',
        notes: 'Cozy and instagrammable cafe design.',
        status: 'Contacted',
        owner: 'Admin',
        internalNotes: [
          { author: 'System', text: 'Lead initialized in Mock Database.', date: new Date(Date.now() - 2 * 24 * 3600 * 1000).toISOString() }
        ],
        createdAt: new Date(Date.now() - 2 * 24 * 3600 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 2 * 24 * 3600 * 1000).toISOString()
      },
      {
        id: 'lead-3',
        name: 'Kabir Kapoor',
        mobile: '9988776655',
        email: 'kabir@skylinehotel.com',
        company: 'Skyline Luxury Hotel',
        projectType: 'Hotel',
        seatingCapacity: '250',
        area: '15000',
        location: 'Bangalore, India',
        theme: 'Traditional / Heritage',
        kitchenRequired: true,
        barRequired: true,
        outdoorSeating: false,
        budget: '50+ Lakhs',
        timeline: '3+ Months',
        notes: 'Turnkey hotel interior including rooms lobby and fine dining restaurant.',
        status: 'Proposal Sent',
        owner: 'Admin',
        internalNotes: [
          { author: 'Admin', text: 'Shared initial design catalogue. Client loved the heritage concepts.', date: new Date().toISOString() }
        ],
        createdAt: new Date(Date.now() - 1 * 24 * 3600 * 1000).toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];

    const mockUsers = [
      {
        id: 'mock-admin-uid-123',
        name: 'Glory Simon Admin',
        role: 'Admin',
        createdAt: new Date().toISOString()
      }
    ];

    const mockQuotations = [
      {
        id: 'quote-1',
        leadId: 'lead-3',
        leadName: 'Kabir Kapoor',
        items: [
          { description: 'Lobby Heritage Ceiling design & installation', area: 2500, rate: 350, total: 875000 },
          { description: 'Fine Dining Kitchen Equipment & Layout', area: 1500, rate: 800, total: 1200000 },
          { description: 'Hotel rooms woodworking & lighting', area: 11000, rate: 250, total: 2750000 }
        ],
        subtotal: 4825000,
        gstRate: 18,
        gstAmount: 868500,
        total: 5693500,
        notes: 'Includes premium imported materials and fixtures.',
        createdAt: new Date().toISOString()
      }
    ];

    setLocalCollection('leads', mockLeads);
    setLocalCollection('users', mockUsers);
    setLocalCollection('quotations', mockQuotations);
    localStorage.setItem('mock_db_seeded', 'true');
  }
};

// Seed immediately
seedInitialData();

export const getFirestore = () => {
  return { name: '[MockFirestore]' };
};

export const collection = (db, path) => {
  return { type: 'collection', path };
};

export const doc = (db, path, ...pathSegments) => {
  let fullPath = path;
  if (pathSegments.length > 0) {
    fullPath = `${path}/${pathSegments.join('/')}`;
  }
  const parts = fullPath.split('/');
  const collectionName = parts[0];
  const id = parts[1];
  return { type: 'doc', collectionName, id };
};

export const addDoc = async (collectionRef, data) => {
  console.log('[Mock Firestore] addDoc to:', collectionRef.path, data);
  const collectionName = collectionRef.path;
  const list = getLocalCollection(collectionName);
  
  const newId = `${collectionName.slice(0, -1)}-${Math.random().toString(36).substr(2, 9)}`;
  const newItem = {
    id: newId,
    ...data,
    createdAt: data.createdAt === 'SERVER_TIMESTAMP' ? new Date().toISOString() : (data.createdAt || new Date().toISOString()),
    updatedAt: data.updatedAt === 'SERVER_TIMESTAMP' ? new Date().toISOString() : (data.updatedAt || new Date().toISOString()),
  };
  
  list.push(newItem);
  setLocalCollection(collectionName, list);
  
  return { id: newId };
};

export const setDoc = async (docRef, data) => {
  console.log('[Mock Firestore] setDoc to:', docRef.collectionName, docRef.id, data);
  const list = getLocalCollection(docRef.collectionName);
  const index = list.findIndex(item => item.id === docRef.id);
  
  const updatedItem = {
    id: docRef.id,
    ...data,
    createdAt: data.createdAt === 'SERVER_TIMESTAMP' ? new Date().toISOString() : (data.createdAt || new Date().toISOString()),
    updatedAt: data.updatedAt === 'SERVER_TIMESTAMP' ? new Date().toISOString() : (data.updatedAt || new Date().toISOString()),
  };
  
  if (index !== -1) {
    list[index] = updatedItem;
  } else {
    list.push(updatedItem);
  }
  setLocalCollection(docRef.collectionName, list);
};

export const getDoc = async (docRef) => {
  console.log('[Mock Firestore] getDoc from:', docRef.collectionName, docRef.id);
  const list = getLocalCollection(docRef.collectionName);
  const item = list.find(x => x.id === docRef.id);
  
  return {
    exists: () => !!item,
    data: () => item,
    id: docRef.id
  };
};

export const getDocs = async (queryRef) => {
  const collectionName = queryRef.type === 'query' ? queryRef.collectionRef.path : queryRef.path;
  console.log('[Mock Firestore] getDocs from:', collectionName);
  
  let list = getLocalCollection(collectionName);
  
  if (queryRef.type === 'query') {
    for (const constraint of queryRef.constraints) {
      if (constraint.type === 'where') {
        const { field, op, value } = constraint;
        list = list.filter(item => {
          if (op === '==') return item[field] === value;
          return true;
        });
      }
    }
  }
  
  const docs = list.map(item => ({
    id: item.id,
    data: () => item,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt
  }));
  
  return {
    forEach: (callback) => docs.forEach(callback),
    docs
  };
};

export const updateDoc = async (docRef, data) => {
  console.log('[Mock Firestore] updateDoc:', docRef.collectionName, docRef.id, data);
  const list = getLocalCollection(docRef.collectionName);
  const index = list.findIndex(x => x.id === docRef.id);
  
  if (index !== -1) {
    const updated = { ...list[index] };
    Object.keys(data).forEach(key => {
      const val = data[key];
      if (val && val.type === 'arrayUnion') {
        updated[key] = [...(updated[key] || []), ...val.elements];
      } else if (val === 'SERVER_TIMESTAMP') {
        updated[key] = new Date().toISOString();
      } else {
        updated[key] = val;
      }
    });
    updated.updatedAt = new Date().toISOString();
    list[index] = updated;
    setLocalCollection(docRef.collectionName, list);
  }
};

export const query = (collectionRef, ...constraints) => {
  return {
    type: 'query',
    collectionRef,
    constraints
  };
};

export const where = (field, op, value) => {
  return {
    type: 'where',
    field,
    op,
    value
  };
};

export const serverTimestamp = () => {
  return 'SERVER_TIMESTAMP';
};

export const arrayUnion = (...elements) => {
  return {
    type: 'arrayUnion',
    elements
  };
};
