import { UserRole, Organ, Donor, Receiver, Doctor } from '../types';

// Mock donors
export const donors: Donor[] = [
  {
    id: 'd1',
    name: 'John Smith',
    email: 'john@example.com',
    password: 'password123',
    role: UserRole.DONOR,
    age: 35,
    contactInfo: '(555) 123-4567',
    organsToDonatе: [Organ.KIDNEY, Organ.LIVER],
    donationHistory: [
      {
        id: 'dh1',
        organType: Organ.KIDNEY,
        date: '2023-05-15',
        receiverId: 'r1',
        status: 'completed',
      },
    ],
  },
  {
    id: 'd2',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    password: 'password123',
    role: UserRole.DONOR,
    age: 42,
    contactInfo: '(555) 987-6543',
    organsToDonatе: [Organ.LUNG, Organ.CORNEA],
    donationHistory: [],
  },
  {
    id: 'd3',
    name: 'Michael Davis',
    email: 'michael@example.com',
    password: 'password123',
    role: UserRole.DONOR,
    age: 28,
    contactInfo: '(555) 246-8101',
    organsToDonatе: [Organ.HEART],
    donationHistory: [],
  },
];

// Mock receivers
export const receivers: Receiver[] = [
  {
    id: 'r1',
    name: 'Emma Wilson',
    email: 'emma@example.com',
    password: 'password123',
    role: UserRole.RECEIVER,
    age: 39,
    contactInfo: '(555) 222-3333',
    organsNeeded: [Organ.KIDNEY],
    medicalCondition: 'Chronic kidney disease',
    status: 'transplanted',
  },
  {
    id: 'r2',
    name: 'Robert Brown',
    email: 'robert@example.com',
    password: 'password123',
    role: UserRole.RECEIVER,
    age: 51,
    contactInfo: '(555) 444-5555',
    organsNeeded: [Organ.LIVER],
    medicalCondition: 'Cirrhosis',
    status: 'waiting',
  },
  {
    id: 'r3',
    name: 'Jennifer Garcia',
    email: 'jennifer@example.com',
    password: 'password123',
    role: UserRole.RECEIVER,
    age: 32,
    contactInfo: '(555) 666-7777',
    organsNeeded: [Organ.HEART],
    medicalCondition: 'Congenital heart disease',
    status: 'waiting',
  },
];

// Mock doctors
export const doctors: Doctor[] = [
  {
    id: 'doc1',
    name: 'Dr. Alan Chen',
    email: 'dr.chen@example.com',
    password: 'password123',
    role: UserRole.DOCTOR,
    age: 45,
    contactInfo: '(555) 888-9999',
    specialization: 'Transplant Surgery',
    licenseNumber: 'MD12345',
    affiliation: 'City General Hospital',
    approvals: [
      {
        id: 'ap1',
        donorId: 'd1',
        receiverId: 'r1',
        organType: Organ.KIDNEY,
        date: '2023-05-10',
        status: 'approved',
      },
    ],
  },
  {
    id: 'doc2',
    name: 'Dr. Linda Murphy',
    email: 'dr.murphy@example.com',
    password: 'password123',
    role: UserRole.DOCTOR,
    age: 53,
    contactInfo: '(555) 111-0000',
    specialization: 'Nephrology',
    licenseNumber: 'MD67890',
    affiliation: 'University Medical Center',
    approvals: [],
  },
];

// All users combined
export const allUsers = [...donors, ...receivers, ...doctors];

// Find user by email and password (for mock login)
export const findUser = (email: string, password: string) => {
  return allUsers.find(user => user.email === email && user.password === password);
};

// Get user by ID
export const getUserById = (id: string) => {
  return allUsers.find(user => user.id === id);
};

// Get donors for connection page
export const getDonors = () => donors;

// Get receivers for connection page
export const getReceivers = () => receivers;