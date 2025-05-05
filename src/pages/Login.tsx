// // import React, { useState } from 'react';
// // import { useNavigate, Link } from 'react-router-dom';
// // import { useAuth } from '../context/AuthContext';
// // import { UserRole } from '../types';
// // import { Heart, User, Stethoscope } from 'lucide-react';

// // const Login: React.FC = () => {
// //   const [email, setEmail] = useState('');
// //   const [password, setPassword] = useState('');
// //   const [role, setRole] = useState<UserRole>(UserRole.DONOR);
// //   const [error, setError] = useState('');
// //   const { login } = useAuth();
// //   const navigate = useNavigate();

// //   const handleSubmit = (e: React.FormEvent) => {
// //     e.preventDefault();
// //     setError('');
    
// //     if (!email || !password) {
// //       setError('Please fill in all fields');
// //       return;
// //     }
    
// //     const success = login(email, password);
    
// //     if (success) {
// //       switch (role) {
// //         case UserRole.DONOR:
// //           navigate('/donor-profile');
// //           break;
// //         case UserRole.RECEIVER:
// //           navigate('/receiver-profile');
// //           break;
// //         case UserRole.DOCTOR:
// //           navigate('/doctor-profile');
// //           break;
// //         default:
// //           navigate('/');
// //       }
// //     } else {
// //       setError('Invalid email or password');
// //     }
// //   };

// //   // Demo credentials for quick login
// //   const demoCredentials = {
// //     [UserRole.DONOR]: { email: 'john@example.com', password: 'password123' },
// //     [UserRole.RECEIVER]: { email: 'emma@example.com', password: 'password123' },
// //     [UserRole.DOCTOR]: { email: 'dr.chen@example.com', password: 'password123' },
// //   };

// //   const handleQuickLogin = () => {
// //     const { email, password } = demoCredentials[role];
// //     setEmail(email);
// //     setPassword(password);
// //   };

// //   return (
// //     <div className="min-h-screen pt-20 pb-12 flex flex-col items-center bg-gray-50">
// //       <div className="max-w-md w-full mx-auto mt-8 bg-white rounded-lg shadow-md overflow-hidden">
// //         <div className="px-6 py-8">
// //           <div className="text-center mb-8">
// //             <h2 className="text-3xl font-bold text-gray-900">Sign In</h2>
// //             <p className="mt-2 text-gray-600">Access your LifeShare account</p>
// //           </div>

// //           {/* Role Selector */}
// //           <div className="flex justify-center mb-6">
// //             <div className="flex p-1 space-x-1 bg-gray-100 rounded-xl">
// //               <button
// //                 onClick={() => setRole(UserRole.DONOR)}
// //                 className={`flex items-center px-4 py-2 text-sm rounded-lg transition-colors duration-300 ${
// //                   role === UserRole.DONOR
// //                     ? 'bg-[rgb(22,163,73)] text-white'
// //                     : 'text-gray-600 hover:text-gray-900'
// //                 }`}
// //               >
// //                 <Heart className="h-4 w-4 mr-2" />
// //                 Donor
// //               </button>
// //               <button
// //                 onClick={() => setRole(UserRole.RECEIVER)}
// //                 className={`flex items-center px-4 py-2 text-sm rounded-lg transition-colors duration-300 ${
// //                   role === UserRole.RECEIVER
// //                     ? 'bg-[rgb(22,163,73)] text-white'
// //                     : 'text-gray-600 hover:text-gray-900'
// //                 }`}
// //               >
// //                 <User className="h-4 w-4 mr-2" />
// //                 Receiver
// //               </button>
// //               <button
// //                 onClick={() => setRole(UserRole.DOCTOR)}
// //                 className={`flex items-center px-4 py-2 text-sm rounded-lg transition-colors duration-300 ${
// //                   role === UserRole.DOCTOR
// //                     ? 'bg-[rgb(22,163,73)] text-white'
// //                     : 'text-gray-600 hover:text-gray-900'
// //                 }`}
// //               >
// //                 <Stethoscope className="h-4 w-4 mr-2" />
// //                 Doctor
// //               </button>
// //             </div>
// //           </div>

// //           {error && (
// //             <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4 text-sm">
// //               {error}
// //             </div>
// //           )}

// //           <form onSubmit={handleSubmit}>
// //             <div className="mb-4">
// //               <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
// //                 Email
// //               </label>
// //               <input
// //                 id="email"
// //                 type="email"
// //                 value={email}
// //                 onChange={(e) => setEmail(e.target.value)}
// //                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(22,163,73)] focus:border-transparent"
// //                 placeholder="Enter your email"
// //               />
// //             </div>
            
// //             <div className="mb-6">
// //               <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
// //                 Password
// //               </label>
// //               <input
// //                 id="password"
// //                 type="password"
// //                 value={password}
// //                 onChange={(e) => setPassword(e.target.value)}
// //                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(22,163,73)] focus:border-transparent"
// //                 placeholder="Enter your password"
// //               />
// //             </div>
            
// //             <button
// //               type="submit"
// //               className="w-full bg-[rgb(22,163,73)] hover:bg-[rgb(18,138,62)] text-white py-2 rounded-md transition-colors duration-300"
// //             >
// //               Sign In
// //             </button>
// //           </form>
          
// //           <div className="mt-4">
// //             <button
// //               onClick={handleQuickLogin}
// //               className="w-full text-[rgb(22,163,73)] text-sm hover:underline"
// //             >
// //               Use demo credentials
// //             </button>
// //           </div>
          
// //           <div className="mt-6 text-center">
// //             <p className="text-sm text-gray-600">
// //               Don't have an account?{' '}
// //               <Link to="/signup" className="text-[rgb(22,163,73)] hover:underline">
// //                 Sign Up
// //               </Link>
// //             </p>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Login;



// // import React, { useState } from 'react';
// // import { useNavigate, Link } from 'react-router-dom';
// // import { UserRole } from '../types';
// // import { Heart, User, Stethoscope } from 'lucide-react';

// // import { auth, db } from '../../firebase'; // Adjust your firebase imports
// // import { signInWithEmailAndPassword } from 'firebase/auth';
// // import { doc, getDoc } from 'firebase/firestore';

// // const Login: React.FC = () => {
// //   const [email, setEmail] = useState('');
// //   const [password, setPassword] = useState('');
// //   const [role, setRole] = useState<UserRole>(UserRole.DONOR);
// //   const [error, setError] = useState('');
// //   const [loading, setLoading] = useState(false);
// //   const navigate = useNavigate();

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     setError('');

// //     if (!email || !password) {
// //       setError('Please fill in all fields');
// //       return;
// //     }

// //     setLoading(true);

// //     try {
// //       // 1. Sign in with Firebase Auth
// //       const userCredential = await signInWithEmailAndPassword(auth, email, password);
// //       const firebaseUser = userCredential.user;
// //       const uid = firebaseUser.uid;

// //       // 2. Fetch user document from Firestore
// //       const userDocRef = doc(db, 'users', uid);
// //       const userDocSnap = await getDoc(userDocRef);

// //       if (!userDocSnap.exists()) {
// //         setError('User profile not found. Please contact support.');
// //         setLoading(false);
// //         return;
// //       }

// //       const userData = userDocSnap.data();

// //       // 3. Check if Firestore user role matches selected role (optional)
// //       if (userData.role && userData.role !== role) {
// //         // Optionally warn user or just redirect based on Firestore role instead of selected
// //         setError(
// //           `Selected role "${role}" does not match your registered role "${userData.role}". Redirecting accordingly...`
// //         );
// //         setTimeout(() => {
// //           navigateToRoleProfile(userData.role);
// //         }, 2500);
// //         setLoading(false);
// //         return;
// //       }

// //       // 4. Navigate to the profile page based on role from Firestore or selected role
// //       navigateToRoleProfile(userData.role || role);
// //     } catch (err: any) {
// //       console.error('Login failed:', err);
// //       if (err.code === 'auth/user-not-found') {
// //         setError('User not found.');
// //       } else if (err.code === 'auth/wrong-password') {
// //         setError('Incorrect password.');
// //       } else if (err.code === 'auth/invalid-email') {
// //         setError('Invalid email address.');
// //       } else {
// //         setError('Failed to sign in. Please try again.');
// //       }
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const navigateToRoleProfile = (userRole: UserRole) => {
// //     switch (userRole) {
// //       case UserRole.DONOR:
// //         navigate('/donor-profile');
// //         break;
// //       case UserRole.RECEIVER:
// //         navigate('/receiver-profile');
// //         break;
// //       case UserRole.DOCTOR:
// //         navigate('/doctor-profile');
// //         break;
// //       default:
// //         navigate('/');
// //     }
// //   };

// //   // Demo credentials for quick login
// //   const demoCredentials = {
// //     [UserRole.DONOR]: { email: 'john@example.com', password: 'password123' },
// //     [UserRole.RECEIVER]: { email: 'emma@example.com', password: 'password123' },
// //     [UserRole.DOCTOR]: { email: 'dr.chen@example.com', password: 'password123' },
// //   };

// //   const handleQuickLogin = () => {
// //     const { email, password } = demoCredentials[role];
// //     setEmail(email);
// //     setPassword(password);
// //   };

// //   return (
// //     <div className="min-h-screen pt-20 pb-12 flex flex-col items-center bg-gray-50">
// //       <div className="max-w-md w-full mx-auto mt-8 bg-white rounded-lg shadow-md overflow-hidden">
// //         <div className="px-6 py-8">
// //           <div className="text-center mb-8">
// //             <h2 className="text-3xl font-bold text-gray-900">Sign In</h2>
// //             <p className="mt-2 text-gray-600">Access your LifeShare account</p>
// //           </div>

// //           {/* Role Selector */}
// //           <div className="flex justify-center mb-6">
// //             <div className="flex p-1 space-x-1 bg-gray-100 rounded-xl">
// //               <button
// //                 type="button"
// //                 onClick={() => setRole(UserRole.DONOR)}
// //                 className={`flex items-center px-4 py-2 text-sm rounded-lg transition-colors duration-300 ${
// //                   role === UserRole.DONOR
// //                     ? 'bg-[rgb(22,163,73)] text-white'
// //                     : 'text-gray-600 hover:text-gray-900'
// //                 }`}
// //               >
// //                 <Heart className="h-4 w-4 mr-2" />
// //                 Donor
// //               </button>
// //               <button
// //                 type="button"
// //                 onClick={() => setRole(UserRole.RECEIVER)}
// //                 className={`flex items-center px-4 py-2 text-sm rounded-lg transition-colors duration-300 ${
// //                   role === UserRole.RECEIVER
// //                     ? 'bg-[rgb(22,163,73)] text-white'
// //                     : 'text-gray-600 hover:text-gray-900'
// //                 }`}
// //               >
// //                 <User className="h-4 w-4 mr-2" />
// //                 Receiver
// //               </button>
// //               <button
// //                 type="button"
// //                 onClick={() => setRole(UserRole.DOCTOR)}
// //                 className={`flex items-center px-4 py-2 text-sm rounded-lg transition-colors duration-300 ${
// //                   role === UserRole.DOCTOR
// //                     ? 'bg-[rgb(22,163,73)] text-white'
// //                     : 'text-gray-600 hover:text-gray-900'
// //                 }`}
// //               >
// //                 <Stethoscope className="h-4 w-4 mr-2" />
// //                 Doctor
// //               </button>
// //             </div>
// //           </div>

// //           {error && (
// //             <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4 text-sm">
// //               {error}
// //             </div>
// //           )}

// //           <form onSubmit={handleSubmit}>
// //             <div className="mb-4">
// //               <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
// //                 Email
// //               </label>
// //               <input
// //                 id="email"
// //                 type="email"
// //                 value={email}
// //                 onChange={(e) => setEmail(e.target.value)}
// //                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(22,163,73)] focus:border-transparent"
// //                 placeholder="Enter your email"
// //               />
// //             </div>

// //             <div className="mb-6">
// //               <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
// //                 Password
// //               </label>
// //               <input
// //                 id="password"
// //                 type="password"
// //                 value={password}
// //                 onChange={(e) => setPassword(e.target.value)}
// //                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(22,163,73)] focus:border-transparent"
// //                 placeholder="Enter your password"
// //               />
// //             </div>

// //             <button
// //               type="submit"
// //               disabled={loading}
// //               className="w-full bg-[rgb(22,163,73)] hover:bg-[rgb(18,138,62)] text-white py-2 rounded-md transition-colors duration-300 disabled:opacity-50"
// //             >
// //               {loading ? 'Signing In...' : 'Sign In'}
// //             </button>
// //           </form>

// //           <div className="mt-4">
// //             <button
// //               type="button"
// //               onClick={handleQuickLogin}
// //               className="w-full text-[rgb(22,163,73)] text-sm hover:underline"
// //             >
// //               Use demo credentials
// //             </button>
// //           </div>

// //           <div className="mt-6 text-center">
// //             <p className="text-sm text-gray-600">
// //               Don't have an account?{' '}
// //               <Link to="/signup" className="text-[rgb(22,163,73)] hover:underline">
// //                 Sign Up
// //               </Link>
// //             </p>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Login;


// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { UserRole } from '../types';
// import { Heart, User, Stethoscope } from 'lucide-react';

// import { auth, db } from '../../firebase'; // Make sure your firebase config exports these
// import { signInWithEmailAndPassword } from 'firebase/auth';
// import { doc, getDoc } from 'firebase/firestore';

// const Login: React.FC = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [role, setRole] = useState<UserRole>(UserRole.DONOR);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');
//     console.log('Login handleSubmit started');

//     if (!email || !password) {
//       setError('Please fill in all fields');
//       return;
//     }

//     setLoading(true);

//     try {
//       // Sign in with Firebase Auth
//       const userCredential = await signInWithEmailAndPassword(auth, email, password);
//       console.log('Firebase auth success, UID:', userCredential.user.uid);

//       // Fetch user document from Firestore
//       const userDocRef = doc(db, 'users', userCredential.user.uid);
//       const userDocSnap = await getDoc(userDocRef);

//       if (!userDocSnap.exists()) {
//         setError('User profile not found. Please contact support.');
//         setLoading(false);
//         return;
//       }

//       const userData = userDocSnap.data();
//       console.log('User role from Firestore:', userData.role);

//       // Redirect to profile page based on Firestore role
//       switch (userData.role) {
//         case UserRole.DONOR:
//           console.log('Navigating to /donor-profile');
//           navigate('/donor-profile');
//           break;
//         case UserRole.RECEIVER:
//           console.log('Navigating to /receiver-profile');
//           navigate('/receiver-profile');
//           break;
//         case UserRole.DOCTOR:
//           console.log('Navigating to /doctor-profile');
//           navigate('/doctor-profile');
//           break;
//         default:
//           console.warn('User role unknown, navigating to /');
//           navigate('/');
//       }
//     } catch (err: any) {
//       console.error('Login error:', err);
//       if (err.code === 'auth/user-not-found') {
//         setError('User not found.');
//       } else if (err.code === 'auth/wrong-password') {
//         setError('Incorrect password.');
//       } else if (err.code === 'auth/invalid-email') {
//         setError('Invalid email address.');
//       } else {
//         setError('Failed to sign in. Please try again.');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Demo credentials for quick login
//   const demoCredentials = {
//     [UserRole.DONOR]: { email: 'john@example.com', password: 'password123' },
//     [UserRole.RECEIVER]: { email: 'emma@example.com', password: 'password123' },
//     [UserRole.DOCTOR]: { email: 'dr.chen@example.com', password: 'password123' },
//   };

//   const handleQuickLogin = () => {
//     const { email, password } = demoCredentials[role];
//     setEmail(email);
//     setPassword(password);
//   };

//   return (
//     <div className="min-h-screen pt-20 pb-12 flex flex-col items-center bg-gray-50">
//       <div className="max-w-md w-full mx-auto mt-8 bg-white rounded-lg shadow-md overflow-hidden">
//         <div className="px-6 py-8">
//           <div className="text-center mb-8">
//             <h2 className="text-3xl font-bold text-gray-900">Sign In</h2>
//             <p className="mt-2 text-gray-600">Access your LifeShare account</p>
//           </div>

//           {/* Role Selector */}
//           <div className="flex justify-center mb-6">
//             <div className="flex p-1 space-x-1 bg-gray-100 rounded-xl">
//               <button
//                 type="button"
//                 onClick={() => setRole(UserRole.DONOR)}
//                 className={`flex items-center px-4 py-2 text-sm rounded-lg transition-colors duration-300 ${
//                   role === UserRole.DONOR
//                     ? 'bg-[rgb(22,163,73)] text-white'
//                     : 'text-gray-600 hover:text-gray-900'
//                 }`}
//               >
//                 <Heart className="h-4 w-4 mr-2" />
//                 Donor
//               </button>
//               <button
//                 type="button"
//                 onClick={() => setRole(UserRole.RECEIVER)}
//                 className={`flex items-center px-4 py-2 text-sm rounded-lg transition-colors duration-300 ${
//                   role === UserRole.RECEIVER
//                     ? 'bg-[rgb(22,163,73)] text-white'
//                     : 'text-gray-600 hover:text-gray-900'
//                 }`}
//               >
//                 <User className="h-4 w-4 mr-2" />
//                 Receiver
//               </button>
//               <button
//                 type="button"
//                 onClick={() => setRole(UserRole.DOCTOR)}
//                 className={`flex items-center px-4 py-2 text-sm rounded-lg transition-colors duration-300 ${
//                   role === UserRole.DOCTOR
//                     ? 'bg-[rgb(22,163,73)] text-white'
//                     : 'text-gray-600 hover:text-gray-900'
//                 }`}
//               >
//                 <Stethoscope className="h-4 w-4 mr-2" />
//                 Doctor
//               </button>
//             </div>
//           </div>

//           {error && (
//             <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4 text-sm">
//               {error}
//             </div>
//           )}

//           <form onSubmit={handleSubmit}>
//             <div className="mb-4">
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
//                 Email
//               </label>
//               <input
//                 id="email"
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(22,163,73)] focus:border-transparent"
//                 placeholder="Enter your email"
//               />
//             </div>

//             <div className="mb-6">
//               <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
//                 Password
//               </label>
//               <input
//                 id="password"
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(22,163,73)] focus:border-transparent"
//                 placeholder="Enter your password"
//               />
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-[rgb(22,163,73)] hover:bg-[rgb(18,138,62)] text-white py-2 rounded-md transition-colors duration-300 disabled:opacity-50"
//             >
//               {loading ? 'Signing In...' : 'Sign In'}
//             </button>
//           </form>

//           <div className="mt-4">
//             <button
//               type="button"
//               onClick={handleQuickLogin}
//               className="w-full text-[rgb(22,163,73)] text-sm hover:underline"
//             >
//               Use demo credentials
//             </button>
//           </div>

//           <div className="mt-6 text-center">
//             <p className="text-sm text-gray-600">
//               Don't have an account?{' '}
//               <Link to="/signup" className="text-[rgb(22,163,73)] hover:underline">
//                 Sign Up
//               </Link>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;


// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { UserRole } from '../types';
// import { Heart, User, Stethoscope } from 'lucide-react';

// import { auth, db } from '../../firebase';
// import { signInWithEmailAndPassword } from 'firebase/auth';
// import { doc, getDoc } from 'firebase/firestore';

// const Login: React.FC = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [role, setRole] = useState<UserRole>(UserRole.DONOR);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const navigateToRoleProfile = (userRole: UserRole) => {
//     switch (userRole) {
//       case UserRole.DONOR:
//         navigate('/donor-profile');
//         break;
//       case UserRole.RECEIVER:
//         navigate('/receiver-profile');
//         break;
//       case UserRole.DOCTOR:
//         navigate('/doctor-profile');
//         break;
//       default:
//         navigate('/');
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');

//     if (!email || !password) {
//       setError('Please fill in all fields');
//       return;
//     }

//     setLoading(true);

//     try {
//       const userCredential = await signInWithEmailAndPassword(auth, email, password);
//       const uid = userCredential.user.uid;

//       const userDocSnap = await getDoc(doc(db, 'users', uid));

//       if (!userDocSnap.exists()) {
//         setError('User profile not found. Please contact support.');
//         setLoading(false);
//         return;
//       }

//       const userData = userDocSnap.data();

//       if (userData.role && userData.role !== role) {
//         setError(
//           `Selected role "${role}" does not match your registered role "${userData.role}". Redirecting accordingly...`
//         );
//         // setTimeout(() => {
//         //   navigateToRoleProfile(userData.role);
//         // }, 2500);
//         setLoading(false);
//         return;
//       }

//       navigateToRoleProfile(userData.role);
//     } catch (err: any) {
//       if (err.code === 'auth/user-not-found') {
//         setError('User not found.');
//       } else if (err.code === 'auth/wrong-password') {
//         setError('Incorrect password.');
//       } else if (err.code === 'auth/invalid-email') {
//         setError('Invalid email address.');
//       } else {
//         setError('Failed to sign in. Please try again.');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const demoCredentials = {
//     [UserRole.DONOR]: { email: 'john@example.com', password: 'password123' },
//     [UserRole.RECEIVER]: { email: 'emma@example.com', password: 'password123' },
//     [UserRole.DOCTOR]: { email: 'dr.chen@example.com', password: 'password123' },
//   };

//   const handleQuickLogin = () => {
//     const { email, password } = demoCredentials[role];
//     setEmail(email);
//     setPassword(password);
//   };

//   return (
//     <div className="min-h-screen pt-20 pb-12 flex flex-col items-center bg-gray-50">
//       <div className="max-w-md w-full mx-auto mt-8 bg-white rounded-lg shadow-md overflow-hidden">
//         <div className="px-6 py-8">
//           <div className="text-center mb-8">
//             <h2 className="text-3xl font-bold text-gray-900">Sign In</h2>
//             <p className="mt-2 text-gray-600">Access your LifeShare account</p>
//           </div>

//           {/* Role Selector */}
//           <div className="flex justify-center mb-6">
//             <div className="flex p-1 space-x-1 bg-gray-100 rounded-xl">
//               <button
//                 type="button"
//                 onClick={() => setRole(UserRole.DONOR)}
//                 className={`flex items-center px-4 py-2 text-sm rounded-lg transition-colors duration-300 ${
//                   role === UserRole.DONOR
//                     ? 'bg-[rgb(22,163,73)] text-white'
//                     : 'text-gray-600 hover:text-gray-900'
//                 }`}
//               >
//                 <Heart className="h-4 w-4 mr-2" />
//                 Donor
//               </button>
//               <button
//                 type="button"
//                 onClick={() => setRole(UserRole.RECEIVER)}
//                 className={`flex items-center px-4 py-2 text-sm rounded-lg transition-colors duration-300 ${
//                   role === UserRole.RECEIVER
//                     ? 'bg-[rgb(22,163,73)] text-white'
//                     : 'text-gray-600 hover:text-gray-900'
//                 }`}
//               >
//                 <User className="h-4 w-4 mr-2" />
//                 Receiver
//               </button>
//               <button
//                 type="button"
//                 onClick={() => setRole(UserRole.DOCTOR)}
//                 className={`flex items-center px-4 py-2 text-sm rounded-lg transition-colors duration-300 ${
//                   role === UserRole.DOCTOR
//                     ? 'bg-[rgb(22,163,73)] text-white'
//                     : 'text-gray-600 hover:text-gray-900'
//                 }`}
//               >
//                 <Stethoscope className="h-4 w-4 mr-2" />
//                 Doctor
//               </button>
//             </div>
//           </div>

//           {error && (
//             <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4 text-sm">
//               {error}
//             </div>
//           )}

//           <form onSubmit={handleSubmit}>
//             <div className="mb-4">
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
//                 Email
//               </label>
//               <input
//                 id="email"
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(22,163,73)] focus:border-transparent"
//                 placeholder="Enter your email"
//               />
//             </div>

//             <div className="mb-6">
//               <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
//                 Password
//               </label>
//               <input
//                 id="password"
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(22,163,73)] focus:border-transparent"
//                 placeholder="Enter your password"
//               />
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-[rgb(22,163,73)] hover:bg-[rgb(18,138,62)] text-white py-2 rounded-md transition-colors duration-300 disabled:opacity-50"
//             >
//               {loading ? 'Signing In...' : 'Sign In'}
//             </button>
//           </form>

//           <div className="mt-4">
//             <button
//               type="button"
//               onClick={handleQuickLogin}
//               className="w-full text-[rgb(22,163,73)] text-sm hover:underline"
//             >
//               Use demo credentials
//             </button>
//           </div>

//           <div className="mt-6 text-center">
//             <p className="text-sm text-gray-600">
//               Don't have an account?{' '}
//               <Link to="/signup" className="text-[rgb(22,163,73)] hover:underline">
//                 Sign Up
//               </Link>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;


import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserRole } from '../types';
import { Heart, User, Stethoscope } from 'lucide-react';

import { auth, db } from '../../firebase';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>(UserRole.DONOR);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const navigateToRoleProfile = (userRole: UserRole) => {
    switch (userRole) {
      case UserRole.DONOR:
        navigate('/donor-profile');
        break;
      case UserRole.RECEIVER:
        navigate('/receiver-profile');
        break;
      case UserRole.DOCTOR:
        navigate('/doctor-profile');
        break;
      default:
        navigate('/');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);

    try {
      // 1. Sign in with Firebase Auth
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      // 2. Fetch user document from Firestore
      const userDocSnap = await getDoc(doc(db, 'users', uid));

      if (!userDocSnap.exists()) {
        setError('User profile not found. Please contact support.');
        // Sign out immediately to clear auth state
        await signOut(auth);
        setLoading(false);
        return;
      }

      const userData = userDocSnap.data();

      // 3. Check if Firestore user role matches selected role
      if (userData.role && userData.role !== role) {
        // Sign out immediately to prevent staying logged in
        await signOut(auth);

        setError(
          `Selected role "${role}" does not match your registered role "${userData.role}". Please select the correct role to login.`
        );
        setLoading(false);
        return;
      }

      // 4. Navigate to the profile page based on user role
      navigateToRoleProfile(userData.role);
    } catch (err: any) {
      if (err.code === 'auth/user-not-found') {
        setError('User not found.');
      } else if (err.code === 'auth/wrong-password') {
        setError('Incorrect password.');
      } else if (err.code === 'auth/invalid-email') {
        setError('Invalid email address.');
      } else {
        setError('Failed to sign in. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Demo credentials for quick login
  const demoCredentials = {
    [UserRole.DONOR]: { email: 'john@example.com', password: 'password123' },
    [UserRole.RECEIVER]: { email: 'emma@example.com', password: 'password123' },
    [UserRole.DOCTOR]: { email: 'dr.chen@example.com', password: 'password123' },
  };

  const handleQuickLogin = () => {
    const { email, password } = demoCredentials[role];
    setEmail(email);
    setPassword(password);
  };

  return (
    <div className="min-h-screen pt-20 pb-12 flex flex-col items-center bg-gray-50">
      <div className="max-w-md w-full mx-auto mt-8 bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Sign In</h2>
            <p className="mt-2 text-gray-600">Access your LifeShare account</p>
          </div>

          {/* Role Selector */}
          <div className="flex justify-center mb-6">
            <div className="flex p-1 space-x-1 bg-gray-100 rounded-xl">
              <button
                type="button"
                onClick={() => setRole(UserRole.DONOR)}
                className={`flex items-center px-4 py-2 text-sm rounded-lg transition-colors duration-300 ${
                  role === UserRole.DONOR
                    ? 'bg-[rgb(22,163,73)] text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Heart className="h-4 w-4 mr-2" />
                Donor
              </button>
              <button
                type="button"
                onClick={() => setRole(UserRole.RECEIVER)}
                className={`flex items-center px-4 py-2 text-sm rounded-lg transition-colors duration-300 ${
                  role === UserRole.RECEIVER
                    ? 'bg-[rgb(22,163,73)] text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <User className="h-4 w-4 mr-2" />
                Receiver
              </button>
              <button
                type="button"
                onClick={() => setRole(UserRole.DOCTOR)}
                className={`flex items-center px-4 py-2 text-sm rounded-lg transition-colors duration-300 ${
                  role === UserRole.DOCTOR
                    ? 'bg-[rgb(22,163,73)] text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Stethoscope className="h-4 w-4 mr-2" />
                Doctor
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(22,163,73)] focus:border-transparent"
                placeholder="Enter your email"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(22,163,73)] focus:border-transparent"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[rgb(22,163,73)] hover:bg-[rgb(18,138,62)] text-white py-2 rounded-md transition-colors duration-300 disabled:opacity-50"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-4">
            <button
              type="button"
              onClick={handleQuickLogin}
              className="w-full text-[rgb(22,163,73)] text-sm hover:underline"
            >
              Use demo credentials
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/signup" className="text-[rgb(22,163,73)] hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;