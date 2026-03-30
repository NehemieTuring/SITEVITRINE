/**
 * Global types for Win concept Industry.
 */

export type ServiceCategory = 'Music' | 'Video' | 'Management' | 'Training';

export interface BaseMetadata {
  id: string;
  title: string;
  category: ServiceCategory;
  description: string;
  image: string;
}

export interface TrainingCourse extends BaseMetadata {
  duration: string;
  price: string;
  icon?: any;
}

export interface PortfolioProject extends BaseMetadata {
  client: string;
  year: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}
