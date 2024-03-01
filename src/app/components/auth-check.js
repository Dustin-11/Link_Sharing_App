// import auth from "@/lib/auth";
// import { onAuthStateChanged } from "firebase/auth";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";

// const AuthCheck = ({ children }) => {
//     const router = useRouter();

//     useEffect(() => {
//         const unsubscribe = onAuthStateChanged(auth, (user) => {
//             if (user) {
//                 router.push('/account');
//             }
//             else {
//                 router.push('/main');
//             }
//         });
//         return () => unsubscribe();
//     }, []);
//     return children;
// }

// export default AuthCheck;