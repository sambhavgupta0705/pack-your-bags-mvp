export type Provider = {
  name: string;
  price: number;
  rating: number;
  groupSize: number;
  startDates: string[];
};

export type Trek = {
  id: string;
  name: string;
  region: string;
  difficulty: 'Easy' | 'Moderate' | 'Difficult' | 'Expert';
  altitude: number; // feet
  duration: number; // days
  seasons: string[]; // 'Jan'...'Dec'
  popularity: number; // 0..100
  providers: Provider[];
};
