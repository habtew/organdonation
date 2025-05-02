export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  age: number;
  contactInfo: string;
}

export enum UserRole {
  DONOR = 'donor',
  RECEIVER = 'receiver',
  DOCTOR = 'doctor',
}

export interface Donor extends User {
  role: UserRole.DONOR;
  organsToDonatе: Organ[];
  donationHistory: DonationRecord[];
}

export interface Receiver extends User {
  role: UserRole.RECEIVER;
  organsNeeded: Organ[];
  medicalCondition: string;
  status: 'waiting' | 'matched' | 'transplanted';
}

export interface Doctor extends User {
  role: UserRole.DOCTOR;
  specialization: string;
  licenseNumber: string;
  affiliation: string;
  approvals: Approval[];
}

export enum Organ {
  KIDNEY = 'kidney',
  LIVER = 'liver',
  HEART = 'heart',
  LUNG = 'lung',
  PANCREAS = 'pancreas',
  CORNEA = 'cornea',
}

export interface DonationRecord {
  id: string;
  organType: Organ;
  date: string;
  receiverId?: string;
  status: 'pending' | 'approved' | 'completed' | 'rejected';
}

export interface Approval {
  id: string;
  donorId: string;
  receiverId: string;
  organType: Organ;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface ConnectionRequest {
  id: string;
  senderId: string;
  receiverId: string;
  message: string;
  date: string;
  status: 'pending' | 'accepted' | 'rejected';
}