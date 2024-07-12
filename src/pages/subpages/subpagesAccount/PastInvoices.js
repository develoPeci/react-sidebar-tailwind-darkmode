// import React from "react";
// import Layout from "../../../components/Layout";
// import { Link } from "react-router-dom";
// import { IoSettingsOutline } from "react-icons/io5";

// function PastInvoices() {
//   const invoices = [
//     {
//       date: "June 10, 2024",
//       amount: 150.0,
//       status: "Paid",
//     },
//     {
//       date: "June 10, 2024",
//       amount: 250.0,
//       status: "Paid",
//     },
//     {
//       date: "June 10, 2024",
//       amount: 300.0,
//       status: "Paid",
//     },
//   ];

//   return (
//     <Layout>
//       <div className="my-3 mx-10">
//         <p className="text-3xl text-zinc-600 dark:text-white text-center md:text-left font-semibold">
//           Invoices
//         </p>
//       </div>
//       <div className="my-3 mx-10">
//         <p className="text-1xl text-zinc-600 dark:text-white text-center md:text-left font-semibold">
//           <nav className="flex" aria-label="Breadcrumb">
//             <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
//               <li>
//                 <div className="flex justify-center items-center ">
//                   <Link
//                     to="/MyAccount"
//                     className="ms-1 text-1xl flex items-center justify-center gap-1 font-medium text-gray-400 hover:text-black md:ms-2 dark:text-gray-400 dark:hover:text-white"
//                   >
//                     <IoSettingsOutline className="h-5 text-gray-400" />
//                     My Account
//                   </Link>
//                 </div>
//               </li>
//               <li aria-current="page">
//                 <div className="flex items-center">
//                   <svg
//                     className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
//                     aria-hidden="true"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 6 10"
//                   >
//                     <path
//                       stroke="currentColor"
//                       stroke-linecap="round"
//                       stroke-linejoin="round"
//                       stroke-width="2"
//                       d="m1 9 4-4-4-4"
//                     />
//                   </svg>
//                   <span className="ms-1 text-1xl font-medium text-gray-800 md:ms-2 dark:text-gray-400">
//                     Invoices
//                   </span>
//                 </div>
//               </li>
//             </ol>
//           </nav>
//         </p>
//       </div>
//       <div className="my-3 mx-10">
//         <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
//           <div className="flex items-center justify-between flex-wrap bg-white dark:bg-gray-900 p-4 space-y-4 md:space-y-0">
//             <div>
//               <button
//                 id="dropdownActionButton"
//                 data-dropdown-toggle="dropdownAction"
//                 className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
//                 type="button"
//               >
//                 <span className="sr-only">Action button</span>
//                 Action
//                 <svg
//                   className="w-2.5 h-2.5 ml-2.5"
//                   aria-hidden="true"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 10 6"
//                 >
//                   <path
//                     stroke="currentColor"
//                     stroke-linecap="round"
//                     stroke-linejoin="round"
//                     stroke-width="2"
//                     d="m1 1 4 4 4-4"
//                   />
//                 </svg>
//               </button>
//               <div
//                 id="dropdownAction"
//                 className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
//               >
//                 <ul
//                   className="py-1 text-sm text-gray-700 dark:text-gray-200"
//                   aria-labelledby="dropdownActionButton"
//                 >
//                   <li>
//                     <a
//                       href="#"
//                       className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
//                     >
//                       Reward
//                     </a>
//                   </li>
//                   <li>
//                     <a
//                       href="#"
//                       className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
//                     >
//                       Promote
//                     </a>
//                   </li>
//                   <li>
//                     <a
//                       href="#"
//                       className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
//                     >
//                       Activate account
//                     </a>
//                   </li>
//                 </ul>
//                 <div className="py-1">
//                   <a
//                     href="#"
//                     className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
//                   >
//                     Delete User
//                   </a>
//                 </div>
//               </div>
//             </div>
//             <div className="relative">
//               <label htmlFor="table-search" className="sr-only">
//                 Search
//               </label>
//               <input
//                 type="text"
//                 id="table-search-users"
//                 className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                 placeholder="Search for users"
//               />
//               <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//                 <svg
//                   className="w-4 h-4 text-gray-500 dark:text-gray-400"
//                   aria-hidden="true"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 20 20"
//                 >
//                   <path
//                     stroke="currentColor"
//                     stroke-linecap="round"
//                     stroke-linejoin="round"
//                     stroke-width="2"
//                     d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
//                   />
//                 </svg>
//               </div>
//             </div>
//           </div>
//           <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
//             <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
//               <tr>
//                 <th scope="col" className="p-4">
//                   <div className="flex items-center">
//                     <input
//                       id="checkbox-all-search"
//                       type="checkbox"
//                       className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
//                     />
//                     <label htmlFor="checkbox-all-search" className="sr-only">
//                       checkbox
//                     </label>
//                   </div>
//                 </th>
//                 <th scope="col" className="px-6 py-3">
//                   Date
//                 </th>
//                 <th scope="col" className="px-6 py-3">
//                   Transaction
//                 </th>
//                 <th scope="col" className="px-6 py-3">
//                   Amount
//                 </th>
//                 <th scope="col" className="px-6 py-3">
//                   Payment Status
//                 </th>
//                 <th scope="col" className="px-6 py-3">
//                   Action
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {invoices.map((invoice, index) => (
//                 <tr
//                   key={index}
//                   className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
//                 >
//                   <td className="w-4 p-4">
//                     <div className="flex items-center">
//                       <input
//                         id={`checkbox-table-search-${index}`}
//                         type="checkbox"
//                         className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
//                       />
//                       <label htmlFor={`checkbox-table-search-${index}`} className="sr-only">
//                         checkbox
//                       </label>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4">{invoice.date}</td>
//                   <td className="px-6 py-4">
                  
//                       Plan Basic
                    
//                   </td>
//                   <td className="px-6 py-4">${invoice.amount}</td>
//                   <td className="px-12 py-4"><span class="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">{invoice.status}</span>
//                   </td>
//                   <td className="px-0 py-4">
//                   <button
//                       type="button"
//                       class="inline-flex gap-2 items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white  hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
//                     >
//                       <svg
//                         class="w-3 h-3 me-2"
//                         aria-hidden="true"
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="currentColor"
//                         viewBox="0 0 20 20"
//                       >
//                         <path d="M14.707 7.793a1 1 0 0 0-1.414 0L11 10.086V1.5a1 1 0 0 0-2 0v8.586L6.707 7.793a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.416 0l4-4a1 1 0 0 0-.002-1.414Z" />
//                         <path d="M18 12h-2.55l-2.975 2.975a3.5 3.5 0 0 1-4.95 0L4.55 12H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2Zm-3 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" />
//                       </svg>
//                       Downloads
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </Layout>
//   );
// }

// export default PastInvoices;
