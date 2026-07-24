import React, { createContext, useContext, useState } from 'react';
import { UserProfile, UserRole } from '../types';
import { mockUsers } from '../data/mockData';

interface AuthContextType {
  user: UserProfile | null;
  role: UserRole;
  isAuthenticated: boolean;
  switchRole: (newRole: UserRole) => void;
  login: (email: string, role?: UserRole) => void;
  logout: () => void;
  isAuthModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null); // Guest state by default
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const role: UserRole = user ? user.role : 'buyer';
  const isAuthenticated = Boolean(user);

  const switchRole = (newRole: UserRole) => {
    const found = mockUsers.find(u => u.role === newRole) || {
      id: `user_${Date.now()}`,
      email: `${newRole}@kayad.com`,
      name: `${newRole.toUpperCase()} Account`,
      role: newRole,
      isVerified: true,
      createdAt: new Date().toISOString()
    };
    setUser(found);
  };

  const login = (email: string, targetRole: UserRole = 'buyer') => {
    const existing = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      setUser(existing);
    } else {
      setUser({
        id: `user_${Date.now()}`,
        email,
        name: email.split('@')[0],
        role: targetRole,
        isVerified: true,
        createdAt: new Date().toISOString()
      });
    }
    setIsAuthModalOpen(false);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        isAuthenticated,
        switchRole,
        login,
        logout,
        isAuthModalOpen,
        openAuthModal: () => setIsAuthModalOpen(true),
        closeAuthModal: () => setIsAuthModalOpen(false)
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
