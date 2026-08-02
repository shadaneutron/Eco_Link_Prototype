export type UserRole = 'factory' | 'recycler' | 'logistics';

export type WasteStatus = 'available' | 'auction' | 'sold' | 'in_transit' | 'completed';
export type TransactionStatus = 'pending' | 'approved' | 'in_transit' | 'completed' | 'cancelled';
export type DeliveryStatus = 'assigned' | 'accepted' | 'in_transit' | 'delivered';
export type BidStatus = 'pending' | 'approved' | 'rejected' | 'won';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  company: string;
  location: string;
  avatar?: string;
}

export interface WasteListing {
  id: string;
  factoryId: string;
  factoryName: string;
  factoryLocation: string;
  wasteType: string;
  weight: number;
  quantity: number;
  description: string;
  imageUrl: string;
  startingPrice: number;
  currentBid?: number;
  auctionEndsAt: string;
  status: WasteStatus;
  createdAt: string;
  tags: string[];
}

export interface Bid {
  id: string;
  listingId: string;
  recyclerName: string;
  offerPrice: number;
  estimatedPickupDate: string;
  status: BidStatus;
  submittedAt: string;
  wasteType: string;
  factoryName: string;
  weight: number;
}

export interface Transaction {
  id: string;
  listingId: string;
  factory: string;
  factoryLocation: string;
  recycler: string;
  recyclerLocation: string;
  logisticsCompany: string;
  wasteType: string;
  weight: number;
  finalPrice: number;
  carbonSaved: number;
  status: TransactionStatus;
  createdAt: string;
  completedAt?: string;
  imageUrl: string;
}

export interface Delivery {
  id: string;
  transactionId: string;
  pickupFactory: string;
  pickupAddress: string;
  destinationRecycler: string;
  destinationAddress: string;
  wasteType: string;
  weight: number;
  status: DeliveryStatus;
  assignedAt: string;
  estimatedDelivery: string;
  distance: string;
  driverName: string;
  vehicleNumber: string;
}

export type FactoryPage = 'dashboard' | 'add-waste' | 'marketplace' | 'transactions' | 'profile';
export type RecyclerPage = 'dashboard' | 'marketplace' | 'my-bids' | 'transactions' | 'profile';
export type LogisticsPage = 'dashboard' | 'orders' | 'routes' | 'profile';
export type AppPage = FactoryPage | RecyclerPage | LogisticsPage;

export interface AppState {
  isAuthenticated: boolean;
  currentRole: UserRole | null;
  currentPage: AppPage;
  selectedListingId: string | null;
  selectedTransactionId: string | null;
  selectedDeliveryId: string | null;
}
