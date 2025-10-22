import { createBrowserRouter, Navigate } from 'react-router-dom';
import Index from './pages/index';
import Login from './pages/login';
import NotFound from './pages/NotFound';
import { ProtectedRoute } from './components/ProtectedRoute';
import { DashboardLayout } from './components/layout/DashboardLayout';

// Homeowner pages
import HomeownerDashboard from './pages/homeowner';
import BookService from './pages/homeowner/book';
import Marketplace from './pages/homeowner/marketplace';
import Payments from './pages/homeowner/payments';
import Subscription from './pages/homeowner/subscription';
import Orders from './pages/homeowner/orders';
import Ratings from './pages/homeowner/ratings';
import HomeownerMessages from './pages/homeowner/messages';
import HomeownerProfile from './pages/homeowner/profile';
import ShoppingCart from './pages/homeowner/cart';
import HomeownerNotifications from './pages/homeowner/notifications';

// Provider pages
import ProviderDashboard from './pages/provider';
import JobsList from './pages/provider/jobs';
import Earnings from './pages/provider/earnings';
import ProviderProfile from './pages/provider/profile';
import JobDetails from './pages/provider/job-details';
import AvailabilityCalendar from './pages/provider/availability';
import RatingsAndReviews from './pages/provider/ratings';
import SkillsAndServices from './pages/provider/skills';
import ProviderNotifications from './pages/provider/notifications';

// Admin pages
import AdminDashboard from './pages/admin';
import AdminUsers from './pages/admin/users';
import AdminAnalytics from './pages/admin/analytics';
import ProvidersManagement from './pages/admin/providers';
import ServicesManagement from './pages/admin/services';
import ProductsManagement from './pages/admin/products';
import OrdersManagement from './pages/admin/orders';
import BookingsManagement from './pages/admin/bookings';
import PaymentsManagement from './pages/admin/payments';
import SubscriptionsMonitoring from './pages/admin/subscriptions';
import SystemAlerts from './pages/admin/system';
import ChatMonitor from './pages/admin/chat-monitor';
import AdminNotifications from './pages/admin/notifications';

const routes = [
  {
    path: '/',
    element: <Index />,
  },
  {
    path: '/login',
    element: <Login />,
  },

  // Homeowner Dashboard
  {
    path: '/homeowner',
    element: (
      <ProtectedRoute allowedRoles={['homeowner']}>
        <DashboardLayout>
          <HomeownerDashboard />
        </DashboardLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/homeowner/book',
    element: (
      <ProtectedRoute allowedRoles={['homeowner']}>
        <DashboardLayout>
          <BookService />
        </DashboardLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/homeowner/bookings',
    element: (
      <ProtectedRoute allowedRoles={['homeowner']}>
        <DashboardLayout>
          <Orders />
        </DashboardLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/homeowner/marketplace',
    element: (
      <ProtectedRoute allowedRoles={['homeowner']}>
        <DashboardLayout>
          <Marketplace />
        </DashboardLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/homeowner/orders',
    element: (
      <ProtectedRoute allowedRoles={['homeowner']}>
        <DashboardLayout>
          <Orders />
        </DashboardLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/homeowner/payments',
    element: (
      <ProtectedRoute allowedRoles={['homeowner']}>
        <DashboardLayout>
          <Payments />
        </DashboardLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/homeowner/ratings',
    element: (
      <ProtectedRoute allowedRoles={['homeowner']}>
        <DashboardLayout>
          <Ratings />
        </DashboardLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/homeowner/subscription',
    element: (
      <ProtectedRoute allowedRoles={['homeowner']}>
        <DashboardLayout>
          <Subscription />
        </DashboardLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/homeowner/messages',
    element: (
      <ProtectedRoute allowedRoles={['homeowner']}>
        <DashboardLayout>
          <HomeownerMessages />
        </DashboardLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/homeowner/profile',
    element: (
      <ProtectedRoute allowedRoles={['homeowner']}>
        <DashboardLayout>
          <HomeownerProfile />
        </DashboardLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/homeowner/cart',
    element: (
      <ProtectedRoute allowedRoles={['homeowner']}>
        <DashboardLayout>
          <ShoppingCart />
        </DashboardLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/homeowner/notifications',
    element: (
      <ProtectedRoute allowedRoles={['homeowner']}>
        <DashboardLayout>
          <HomeownerNotifications />
        </DashboardLayout>
      </ProtectedRoute>
    ),
  },

  // Provider Dashboard
  {
    path: '/provider',
    element: (
      <ProtectedRoute allowedRoles={['provider']}>
        <DashboardLayout>
          <ProviderDashboard />
        </DashboardLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/provider/jobs',
    element: (
      <ProtectedRoute allowedRoles={['provider']}>
        <DashboardLayout>
          <JobsList />
        </DashboardLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/provider/earnings',
    element: (
      <ProtectedRoute allowedRoles={['provider']}>
        <DashboardLayout>
          <Earnings />
        </DashboardLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/provider/availability',
    element: (
      <ProtectedRoute allowedRoles={['provider']}>
        <DashboardLayout>
          <AvailabilityCalendar />
        </DashboardLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/provider/profile',
    element: (
      <ProtectedRoute allowedRoles={['provider']}>
        <DashboardLayout>
          <ProviderProfile />
        </DashboardLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/provider/messages',
    element: (
      <ProtectedRoute allowedRoles={['provider']}>
        <DashboardLayout>
          <HomeownerMessages />
        </DashboardLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/provider/job-details',
    element: (
      <ProtectedRoute allowedRoles={['provider']}>
        <DashboardLayout>
          <JobDetails />
        </DashboardLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/provider/ratings',
    element: (
      <ProtectedRoute allowedRoles={['provider']}>
        <DashboardLayout>
          <RatingsAndReviews />
        </DashboardLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/provider/skills',
    element: (
      <ProtectedRoute allowedRoles={['provider']}>
        <DashboardLayout>
          <SkillsAndServices />
        </DashboardLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/provider/notifications',
    element: (
      <ProtectedRoute allowedRoles={['provider']}>
        <DashboardLayout>
          <ProviderNotifications />
        </DashboardLayout>
      </ProtectedRoute>
    ),
  },

  // Admin Dashboard
  {
    path: '/admin',
    element: (
      <ProtectedRoute allowedRoles={['admin']}>
        <DashboardLayout>
          <AdminDashboard />
        </DashboardLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/analytics',
    element: (
      <ProtectedRoute allowedRoles={['admin']}>
        <DashboardLayout>
          <AdminAnalytics />
        </DashboardLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/users',
    element: (
      <ProtectedRoute allowedRoles={['admin']}>
        <DashboardLayout>
          <AdminUsers />
        </DashboardLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/providers',
    element: (
      <ProtectedRoute allowedRoles={['admin']}>
        <DashboardLayout>
          <ProvidersManagement />
        </DashboardLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/services',
    element: (
      <ProtectedRoute allowedRoles={['admin']}>
        <DashboardLayout>
          <ServicesManagement />
        </DashboardLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/products',
    element: (
      <ProtectedRoute allowedRoles={['admin']}>
        <DashboardLayout>
          <ProductsManagement />
        </DashboardLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/orders',
    element: (
      <ProtectedRoute allowedRoles={['admin']}>
        <DashboardLayout>
          <OrdersManagement />
        </DashboardLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/bookings',
    element: (
      <ProtectedRoute allowedRoles={['admin']}>
        <DashboardLayout>
          <BookingsManagement />
        </DashboardLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/payments',
    element: (
      <ProtectedRoute allowedRoles={['admin']}>
        <DashboardLayout>
          <PaymentsManagement />
        </DashboardLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/system',
    element: (
      <ProtectedRoute allowedRoles={['admin']}>
        <DashboardLayout>
          <SystemAlerts />
        </DashboardLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/subscriptions',
    element: (
      <ProtectedRoute allowedRoles={['admin']}>
        <DashboardLayout>
          <SubscriptionsMonitoring />
        </DashboardLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/chat-monitor',
    element: (
      <ProtectedRoute allowedRoles={['admin']}>
        <DashboardLayout>
          <ChatMonitor />
        </DashboardLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/messages',
    element: (
      <ProtectedRoute allowedRoles={['admin']}>
        <DashboardLayout>
          <ChatMonitor />
        </DashboardLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/notifications',
    element: (
      <ProtectedRoute allowedRoles={['admin']}>
        <DashboardLayout>
          <AdminNotifications />
        </DashboardLayout>
      </ProtectedRoute>
    ),
  },

  {
    path: '*',
    element: <NotFound />,
  },
];

const basename = (window as any).__APP_BASENAME__ || '/';
export const router = createBrowserRouter(routes, { basename });