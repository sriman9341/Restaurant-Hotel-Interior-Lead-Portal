// Simple mock user store / state
let authStateListener = null;

// Initial mock user if logged in
const getStoredUser = () => {
  const stored = localStorage.getItem('mock_auth_user');
  return stored ? JSON.parse(stored) : null;
};

export const browserLocalPersistence = 'LOCAL';

export const getAuth = () => {
  return {
    currentUser: getStoredUser()
  };
};

export const setPersistence = async (auth, persistence) => {
  return;
};

export const signInWithEmailAndPassword = async (auth, email, password) => {
  console.log('[Mock Auth] Signing in with:', email);
  
  // Default login credentials - allow admin@glorysimon.com or any login that contains admin
  if (email.toLowerCase() === 'admin@glorysimon.com' || email.toLowerCase().includes('admin')) {
    const mockUser = {
      uid: 'mock-admin-uid-123',
      email: email,
      displayName: 'Glory Simon Admin'
    };
    localStorage.setItem('mock_auth_user', JSON.stringify(mockUser));
    auth.currentUser = mockUser;
    if (authStateListener) {
      authStateListener(mockUser);
    }
    return { user: mockUser };
  } else {
    const error = new Error('Invalid email or password.');
    error.code = 'auth/wrong-password';
    throw error;
  }
};

export const signOut = async (auth) => {
  console.log('[Mock Auth] Signing out');
  localStorage.removeItem('mock_auth_user');
  auth.currentUser = null;
  if (authStateListener) {
    authStateListener(null);
  }
};

export const onAuthStateChanged = (auth, callback) => {
  authStateListener = callback;
  // Trigger initially with current user
  setTimeout(() => {
    callback(auth.currentUser);
  }, 50);
  
  return () => {
    authStateListener = null;
  };
};
