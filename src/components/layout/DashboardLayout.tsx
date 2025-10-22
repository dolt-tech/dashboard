import { ReactNode } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '../ui/sidebar';
import {
  Home,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  Bell,
  MessageSquare,
  Users,
  FileText,
  ShoppingCart,
  DollarSign,
  LayoutGrid,
  Calendar,
  Star,
  Shield,
  CheckCircle2,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { ThemeToggle } from './ThemeToggle';
import { Badge } from '../ui/badge';

interface DashboardLayoutProps {
  children: ReactNode;
}
interface NavItem {
  label: string;
  href: string;
  icon: React.ForwardRefExoticComponent<
    React.SVGProps<SVGSVGElement> & React.RefAttributes<SVGSVGElement>
  >;
  badge?: number; // optional badge
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { user, logout, switchRole } = useAuth();
  const { cartItems } = useData();
  const navigate = useNavigate();
  const location = useLocation();

  if (!user) {
    return null;
  }

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const getNavItems = (): NavItem[] => {
  const baseItems: NavItem[] = [
    { label: 'Overview', href: `/${user.role}`, icon: Home },
    { label: 'Messages', href: `/${user.role}/messages`, icon: MessageSquare, badge: 2 },
    { label: 'Notifications', href: `/${user.role}/notifications`, icon: Bell, badge: 3 },
  ];

  const roleSpecificItems: Record<string, NavItem[]> = {
    homeowner: [
      { label: 'Book Service', href: '/homeowner/book', icon: Calendar },
      { label: 'My Bookings', href: '/homeowner/bookings', icon: LayoutGrid },
      { label: 'Marketplace', href: '/homeowner/marketplace', icon: ShoppingCart },
      { label: 'Orders', href: '/homeowner/orders', icon: FileText },
      { label: 'Payments', href: '/homeowner/payments', icon: DollarSign },
      { label: 'Ratings', href: '/homeowner/ratings', icon: Star },
      { label: 'Subscription', href: '/homeowner/subscription', icon: Shield },
    ],
    provider: [
      { label: 'My Jobs', href: '/provider/jobs', icon: LayoutGrid },
      { label: 'Earnings', href: '/provider/earnings', icon: DollarSign },
      { label: 'Calendar', href: '/provider/availability', icon: Calendar },
      { label: 'Profile', href: '/provider/profile', icon: Settings },
    ],
    admin: [
      { label: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
      { label: 'Users', href: '/admin/users', icon: Users },
      { label: 'Providers', href: '/admin/providers', icon: CheckCircle2 },
      { label: 'Services', href: '/admin/services', icon: LayoutGrid },
      { label: 'Products', href: '/admin/products', icon: ShoppingCart },
      { label: 'Orders', href: '/admin/orders', icon: FileText },
      { label: 'Bookings', href: '/admin/bookings', icon: Calendar },
      { label: 'Payments', href: '/admin/payments', icon: DollarSign },
      { label: 'System', href: '/admin/system', icon: Settings },
    ],
  };

  return [...baseItems, ...(roleSpecificItems[user.role] || [])];
};

  const navItems = getNavItems();
  const isActive = (href: string) => location.pathname === href;

  return (
    <SidebarProvider>
      <Sidebar className="bg-sidebar border-r border-accent/30">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="text-sidebar-foreground text-xs font-bold px-2 py-3 uppercase tracking-widest border-b border-accent/20">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-accent shadow-orange-glow-sm" />
                <span className="text-accent">{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</span>
              </div>
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {navItems.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive(item.href)}
                      onClick={() => navigate(item.href)}
                      className={`relative transition-all duration-200 ${
                        isActive(item.href)
                          ? 'bg-accent/20 text-accent border-l-2 border-accent'
                          : 'text-sidebar-foreground hover:bg-accent/10 hover:text-accent'
                      }`}
                    >
                      <button className="flex items-center gap-2 w-full">
                        <item.icon className={`w-4 h-4 transition-colors ${
                          isActive(item.href) ? 'text-accent' : 'text-sidebar-foreground'
                        }`} />
                        <span>{item.label}</span>
                        {item.badge && (
                          <span className="ml-auto bg-accent text-black text-xs rounded-full px-2 py-0.5 font-bold">
                            {item.badge}
                          </span>
                        )}
                      </button>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>

      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-40 border-b-2 border-accent bg-background/95 backdrop-blur-md">
          <div className="flex items-center justify-between h-16 px-4 md:px-6 gap-4">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="md:hidden text-white hover:text-accent transition-colors" />
              <h1 className="text-lg md:text-xl font-bold text-white hidden md:block">
                {user.role === 'homeowner' && 'Homeowner Dashboard'}
                {user.role === 'provider' && 'Provider Dashboard'}
                {user.role === 'admin' && 'Admin Dashboard'}
              </h1>
            </div>

            <div className="flex items-center gap-3 md:gap-4">
              {/* <ThemeToggle /> */}

              {/* Cart for Homeowner */}
              {user.role === 'homeowner' && cartCount > 0 && (
                <Button
                  variant="secondary"
                  size="sm"
                  className="gap-2 relative border-accent/50 text-accent hover:text-accent hover:bg-accent/10"
                  onClick={() => navigate('/homeowner/cart')}
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span className="hidden sm:inline text-xs font-semibold">Cart</span>
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs bg-accent text-black font-bold">
                    {cartCount}
                  </Badge>
                </Button>
              )}

              {/* Role Switcher for Testing */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="hidden sm:flex gap-2 border-border text-white hover:text-accent hover:bg-accent/10">
                    <Menu className="w-4 h-4" />
                    <span className="text-xs font-semibold">Switch Role</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-card border-border">
                  <DropdownMenuLabel className="text-white">Test Roles</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-border/50" />
                  <DropdownMenuItem
                    onClick={() => {
                      switchRole('homeowner');
                      navigate('/homeowner');
                    }}
                    className="text-white hover:text-accent hover:bg-accent/10 cursor-pointer"
                  >
                    Homeowner
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      switchRole('provider');
                      navigate('/provider');
                    }}
                    className="text-white hover:text-accent hover:bg-accent/10 cursor-pointer"
                  >
                    Service Provider
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      switchRole('admin');
                      navigate('/admin');
                    }}
                    className="text-white hover:text-accent hover:bg-accent/10 cursor-pointer"
                  >
                    Admin
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-2 text-white hover:text-accent hover:bg-accent/10">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className="bg-accent text-black font-bold">{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="hidden sm:inline text-sm font-medium">{user.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-card border-border">
                  <DropdownMenuLabel className="text-white text-xs">{user.email}</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-border/50" />
                  <DropdownMenuItem 
                    onClick={() => navigate(`/${user.role}/profile`)}
                    className="text-white hover:text-accent hover:bg-accent/10 cursor-pointer"
                  >
                    Profile Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-border/50" />
                  <DropdownMenuItem
                    onClick={() => {
                      logout();
                      navigate('/');
                    }}
                    className="text-red-500 hover:bg-red-500/10 cursor-pointer"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-background">
          <div className="container mx-auto px-4 py-6">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};