import { ServiceItem, ServiceProvider, Booking, UserPersona, JwtTokenPayload, AppNotification } from '../types/servicePro';

export const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: 'srv-ac-01',
    title: 'AC Precision Diagnostic & Comprehensive Tune-Up',
    category: 'HVAC & AC Repair',
    shortDescription: 'Full multi-point HVAC inspection, refrigerant pressure check, coil sanitize, and capacitor calibration.',
    fullDescription: 'Comprehensive seasonal maintenance and emergency diagnostics for residential and commercial split & central HVAC units. Includes digital manifold pressure analysis, electrical amp-draw verification, coil cleaning, and precision airflow optimization.',
    basePrice: 89,
    durationMinutes: 90,
    slaHours: 4,
    rating: 4.95,
    reviewCount: 428,
    imageUrl: '/src/assets/images/service_ac_repair_1794224447107.jpg',
    includedFeatures: [
      'Digital refrigerant gauge & superheat/subcool verification',
      'High-pressure chemical evaporator & condenser coil flush',
      'Compressor run-capacitor amp draw testing',
      'Condensate drain line clearing & antimicrobial tablets',
      'Digital thermostat calibration check'
    ],
    addons: [
      { id: 'add-ac-filter', name: 'Hospital-Grade HEPA MERV-13 Filter', price: 35, description: 'High-efficiency particulate filtration upgrade' },
      { id: 'add-ac-deepwash', name: 'Anti-Microbial Duct UV Sanitation', price: 65, description: 'Eradicates mold spores and airborne bacteria' },
      { id: 'add-ac-gas', name: 'Eco-R410A Refrigerant Top-Up (1 lb)', price: 45, description: 'Certified leak-checked charge' }
    ],
    active: true
  },
  {
    id: 'srv-plumb-02',
    title: 'Master Plumbing & Acoustic Leak Detection',
    category: 'Plumbing',
    shortDescription: 'Certified master plumber diagnostics, hydrostatic pressure testing, valve servicing, and drain clearing.',
    fullDescription: 'Licensed plumbing repairs and non-invasive leak detection using acoustic sensors. Covers high-pressure fixture diagnostics, PEX/copper pipe re-crimping, angle-stop valve upgrades, and motorized drain augering.',
    basePrice: 110,
    durationMinutes: 75,
    slaHours: 3,
    rating: 4.92,
    reviewCount: 312,
    imageUrl: '/src/assets/images/service_plumbing_1794224448079.jpg',
    includedFeatures: [
      'Non-invasive acoustic wall leak detection',
      'Main water line hydrostatic pressure audit (PSI)',
      'Quarter-turn brass shutoff valve inspection',
      'Motorized snake augering of primary drain lines',
      'P-trap sanitization and high-torque silicone resealing'
    ],
    addons: [
      { id: 'add-plumb-cam', name: 'HD Color Sewer Line Video Camera Scope', price: 75, description: 'Records pipe interior to identify root intrusions' },
      { id: 'add-plumb-valve', name: 'Quarter-Turn Lead-Free Ball Valve Replacement', price: 45, description: 'Heavy-duty brass shutoff valve upgrade' },
      { id: 'add-plumb-disp', name: 'Garbage Disposal Deep Chemical Descaling', price: 30, description: 'Neutralizes sludge and deodorizes blades' }
    ],
    active: true
  },
  {
    id: 'srv-elec-03',
    title: 'Certified Electrical Maintenance & Panel Audit',
    category: 'Electrical',
    shortDescription: 'Thermal infrared breaker audit, circuit continuity mapping, grounding safety test, and GFCI repairs.',
    fullDescription: 'State-certified master electrical maintenance. Detects thermal hotspots in circuit breaker panels before fires spark, maps overloaded branch circuits, updates tamper-resistant GFCI outlets, and verifies building grounding rods.',
    basePrice: 125,
    durationMinutes: 90,
    slaHours: 2,
    rating: 4.98,
    reviewCount: 516,
    imageUrl: '/src/assets/images/service_electrical_1794224448382.jpg',
    includedFeatures: [
      'FLIR thermal imaging panel scan for micro-arcing hotspots',
      'Neutral-ground voltage drop & impedance verification',
      'GFCI/AFCI breaker trip response latency testing (<25ms)',
      'Tightening of bus bar lug screws to spec torque (in-lbs)',
      'Digital circuit directory labeling and legend update'
    ],
    addons: [
      { id: 'add-elec-surge', name: 'Whole-Home Type 2 Surge Protector Install', price: 140, description: 'Protects sensitive electronics from grid spikes' },
      { id: 'add-elec-gfci', name: 'Smart Tamper-Resistant Self-Testing GFCI', price: 40, description: 'Dual LED safety outlet with auto-monitoring' },
      { id: 'add-elec-smart', name: 'Smart WiFi Dimmer Switch Calibration', price: 35, description: 'Compatible with Apple HomeKit & Google Assistant' }
    ],
    active: true
  },
  {
    id: 'srv-clean-04',
    title: 'Enterprise Deep Cleaning & Hospital-Grade Sanitation',
    category: 'Cleaning',
    shortDescription: '360° deep sanitization, steam floor decontamination, interior appliance polish, and allergen removal.',
    fullDescription: 'Hospital-grade interior sanitization conducted by bonded cleaning professionals. Utilizes neutral electrostatic fogging, 210°F pressurized steam tile sanitation, HEPA air scrubbing, and food-grade kitchen degreasing.',
    basePrice: 95,
    durationMinutes: 150,
    slaHours: 6,
    rating: 4.88,
    reviewCount: 684,
    imageUrl: '/src/assets/images/service_cleaning_1794224447743.jpg',
    includedFeatures: [
      '210°F high-temp steam cleaning of grout and hardwood joints',
      'Interior oven, microwave, and refrigerator sanitization',
      'Microfiber dust extraction on baseboards, trims, and blinds',
      'High-touch surface antimicrobial barrier application',
      'HEPA vacuuming with 0.3-micron particulate filtration'
    ],
    addons: [
      { id: 'add-clean-balcony', name: 'Exterior Balcony & Window Track Pressure Wash', price: 45, description: 'Removes pollen, dust, and grime residues' },
      { id: 'add-clean-sofa', name: 'Upholstery Hot-Water Extraction Shampoo', price: 60, description: 'Removes deep-seated allergens and pet dander' },
      { id: 'add-clean-eco', name: 'Hypoallergenic Organic Plant-Based Formulation', price: 20, description: 'Zero artificial fragrances for sensitive residents' }
    ],
    active: true
  },
  {
    id: 'srv-app-05',
    title: 'Smart Appliance Diagnostics & Motor Servicing',
    category: 'Appliance Care',
    shortDescription: 'Diagnostic troubleshooting for refrigerators, dishwashers, washing machines, and induction ranges.',
    fullDescription: 'Factory-trained technicians utilizing OEM error-code scanners. Resolves drainage faults, inverter motor whining, thermal sensor anomalies, and seal degradations across top appliance manufacturers.',
    basePrice: 85,
    durationMinutes: 60,
    slaHours: 4,
    rating: 4.86,
    reviewCount: 220,
    imageUrl: '/src/assets/images/service_electrical_1794224448382.jpg',
    includedFeatures: [
      'OEM digital fault code readout and diagnostic reset',
      'Inverter motor amp draw and capacitor analysis',
      'Water inlet solenoid valve flow rate calibration',
      'Door gasket silicone vacuum seal leak inspection',
      'Vibration damper and leveling foot adjustment'
    ],
    addons: [
      { id: 'add-app-filter', name: 'OEM Multi-Stage Refrigerator Water Filter', price: 45, description: 'Certified lead and microplastic reduction' },
      { id: 'add-app-descaling', name: 'Dishwasher Internal Jet Arm Descaling', price: 30, description: 'Dissolves hard water calcium crust' }
    ],
    active: true
  },
  {
    id: 'srv-carp-06',
    title: 'Architectural Carpentry & Door Hardware Alignment',
    category: 'Carpentry',
    shortDescription: 'Precision door jamb squaring, cabinet hinge realignment, concealed hardware mounting, and trim repairs.',
    fullDescription: 'Custom architectural woodcraft adjustments. Replaces worn mortise locks, squares sticking solid-core doors, repairs baseboards, and mounts heavy precision cabinetry with laser-leveled anchor points.',
    basePrice: 105,
    durationMinutes: 90,
    slaHours: 8,
    rating: 4.90,
    reviewCount: 175,
    imageUrl: '/src/assets/images/service_plumbing_1794224448079.jpg',
    includedFeatures: [
      'Digital laser-level plane alignment for frames and casings',
      'Heavy-duty 4-inch ball-bearing hinge mortising',
      'Concealed soft-close European cabinet hinge tuning',
      'Solid wood door jamb planing to eliminate floor drags',
      'Polyurethane silicone expansion gap caulking'
    ],
    addons: [
      { id: 'add-carp-deadbolt', name: 'Grade-1 High-Security Smart Deadbolt Prep', price: 55, description: 'Precision chisel work for smart electronic locks' },
      { id: 'add-carp-weather', name: 'Silicone Bulb Perimeter Weatherstripping', price: 35, description: 'Draft proofing and sound reduction seal' }
    ],
    active: true
  }
];

export const INITIAL_PROVIDERS: ServiceProvider[] = [
  {
    id: 'prov-01',
    name: 'Marcus Vance',
    role: 'Lead HVAC Specialist',
    email: 'marcus.vance@servicepro.azure.com',
    phone: '+1 (555) 234-8901',
    rating: 4.96,
    completedJobs: 412,
    skills: ['HVAC & AC Repair', 'Appliance Care'],
    available: true,
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&h=256&q=80',
    certifications: ['EPA Universal 608 Certified', 'NATE Master HVAC Tech', 'Azure IoT Field Fleet Certified']
  },
  {
    id: 'prov-02',
    name: 'Elena Rostova',
    role: 'Master Licensed Plumber',
    email: 'elena.rostova@servicepro.azure.com',
    phone: '+1 (555) 492-3810',
    rating: 4.94,
    completedJobs: 389,
    skills: ['Plumbing', 'Appliance Care'],
    available: true,
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=256&h=256&q=80',
    certifications: ['State Master Plumbing License #MP-8831', 'Backflow Prevention Inspector', 'Acoustic Leak Specialist']
  },
  {
    id: 'prov-03',
    name: 'David Chen',
    role: 'Certified Master Electrician',
    email: 'david.chen@servicepro.azure.com',
    phone: '+1 (555) 781-9042',
    rating: 4.98,
    completedJobs: 540,
    skills: ['Electrical', 'Appliance Care'],
    available: true,
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&h=256&q=80',
    certifications: ['National Electrical Code (NEC) Certified', 'Level 2 Infrared Thermographer', 'Smart Home Integration Professional']
  },
  {
    id: 'prov-04',
    name: 'Sarah Jenkins',
    role: 'Sanitation & Clean Operations Director',
    email: 'sarah.jenkins@servicepro.azure.com',
    phone: '+1 (555) 612-4491',
    rating: 4.91,
    completedJobs: 620,
    skills: ['Cleaning', 'Carpentry'],
    available: false,
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&h=256&q=80',
    certifications: ['IICRC Master Cleaner', 'Bio-Safety Level 2 Sanitation', 'OSHA 30-Hour General Industry']
  }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'bk-2026-001',
    bookingCode: 'SP-94810',
    serviceId: 'srv-ac-01',
    serviceTitle: 'AC Precision Diagnostic & Comprehensive Tune-Up',
    category: 'HVAC & AC Repair',
    customerName: 'Piyush Nagbansi',
    customerEmail: 'piyushnagbansi500@gmail.com',
    customerPhone: '+1 (555) 912-3841',
    address: '450 Silicon Parkway',
    unit: 'Penthouse 14B',
    city: 'Seattle, WA',
    scheduledDate: '2026-11-10',
    scheduledTimeSlot: '09:00 AM - 11:00 AM',
    status: 'In Progress',
    selectedAddons: [
      { id: 'add-ac-filter', name: 'Hospital-Grade HEPA MERV-13 Filter', price: 35, description: 'High-efficiency particulate filtration upgrade' },
      { id: 'add-ac-gas', name: 'Eco-R410A Refrigerant Top-Up (1 lb)', price: 45, description: 'Certified leak-checked charge' }
    ],
    basePrice: 89,
    addonsTotal: 80,
    tax: 13.52,
    totalPrice: 182.52,
    specialInstructions: 'Condenser is located on exterior balcony ledge. Security gate code is #4829.',
    assignedProviderId: 'prov-01',
    assignedProviderName: 'Marcus Vance',
    technicianNotes: [
      'Arrived on site at 09:12 AM with digital manifold kit.',
      'Initial superheat was 18°F; injected 0.8 lbs R410A. Running optimal at 10°F subcool.',
      'Installed MERV-13 filter in master air handler.'
    ],
    checklistItems: [
      { task: 'Electrical disconnect box isolation & voltage safety check', completed: true },
      { task: 'Refrigerant pressure measurement & digital gauge logs', completed: true },
      { task: 'Evaporator and condenser chemical bath rinse', completed: true },
      { task: 'Filter replacement & sealed seating', completed: true },
      { task: 'Customer thermostat verification & temperature differential test', completed: false }
    ],
    createdAt: '2026-11-08T14:22:00Z',
    updatedAt: '2026-11-09T09:30:00Z'
  },
  {
    id: 'bk-2026-002',
    bookingCode: 'SP-94811',
    serviceId: 'srv-plumb-02',
    serviceTitle: 'Master Plumbing & Acoustic Leak Detection',
    category: 'Plumbing',
    customerName: 'Emily Watson',
    customerEmail: 'emily.watson@northcorp.io',
    customerPhone: '+1 (555) 304-9912',
    address: '882 Bellevue Way NE',
    city: 'Bellevue, WA',
    scheduledDate: '2026-11-10',
    scheduledTimeSlot: '01:00 PM - 03:00 PM',
    status: 'Assigned',
    selectedAddons: [
      { id: 'add-plumb-valve', name: 'Quarter-Turn Lead-Free Ball Valve Replacement', price: 45, description: 'Heavy-duty brass shutoff valve upgrade' }
    ],
    basePrice: 110,
    addonsTotal: 45,
    tax: 12.40,
    totalPrice: 167.40,
    specialInstructions: 'Slight damp spot behind powder room drywall. Please bring acoustic sensor.',
    assignedProviderId: 'prov-02',
    assignedProviderName: 'Elena Rostova',
    technicianNotes: [
      'Elena confirmed dispatch dispatch queue. ETA is 12:50 PM.'
    ],
    checklistItems: [
      { task: 'Hydrostatic water pressure testing at street main', completed: false },
      { task: 'Acoustic pipe membrane frequency scan', completed: false },
      { task: 'Shutoff valve replacement and pressure test', completed: false },
      { task: 'Drywall moisture meter reading check', completed: false }
    ],
    createdAt: '2026-11-08T18:10:00Z',
    updatedAt: '2026-11-09T02:15:00Z'
  },
  {
    id: 'bk-2026-003',
    bookingCode: 'SP-94812',
    serviceId: 'srv-elec-03',
    serviceTitle: 'Certified Electrical Maintenance & Panel Audit',
    category: 'Electrical',
    customerName: 'Robert Vance',
    customerEmail: 'robert.vance@techforge.com',
    customerPhone: '+1 (555) 771-4209',
    address: '1201 Pine Ridge Rd',
    city: 'Redmond, WA',
    scheduledDate: '2026-11-11',
    scheduledTimeSlot: '10:00 AM - 12:00 PM',
    status: 'Approved',
    selectedAddons: [
      { id: 'add-elec-surge', name: 'Whole-Home Type 2 Surge Protector Install', price: 140, description: 'Protects sensitive electronics from grid spikes' }
    ],
    basePrice: 125,
    addonsTotal: 140,
    tax: 21.20,
    totalPrice: 286.20,
    specialInstructions: 'Panel is located in garage next to EV wall charger.',
    checklistItems: [
      { task: 'FLIR Thermal camera panel inspection', completed: false },
      { task: 'Torque testing breaker terminal lugs', completed: false },
      { task: 'Whole-home surge suppressor mount & hookup', completed: false }
    ],
    createdAt: '2026-11-09T01:05:00Z',
    updatedAt: '2026-11-09T03:10:00Z'
  },
  {
    id: 'bk-2026-004',
    bookingCode: 'SP-94813',
    serviceId: 'srv-clean-04',
    serviceTitle: 'Enterprise Deep Cleaning & Hospital-Grade Sanitation',
    category: 'Cleaning',
    customerName: 'Sophia Miller',
    customerEmail: 'sophia.m@cascadeventures.com',
    customerPhone: '+1 (555) 419-7801',
    address: '320 Highland Blvd',
    unit: 'Suite 400',
    city: 'Kirkland, WA',
    scheduledDate: '2026-11-11',
    scheduledTimeSlot: '02:00 PM - 05:00 PM',
    status: 'Requested',
    selectedAddons: [],
    basePrice: 95,
    addonsTotal: 0,
    tax: 7.60,
    totalPrice: 102.60,
    specialInstructions: 'Corporate executive loft. Keycard will be with concierge front desk.',
    checklistItems: [
      { task: 'High-temp steam floor sanitize', completed: false },
      { task: 'Appliance interior deep cleaning', completed: false },
      { task: 'Air scrubber HEPA purification run', completed: false }
    ],
    createdAt: '2026-11-09T02:40:00Z',
    updatedAt: '2026-11-09T02:40:00Z'
  },
  {
    id: 'bk-2026-005',
    bookingCode: 'SP-94808',
    serviceId: 'srv-ac-01',
    serviceTitle: 'AC Precision Diagnostic & Comprehensive Tune-Up',
    category: 'HVAC & AC Repair',
    customerName: 'Alexander Hayes',
    customerEmail: 'alex.hayes@soundview.org',
    customerPhone: '+1 (555) 882-9901',
    address: '772 Olympic View Loop',
    city: 'Seattle, WA',
    scheduledDate: '2026-11-08',
    scheduledTimeSlot: '11:00 AM - 01:00 PM',
    status: 'Completed',
    selectedAddons: [
      { id: 'add-ac-filter', name: 'Hospital-Grade HEPA MERV-13 Filter', price: 35, description: 'High-efficiency particulate filtration upgrade' }
    ],
    basePrice: 89,
    addonsTotal: 35,
    tax: 9.92,
    totalPrice: 133.92,
    assignedProviderId: 'prov-01',
    assignedProviderName: 'Marcus Vance',
    technicianNotes: [
      'Diagnostic complete. Cleaned outdoor condenser coils and replaced air filter.',
      'Unit cooling down to 68°F within 12 minutes.'
    ],
    checklistItems: [
      { task: 'Electrical disconnect box isolation & voltage safety check', completed: true },
      { task: 'Refrigerant pressure measurement & digital gauge logs', completed: true },
      { task: 'Evaporator and condenser chemical bath rinse', completed: true },
      { task: 'Filter replacement & sealed seating', completed: true },
      { task: 'Customer thermostat verification & temperature differential test', completed: true }
    ],
    rating: 5,
    feedback: 'Outstanding prompt service! Marcus explained every step of the diagnostic and our AC is running cooler and quieter than ever.',
    createdAt: '2026-11-07T10:15:00Z',
    updatedAt: '2026-11-08T13:00:00Z'
  }
];

export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-1',
    timestamp: 'Just now',
    title: 'Technician Assigned',
    message: 'Marcus Vance has been dispatched for AC Tune-Up #SP-94810. View real-time technician status.',
    type: 'dispatch',
    read: false,
    bookingId: 'bk-2026-001',
    emailHtmlPreview: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
        <div style="background: #0f172a; padding: 24px; color: #fff;">
          <h2 style="margin: 0; font-size: 20px;">ServicePro Enterprise Dispatch</h2>
          <p style="margin: 4px 0 0; color: #94a3b8; font-size: 14px;">Booking Reference: #SP-94810</p>
        </div>
        <div style="padding: 24px; background: #fff; color: #334155; line-height: 1.6;">
          <p>Hello <strong>Piyush Nagbansi</strong>,</p>
          <p>Your certified HVAC technician <strong>Marcus Vance</strong> has been dispatched and is currently on schedule.</p>
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 16px; margin: 20px 0;">
            <p style="margin: 0 0 8px;"><strong>Service:</strong> AC Precision Diagnostic & Tune-Up</p>
            <p style="margin: 0 0 8px;"><strong>Window:</strong> Today, 09:00 AM - 11:00 AM</p>
            <p style="margin: 0;"><strong>Location:</strong> 450 Silicon Parkway, Penthouse 14B</p>
          </div>
          <p style="font-size: 13px; color: #64748b;">You can monitor the live checklist and technician progress directly from your ServicePro portal.</p>
        </div>
        <div style="background: #f1f5f9; padding: 14px 24px; font-size: 12px; color: #64748b; text-align: center;">
          Sent securely via Microsoft Azure Communication Services &middot; ServicePro Inc.
        </div>
      </div>
    `
  },
  {
    id: 'notif-2',
    timestamp: '1 hour ago',
    title: 'New Service Request #SP-94812',
    message: 'Robert Vance requested Certified Electrical Maintenance & Panel Audit. Awaiting provider assignment.',
    type: 'booking',
    read: false,
    bookingId: 'bk-2026-003'
  },
  {
    id: 'notif-3',
    timestamp: 'Yesterday',
    title: 'Service Completed & Invoiced',
    message: 'Booking #SP-94808 for Alexander Hayes has been marked Completed. 5-star customer review received.',
    type: 'status',
    read: true,
    bookingId: 'bk-2026-005'
  }
];

export const PERSONAS: Record<string, UserPersona> = {
  customer: {
    id: 'usr-cust-01',
    name: 'Piyush Nagbansi',
    email: 'piyushnagbansi500@gmail.com',
    role: 'Customer',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=128&h=128&q=80',
    phone: '+1 (555) 912-3841',
    department: 'Residential Client',
    token: generateMockJwt('Piyush Nagbansi', 'piyushnagbansi500@gmail.com', 'Customer', ['services.read', 'bookings.create', 'bookings.read_own'])
  },
  provider: {
    id: 'usr-prov-01',
    name: 'Marcus Vance',
    email: 'marcus.vance@servicepro.azure.com',
    role: 'ServiceProvider',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=128&h=128&q=80',
    phone: '+1 (555) 234-8901',
    department: 'HVAC Field Operations',
    token: generateMockJwt('Marcus Vance', 'marcus.vance@servicepro.azure.com', 'ServiceProvider', ['bookings.read_assigned', 'bookings.update_status', 'checklist.execute', 'notes.create'])
  },
  admin: {
    id: 'usr-admin-01',
    name: 'Sarah Connor',
    email: 'sarah.admin@servicepro.azure.com',
    role: 'Admin',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=128&h=128&q=80',
    phone: '+1 (555) 019-8800',
    department: 'Enterprise Dispatch & Analytics',
    token: generateMockJwt('Sarah Connor', 'sarah.admin@servicepro.azure.com', 'Admin', ['*'])
  }
};

export function generateMockJwt(name: string, email: string, role: 'Customer' | 'ServiceProvider' | 'Admin', permissions: string[]): string {
  const header = {
    alg: 'HS256',
    typ: 'JWT'
  };
  const now = Math.floor(Date.now() / 1000);
  const payload: JwtTokenPayload = {
    iss: 'https://auth.servicepro.azure.net',
    sub: email,
    aud: 'https://api.servicepro.azure.net',
    email,
    name,
    role,
    tenant_id: 'AZURE-TENANT-PROD-092',
    permissions,
    iat: now,
    exp: now + 86400 * 7 // 7 days
  };

  const b64Header = btoa(JSON.stringify(header)).replace(/=/g, '');
  const b64Payload = btoa(JSON.stringify(payload)).replace(/=/g, '');
  const signature = 'c2lnbmF0dXJlX2htYWNfc2hhMjU2X2F6dXJlX2tleXZhdWx0';
  return `${b64Header}.${b64Payload}.${signature}`;
}

export function decodeJwt(token: string): { header: Record<string, unknown>; payload: JwtTokenPayload } | null {
  try {
    const parts = token.split('.');
    if (parts.length < 2) return null;
    const header = JSON.parse(atob(parts[0]));
    const payload = JSON.parse(atob(parts[1]));
    return { header, payload };
  } catch {
    return null;
  }
}
