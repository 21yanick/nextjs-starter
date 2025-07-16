// Booking Template - Hard-coded Configuration (No ENV switching)
// This replaces the universal business-config.ts with Booking-only logic

export type BusinessModel = 'booking'; // Fixed - no other options
export type PaymentRegion = 'international' | 'swiss' | 'german';

export interface BusinessConfig {
  model: 'booking'; // Always Booking
  region: PaymentRegion;
  currency: string;
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
  // No ENV switching - hard-coded Booking configuration
  const region = (process.env.PAYMENT_REGION as PaymentRegion) || 'international';
  
  const currency = region === 'swiss' ? 'CHF' : 
                  region === 'german' ? 'EUR' : 'USD';
  
  const paymentMethods = {
    international: ['card', 'link'],
    swiss: ['card', 'twint'],
    german: ['card', 'sofort'], // Remove SEPA for bookings (immediate payments only)
  };
  
  return {
    model: 'booking',
    region,
    currency,
    features: {
      subscriptions: false, // Completely removed - no subscription code exists
      shop: false, // Completely removed - no shop code exists
      bookings: true,
    },
    payment: {
      methods: paymentMethods[region] || paymentMethods.international,
      currency,
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

// Keep currency formatting (universal utility)
export function formatCurrency(amount: number, currency?: string): string {
  const config = getBusinessConfig();
  const useCurrency = currency || config.currency;
  
  return new Intl.NumberFormat(
    config.region === 'swiss' ? 'de-CH' :
    config.region === 'german' ? 'de-DE' : 'en-US',
    {
      style: 'currency',
      currency: useCurrency,
    }
  ).format(amount / 100);
}

export function getLocalizedStrings() {
  const config = getBusinessConfig();
  
  if (config.region === 'swiss' || config.region === 'german') {
    return {
      currency: config.currency,
      locale: config.region === 'swiss' ? 'de-CH' : 'de-DE',
      dateFormat: 'dd.MM.yyyy',
      timeFormat: 'HH:mm',
      paymentMethods: {
        card: 'Kreditkarte',
        twint: 'TWINT',
        sofort: 'Sofort',
      },
      booking: {
        bookNow: config.region === 'swiss' ? 'Jetzt buchen' : 'Jetzt buchen',
        selectTime: config.region === 'swiss' ? 'Zeit wählen' : 'Zeit wählen',
        selectService: config.region === 'swiss' ? 'Service wählen' : 'Service wählen',
        confirmBooking: config.region === 'swiss' ? 'Buchung bestätigen' : 'Buchung bestätigen',
        payDeposit: config.region === 'swiss' ? 'Anzahlung' : 'Anzahlung',
      },
    };
  }
  
  return {
    currency: config.currency,
    locale: 'en-US',
    dateFormat: 'MM/dd/yyyy',
    timeFormat: 'hh:mm A',
    paymentMethods: {
      card: 'Credit Card',
      link: 'Link',
    },
    booking: {
      bookNow: 'Book Now',
      selectTime: 'Select Time',
      selectService: 'Select Service',
      confirmBooking: 'Confirm Booking',
      payDeposit: 'Pay Deposit',
    },
  };
}

// Booking-specific configuration helpers
export function getBookingConfig() {
  const config = getBusinessConfig();
  
  return {
    // Business hours by region
    businessHours: {
      start: config.region === 'swiss' || config.region === 'german' ? '09:00' : '09:00',
      end: config.region === 'swiss' || config.region === 'german' ? '18:00' : '17:00',
      workDays: [1, 2, 3, 4, 5], // Monday to Friday
    },
    // Booking rules
    minAdvanceBooking: 24, // 24 hours advance booking
    maxAdvanceBooking: config.region === 'swiss' ? 90 : 60, // days
    slotDuration: 30, // minutes
    bufferTime: 15, // minutes between appointments
    // Deposit rules
    requireDeposit: true,
    depositPercentage: 0.5, // 50% deposit
    cancellationPolicy: config.region === 'swiss' || config.region === 'german' ? 
      '24 hours advance notice required' : 
      '24 hours advance notice required',
  };
}

export function getServiceCategories() {
  const config = getBusinessConfig();
  
  // Default service categories - can be customized per business
  return {
    beauty: {
      name: config.region === 'swiss' || config.region === 'german' ? 'Schönheit' : 'Beauty',
      services: ['haircut', 'massage', 'facial', 'manicure'],
    },
    health: {
      name: config.region === 'swiss' || config.region === 'german' ? 'Gesundheit' : 'Health',
      services: ['consultation', 'therapy', 'checkup', 'treatment'],
    },
    professional: {
      name: config.region === 'swiss' || config.region === 'german' ? 'Professionell' : 'Professional',
      services: ['consultation', 'meeting', 'interview', 'coaching'],
    },
  };
}

export function getTimeSlotConfig() {
  const config = getBusinessConfig();
  
  return {
    timeZone: config.region === 'swiss' ? 'Europe/Zurich' :
              config.region === 'german' ? 'Europe/Berlin' :
              'America/New_York',
    dateFormat: config.region === 'swiss' || config.region === 'german' ? 'dd.MM.yyyy' : 'MM/dd/yyyy',
    timeFormat: config.region === 'swiss' || config.region === 'german' ? 'HH:mm' : 'hh:mm A',
    firstDayOfWeek: config.region === 'swiss' || config.region === 'german' ? 1 : 0, // Monday vs Sunday
  };
}