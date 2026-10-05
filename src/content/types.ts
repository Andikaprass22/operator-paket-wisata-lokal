export type ActivityType = "pantai" | "gunung" | "budaya" | "bahari" | "kuliner";

export type DurationBucket = "1hari" | "23hari" | "4hari+";

export interface Money {
  amount: number;
  currency: "IDR";
}

export interface ItineraryStop {
  time: string;
  title: string;
  detail: string;
}

export interface Package {
  slug: string;
  title: string;
  summary: string;
  destination: string;
  durationDays: number;
  durationLabel: string;
  price: Money;
  priceNote: string;
  activityTypes: ActivityType[];
  schedule: string[];
  meetingPoint: string;
  minParticipants: number;
  maxParticipants: number;
  seatsNote: string;
  heroImage: string;
  galleryImages: string[];
  highlights: string[];
  itinerary: ItineraryStop[];
  facilities: string[];
  included: string[];
  excluded: string[];
}

export interface GalleryItem {
  id: string;
  src: string;
  caption: string;
  alt: string;
}

export interface Review {
  id: string;
  name: string;
  origin: string;
  rating: number;
  text: string;
  tripLabel: string;
}

export interface OperatorProfile {
  name: string;
  role: string;
  bio: string;
  yearsExperience: number;
  languages: string[];
  photo: string;
  certifications: string[];
}

export interface TravelInfoBlock {
  id: string;
  title: string;
  icon: "plane" | "sun" | "bag" | "shield";
  body: string;
  bullets: string[];
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface SiteConfig {
  businessName: string;
  logoMark: string;
  tagline: string;
  heroHeadline: string;
  heroSubhead: string;
  closingHeadline: string;
  closingBody: string;
  region: string;
  whatsappNumber: string;
  email: string;
  phoneDisplay: string;
  address: string;
  socials: { label: string; href: string }[];
  nav: { label: string; href: string }[];
}
