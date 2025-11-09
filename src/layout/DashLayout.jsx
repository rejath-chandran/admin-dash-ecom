// import React, { useEffect, useState, useCallback } from "react";

// export default function DashboardLayout() {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [isDesktop, setIsDesktop] = useState(false);
//   const [darkMode, setDarkMode] = useState(false);

//   useEffect(() => {
//     const mq = window.matchMedia("(min-width: 1024px)");
//     const onChange = (e) => {
//       setIsDesktop(e.matches);
//       if (e.matches) {
//         setSidebarOpen(true);
//       } else {
//         setSidebarOpen(false);
//       }
//     };

//     setIsDesktop(mq.matches);
//     setSidebarOpen(mq.matches);

//     mq.addEventListener("change", onChange);
//     return () => mq.removeEventListener("change", onChange);
//   }, []);

//   const toggleSidebar = useCallback(() => {
//     setSidebarOpen((s) => !s);
//   }, []);

//   const toggleDarkMode = useCallback(() => {
//     setDarkMode((d) => !d);
//   }, []);

//   const handleNavClick = useCallback(() => {
//     if (!isDesktop) {
//       setSidebarOpen(false);
//     }
//   }, [isDesktop]);

//   const navItems = [
//     { name: "Dashboard", icon: dashboardIcon },
//     { name: "Orders", icon: ordersIcon },
//     { name: "Products", icon: productsIcon },
//     { name: "Customers", icon: customersIcon },
//     { name: "Analytics", icon: analyticsIcon },
//     { name: "Settings", icon: settingsIcon },
//   ];

//   return (
//     <div className={`min-h-screen transition-colors duration-300 ${
//       darkMode 
//         ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" 
//         : "bg-gradient-to-br from-orange-50 via-white to-orange-100"
//     }`}>
//       {/* Mobile overlay */}
//       {!isDesktop && sidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm transition-opacity duration-300"
//           onClick={() => setSidebarOpen(false)}
//           aria-hidden="true"
//         />
//       )}

//       <div className="max-w-full mx-auto p-2 sm:p-4 md:p-6 lg:p-8">
//         <div className="flex gap-0 lg:gap-4">
//           {/* Sidebar */}
//           <aside
//             aria-label="Sidebar"
//             className={`
//               fixed lg:sticky top-0 lg:top-6 z-50 h-screen lg:h-[calc(100vh-48px)]
//               transition-all duration-300 ease-in-out
//               ${!isDesktop && !sidebarOpen ? "-translate-x-full opacity-0" : "translate-x-0 opacity-100"}
//               ${isDesktop && sidebarOpen ? "w-64" : isDesktop && !sidebarOpen ? "w-16" : "w-72"}
//             `}
//           >
//             <div className={`h-full rounded-none lg:rounded-2xl overflow-hidden shadow-xl backdrop-blur-sm border-r lg:border flex flex-col ${
//               darkMode 
//                 ? "bg-gray-800 border-gray-700" 
//                 : "bg-white border-orange-100"
//             }`}>
//               {/* Header */}
//               <div className={`flex items-center justify-between px-4 py-5 border-b ${
//                 darkMode ? "border-gray-700" : "border-orange-50"
//               }`}>
//                 <div className="flex items-center gap-3 overflow-hidden">
//                   <div className="flex-shrink-0 flex items-center justify-center rounded-xl h-10 w-10 bg-gradient-to-br from-orange-500 to-amber-400 text-white font-bold shadow-md">
//                     A
//                   </div>
//                   <div className={`transition-all duration-300 ${isDesktop && !sidebarOpen ? "opacity-0 w-0" : "opacity-100"}`}>
//                     <h3 className={`text-lg font-semibold whitespace-nowrap ${
//                       darkMode ? "text-white" : "text-gray-800"
//                     }`}>Acme Commerce</h3>
//                     <p className={`text-xs whitespace-nowrap ${
//                       darkMode ? "text-gray-400" : "text-gray-500"
//                     }`}>Analytics & orders</p>
//                   </div>
//                 </div>

//                 {isDesktop && (
//                   <button
//                     onClick={toggleSidebar}
//                     aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
//                     className={`flex-shrink-0 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 transition-colors ${
//                       darkMode ? "hover:bg-gray-700" : "hover:bg-orange-50"
//                     }`}
//                   >
//                     <svg
//                       className={`h-5 w-5 transition-transform duration-300 ${!sidebarOpen ? "rotate-180" : "rotate-0"} ${
//                         darkMode ? "text-gray-300" : "text-gray-600"
//                       }`}
//                       viewBox="0 0 20 20"
//                       fill="currentColor"
//                     >
//                       <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 111.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
//                     </svg>
//                   </button>
//                 )}

//                 {!isDesktop && (
//                   <button
//                     onClick={() => setSidebarOpen(false)}
//                     aria-label="Close sidebar"
//                     className={`flex-shrink-0 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 transition-colors ${
//                       darkMode ? "hover:bg-gray-700" : "hover:bg-orange-50"
//                     }`}
//                   >
//                     <svg className={`h-5 w-5 ${darkMode ? "text-gray-300" : "text-gray-600"}`} viewBox="0 0 20 20" fill="currentColor">
//                       <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
//                     </svg>
//                   </button>
//                 )}
//               </div>

//               {/* Navigation */}
//               <nav className="mt-2 flex-1 overflow-auto px-3 py-2">
//                 <ul className="space-y-1">
//                   {navItems.map((item) => (
//                     <li key={item.name}>
//                       <a
//                         href="#"
//                         onClick={(e) => {
//                           e.preventDefault();
//                           handleNavClick();
//                         }}
//                         className={`group flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
//                           isDesktop && !sidebarOpen ? "justify-center" : ""
//                         } ${
//                           darkMode 
//                             ? "hover:bg-gray-700 text-gray-300" 
//                             : "hover:bg-orange-50 text-gray-700"
//                         }`}
//                       >
//                         <span className="h-5 w-5 flex items-center justify-center text-orange-500 transition-transform group-hover:scale-110">
//                           {item.icon()}
//                         </span>
//                         <span className={`text-sm font-medium transition-all duration-300 ${isDesktop && !sidebarOpen ? "opacity-0 w-0 overflow-hidden" : "opacity-100"}`}>
//                           {item.name}
//                         </span>
//                       </a>
//                     </li>
//                   ))}
//                 </ul>
//               </nav>

//               {/* Footer button */}
//               <div className={`px-3 py-4 border-t ${darkMode ? "border-gray-700" : "border-orange-50"}`}>
//                 <button className={`w-full inline-flex items-center ${isDesktop && !sidebarOpen ? "justify-center" : "justify-center gap-2"} rounded-lg px-3 py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-sm font-medium shadow-lg hover:shadow-xl hover:from-orange-600 hover:to-amber-600 transition-all duration-200 transform hover:scale-105`}>
//                   <span className="text-lg">+</span>
//                   {(isDesktop && sidebarOpen || !isDesktop) && <span>New</span>}
//                 </button>
//               </div>
//             </div>
//           </aside>

//           {/* Main content */}
//           <div className={`flex-1 w-full transition-all duration-300 ${isDesktop ? "ml-4" : "ml-0"}`}>
//             {/* Topbar */}
//             <div className="flex items-center justify-between mb-4 md:mb-6">
//               <div className="flex items-center gap-2 md:gap-4">
//                 {!isDesktop && (
//                   <button
//                     className={`p-2 rounded-lg shadow-md border transition-all duration-200 active:scale-95 ${
//                       darkMode 
//                         ? "bg-gray-800 border-gray-700 hover:bg-gray-700" 
//                         : "bg-white border-orange-100 hover:bg-orange-50"
//                     }`}
//                     onClick={() => setSidebarOpen(true)}
//                     aria-label="Open sidebar"
//                   >
//                     <svg className="h-5 w-5 text-orange-500" viewBox="0 0 20 20" fill="none" stroke="currentColor">
//                       <path d="M3 6h14M3 10h14M3 14h14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//                     </svg>
//                   </button>
//                 )}

//                 <h1 className={`text-xl md:text-2xl font-bold ${darkMode ? "text-white" : "text-gray-800"}`}>Dashboard</h1>
//                 <div className={`hidden md:flex items-center gap-2 px-3 py-1 rounded-full ${
//                   darkMode ? "bg-gray-800" : "bg-orange-50"
//                 }`}>
//                   <div className="h-2 w-2 bg-orange-500 rounded-full animate-pulse"></div>
//                   <span className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>Overview</span>
//                 </div>
//               </div>

//               <div className="flex items-center gap-2 md:gap-3">
//                 <div className={`hidden md:flex items-center rounded-lg border px-3 py-2 shadow-sm hover:shadow-md transition-shadow ${
//                   darkMode 
//                     ? "bg-gray-800 border-gray-700" 
//                     : "bg-white border-gray-200"
//                 }`}>
//                   <svg className={`h-5 w-5 mr-2 ${darkMode ? "text-gray-500" : "text-gray-400"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor">
//                     <circle cx="11" cy="11" r="8" strokeWidth="2" />
//                     <path d="M21 21l-4.35-4.35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//                   </svg>
//                   <input 
//                     className={`w-32 lg:w-52 outline-none text-sm bg-transparent ${
//                       darkMode ? "text-white placeholder-gray-500" : "text-gray-800 placeholder-gray-400"
//                     }`} 
//                     placeholder="Search orders, products" 
//                   />
//                 </div>

//                 <button 
//                   onClick={toggleDarkMode}
//                   className={`p-2 rounded-lg shadow-md border transition-all duration-200 hidden sm:block ${
//                     darkMode 
//                       ? "bg-gray-800 border-gray-700 hover:bg-gray-700" 
//                       : "bg-white border-gray-100 hover:bg-orange-50"
//                   }`}
//                 >
//                   {darkMode ? (
//                     <svg className="h-5 w-5 text-yellow-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
//                       <circle cx="12" cy="12" r="5" strokeWidth="2" />
//                       <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//                     </svg>
//                   ) : (
//                     <svg className="h-5 w-5 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
//                       <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//                     </svg>
//                   )}
//                 </button>

//                 <button className={`flex items-center gap-2 px-2 md:px-3 py-2 rounded-lg shadow-md border hover:shadow-lg transition-all duration-200 ${
//                   darkMode 
//                     ? "bg-gray-800 border-gray-700" 
//                     : "bg-white border-gray-100"
//                 }`}>
//                   <span className="h-7 w-7 md:h-8 md:w-8 rounded-full bg-gradient-to-br from-orange-500 to-amber-400 text-white flex items-center justify-center text-sm font-semibold shadow-md">U</span>
//                   <div className="hidden sm:block text-left">
//                     <div className={`text-sm font-medium ${darkMode ? "text-white" : "text-gray-800"}`}>Admin</div>
//                     <div className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Owner</div>
//                   </div>
//                 </button>
//               </div>
//             </div>

//             {/* Content grid */}
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
//               <div className="lg:col-span-2 space-y-4 md:space-y-6">
//                 {/* Cards */}
//                 <div className="grid grid-cols-2 gap-3 md:gap-6">
//                   {[
//                     { title: "Revenue", value: "$24.3k", trend: "+12.5%", icon: "💰" },
//                     { title: "Orders", value: "1,024", trend: "+8.2%", icon: "📦" },
//                   ].map((c) => (
//                     <div key={c.title} className={`group rounded-xl md:rounded-2xl p-4 md:p-5 shadow-md border hover:shadow-xl transition-all duration-300 cursor-pointer ${
//                       darkMode 
//                         ? "bg-gray-800 border-gray-700 hover:border-gray-600" 
//                         : "bg-white border-orange-50 hover:border-orange-200"
//                     }`}>
//                       <div className="flex flex-col gap-3">
//                         <div className="flex items-center justify-between">
//                           <div className={`text-xs font-medium uppercase tracking-wider ${
//                             darkMode ? "text-gray-400" : "text-gray-500"
//                           }`}>{c.title}</div>
//                           <div className="text-2xl">{c.icon}</div>
//                         </div>
//                         <div className="flex items-end justify-between">
//                           <div className={`text-2xl md:text-3xl font-bold ${
//                             darkMode ? "text-white" : "text-gray-800"
//                           }`}>{c.value}</div>
//                           <div className="flex items-center gap-1 text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">
//                             <svg className="h-3 w-3" viewBox="0 0 12 12" fill="currentColor">
//                               <path d="M6 2l4 4H2z" />
//                             </svg>
//                             {c.trend}
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>

//                 {/* Activity / Table */}
//                 <div className={`rounded-xl md:rounded-2xl p-4 md:p-6 shadow-md border hover:shadow-xl transition-shadow duration-300 ${
//                   darkMode 
//                     ? "bg-gray-800 border-gray-700" 
//                     : "bg-white border-orange-50"
//                 }`}>
//                   <div className="flex items-center justify-between mb-4">
//                     <h3 className={`text-base md:text-lg font-bold ${darkMode ? "text-white" : "text-gray-800"}`}>Recent Orders</h3>
//                     <button className="text-xs md:text-sm text-orange-600 hover:text-orange-700 font-medium">View all →</button>
//                   </div>
//                   <div className="overflow-x-auto -mx-4 md:mx-0">
//                     <table className="w-full text-xs md:text-sm text-left">
//                       <thead className={`text-xs uppercase border-b ${
//                         darkMode 
//                           ? "text-gray-400 border-gray-700" 
//                           : "text-gray-500 border-gray-100"
//                       }`}>
//                         <tr>
//                           <th className="p-3 font-semibold">Order</th>
//                           <th className="p-3 font-semibold">Customer</th>
//                           <th className="p-3 font-semibold">Amount</th>
//                           <th className="p-3 font-semibold">Status</th>
//                         </tr>
//                       </thead>
//                       <tbody className={darkMode ? "text-gray-300" : "text-gray-700"}>
//                         {[
//                           { id: "#1001", name: "Jane Cooper", amount: "$120.00", status: "Shipped" },
//                           { id: "#1002", name: "Luke Smith", amount: "$59.00", status: "Processing" },
//                           { id: "#1003", name: "Emma Wilson", amount: "$89.00", status: "Shipped" },
//                         ].map((r, i) => (
//                           <tr key={r.id} className={`border-b transition-colors duration-150 ${
//                             darkMode 
//                               ? "border-gray-700 hover:bg-gray-700/50" 
//                               : "border-gray-50 hover:bg-orange-50/50"
//                           }`}>
//                             <td className={`p-3 font-semibold ${darkMode ? "text-white" : "text-gray-800"}`}>{r.id}</td>
//                             <td className="p-3">{r.name}</td>
//                             <td className="p-3 font-medium">{r.amount}</td>
//                             <td className="p-3">
//                               <span className={`inline-flex items-center gap-1 md:gap-2 px-2 md:px-3 py-1 rounded-full text-xs font-medium ${
//                                 r.status === "Shipped" ? "bg-green-50 text-green-700" : "bg-yellow-50 text-yellow-700"
//                               }`}>
//                                 <span className={`h-1.5 w-1.5 rounded-full ${r.status === "Shipped" ? "bg-green-500" : "bg-yellow-500"}`}></span>
//                                 {r.status}
//                               </span>
//                             </td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                 </div>
//               </div>

//               {/* Right column */}
//               <aside className="space-y-4 md:space-y-6">
//                 <div className={`rounded-xl md:rounded-2xl p-4 md:p-5 shadow-md border hover:shadow-xl transition-shadow duration-300 ${
//                   darkMode 
//                     ? "bg-gray-800 border-gray-700" 
//                     : "bg-white border-orange-50"
//                 }`}>
//                   <h4 className={`text-sm font-bold mb-4 ${darkMode ? "text-white" : "text-gray-800"}`}>Quick Actions</h4>
//                   <div className="grid grid-cols-1 gap-2">
//                     <button className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-all duration-200 border ${
//                       darkMode 
//                         ? "bg-gray-700 text-orange-400 hover:bg-gray-600 border-gray-600" 
//                         : "bg-gradient-to-r from-orange-50 to-amber-50 text-orange-600 hover:from-orange-100 hover:to-amber-100 border-orange-100"
//                     }`}>
//                       + New Order
//                     </button>
//                     <button className={`w-full text-left px-4 py-3 rounded-lg border font-medium hover:bg-gray-50 transition-all duration-200 ${
//                       darkMode 
//                         ? "bg-gray-900 border-gray-700 text-gray-300 hover:bg-gray-700" 
//                         : "bg-white border-gray-200 text-gray-700"
//                     }`}>
//                       📦 Manage Products
//                     </button>
//                   </div>
//                 </div>

//                 <div className="rounded-xl md:rounded-2xl bg-gradient-to-br from-orange-400 via-orange-500 to-amber-500 p-5 shadow-xl overflow-hidden relative group hover:shadow-2xl transition-shadow duration-300">
//                   <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-transparent"></div>
//                   <div className="relative bg-white/95 backdrop-blur-sm p-5 rounded-xl shadow-lg">
//                     <div className="flex items-start justify-between mb-2">
//                       <h4 className="text-base font-bold text-gray-800">Spring Sale! 🌸</h4>
//                       <span className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">-20%</span>
//                     </div>
//                     <p className="text-sm text-gray-600 mb-4">New spring collection — 20% off on selected items this week only.</p>
//                     <button className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 text-white text-sm font-semibold shadow-lg hover:shadow-xl hover:from-orange-600 hover:to-amber-600 transition-all duration-200 transform hover:scale-105">
//                       Explore Collection
//                       <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
//                         <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
//                       </svg>
//                     </button>
//                   </div>
//                 </div>
//               </aside>
//             </div>

//             <footer className={`mt-6 md:mt-8 text-center text-xs pb-4 ${
//               darkMode ? "text-gray-500" : "text-gray-400"
//             }`}>
//               © 2025 Acme Commerce. All rights reserved.
//             </footer>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Icon components
// function dashboardIcon() {
//   return (
//     <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
//       <path d="M3 13h8V3H3v10zM3 21h8v-6H3v6zM13 21h8V11h-8v10zM13 3v6h8V3h-8z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
//     </svg>
//   );
// }

// function ordersIcon() {
//   return (
//     <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
//       <path d="M3 3h18v4H3zM3 10h18v11H3z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
//     </svg>
//   );
// }

// function productsIcon() {
//   return (
//     <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
//       <path d="M12 2l7 4v8l-7 4-7-4V6l7-4z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
//     </svg>
//   );
// }

// function customersIcon() {
//   return (
//     <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
//       <path d="M16 11c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM6 11c1.657 0 3-1.343 3-3S7.657 5 6 5 3 6.343 3 8s1.343 3 3 3zM3 20c0-2.667 4-4 6-4s6 1.333 6 4v1H3v-1z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
//     </svg>
//   );
// }

// function analyticsIcon() {
//   return (
//     <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
//       <path d="M3 3v18h18" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
//       <path d="M7 13v6M12 9v10M17 5v14" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
//     </svg>
//   );
// }

// function settingsIcon() {
//   return (
//     <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
//       <circle cx="12" cy="12" r="3" strokeWidth="1.5"/>
//       <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09a1.65 1.65 0 00-1-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09a1.65 1.65 0 001.51-1 1.65 1.65 0 00-.33-1.82l-.06-.06A2 2 0 016.44 2.6l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09c.3.14.57.35.78.61l.06-.06a2 2 0 012.83 2.83l-.06.06c.27.2.48.47.61.78H21a2 2 0 010 4h-.09c-.7 0-1.3.37-1.51 1z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
//     </svg>
//   );
// }

import React, { useEffect, useState, useCallback } from "react";
// Assuming these imports are correct based on your environment
import { useAuthStore } from "../store/authStore";
import api from "../api/axios";
import { useQuery } from "@tanstack/react-query";
import { Outlet } from "react-router";
// import { Link } from "react-router";
import { NavLink } from "react-router";
// Icon components (left unchanged)
function dashboardIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M3 13h8V3H3v10zM3 21h8v-6H3v6zM13 21h8V11h-8v10zM13 3v6h8V3h-8z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ordersIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M3 3h18v4H3zM3 10h18v11H3z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function productsIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M12 2l7 4v8l-7 4-7-4V6l7-4z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function customersIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M16 11c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM6 11c1.657 0 3-1.343 3-3S7.657 5 6 5 3 6.343 3 8s1.343 3 3 3zM3 20c0-2.667 4-4 6-4s6 1.333 6 4v1H3v-1z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function analyticsIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M3 3v18h18" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 13v6M12 9v10M17 5v14" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function settingsIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <circle cx="12" cy="12" r="3" strokeWidth="1.5" />
      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09a1.65 1.65 0 00-1-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09a1.65 1.65 0 001.51-1 1.65 1.65 0 00-.33-1.82l-.06-.06A2 2 0 016.44 2.6l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09c.3.14.57.35.78.61l.06-.06a2 2 0 012.83 2.83l-.06.06c.27.2.48.47.61.78H21a2 2 0 010 4h-.09c-.7 0-1.3.37-1.51 1z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function managementIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <rect x="3" y="6" width="18" height="15" rx="2" ry="2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 10a4 4 0 01-8 0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// --- FIX START: Initializing state based on local storage ---

// Helper function to get the initial dark mode state
const getInitialDarkMode = () => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const storedMode = localStorage.getItem('darkMode');
    if (storedMode !== null) {
      return storedMode === 'true';
    }
    // Check system preference if no explicit setting is stored
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  return false; // Default for server-side rendering or environments without window/localStorage
};

export default function DashboardLayout() {

  const { data, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const response = await api.get("/auth/profile");
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const authStore = useAuthStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  // FIX: Initialize darkMode state using the helper function
  const [darkMode, setDarkMode] = useState(getInitialDarkMode);
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    // Media query logic (left unchanged)
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = (e) => {
      setIsDesktop(e.matches);
      if (e.matches) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    setIsDesktop(mq.matches);
    setSidebarOpen(mq.matches);

    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    // FIX: Persist the current dark mode state to localStorage whenever it changes
    localStorage.setItem('darkMode', String(darkMode));

    // Optional: You could also apply dark mode to the <html> or <body> tag here
    // if you were using Tailwind's 'class' strategy instead of component styling.
  }, [darkMode]);


  const toggleSidebar = useCallback(() => {
    setSidebarOpen((s) => !s);
  }, []);

  const toggleDarkMode = useCallback(() => {
    setDarkMode((d) => !d);
  }, []);

  const handleNavClick = useCallback(() => {
    if (!isDesktop) {
      setSidebarOpen(false);
    }
  }, [isDesktop]); // Ensure dependency is correct

  // Example handler for the profile button, for completeness
  const handleProfileClick = () => {
    setShowUserMenu((s) => !s);
  };

  // Placeholder for logout functionality
  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
    } catch {
      console.error("Logout failed");
    }

    authStore.clearAuth();
    // navigate("/login");
  };


  const navItems = [
    {
      name: "Dashboard",
      icon: dashboardIcon,
      path: "/" // Or "/dashboard" depending on your route setup
    },
    {
      name: "Orders",
      icon: ordersIcon,
      path: "/orders" // Route for the Orders page
    },
    {
      name: "Products",
      icon: productsIcon,
      path: "/products" // Route for the Products page
    },
    {
    name: "Category",
    icon: managementIcon, // 
    path: "/category" 
  },
    {
      name: "Customers",
      icon: customersIcon,
      path: "/customers" // Route for the Customers page
    },
    {
      name: "Analytics",
      icon: analyticsIcon,
      path: "/analytics" // Route for the Analytics page
    },
    {
      name: "Settings",
      icon: settingsIcon,
      path: "/settings" // Route for the Settings page
    },
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode
        ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
        : "bg-gradient-to-br from-orange-50 via-white to-orange-100"
      }`}>
      {/* Mobile overlay */}
      {!isDesktop && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      <div className="max-w-full mx-auto p-2 sm:p-4 md:p-6 lg:p-8">
        <div className="flex gap-0 lg:gap-4">
          {/* Sidebar */}
          <aside
            aria-label="Sidebar"
            className={`
              fixed lg:sticky top-0 lg:top-6 z-50 h-screen lg:h-[calc(100vh-48px)]
              transition-all duration-300 ease-in-out
              ${!isDesktop && !sidebarOpen ? "-translate-x-full opacity-0" : "translate-x-0 opacity-100"}
              ${isDesktop && sidebarOpen ? "w-64" : isDesktop && !sidebarOpen ? "w-16" : "w-72"}
            `}
          >
            <div className={`h-full rounded-none lg:rounded-2xl overflow-hidden shadow-xl backdrop-blur-sm border-r lg:border flex flex-col ${darkMode
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-orange-100"
              }`}>
              {/* Header */}
              <div className={`flex items-center justify-between px-4 py-5 border-b ${darkMode ? "border-gray-700" : "border-orange-50"
                }`}>
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="flex-shrink-0 flex items-center justify-center rounded-xl h-10 w-10 bg-gradient-to-br from-orange-500 to-amber-400 text-white font-bold shadow-md">
                    A
                  </div>
                  <div className={`transition-all duration-300 ${isDesktop && !sidebarOpen ? "opacity-0 w-0" : "opacity-100"}`}>
                    <h3 className={`text-lg font-semibold whitespace-nowrap ${darkMode ? "text-white" : "text-gray-800"
                      }`}>Acme Commerce</h3>
                    <p className={`text-xs whitespace-nowrap ${darkMode ? "text-gray-400" : "text-gray-500"
                      }`}>Analytics & orders</p>
                  </div>
                </div>

                {isDesktop && (
                  <button
                    onClick={toggleSidebar}
                    aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
                    className={`flex-shrink-0 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 transition-colors ${darkMode ? "hover:bg-gray-700" : "hover:bg-orange-50"
                      }`}
                  >
                    <svg
                      className={`h-5 w-5 transition-transform duration-300 ${!sidebarOpen ? "rotate-180" : "rotate-0"} ${darkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 111.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                )}

                {!isDesktop && (
                  <button
                    onClick={() => setSidebarOpen(false)}
                    aria-label="Close sidebar"
                    className={`flex-shrink-0 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 transition-colors ${darkMode ? "hover:bg-gray-700" : "hover:bg-orange-50"
                      }`}
                  >
                    <svg className={`h-5 w-5 ${darkMode ? "text-gray-300" : "text-gray-600"}`} viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                )}
              </div>

              {/* Navigation */}
              <nav className="mt-2 flex-1 overflow-auto px-3 py-2">
                <ul className="space-y-1">
                  {navItems.map((item) => (
                    <li key={item.name}>
                      <NavLink
                        to={item.path}
                        onClick={handleNavClick}
                        // Use 'end' for the home/dashboard link to prevent accidental highlighting
                        end={item.path === "/"}

                        className={({ isActive }) =>
                          `group flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${isDesktop && !sidebarOpen ? "justify-center" : ""
                          } ${
                          // 🔑 MODIFIED LOGIC: Apply the hover classes when the link is active (isActive)
                          isActive
                            ? (darkMode
                              ? "bg-gray-700 text-gray-300" // Use dark mode hover class when active
                              : "bg-orange-50 text-gray-700")  // Use light mode hover class when active
                            // 😴 INACTIVE STYLES: Keep the original hover classes for mouse hover
                            : (darkMode
                              ? "hover:bg-gray-700 text-gray-300"
                              : "hover:bg-orange-50 text-gray-700")
                          }`
                        }
                      >
                        <span className="h-5 w-5 flex items-center justify-center text-orange-500 transition-transform group-hover:scale-110">
                          {item.icon()}
                        </span>
                        <span className={`text-sm font-medium transition-all duration-300 ${isDesktop && !sidebarOpen ? "opacity-0 w-0 overflow-hidden" : "opacity-100"}`}>
                          {item.name}
                        </span>
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Footer button */}
              <div className={`px-3 py-4 border-t ${darkMode ? "border-gray-700" : "border-orange-50"}`}>
                <button className={`w-full inline-flex items-center ${isDesktop && !sidebarOpen ? "justify-center" : "justify-center gap-2"} rounded-lg px-3 py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-sm font-medium shadow-lg hover:shadow-xl hover:from-orange-600 hover:to-amber-600 transition-all duration-200 transform hover:scale-105`}>
                  <span className="text-lg">+</span>
                  {(isDesktop && sidebarOpen || !isDesktop) && <span>New</span>}
                </button>
              </div>
            </div>
          </aside>

          {/* Main content */}
          <div className={`flex-1 w-full transition-all duration-300 ${isDesktop ? "ml-4" : "ml-0"}`}>
            {/* Topbar */}
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <div className="flex items-center gap-2 md:gap-4">
                {!isDesktop && (
                  <button
                    className={`p-2 rounded-lg shadow-md border transition-all duration-200 active:scale-95 ${darkMode
                        ? "bg-gray-800 border-gray-700 hover:bg-gray-700"
                        : "bg-white border-orange-100 hover:bg-orange-50"
                      }`}
                    onClick={() => setSidebarOpen(true)}
                    aria-label="Open sidebar"
                  >
                    <svg className="h-5 w-5 text-orange-500" viewBox="0 0 20 20" fill="none" stroke="currentColor">
                      <path d="M3 6h14M3 10h14M3 14h14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                )}

                <h1 className={`text-xl md:text-2xl font-bold ${darkMode ? "text-white" : "text-gray-800"}`}>Dashboard</h1>
                <div className={`hidden md:flex items-center gap-2 px-3 py-1 rounded-full ${darkMode ? "bg-gray-800" : "bg-orange-50"
                  }`}>
                  <div className="h-2 w-2 bg-orange-500 rounded-full animate-pulse"></div>
                  <span className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>Overview</span>
                </div>
              </div>

              <div className="flex items-center gap-2 md:gap-3 relative"> {/* Added relative for dropdown positioning */}
                <div className={`hidden md:flex items-center rounded-lg border px-3 py-2 shadow-sm hover:shadow-md transition-shadow ${darkMode
                    ? "bg-gray-800 border-gray-700"
                    : "bg-white border-gray-200"
                  }`}>
                  <svg className={`h-5 w-5 mr-2 ${darkMode ? "text-gray-500" : "text-gray-400"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <circle cx="11" cy="11" r="8" strokeWidth="2" />
                    <path d="M21 21l-4.35-4.35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <input
                    className={`w-32 lg:w-52 outline-none text-sm bg-transparent ${darkMode ? "text-white placeholder-gray-500" : "text-gray-800 placeholder-gray-400"
                      }`}
                    placeholder="Search orders, products"
                  />
                </div>

                <button
                  onClick={toggleDarkMode}
                  aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
                  className={`p-2 rounded-lg shadow-md border transition-all duration-200 hidden sm:block ${darkMode
                      ? "bg-gray-800 border-gray-700 hover:bg-gray-700"
                      : "bg-white border-gray-100 hover:bg-orange-50"
                    }`}
                >
                  {darkMode ? (
                    <svg className="h-5 w-5 text-yellow-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <circle cx="12" cy="12" r="5" strokeWidth="2" />
                      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>

                {/* Profile Button and Dropdown */}
                <button
                  className={`flex items-center gap-2 px-2 md:px-3 py-2 rounded-lg shadow-md border hover:shadow-lg transition-all duration-200 ${darkMode
                      ? "bg-gray-800 border-gray-700"
                      : "bg-white border-gray-100"
                    }`}
                  onClick={handleProfileClick}
                  aria-expanded={showUserMenu}
                  aria-haspopup="true"
                >
                  <span className="h-7 w-7 md:h-8 md:w-8 rounded-full bg-gradient-to-br from-orange-500 to-amber-400 text-white flex items-center justify-center text-sm font-semibold shadow-md">U</span>
                  <div className="hidden sm:block text-left">
                    <div className={`text-sm font-medium ${darkMode ? "text-white" : "text-gray-800"}`}>{data?.user?.email ?? "Admin"}</div>
                    <div className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Owner</div>
                  </div>
                  <svg className={`h-4 w-4 transition-transform duration-200 ${showUserMenu ? "rotate-180" : "rotate-0"} ${darkMode ? "text-gray-400" : "text-gray-600"}`} viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>

                {/* User Dropdown Menu (simple example) */}
                {showUserMenu && (
                  <div
                    className={`absolute top-full right-0 mt-2 w-48 rounded-lg shadow-xl py-1 z-50 transition-all duration-200 transform origin-top-right ${darkMode ? "bg-gray-700 border border-gray-600" : "bg-white border border-gray-200"
                      }`}
                  >
                    <a href="#" className={`block px-4 py-2 text-sm ${darkMode ? "text-gray-300 hover:bg-gray-600" : "text-gray-700 hover:bg-orange-50"}`} onClick={(e) => { e.preventDefault(); setShowUserMenu(false); }}>
                      Profile
                    </a>
                    <a href="#" className={`block px-4 py-2 text-sm ${darkMode ? "text-gray-300 hover:bg-gray-600" : "text-gray-700 hover:bg-orange-50"}`} onClick={(e) => { e.preventDefault(); setShowUserMenu(false); }}>
                      Settings
                    </a>
                    <div className={`h-px my-1 ${darkMode ? "bg-gray-600" : "bg-gray-100"}`}></div>
                    <button
                      className={`w-full text-left px-4 py-2 text-sm font-medium ${darkMode ? "text-red-400 hover:bg-gray-600" : "text-red-600 hover:bg-red-50"}`}
                      onClick={handleLogout}
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Content grid */}
            <Outlet context={{ data: darkMode }} />

            <footer className={`mt-6 md:mt-8 text-center text-xs pb-4 ${darkMode ? "text-gray-500" : "text-gray-400"
              }`}>
              © 2025 Acme Commerce. All rights reserved.
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}
// All required icon functions are already defined at the top of the file.
// The code is complete with the component logic and UI structure.
