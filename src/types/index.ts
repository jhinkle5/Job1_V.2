export type ServiceType = 
  | 'residential' 
  | 'commercial' 
  | 'kitchen' 
  | 'outdoor' 
  | 'other';

export interface ServiceItem {
  id: ServiceType;
  title: string;
  tagline: string;
  description: string;
  highlights: string[];
  features: {
    name: string;
    description: string;
  }[];
  specBadge: string;
  iconName: string;
}

export interface PortfolioProject {
  id: string;
  category: 'Kitchen Renovation' | 'Commercial Projects' | 'Decks & Exterior';
  title: string;
  location: string;
  completedYear: string;
  duration: string;
  description: string;
  scope: string[];
  materials: string[];
  highlightMetric: string;
  specs: {
    label: string;
    value: string;
  }[];
}

export interface EstimateFormData {
  fullName: string;
  email: string;
  phone: string;
  preferredContact: 'phone' | 'email' | 'text';
  projectLocation: string;
  serviceType: ServiceType;
  timeline: string;
  budgetRange: string;
  projectDetails: string;
  squareFootage?: string;
}
