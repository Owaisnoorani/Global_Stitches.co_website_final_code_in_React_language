import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Order } from '../types/Order';

interface OrderContextType {
  orders: Order[];
  addOrder: (order: Omit<Order, 'id' | 'orderDate' | 'status' | 'totalAmount'>) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  getOrderById: (orderId: string) => Order | undefined;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

interface OrderProviderProps {
  children: ReactNode;
}

// Mock data for demonstration
const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    customerName: 'John Smith',
    email: 'john.smith@email.com',
    phone: '+1 (555) 123-4567',
    fileFormat: 'DST',
    size: 'Left Chest',
    turnaroundTime: 'Normal',
    complexity: 'Simple',
    additionalDetails: 'Company logo for polo shirts',
    designFileName: 'company-logo.png',
    orderDate: '2025-01-15',
    status: 'pending',
    totalAmount: 12.00
  },
  {
    id: 'ORD-002',
    customerName: 'Sarah Johnson',
    email: 'sarah.j@business.com',
    phone: '+1 (555) 987-6543',
    fileFormat: 'PEX',
    size: 'Jacket Back',
    turnaroundTime: 'Same Day',
    complexity: 'Complex',
    additionalDetails: 'Large logo for team jackets, need 50 pieces',
    designFileName: 'team-logo.ai',
    orderDate: '2025-01-14',
    status: 'in-progress',
    totalAmount: 35.00
  },
  {
    id: 'ORD-003',
    customerName: 'Mike Wilson',
    email: 'mike.wilson@startup.io',
    phone: '+1 (555) 456-7890',
    fileFormat: 'EXP',
    size: 'Cap Front',
    turnaroundTime: 'Normal',
    complexity: 'Medium',
    additionalDetails: 'Startup logo for baseball caps',
    designFileName: 'startup-logo.svg',
    orderDate: '2025-01-13',
    status: 'completed',
    totalAmount: 18.00
  },
  {
    id: 'ORD-004',
    customerName: 'Lisa Chen',
    email: 'lisa.chen@restaurant.com',
    phone: '+1 (555) 321-0987',
    fileFormat: 'JEF',
    size: 'Front Chest',
    turnaroundTime: 'Same Day',
    complexity: 'Hardcore',
    additionalDetails: 'Restaurant logo with detailed artwork',
    designFileName: 'restaurant-logo.jpg',
    orderDate: '2025-01-12',
    status: 'pending',
    totalAmount: 45.00
  }
];

export const OrderProvider: React.FC<OrderProviderProps> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>(mockOrders);

  const addOrder = (orderData: Omit<Order, 'id' | 'orderDate' | 'status' | 'totalAmount'>) => {
    const newOrder: Order = {
      ...orderData,
      id: `ORD-${String(orders.length + 1).padStart(3, '0')}`,
      orderDate: new Date().toISOString().split('T')[0],
      status: 'pending',
      totalAmount: calculateOrderAmount(orderData.complexity, orderData.turnaroundTime),
      customerName: orderData.email.split('@')[0] // Extract name from email for demo
    };

    setOrders(prev => [newOrder, ...prev]);
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prev => 
      prev.map(order => 
        order.id === orderId ? { ...order, status } : order
      )
    );
  };

  const getOrderById = (orderId: string): Order | undefined => {
    return orders.find(order => order.id === orderId);
  };

  // Calculate order amount based on complexity and turnaround time
  const calculateOrderAmount = (complexity: string, turnaroundTime: string): number => {
    let baseAmount = 0;
    
    switch (complexity) {
      case 'Simple':
        baseAmount = 12;
        break;
      case 'Medium':
        baseAmount = 18;
        break;
      case 'Complex':
        baseAmount = 28;
        break;
      case 'Hardcore':
        baseAmount = 40;
        break;
      default:
        baseAmount = 15;
    }

    // Add rush fee for same day
    if (turnaroundTime === 'Same Day') {
      baseAmount += 8;
    }

    return baseAmount;
  };

  const value = {
    orders,
    addOrder,
    updateOrderStatus,
    getOrderById
  };

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = (): OrderContextType => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};