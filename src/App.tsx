import { AppProvider, useApp } from '@/context/AppContext';
import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';
import LoginPage from '@/pages/LoginPage';
import RoleSelectPage from '@/pages/RoleSelectPage';
import FactoryDashboard from '@/pages/factory/FactoryDashboard';
import AddWastePage from '@/pages/factory/AddWastePage';
import MarketplacePage from '@/pages/factory/MarketplacePage';
import TransactionsPage from '@/pages/factory/TransactionsPage';
import RecyclerDashboard from '@/pages/recycler/RecyclerDashboard';
import RecyclerMarketplacePage from '@/pages/recycler/RecyclerMarketplacePage';
import MyBidsPage from '@/pages/recycler/MyBidsPage';
import LogisticsDashboard from '@/pages/logistics/LogisticsDashboard';
import OrdersPage from '@/pages/logistics/OrdersPage';
import RoutesPage from '@/pages/logistics/RoutesPage';
import ProfilePage from '@/pages/shared/ProfilePage';
import TransactionDetails from '@/pages/shared/TransactionDetails';
import type { UserRole, AppPage } from '@/types';

function PageRouter() {
  const { currentRole, currentPage, selectedTransactionId } = useApp();

  // Transaction details takes priority when a transaction is selected
  if (selectedTransactionId && currentPage === 'transactions') {
    return <TransactionDetails />;
  }

  const pages: Record<UserRole, Partial<Record<AppPage, React.ReactNode>>> = {
    factory: {
      dashboard: <FactoryDashboard />,
      'add-waste': <AddWastePage />,
      marketplace: <MarketplacePage />,
      transactions: <TransactionsPage />,
      profile: <ProfilePage role="factory" />,
    },
    recycler: {
      dashboard: <RecyclerDashboard />,
      marketplace: <RecyclerMarketplacePage />,
      'my-bids': <MyBidsPage />,
      transactions: <TransactionsPage />,
      profile: <ProfilePage role="recycler" />,
    },
    logistics: {
      dashboard: <LogisticsDashboard />,
      orders: <OrdersPage />,
      routes: <RoutesPage />,
      profile: <ProfilePage role="logistics" />,
    },
  };

  if (!currentRole) return null;
  return pages[currentRole][currentPage] || pages[currentRole].dashboard || null;
}

function AppShell() {
  const { isAuthenticated, currentRole } = useApp();

  if (!isAuthenticated) return <LoginPage />;
  if (!currentRole) return <RoleSelectPage />;

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar />
        <main className="flex-1 overflow-y-auto">
          <PageRouter />
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppShell />
    </AppProvider>
  );
}
