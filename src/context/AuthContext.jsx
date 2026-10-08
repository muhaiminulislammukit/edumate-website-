import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const DEMO_USERS = {
  student: {
    id: 'user-std-1',
    name: 'Mukit Rahman',
    role: 'student',
    email: 'mukit@student.edumate.bd',
    phone: '01711-223344',
    classLevel: 'Class 10 (SSC 2027)',
    institution: 'Dhaka Residential Model College',
    medium: 'Bangla Medium',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400'
  },
  teacher: {
    id: 'user-tch-1',
    name: 'Engr. Tanvir Ahmed',
    role: 'teacher',
    email: 'tanvir@buet.ac.bd',
    phone: '01712-345678',
    university: 'BUET (Electrical & Electronic Eng.)',
    subjects: ['Physics (পদার্থবিজ্ঞান)', 'Higher Mathematics (উচ্চতর গণিত)'],
    location: 'Mirpur & Dhanmondi, Dhaka',
    modes: ['Home Tutor', 'Online'],
    verified: true,
    monthlyRate: '৳7,000 / month',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400'
  },
  guardian: {
    id: 'user-grd-1',
    name: 'Engr. Mizanur Rahman',
    role: 'guardian',
    email: 'mizanur@guardian.bd',
    phone: '01819-987654',
    childrenCount: 2,
    location: 'Dhanmondi, Dhaka',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400'
  }
};

export function AuthProvider({ children }) {
  // Restore only a saved session; a fresh visit must start logged out.
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('edumate_current_user');
      return saved ? JSON.parse(saved) : null;
    } catch (error) {
      console.error('Could not restore the saved user session.', error);
      return null;
    }
  });

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('edumate_current_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('edumate_current_user');
      }
    } catch (e) {
      console.error(e);
    }
  }, [user]);

  const login = (role, customData = {}) => {
    const baseUser = DEMO_USERS[role] || DEMO_USERS.student;
    const finalUser = { ...baseUser, ...customData, role };
    setUser(finalUser);
    return finalUser;
  };

  const signup = (userData) => {
    const newUser = {
      id: `user-${Date.now()}`,
      avatar: userData.gender === 'Female'
        ? 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400'
        : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
      ...userData
    };
    setUser(newUser);
    return newUser;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
