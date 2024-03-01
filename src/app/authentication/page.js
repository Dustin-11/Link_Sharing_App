// "use client";
// import SharedHeader from "../components/shared-header";
// import Login from "../components/login";
// import CreateProfile from "../components/create-profile";
// import Link from "next/link";
// import { useState } from "react";
// import AuthCheck from "@/app/components/auth-check";

// export default function authentication() {
//     const [page, setPage] = useState(0)
//     const navigatePage = () => {
//         if(page != 1) {
//             setPage(1);
//         }
//         else {
//             setPage(0);
//         }
//     }
//     return(
//         <>
//             <SharedHeader></SharedHeader>
//             {page ? <CreateProfile></CreateProfile>:<Login></Login>}
            
//                 {page ? 
//                     <div className="flex flex-col items-center mt-5">
//                         <p className="text-customGrey">Already have an account?</p>
//                         <a onClick={navigatePage} className="text-customPurple cursor-pointer active:text-customPurpleActive">Login</a>
//                     </div> 
//                     : 
//                     <div className="flex flex-col items-center mt-5">
//                         <p className="text-customGrey">Don't have an account?</p>
//                         <a onClick={navigatePage} className="text-customPurple">Create an account</a>
//                     </div>
//                 }
//         </>
//     );
// }