export interface Experience {
  title: string;
  description: string;
  image: string;
}

export interface Review {
  name: string;
  avatarUrl: string;
  text: string;
  date: string;
  rating: number;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Location {
  name: string;
  distance: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  privacy: boolean;
}

export interface NewsletterData {
  email: string;
}
