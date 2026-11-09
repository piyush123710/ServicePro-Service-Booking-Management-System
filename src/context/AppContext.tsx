import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  ServiceItem,
  ServiceProvider,
  Booking,
  BookingStatus,
  UserPersona,
  AppNotification,
  ServiceCategory,
  ServiceAddon
} from '../types/servicePro';
import {
  INITIAL_SERVICES,
  INITIAL_PROVIDERS,
  INITIAL_BOOKINGS,
  INITIAL_NOTIFICATIONS,
  PERSONAS,
  generateMockJwt
} from '../data/mockData';

interface BookingFormData {
  serviceId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  address: string;
  unit?: string;
  city: string;
  scheduledDate: string;
  scheduledTimeSlot: string;
  selectedAddons: ServiceAddon[];
  specialInstructions?: string;
}

interface AppContextType {
  services: ServiceItem[];
  providers: ServiceProvider[];
  bookings: Booking[];
  notifications: AppNotification[];
  currentUser: UserPersona;
  currentTab: 'services' | 'bookings' | 'providers' | 'analytics' | 'architecture';
  setCurrentTab: (tab: 'services' | 'bookings' | 'providers' | 'analytics' | 'architecture') => void;
  selectedCategory: ServiceCategory;
  setSelectedCategory: (cat: ServiceCategory) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  // Modals
  isBookingWizardOpen: boolean;
  openBookingWizard: (service?: ServiceItem) => void;
  closeBookingWizard: () => void;
  activeServiceForBooking: ServiceItem | null;
  activeTrackingBooking: Booking | null;
  openBookingTracker: (booking: Booking) => void;
  closeBookingTracker: () => void;
  isJwtModalOpen: boolean;
  setIsJwtModalOpen: (open: boolean) => void;
  isArchitectureModalOpen: boolean;
  setIsArchitectureModalOpen: (open: boolean) => void;
  isNotificationDrawerOpen: boolean;
  setIsNotificationDrawerOpen: (open: boolean) => void;
  isEmailPreviewModalOpen: boolean;
  setIsEmailPreviewModalOpen: (open: boolean) => void;
  activeEmailPreview: { title: string; html: string; to: string } | null;
  openEmailPreview: (title: string, html: string, to: string) => void;
  closeEmailPreview: () => void;
  isResumeModalOpen: boolean;
  setIsResumeModalOpen: (open: boolean) => void;
  // Actions
  switchPersona: (roleKey: 'customer' | 'provider' | 'admin') => void;
  createBooking: (formData: BookingFormData) => Booking;
  updateBookingStatus: (bookingId: string, newStatus: BookingStatus, reason?: string) => void;
  assignProviderToBooking: (bookingId: string, providerId: string) => void;
  cancelBooking: (bookingId: string, reason: string) => void;
  advanceBookingStatus: (bookingId: string) => void;
  toggleChecklistItem: (bookingId: string, taskIndex: number) => void;
  addTechnicianNote: (bookingId: string, note: string) => void;
  submitCustomerReview: (bookingId: string, rating: number, feedback: string) => void;
  createService: (service: Omit<ServiceItem, 'id' | 'rating' | 'reviewCount'>) => void;
  toggleServiceStatus: (serviceId: string) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  clearAllNotifications: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  BOOKINGS: 'servicepro_bookings_v2',
  SERVICES: 'servicepro_services_v2',
  PROVIDERS: 'servicepro_providers_v2',
  NOTIFS: 'servicepro_notifs_v2',
  PERSONA: 'servicepro_active_persona_v2'
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [services, setServices] = useState<ServiceItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SERVICES);
    return saved ? JSON.parse(saved) : INITIAL_SERVICES;
  });

  const [providers, setProviders] = useState<ServiceProvider[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PROVIDERS);
    return saved ? JSON.parse(saved) : INITIAL_PROVIDERS;
  });

  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
    return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
  });

  const [notifications, setNotifications] = useState<AppNotification[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.NOTIFS);
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [currentUser, setCurrentUser] = useState<UserPersona>(() => {
    const savedKey = localStorage.getItem(STORAGE_KEYS.PERSONA);
    return savedKey && PERSONAS[savedKey] ? PERSONAS[savedKey] : PERSONAS.customer;
  });

  const [currentTab, setCurrentTab] = useState<'services' | 'bookings' | 'providers' | 'analytics' | 'architecture'>('services');
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals
  const [isBookingWizardOpen, setIsBookingWizardOpen] = useState(false);
  const [activeServiceForBooking, setActiveServiceForBooking] = useState<ServiceItem | null>(null);
  const [activeTrackingBooking, setActiveTrackingBooking] = useState<Booking | null>(null);
  const [isJwtModalOpen, setIsJwtModalOpen] = useState(false);
  const [isArchitectureModalOpen, setIsArchitectureModalOpen] = useState(false);
  const [isNotificationDrawerOpen, setIsNotificationDrawerOpen] = useState(false);
  const [isEmailPreviewModalOpen, setIsEmailPreviewModalOpen] = useState(false);
  const [activeEmailPreview, setActiveEmailPreview] = useState<{ title: string; html: string; to: string } | null>(null);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PROVIDERS, JSON.stringify(providers));
  }, [providers]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
    if (activeTrackingBooking) {
      const refreshed = bookings.find((b) => b.id === activeTrackingBooking.id);
      if (refreshed) setActiveTrackingBooking(refreshed);
    }
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.NOTIFS, JSON.stringify(notifications));
  }, [notifications]);

  const switchPersona = (roleKey: 'customer' | 'provider' | 'admin') => {
    const persona = PERSONAS[roleKey];
    if (persona) {
      setCurrentUser(persona);
      localStorage.setItem(STORAGE_KEYS.PERSONA, roleKey);
      
      // Auto-route tab contextually if appropriate
      if (roleKey === 'admin') {
        setCurrentTab('analytics');
      } else if (roleKey === 'provider') {
        setCurrentTab('bookings');
      }
    }
  };

  const openBookingWizard = (service?: ServiceItem) => {
    setActiveServiceForBooking(service || services[0]);
    setIsBookingWizardOpen(true);
  };

  const closeBookingWizard = () => {
    setIsBookingWizardOpen(false);
    setActiveServiceForBooking(null);
  };

  const openBookingTracker = (booking: Booking) => {
    setActiveTrackingBooking(booking);
  };

  const closeBookingTracker = () => {
    setActiveTrackingBooking(null);
  };

  const openEmailPreview = (title: string, html: string, to: string) => {
    setActiveEmailPreview({ title, html, to });
    setIsEmailPreviewModalOpen(true);
  };

  const closeEmailPreview = () => {
    setIsEmailPreviewModalOpen(false);
    setActiveEmailPreview(null);
  };

  const createBooking = (formData: BookingFormData): Booking => {
    const service = services.find((s) => s.id === formData.serviceId) || services[0];
    const addonsTotal = formData.selectedAddons.reduce((sum, item) => sum + item.price, 0);
    const subtotal = service.basePrice + addonsTotal;
    const tax = +(subtotal * 0.08).toFixed(2);
    const totalPrice = +(subtotal + tax).toFixed(2);
    const bookingCode = `SP-${Math.floor(10000 + Math.random() * 90000)}`;

    const newBooking: Booking = {
      id: `bk-${Date.now()}`,
      bookingCode,
      serviceId: service.id,
      serviceTitle: service.title,
      category: service.category,
      customerName: formData.customerName,
      customerEmail: formData.customerEmail,
      customerPhone: formData.customerPhone,
      address: formData.address,
      unit: formData.unit,
      city: formData.city,
      scheduledDate: formData.scheduledDate,
      scheduledTimeSlot: formData.scheduledTimeSlot,
      status: 'Requested',
      selectedAddons: formData.selectedAddons,
      basePrice: service.basePrice,
      addonsTotal,
      tax,
      totalPrice,
      specialInstructions: formData.specialInstructions,
      technicianNotes: ['Booking created and registered in SQL Server database via Entity Framework Core.'],
      checklistItems: service.includedFeatures.map((f) => ({ task: f, completed: false })),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setBookings((prev) => [newBooking, ...prev]);

    // Dispatch notification & simulate email
    const emailHtml = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #cbd5e1; border-radius: 8px; overflow: hidden;">
        <div style="background: #0f172a; padding: 24px; color: #ffffff;">
          <h2 style="margin: 0; font-size: 20px;">ServicePro Booking Confirmation</h2>
          <p style="margin: 4px 0 0; color: #94a3b8; font-size: 13px;">Reference Code: ${bookingCode}</p>
        </div>
        <div style="padding: 24px; background: #ffffff; color: #334155; line-height: 1.6;">
          <p>Dear <strong>${formData.customerName}</strong>,</p>
          <p>Thank you for choosing ServicePro Enterprise. Your appointment has been booked into our Azure-hosted scheduling engine and is currently queued for technician dispatch.</p>
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 16px; margin: 20px 0;">
            <p style="margin: 0 0 6px;"><strong>Service:</strong> ${service.title}</p>
            <p style="margin: 0 0 6px;"><strong>Scheduled Time:</strong> ${formData.scheduledDate} (${formData.scheduledTimeSlot})</p>
            <p style="margin: 0 0 6px;"><strong>Service Location:</strong> ${formData.address}${formData.unit ? `, ${formData.unit}` : ''}, ${formData.city}</p>
            <p style="margin: 0;"><strong>Estimated Total:</strong> $${totalPrice.toFixed(2)} (inc. 8% tax)</p>
          </div>
          <p style="font-size: 13px; color: #64748b;">You can track real-time technician dispatch updates and approve milestone checklists directly through your portal.</p>
        </div>
        <div style="background: #f1f5f9; padding: 14px 24px; font-size: 12px; color: #64748b; text-align: center;">
          Sent via Azure Communication Services &middot; Transactional Queue Worker
        </div>
      </div>
    `;

    const newNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      timestamp: 'Just now',
      title: `Booking Confirmed: ${bookingCode}`,
      message: `Your booking for ${service.title} on ${formData.scheduledDate} has been confirmed.`,
      type: 'booking',
      read: false,
      bookingId: newBooking.id,
      emailHtmlPreview: emailHtml
    };

    setNotifications((prev) => [newNotif, ...prev]);
    return newBooking;
  };

  const updateBookingStatus = (bookingId: string, newStatus: BookingStatus, reason?: string) => {
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id !== bookingId) return b;
        return {
          ...b,
          status: newStatus,
          updatedAt: new Date().toISOString(),
          ...(reason ? { cancellationReason: reason } : {})
        };
      })
    );

    const targetBooking = bookings.find((b) => b.id === bookingId);
    if (!targetBooking) return;

    const notif: AppNotification = {
      id: `notif-${Date.now()}`,
      timestamp: 'Just now',
      title: `Booking ${targetBooking.bookingCode} Updated: ${newStatus}`,
      message: `Status transitioned to ${newStatus}${reason ? `. Reason: ${reason}` : ''}.`,
      type: 'status',
      read: false,
      bookingId
    };
    setNotifications((prev) => [notif, ...prev]);
  };

  const assignProviderToBooking = (bookingId: string, providerId: string) => {
    const provider = providers.find((p) => p.id === providerId);
    if (!provider) return;

    setBookings((prev) =>
      prev.map((b) => {
        if (b.id !== bookingId) return b;
        const newNotes = [
          ...(b.technicianNotes || []),
          `Assigned certified technician ${provider.name} (${provider.role}) to job.`
        ];
        return {
          ...b,
          assignedProviderId: provider.id,
          assignedProviderName: provider.name,
          status: 'Assigned',
          technicianNotes: newNotes,
          updatedAt: new Date().toISOString()
        };
      })
    );

    // Notify customer and provider
    const notif: AppNotification = {
      id: `notif-${Date.now()}`,
      timestamp: 'Just now',
      title: `Technician Dispatched: ${provider.name}`,
      message: `${provider.name} (${provider.role}) has been assigned to booking.`,
      type: 'dispatch',
      read: false,
      bookingId
    };
    setNotifications((prev) => [notif, ...prev]);
  };

  const cancelBooking = (bookingId: string, reason: string) => {
    updateBookingStatus(bookingId, 'Cancelled', reason);
  };

  const advanceBookingStatus = (bookingId: string) => {
    const target = bookings.find((b) => b.id === bookingId);
    if (!target) return;

    const sequence: BookingStatus[] = ['Requested', 'Approved', 'Assigned', 'In Progress', 'Completed'];
    const currentIndex = sequence.indexOf(target.status);

    if (currentIndex >= 0 && currentIndex < sequence.length - 1) {
      const nextStatus = sequence[currentIndex + 1];

      // If moving to Assigned and no provider yet, assign Marcus or first available
      if (nextStatus === 'Assigned' && !target.assignedProviderId) {
        const available = providers.find((p) => p.skills.includes(target.category) || p.available) || providers[0];
        assignProviderToBooking(bookingId, available.id);
        return;
      }

      // If moving to Completed, mark all checklist items true
      if (nextStatus === 'Completed') {
        setBookings((prev) =>
          prev.map((b) => {
            if (b.id !== bookingId) return b;
            return {
              ...b,
              status: nextStatus,
              checklistItems: b.checklistItems.map((c) => ({ ...c, completed: true })),
              technicianNotes: [
                ...(b.technicianNotes || []),
                'Final safety & operational checklist completed. Work orders signed by technician.'
              ],
              updatedAt: new Date().toISOString()
            };
          })
        );
      } else {
        updateBookingStatus(bookingId, nextStatus);
      }
    }
  };

  const toggleChecklistItem = (bookingId: string, taskIndex: number) => {
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id !== bookingId) return b;
        const newChecklist = [...b.checklistItems];
        if (newChecklist[taskIndex]) {
          newChecklist[taskIndex] = {
            ...newChecklist[taskIndex],
            completed: !newChecklist[taskIndex].completed
          };
        }
        return {
          ...b,
          checklistItems: newChecklist,
          updatedAt: new Date().toISOString()
        };
      })
    );
  };

  const addTechnicianNote = (bookingId: string, note: string) => {
    if (!note.trim()) return;
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id !== bookingId) return b;
        return {
          ...b,
          technicianNotes: [...(b.technicianNotes || []), note],
          updatedAt: new Date().toISOString()
        };
      })
    );
  };

  const submitCustomerReview = (bookingId: string, rating: number, feedback: string) => {
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id !== bookingId) return b;
        return {
          ...b,
          rating,
          feedback,
          updatedAt: new Date().toISOString()
        };
      })
    );
  };

  const createService = (serviceData: Omit<ServiceItem, 'id' | 'rating' | 'reviewCount'>) => {
    const newService: ServiceItem = {
      ...serviceData,
      id: `srv-${Date.now()}`,
      rating: 5.0,
      reviewCount: 1
    };
    setServices((prev) => [newService, ...prev]);
  };

  const toggleServiceStatus = (serviceId: string) => {
    setServices((prev) =>
      prev.map((s) => (s.id === serviceId ? { ...s, active: !s.active } : s))
    );
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  return (
    <AppContext.Provider
      value={{
        services,
        providers,
        bookings,
        notifications,
        currentUser,
        currentTab,
        setCurrentTab,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        isBookingWizardOpen,
        openBookingWizard,
        closeBookingWizard,
        activeServiceForBooking,
        activeTrackingBooking,
        openBookingTracker,
        closeBookingTracker,
        isJwtModalOpen,
        setIsJwtModalOpen,
        isArchitectureModalOpen,
        setIsArchitectureModalOpen,
        isNotificationDrawerOpen,
        setIsNotificationDrawerOpen,
        isEmailPreviewModalOpen,
        setIsEmailPreviewModalOpen,
        activeEmailPreview,
        openEmailPreview,
        closeEmailPreview,
        isResumeModalOpen,
        setIsResumeModalOpen,
        switchPersona,
        createBooking,
        updateBookingStatus,
        assignProviderToBooking,
        cancelBooking,
        advanceBookingStatus,
        toggleChecklistItem,
        addTechnicianNote,
        submitCustomerReview,
        createService,
        toggleServiceStatus,
        markNotificationRead,
        markAllNotificationsRead,
        clearAllNotifications
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
