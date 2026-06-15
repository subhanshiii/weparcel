export interface Shipment {
  id: string; // tracking number, e.g., WE-982-410-X
  senderName: string;
  senderAddress: string;
  recipientName: string;
  recipientAddress: string;
  weight: number; // in kg
  type: 'Standard' | 'Express' | 'COD Flow' | 'Inventory';
  status: 'In Transit' | 'Out for Delivery' | 'Delivered' | 'Pending' | 'Customs';
  estimatedDelivery: string;
  source: string;
  destination: string;
  currentLocation: string;
  progress: number; // 0 to 100
  history: ShipmentMilestone[];
  isCod?: boolean;
  codAmount?: number;
  codStatus?: 'Pending' | 'Collected' | 'Remitted';
  temperatureControlled?: boolean;
}

export interface ShipmentMilestone {
  time: string;
  location: string;
  status: string;
  description: string;
  iconType: 'pickup' | 'transit' | 'customs' | 'out_for_delivery' | 'delivered';
}

export interface ServiceDetail {
  id: string;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  ratePerKg: number;
  avgLeadTime: string;
  bgHex: string;
}

export interface SupportTicket {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'Open' | 'In Progress' | 'Resolved';
  dateSubmitted: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}
