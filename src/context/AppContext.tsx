import React, { createContext, useContext, useState } from 'react';
import type { UserRole, AppPage } from '@/types';

interface AppContextValue {
  isAuthenticated: boolean;
  currentRole: UserRole | null;
  currentPage: AppPage;
  selectedListingId: string | null;
  selectedTransactionId: string | null;
  selectedDeliveryId: string | null;
  login: () => void;
  logout: () => void;
  selectRole: (role: UserRole) => void;
  navigate: (page: AppPage) => void;
  openListing: (id: string) => void;
  openTransaction: (id: string) => void;
  openDelivery: (id: string) => void;
  clearSelection: () => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentRole, setCurrentRole] = useState<UserRole | null>(null);
  const [currentPage, setCurrentPage] = useState<AppPage>('dashboard');
  const [selectedListingId, setSelectedListingId] = useState<string | null>(null);
  const [selectedTransactionId, setSelectedTransactionId] = useState<string | null>(null);
  const [selectedDeliveryId, setSelectedDeliveryId] = useState<string | null>(null);

  const login = () => setIsAuthenticated(true);

  const logout = () => {
    setIsAuthenticated(false);
    setCurrentRole(null);
    setCurrentPage('dashboard');
    setSelectedListingId(null);
    setSelectedTransactionId(null);
    setSelectedDeliveryId(null);
  };

  const selectRole = (role: UserRole) => {
    setCurrentRole(role);
    setCurrentPage('dashboard');
  };

  const navigate = (page: AppPage) => {
    setCurrentPage(page);
    setSelectedListingId(null);
    setSelectedTransactionId(null);
    setSelectedDeliveryId(null);
  };

  const openListing = (id: string) => {
    setSelectedListingId(id);
    setCurrentPage('marketplace');
  };

  const openTransaction = (id: string) => {
    setSelectedTransactionId(id);
    setCurrentPage('transactions');
  };

  const openDelivery = (id: string) => {
    setSelectedDeliveryId(id);
    setCurrentPage('orders');
  };

  const clearSelection = () => {
    setSelectedListingId(null);
    setSelectedTransactionId(null);
    setSelectedDeliveryId(null);
  };

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        currentRole,
        currentPage,
        selectedListingId,
        selectedTransactionId,
        selectedDeliveryId,
        login,
        logout,
        selectRole,
        navigate,
        openListing,
        openTransaction,
        openDelivery,
        clearSelection,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
