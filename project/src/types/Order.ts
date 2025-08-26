export interface Order {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  fileFormat: string;
  size: string;
  turnaroundTime: string;
  complexity: string;
  additionalDetails: string;
  designFileName?: string;
  orderDate: string;
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  totalAmount: number;
}

export interface OrderFormData {
  fileFormat: string;
  size: string;
  turnaroundTime: string;
  complexity: string;
  additionalDetails: string;
  designFile: File | null;
  email: string;
  phone: string;
}