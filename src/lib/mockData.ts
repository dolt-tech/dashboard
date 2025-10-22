import { addDays, addHours, subDays, format } from 'date-fns';

// Service types
export interface Service {
  id: string;
  name: string;
  category: string;
  basePrice: number;
  description: string;
  icon: string;
  rating: number;
  reviewCount: number;
}

export interface Booking {
  id: string;
  userId: string;
  providerId: string;
  serviceId: string;
  address: string;
  date: Date;
  time: string;
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  amount: number;
  notes?: string;
  customerName: string;
  providerName: string;
  rating?: number;
  review?: string;
  completedAt?: Date;
}

export interface Payment {
  id: string;
  bookingId: string;
  userId: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  date: Date;
  method: 'card' | 'bank_transfer';
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  read: boolean;
  senderName: string;
  senderAvatar: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  image: string;
  rating: number;
}

export interface Order {
  id: string;
  userId: string;
  items: { productId: string; quantity: number; price: number }[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  date: Date;
  shippingDate?: Date;
  deliveryDate?: Date;
}

export interface Provider {
  id: string;
  name: string;
  email: string;
  rating: number;
  completedJobs: number;
  skills: string[];
  serviceAreas: string[];
  hourlyRate: number;
  avatar: string;
  approvalStatus: 'pending' | 'approved' | 'rejected';
  joinDate: Date;
}

export interface Subscription {
  type: 'free' | 'premium';
  startDate: Date;
  renewalDate: Date;
  monthlyPrice: number;
}

// Mock Services
export const mockServices: Service[] = [
  {
    id: 'svc_1',
    name: 'General Cleaning',
    category: 'Cleaning',
    basePrice: 80,
    description: 'Regular home cleaning including vacuuming, mopping, and dusting',
    icon: '🧹',
    rating: 4.8,
    reviewCount: 342,
  },
  {
    id: 'svc_2',
    name: 'Deep Cleaning',
    category: 'Cleaning',
    basePrice: 150,
    description: 'Comprehensive deep cleaning of all areas',
    icon: '✨',
    rating: 4.9,
    reviewCount: 287,
  },
  {
    id: 'svc_3',
    name: 'Pipe Repair',
    category: 'Plumbing',
    basePrice: 120,
    description: 'Professional pipe repair and maintenance',
    icon: '🔧',
    rating: 4.7,
    reviewCount: 201,
  },
  {
    id: 'svc_4',
    name: 'Electrical Wiring',
    category: 'Electrical',
    basePrice: 200,
    description: 'Safe electrical installation and repair',
    icon: '⚡',
    rating: 4.9,
    reviewCount: 156,
  },
  {
    id: 'svc_5',
    name: 'AC Installation',
    category: 'HVAC',
    basePrice: 500,
    description: 'Professional air conditioning installation',
    icon: '❄️',
    rating: 4.8,
    reviewCount: 98,
  },
  {
    id: 'svc_6',
    name: 'Painting',
    category: 'Painting',
    basePrice: 300,
    description: 'Interior and exterior painting services',
    icon: '🎨',
    rating: 4.6,
    reviewCount: 234,
  },
  {
    id: 'svc_7',
    name: 'Carpentry',
    category: 'Carpentry',
    basePrice: 250,
    description: 'Custom woodwork and furniture repair',
    icon: '🪚',
    rating: 4.7,
    reviewCount: 178,
  },
  {
    id: 'svc_8',
    name: 'Lawn Maintenance',
    category: 'Gardening',
    basePrice: 60,
    description: 'Professional lawn care and maintenance',
    icon: '🌱',
    rating: 4.5,
    reviewCount: 412,
  },
];

// Mock Bookings
export const mockBookings: Booking[] = [
  {
    id: 'bk_1',
    userId: 'user_1',
    providerId: 'prov_1',
    serviceId: 'svc_1',
    address: '123 Main St, New York',
    date: addDays(new Date(), 2),
    time: '10:00 AM',
    status: 'confirmed',
    amount: 80,
    customerName: 'John Doe',
    providerName: 'Sarah Johnson',
    notes: 'Please bring your own cleaning supplies',
  },
  {
    id: 'bk_2',
    userId: 'user_1',
    providerId: 'prov_2',
    serviceId: 'svc_3',
    address: '456 Oak Ave, Brooklyn',
    date: addDays(new Date(), 5),
    time: '2:00 PM',
    status: 'pending',
    amount: 120,
    customerName: 'John Doe',
    providerName: 'Mike Chen',
  },
  {
    id: 'bk_3',
    userId: 'user_2',
    providerId: 'prov_3',
    serviceId: 'svc_5',
    address: '789 Elm St, Queens',
    date: subDays(new Date(), 3),
    time: '9:00 AM',
    status: 'completed',
    amount: 500,
    customerName: 'Jane Smith',
    providerName: 'Alex Rodriguez',
    rating: 5,
    review: 'Excellent service, very professional',
    completedAt: subDays(new Date(), 3),
  },
  {
    id: 'bk_4',
    userId: 'user_3',
    providerId: 'prov_1',
    serviceId: 'svc_2',
    address: '321 Pine Rd, Manhattan',
    date: new Date(),
    time: '1:00 PM',
    status: 'in_progress',
    amount: 150,
    customerName: 'Robert Brown',
    providerName: 'Sarah Johnson',
  },
];

// Mock Providers
export const mockProviders: Provider[] = [
  {
    id: 'prov_1',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    rating: 4.9,
    completedJobs: 342,
    skills: ['General Cleaning', 'Deep Cleaning', 'Carpet Cleaning'],
    serviceAreas: ['Manhattan', 'Brooklyn', 'Queens'],
    hourlyRate: 50,
    avatar: 'https://avatar.vercel.sh/sarah',
    approvalStatus: 'approved',
    joinDate: subDays(new Date(), 365),
  },
  {
    id: 'prov_2',
    name: 'Mike Chen',
    email: 'mike@example.com',
    rating: 4.7,
    completedJobs: 201,
    skills: ['Plumbing', 'Leak Detection', 'Pipe Installation'],
    serviceAreas: ['Brooklyn', 'Queens', 'Bronx'],
    hourlyRate: 75,
    avatar: 'https://avatar.vercel.sh/mike',
    approvalStatus: 'approved',
    joinDate: subDays(new Date(), 200),
  },
  {
    id: 'prov_3',
    name: 'Alex Rodriguez',
    email: 'alex@example.com',
    rating: 4.8,
    completedJobs: 156,
    skills: ['AC Installation', 'HVAC Maintenance', 'Heating Systems'],
    serviceAreas: ['Manhattan', 'Brooklyn'],
    hourlyRate: 100,
    avatar: 'https://avatar.vercel.sh/alex',
    approvalStatus: 'approved',
    joinDate: subDays(new Date(), 180),
  },
  {
    id: 'prov_4',
    name: 'Emily Watson',
    email: 'emily@example.com',
    rating: 4.6,
    completedJobs: 234,
    skills: ['Interior Painting', 'Exterior Painting', 'Color Consultation'],
    serviceAreas: ['Manhattan', 'Brooklyn', 'Queens', 'Bronx'],
    hourlyRate: 60,
    avatar: 'https://avatar.vercel.sh/emily',
    approvalStatus: 'approved',
    joinDate: subDays(new Date(), 150),
  },
  {
    id: 'prov_5',
    name: 'David Lee',
    email: 'david@example.com',
    rating: 4.5,
    completedJobs: 98,
    skills: ['Electrical Wiring', 'Circuit Installation', 'Lighting Design'],
    serviceAreas: ['Manhattan'],
    hourlyRate: 85,
    avatar: 'https://avatar.vercel.sh/david',
    approvalStatus: 'pending',
    joinDate: subDays(new Date(), 30),
  },
];

// Mock Payments
export const mockPayments: Payment[] = [
  {
    id: 'pay_1',
    bookingId: 'bk_1',
    userId: 'user_1',
    amount: 80,
    status: 'completed',
    date: subDays(new Date(), 5),
    method: 'card',
  },
  {
    id: 'pay_2',
    bookingId: 'bk_3',
    userId: 'user_2',
    amount: 500,
    status: 'completed',
    date: subDays(new Date(), 10),
    method: 'bank_transfer',
  },
  {
    id: 'pay_3',
    bookingId: 'bk_4',
    userId: 'user_3',
    amount: 150,
    status: 'pending',
    date: new Date(),
    method: 'card',
  },
];

// Mock Messages
export const mockMessages: Message[] = [
  {
    id: 'msg_1',
    senderId: 'prov_1',
    receiverId: 'user_1',
    content: 'Hi! I received your booking request. I can do it on the requested date.',
    timestamp: subDays(new Date(), 2),
    read: true,
    senderName: 'Sarah Johnson',
    senderAvatar: 'https://avatar.vercel.sh/sarah',
  },
  {
    id: 'msg_2',
    senderId: 'user_1',
    receiverId: 'prov_1',
    content: 'Great! Looking forward to it.',
    timestamp: subDays(new Date(), 2),
    read: true,
    senderName: 'John Doe',
    senderAvatar: 'https://avatar.vercel.sh/john',
  },
  {
    id: 'msg_3',
    senderId: 'prov_1',
    receiverId: 'user_1',
    content: 'I will arrive around 10 AM. See you then!',
    timestamp: subDays(new Date(), 1),
    read: true,
    senderName: 'Sarah Johnson',
    senderAvatar: 'https://avatar.vercel.sh/sarah',
  },
  {
    id: 'msg_4',
    senderId: 'prov_2',
    receiverId: 'user_1',
    content: 'Your pipe repair is scheduled for next week.',
    timestamp: new Date(),
    read: false,
    senderName: 'Mike Chen',
    senderAvatar: 'https://avatar.vercel.sh/mike',
  },
];

// Mock Products
export const mockProducts: Product[] = [
  {
    id: 'prod_1',
    name: 'HEPA Air Filter',
    category: 'Air Quality',
    price: 45,
    stock: 120,
    image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&h=300&fit=crop',
    rating: 4.6,
  },
  {
    id: 'prod_2',
    name: 'Smart Thermostat',
    category: 'Smart Home',
    price: 199,
    stock: 45,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    rating: 4.8,
  },
  {
    id: 'prod_3',
    name: 'Eco-Friendly Cleaning Kit',
    category: 'Cleaning',
    price: 35,
    stock: 250,
    image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&h=300&fit=crop',
    rating: 4.5,
  },
  {
    id: 'prod_4',
    name: 'LED Light Bulbs (10-pack)',
    category: 'Lighting',
    price: 29,
    stock: 500,
    image: 'https://images.unsplash.com/photo-1565636192335-14f04be948be?w=400&h=300&fit=crop',
    rating: 4.7,
  },
  {
    id: 'prod_5',
    name: 'Water Pressure Gauge',
    category: 'Plumbing',
    price: 22,
    stock: 15,
    image: 'https://images.unsplash.com/photo-1584509919994-ef0c48eda814?w=400&h=300&fit=crop',
    rating: 4.4,
  },
];

// Mock Orders
export const mockOrders: Order[] = [
  {
    id: 'ord_1',
    userId: 'user_1',
    items: [
      { productId: 'prod_1', quantity: 2, price: 45 },
      { productId: 'prod_4', quantity: 1, price: 29 },
    ],
    total: 119,
    status: 'delivered',
    date: subDays(new Date(), 15),
    deliveryDate: subDays(new Date(), 10),
  },
  {
    id: 'ord_2',
    userId: 'user_1',
    items: [
      { productId: 'prod_2', quantity: 1, price: 199 },
    ],
    total: 199,
    status: 'shipped',
    date: subDays(new Date(), 5),
    shippingDate: subDays(new Date(), 3),
  },
  {
    id: 'ord_3',
    userId: 'user_2',
    items: [
      { productId: 'prod_3', quantity: 3, price: 35 },
    ],
    total: 105,
    status: 'processing',
    date: new Date(),
  },
];

// Mock Subscription
export const mockSubscriptions = {
  free: {
    type: 'free' as const,
    startDate: subDays(new Date(), 90),
    renewalDate: addDays(new Date(), 30),
    monthlyPrice: 0,
    features: ['Browse Services', 'Limited Bookings (2/month)', 'Basic Support'],
  },
  premium: {
    type: 'premium' as const,
    startDate: subDays(new Date(), 30),
    renewalDate: addDays(new Date(), 60),
    monthlyPrice: 9.99,
    features: ['Unlimited Bookings', 'Priority Support', 'Exclusive Deals', 'Save Favorites'],
  },
};

// Analytics data
export const mockAnalytics = {
  dailyRevenue: [
    { date: 'Jan 1', revenue: 2400 },
    { date: 'Jan 2', revenue: 1398 },
    { date: 'Jan 3', revenue: 9800 },
    { date: 'Jan 4', revenue: 3908 },
    { date: 'Jan 5', revenue: 4800 },
    { date: 'Jan 6', revenue: 3800 },
    { date: 'Jan 7', revenue: 4300 },
  ],
  serviceBreakdown: [
    { name: 'Cleaning', value: 35 },
    { name: 'Plumbing', value: 25 },
    { name: 'Electrical', value: 20 },
    { name: 'HVAC', value: 12 },
    { name: 'Other', value: 8 },
  ],
  providerStats: [
    { name: 'Sarah Johnson', jobs: 45, rating: 4.9 },
    { name: 'Mike Chen', jobs: 38, rating: 4.7 },
    { name: 'Alex Rodriguez', jobs: 32, rating: 4.8 },
    { name: 'Emily Watson', jobs: 28, rating: 4.6 },
  ],
};
