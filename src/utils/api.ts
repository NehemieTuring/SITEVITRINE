/**
 * Mock API for Win concept Industry.
 * Simulates asynchronous data fetching.
 */

export interface Service {
  id: string;
  name: string;
  category: string;
  description: string;
}

export const fetchServices = async (): Promise<Service[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: '1', name: 'Studio Session', category: 'Music', description: 'Professional recording...' },
        { id: '2', name: 'Video Content', category: 'Video', description: 'Social media growth...' },
      ]);
    }, 1000);
  });
};

export const submitContact = async (data: any): Promise<boolean> => {
  console.log('API Submit:', data);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 1500);
  });
};
