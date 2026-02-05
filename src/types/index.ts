// User types
export interface User {
  id: string;
  name?: string;
  fullName?: string;
  email: string;
  phone?: string;
  birthDate?: string;
  role?: 'student' | 'parent' | 'teacher' | 'other';
  school?: string;
  luckyNumber?: string;
  createdAt?: string;
}

// Progress tracking
export interface Progress {
  chooseCareer: boolean;
  chooseMajor: boolean;
  chooseSchool: boolean;
  careerProgress?: number;
  majorProgress?: number;
  schoolProgress?: number;
}

// Career/Occupation types
export interface Career {
  id: string;
  name: string;
  field: string;
  description?: string;
}

// Major/Field of study types
export interface Major {
  id: string;
  name: string;
  category: string;
  schools?: School[];
}

// School/University types
export interface School {
  id: string;
  name: string;
  shortName?: string;
  majors: string[];
  boothNumber?: string;
  location?: string;
}

// Psychology survey types
export interface PsychologySurveyAnswer {
  questionId: number;
  answer: string | number;
}

export interface PsychologySurveyResult {
  userId: string;
  answers: PsychologySurveyAnswer[];
  score?: number;
  recommendation?: string;
  submittedAt: string;
}

// ONET Test types
export interface OnetQuestion {
  id: number;
  text: string;
  category: string;
}

export interface OnetResult {
  userId: string;
  answers: Record<number, number>;
  personalityType: string;
  recommendedCareers: Career[];
  submittedAt: string;
}

// Location/Map types
export interface Location {
  id: string;
  name: string;
  building?: string;
  room?: string;
  description?: string;
  distance?: string;
  walkTime?: string;
}

// Utility types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Auth types
export interface LoginCredentials {
  emailOrPhone: string;
  password: string;
}

export interface RegisterData {
  email: string;
  phone?: string;
  fullName: string;
  birthDate: string;
  password: string;
  confirmPassword: string;
}

// Navigation types
export interface MenuItem {
  id: string;
  label: string;
  icon: string;
  href: string;
  description?: string;
}
