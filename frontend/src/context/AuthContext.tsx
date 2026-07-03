import React, { useState, useEffect, useContext, createContext } from 'react';

export interface Child {
  id: string;
  name: string;
  class: string;
}

const dummyChildren: Child[] = [
  { id: 'C1', name: 'Rahul Sharma', class: 'Class 10-A' },
  { id: 'C2', name: 'Priya Sharma', class: 'Class 8-B' },
];

interface AuthContextType {
  token: string | null;
  role: string | null;
  activeChild: Child | null;
  childrenList: Child[];
  setActiveChild: (child: Child) => void;
  login: (token: string, role: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  token: null,
  role: null,
  activeChild: null,
  childrenList: [],
  setActiveChild: () => {},
  login: () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [role, setRole] = useState<string | null>(localStorage.getItem('role'));
  const [activeChild, setActiveChild] = useState<Child | null>(null);
  const [childrenList, setChildrenList] = useState<Child[]>([]);

  useEffect(() => {
    if (role === 'Parent') {
      setChildrenList(dummyChildren);
      const savedChildId = localStorage.getItem('activeChildId');
      const savedChild = dummyChildren.find(c => c.id === savedChildId);
      setActiveChild(savedChild || dummyChildren[0]);
    } else {
      setChildrenList([]);
      setActiveChild(null);
    }
  }, [role]);

  const handleSetActiveChild = (child: Child) => {
    setActiveChild(child);
    localStorage.setItem('activeChildId', child.id);
  };

  const login = (newToken: string, newRole: string) => {
    localStorage.setItem('token', newToken);
    localStorage.setItem('role', newRole);
    setToken(newToken);
    setRole(newRole);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('activeChildId');
    setToken(null);
    setRole(null);
    setActiveChild(null);
    setChildrenList([]);
  };

  return (
    <AuthContext.Provider value={{ token, role, activeChild, childrenList, setActiveChild: handleSetActiveChild, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
