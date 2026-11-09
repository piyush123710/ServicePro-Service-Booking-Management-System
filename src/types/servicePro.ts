export type Role = 'Customer' | 'ServiceProvider' | 'Admin';

export type BookingStatus =
  | 'Requested'
  | 'Approved'
  | 'Assigned'
  | 'In Progress'
  | 'Completed'
  | 'Cancelled';

export type ServiceCategory =
  | 'All'
  | 'HVAC & AC Repair'
  | 'Plumbing'
  | 'Electrical'
  | 'Cleaning'
  | 'Appliance Care'
  | 'Carpentry';

export interface ServiceAddon {
  id: string;
  name: string;
  price: number;
  description: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  category: ServiceCategory;
  shortDescription: string;
  fullDescription: string;
  basePrice: number;
  durationMinutes: number;
  slaHours: number;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  includedFeatures: string[];
  addons: ServiceAddon[];
  active: boolean;
}

export interface ServiceProvider {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  rating: number;
  completedJobs: number;
  skills: ServiceCategory[];
  available: boolean;
  avatarUrl: string;
  certifications: string[];
}

export interface Booking {
  id: string;
  bookingCode: string;
  serviceId: string;
  serviceTitle: string;
  category: ServiceCategory;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  address: string;
  unit?: string;
  city: string;
  scheduledDate: string;
  scheduledTimeSlot: string;
  status: BookingStatus;
  selectedAddons: ServiceAddon[];
  basePrice: number;
  addonsTotal: number;
  tax: number;
  totalPrice: number;
  specialInstructions?: string;
  assignedProviderId?: string;
  assignedProviderName?: string;
  technicianNotes?: string[];
  checklistItems: { task: string; completed: boolean }[];
  createdAt: string;
  updatedAt: string;
  cancellationReason?: string;
  rating?: number;
  feedback?: string;
}

export interface AppNotification {
  id: string;
  timestamp: string;
  title: string;
  message: string;
  type: 'booking' | 'dispatch' | 'status' | 'system';
  read: boolean;
  bookingId?: string;
  emailHtmlPreview?: string;
}

export interface UserPersona {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar: string;
  department?: string;
  phone: string;
  token: string;
}

export interface JwtTokenPayload {
  iss: string;
  sub: string;
  aud: string;
  email: string;
  name: string;
  role: Role;
  tenant_id: string;
  permissions: string[];
  iat: number;
  exp: number;
}
