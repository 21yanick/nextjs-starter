// Booking Template - Swiss-only Configuration
// This template is configured specifically for Swiss market operations

export type BusinessModel = 'booking'; // Fixed - no other options

export interface BusinessConfig {
  model: 'booking'; // Always Booking
  currency: string;
  locale: string;
  features: {
    subscriptions: false; // Always false - completely removed
    shop: false; // Always false - completely removed
    bookings: true; // Always true
  };
  payment: {
    methods: string[];
    currency: string;
  };
}

export function getBusinessConfig(): BusinessConfig {
  // Swiss-only configuration - no multi-region support
  return {
    model: 'booking',
    currency: 'CHF',
    locale: 'de-CH',
    features: {
      subscriptions: false, // Completely removed - no subscription code exists
      shop: false, // Completely removed - no shop code exists
      bookings: true,
    },
    payment: {
      methods: ['card', 'twint'], // Swiss payment methods only - immediate payments for bookings
      currency: 'CHF',
    },
  };
}

// Booking-only utility functions (simplified)
export function isSaasEnabled(): boolean {
  return false; // Always false - subscription functionality removed
}

export function isShopEnabled(): boolean {
  return false; // Always false - shop functionality removed
}

export function isBookingEnabled(): boolean {
  return true; // Always true in Booking template
}

export function getDefaultRoute(): string {
  return '/booking'; // Always booking calendar for Booking
}

export function getPricingRoute(): string {
  return '/pricing'; // Service pricing page
}

export function getAvailableFeatures() {
  return {
    hasSubscriptions: false,
    hasShop: false,
    hasBookings: true,
    hasPayments: true,
    isMultiModel: false, // Single model - Booking only
  };
}

// Swiss-specific currency formatting
export function formatCurrency(amount: number, currency?: string): string {
  const useCurrency = currency || 'CHF';
  
  return new Intl.NumberFormat('de-CH', {
    style: 'currency',
    currency: useCurrency,
  }).format(amount / 100); // Convert from Rappen
}

export function getLocalizedStrings() {
  return {
    currency: 'CHF',
    locale: 'de-CH',
    dateFormat: 'dd.MM.yyyy',
    timeFormat: 'HH:mm',
    paymentMethods: {
      card: 'Kreditkarte',
      twint: 'TWINT',
    },
    booking: {
      bookNow: 'Jetzt buchen',
      selectTime: 'Zeit wählen',
      selectService: 'Service wählen',
      confirmBooking: 'Buchung bestätigen',
      payDeposit: 'Anzahlung',
    },
  };
}

// Swiss-specific booking configuration helpers
export function getBookingConfig() {
  return {
    // Business hours (Swiss standard)
    businessHours: {
      start: '09:00',
      end: '18:00',
      workDays: [1, 2, 3, 4, 5], // Monday to Friday
    },
    // Booking rules
    minAdvanceBooking: 24, // 24 hours advance booking
    maxAdvanceBooking: 90, // days
    slotDuration: 30, // minutes
    bufferTime: 15, // minutes between appointments
    // Deposit rules
    requireDeposit: true,
    depositPercentage: 0.5, // 50% deposit
    cancellationPolicy: '24 hours advance notice required',
  };
}

export function getServiceCategories() {
  // Default service categories - can be customized per business
  return {
    beauty: {
      name: 'Schönheit',
      services: ['haircut', 'massage', 'facial', 'manicure'],
    },
    health: {
      name: 'Gesundheit',
      services: ['consultation', 'therapy', 'checkup', 'treatment'],
    },
    professional: {
      name: 'Professionell',
      services: ['consultation', 'meeting', 'interview', 'coaching'],
    },
  };
}

export function getTimeSlotConfig() {
  return {
    timeZone: 'Europe/Zurich',
    dateFormat: 'dd.MM.yyyy',
    timeFormat: 'HH:mm',
    firstDayOfWeek: 1, // Monday
  };
}