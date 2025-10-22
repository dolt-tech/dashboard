import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
  productId: string;
  quantity: number;
  price: number;
}

export interface BookingRequest {
  id: string;
  serviceId: string;
  serviceName: string;
  date: string;
  time: string;
  address: string;
  notes: string;
  status: 'pending' | 'confirmed';
  createdAt: Date;
}

export interface JobUpdate {
  jobId: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  updatedAt: Date;
}

interface DataContextType {
  // Cart
  cartItems: CartItem[];
  addToCart: (productId: string, quantity: number, price: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  
  // Bookings
  bookings: BookingRequest[];
  addBooking: (booking: BookingRequest) => void;
  cancelBooking: (bookingId: string) => void;
  
  // Jobs
  jobUpdates: JobUpdate[];
  updateJobStatus: (jobId: string, status: JobUpdate['status']) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = sessionStorage.getItem('cartItems');
    return saved ? JSON.parse(saved) : [];
  });

  const [bookings, setBookings] = useState<BookingRequest[]>(() => {
    const saved = sessionStorage.getItem('bookings');
    return saved ? JSON.parse(saved) : [];
  });

  const [jobUpdates, setJobUpdates] = useState<JobUpdate[]>(() => {
    const saved = sessionStorage.getItem('jobUpdates');
    return saved ? JSON.parse(saved) : [];
  });

  // Persist cart to sessionStorage
  useEffect(() => {
    sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  // Persist bookings to sessionStorage
  useEffect(() => {
    sessionStorage.setItem('bookings', JSON.stringify(bookings));
  }, [bookings]);

  // Persist job updates to sessionStorage
  useEffect(() => {
    sessionStorage.setItem('jobUpdates', JSON.stringify(jobUpdates));
  }, [jobUpdates]);

  const addToCart = (productId: string, quantity: number, price: number) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.productId === productId);
      if (existing) {
        return prev.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { productId, quantity, price }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.productId !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const addBooking = (booking: BookingRequest) => {
    setBookings((prev) => [...prev, booking]);
  };

  const cancelBooking = (bookingId: string) => {
    setBookings((prev) => prev.filter((b) => b.id !== bookingId));
  };

  const updateJobStatus = (jobId: string, status: JobUpdate['status']) => {
    setJobUpdates((prev) => {
      const existing = prev.find((j) => j.jobId === jobId);
      if (existing) {
        return prev.map((j) =>
          j.jobId === jobId ? { ...j, status, updatedAt: new Date() } : j
        );
      }
      return [...prev, { jobId, status, updatedAt: new Date() }];
    });
  };

  return (
    <DataContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        bookings,
        addBooking,
        cancelBooking,
        jobUpdates,
        updateJobStatus,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within DataProvider');
  }
  return context;
};
